import { createFileRoute } from "@tanstack/react-router";
import { isAdminRequest } from "@/lib/admin-auth.server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin.server";

function json(payload: Record<string, unknown>, status = 200) {
  return Response.json(payload, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/admin/submissions")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await isAdminRequest(request))) {
          return json({ error: "unauthorized" }, 401);
        }

        try {
          const supabase = createSupabaseAdminClient();
          const { data, error } = await supabase
            .from("contact_submissions")
            .select("id, created_at, name, email, organization, topic, message, status")
            .order("created_at", { ascending: false })
            .limit(200);

          if (error) {
            console.error("błąd zapytania o zgłoszenia w panelu administracyjnym", error);
            return json({ error: "query_failed" }, 500);
          }

          return json({ submissions: data ?? [] });
        } catch (error) {
          console.error("błąd serwera zgłoszeń w panelu administracyjnym", error);
          return json({ error: "server_error" }, 500);
        }
      },
    },
  },
});
