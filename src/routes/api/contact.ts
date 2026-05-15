import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  organization: z.string().trim().min(2).max(200),
  topic: z.string().trim().min(1).max(200),
  message: z.string().trim().max(4000).nullable().optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

function json(payload: Record<string, unknown>, status = 200) {
  return Response.json(payload, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

function createSupabaseContactClient() {
  const url = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Brakuje zmiennych środowiskowych Supabase dla formularza kontaktowego.");
  }

  return createClient<Database>(url, key, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      GET: async () => json({ error: "method_not_allowed" }, 405),
      POST: async ({ request }) => {
        let body: unknown;

        try {
          body = await request.json();
        } catch {
          return json({ error: "invalid_json" }, 400);
        }

        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
          return json({ error: "validation_failed" }, 422);
        }

        if (parsed.data.website) {
          return json({ ok: true });
        }

        try {
          const supabase = createSupabaseContactClient();
          const { error } = await supabase.from("contact_submissions").insert({
            name: parsed.data.name,
            email: parsed.data.email,
            organization: parsed.data.organization,
            topic: parsed.data.topic,
            message: parsed.data.message?.trim() ? parsed.data.message : null,
          });

          if (error) {
            console.error("błąd zapisu formularza kontaktowego", error);
            return json({ error: "submit_failed" }, 500);
          }
        } catch (error) {
          console.error("błąd serwera formularza kontaktowego", error);
          return json({ error: "server_error" }, 500);
        }

        return json({ ok: true });
      },
    },
  },
});
