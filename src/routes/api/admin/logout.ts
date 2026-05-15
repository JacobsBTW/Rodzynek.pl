import { createFileRoute } from "@tanstack/react-router";
import { clearAdminSessionCookie } from "@/lib/admin-auth.server";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async ({ request }) =>
        Response.json(
          { ok: true },
          {
            headers: {
              "cache-control": "no-store",
              "set-cookie": clearAdminSessionCookie(request),
            },
          },
        ),
    },
  },
});
