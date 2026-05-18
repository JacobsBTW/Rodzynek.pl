import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { getEnglishRedirectPath, getLocaleForPath } from "./lib/public-content";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type CloudflareRequest = Request & {
  cf?: {
    country?: string;
  };
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(request?: Request): Response {
  const locale = request ? getLocaleForPath(new URL(request.url).pathname) : "pl";
  return new Response(renderErrorPage(locale), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isRedirectExcluded(pathname: string): boolean {
  if (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/en")
  ) {
    return true;
  }

  return /\.[a-z0-9]+$/i.test(pathname);
}

function getGeoRedirectResponse(request: Request): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;

  const country = (request as CloudflareRequest).cf?.country;
  if (!country || country.toUpperCase() === "PL") return undefined;

  const url = new URL(request.url);
  if (isRedirectExcluded(url.pathname)) return undefined;

  const redirectPath = getEnglishRedirectPath(url.pathname);
  if (!redirectPath) return undefined;

  url.pathname = redirectPath;
  return Response.redirect(url.toString(), 302);
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 zamienia błędy z handlerów na zwykłą odpowiedź 500 z treścią
// {"unhandled":true,"message":"HTTPError"} - sam try/catch tego nie przechwytuje.
async function normalizeCatastrophicSsrResponse(
  request: Request,
  response: Response,
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 przechwycił błąd SSR: ${body}`));
  return brandedErrorResponse(request);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirect = getGeoRedirectResponse(request);
      if (redirect) return redirect;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(request, response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse(request);
    }
  },
};
