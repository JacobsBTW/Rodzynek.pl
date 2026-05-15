import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const SESSION_COOKIE = "rodzynek_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

const loginSchema = z.object({
  password: z.string().min(1),
});

const updateSubmissionSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "read"]),
});

export type AdminContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string | null;
  status: string;
};

function getAdminPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? getAdminPassword();
}

function hasSupabaseAdminConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function encodeBase64Url(bytes: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  return encodeBase64Url(await crypto.subtle.digest("SHA-256", bytes));
}

async function signSession(expiresAt: number) {
  const secret = getSessionSecret();
  if (!secret) return undefined;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(String(expiresAt)),
  );
  return `${expiresAt}.${encodeBase64Url(signature)}`;
}

function getCookie(name: string) {
  const request = getRequest();
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;

  for (const part of cookieHeader.split(";")) {
    const [rawKey, ...rawValue] = part.trim().split("=");
    if (rawKey === name) return rawValue.join("=");
  }
}

async function hasValidSession() {
  const token = getCookie(SESSION_COOKIE);
  if (!token) return false;

  const [rawExpiresAt, signature] = token.split(".");
  const expiresAt = Number(rawExpiresAt);
  if (!Number.isFinite(expiresAt) || !signature || expiresAt <= Date.now()) {
    return false;
  }

  return token === (await signSession(expiresAt));
}

async function hasValidPassword(password: string) {
  const adminPassword = getAdminPassword();
  if (!adminPassword) return false;

  return (await sha256(password)) === (await sha256(adminPassword));
}

function setAdminSessionCookie(token: string) {
  const request = getRequest();
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  setResponseHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}${secure}`,
  );
}

function clearAdminSessionCookie() {
  setResponseHeader("Set-Cookie", `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
}

async function requireAdminSession() {
  if (!getAdminPassword()) {
    return { authenticated: false as const, configured: false as const };
  }

  if (!(await hasValidSession())) {
    return { authenticated: false as const, configured: true as const };
  }

  return { authenticated: true as const, configured: true as const };
}

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    if (!(await hasValidPassword(data.password))) {
      clearAdminSessionCookie();
      return { ok: false, configured: Boolean(getAdminPassword()) };
    }

    const token = await signSession(Date.now() + SESSION_TTL_SECONDS * 1000);
    if (!token) {
      return { ok: false, configured: false };
    }

    setAdminSessionCookie(token);
    return { ok: true, configured: true };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  clearAdminSessionCookie();
  return { ok: true };
});

export const getAdminDashboardState = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireAdminSession();
  if (!session.authenticated) {
    return { ...session, databaseConfigured: false, submissions: [] as AdminContactSubmission[] };
  }

  if (!hasSupabaseAdminConfig()) {
    return { ...session, databaseConfigured: false, submissions: [] as AdminContactSubmission[] };
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("contact_submissions")
    .select("id, created_at, name, email, organization, topic, message, status")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("admin submissions load error", error);
    throw new Error("Could not load contact submissions");
  }

  return {
    ...session,
    databaseConfigured: true,
    submissions: data satisfies AdminContactSubmission[],
  };
});

export const updateContactSubmissionStatus = createServerFn({ method: "POST" })
  .inputValidator(updateSubmissionSchema)
  .handler(async ({ data }) => {
    const session = await requireAdminSession();
    if (!session.authenticated) {
      return { ok: false };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) {
      console.error("admin submission update error", error);
      throw new Error("Could not update contact submission");
    }

    return { ok: true };
  });
