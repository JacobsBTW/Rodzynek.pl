import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Workshops } from "@/components/site/workshops";

export const Route = createFileRoute("/warsztaty")({
  head: () => ({
    meta: [
      { title: "Warsztaty - Rodzynek.pl" },
      {
        name: "description",
        content:
          "Bezpłatne warsztaty rówieśnicze o presji rówieśniczej, asertywności i zdrowiu cyfrowym dla szkół i organizacji młodzieżowych.",
      },
      { property: "og:title", content: "Warsztaty Rodzynek.pl dla szkół i NGO" },
      {
        property: "og:description",
        content:
          "Trzy interaktywne warsztaty: presja społeczna, asertywność, presja w sieci. 90–120 min, prowadzą studenci UŁ.",
      },
    ],
  }),
  component: () => (
    <SiteShell>
      <Workshops />
    </SiteShell>
  ),
});
