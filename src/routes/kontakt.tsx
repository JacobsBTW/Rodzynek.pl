import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Contact } from "@/components/site/contact";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt - Zaproś Rodzynek.pl do swojej szkoły" },
      {
        name: "description",
        content:
          "Napisz do nas - ustalimy szczegóły i przyjedziemy z bezpłatnym warsztatem do Twojej szkoły lub organizacji.",
      },
      { property: "og:title", content: "Zaproś Rodzynek.pl - kontakt" },
      {
        property: "og:description",
        content: "Formularz dla nauczycieli, pedagogów i NGO. Odpowiadamy w ~24 godziny.",
      },
    ],
  }),
  component: () => (
    <SiteShell>
      <Contact />
    </SiteShell>
  ),
});
