import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(200),
  email: z.string().trim().email("Niepoprawny adres e-mail").max(320),
  org: z.string().trim().min(2, "Podaj nazwę instytucji").max(200),
  topic: z.string().trim().min(1).max(200),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  website: z.string().max(0, "spam").optional().or(z.literal("")),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

export const submitContactSubmission = createServerFn({ method: "POST" })
  .inputValidator(contactSubmissionSchema)
  .handler(async ({ data }) => {
    if (data.website) {
      return { ok: true };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      organization: data.org,
      topic: data.topic,
      message: data.message?.trim() ? data.message : null,
    });

    if (error) {
      console.error("contact submit error", error);
      throw new Error("Contact submission failed");
    }

    return { ok: true };
  });
