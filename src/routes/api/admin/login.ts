import { createFileRoute } from "@tanstack/react-router";
import {
  createAdminSessionCookie,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/admin-auth.server";

function json(payload: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return Response.json(payload, {
    status,
    headers: {
      "cache-control": "no-store",
      ...headers,
    },
  });
}

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAdminConfigured()) {
          return json({ error: "admin_not_configured" }, 500);
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "invalid_json" }, 400);
        }

        const password =
          body && typeof body === "object" && "password" in body ? String(body.password ?? "") : "";

        if (!(await verifyAdminPassword(password))) {
          return json({ error: "invalid_password" }, 401);
        }

        return json({ ok: true }, 200, {
          "set-cookie": await createAdminSessionCookie(request),
        });
      },
    },
  },
});
