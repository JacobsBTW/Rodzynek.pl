import { createFileRoute } from "@tanstack/react-router";
import { isAdminRequest } from "@/lib/admin-auth.server";

export const Route = createFileRoute("/api/admin/session")({
  server: {
    handlers: {
      GET: async ({ request }) =>
        Response.json(
          { authenticated: await isAdminRequest(request) },
          { headers: { "cache-control": "no-store" } },
        ),
    },
  },
});
