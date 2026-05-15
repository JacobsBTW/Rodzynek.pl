const ADMIN_COOKIE_NAME = "rodzynek_admin";
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
}

function base64Url(bytes: ArrayBuffer | Uint8Array) {
  const array = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of array) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function sign(value: string) {
  const secret = getSessionSecret();
  if (!secret) throw new Error("ADMIN_PASSWORD nie jest skonfigurowane.");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return base64Url(signature);
}

function parseCookies(cookieHeader: string | null) {
  const cookies = new Map<string, string>();
  if (!cookieHeader) return cookies;

  for (const cookie of cookieHeader.split(";")) {
    const [rawName, ...rawValue] = cookie.trim().split("=");
    if (!rawName) continue;
    cookies.set(rawName, rawValue.join("="));
  }

  return cookies;
}

function isSecureRequest(request: Request) {
  const url = new URL(request.url);
  return url.protocol === "https:";
}

export function isAdminConfigured() {
  return Boolean(getAdminPassword() && getSessionSecret());
}

export async function createAdminSessionCookie(request: Request) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const nonce = crypto.randomUUID();
  const payload = `${expiresAt}:${nonce}`;
  const signature = await sign(payload);
  const secure = isSecureRequest(request) ? "; Secure" : "";

  return `${ADMIN_COOKIE_NAME}=${payload}.${signature}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}${secure}`;
}

export function clearAdminSessionCookie(request: Request) {
  const secure = isSecureRequest(request) ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`;
}

export async function verifyAdminPassword(password: string) {
  const adminPassword = getAdminPassword();
  return Boolean(adminPassword && timingSafeEqual(password, adminPassword));
}

export async function isAdminRequest(request: Request) {
  const cookie = parseCookies(request.headers.get("cookie")).get(ADMIN_COOKIE_NAME);
  if (!cookie) return false;

  const separator = cookie.lastIndexOf(".");
  if (separator === -1) return false;

  const payload = cookie.slice(0, separator);
  const signature = cookie.slice(separator + 1);
  const expectedSignature = await sign(payload);
  if (!timingSafeEqual(signature, expectedSignature)) return false;

  const [rawExpiresAt] = payload.split(":");
  const expiresAt = Number(rawExpiresAt);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}
