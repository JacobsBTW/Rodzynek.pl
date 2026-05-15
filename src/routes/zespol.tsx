import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Team } from "@/components/site/team";

export const Route = createFileRoute("/zespol")({
  head: () => ({
    meta: [
      { title: "Zespół - Rodzynek.pl" },
      {
        name: "description",
        content:
          "Studenci, mentorzy rówieśniczy i badaczki tworzące inicjatywę Rodzynek.pl na Uniwersytecie Łódzkim.",
      },
      { property: "og:title", content: "Zespół Rodzynek.pl" },
      {
        property: "og:description",
        content: "Ludzie za Rodzynkiem - studenci UŁ działający w profilaktyce rówieśniczej.",
      },
    ],
  }),
  component: () => (
    <SiteShell>
      <Team />
    </SiteShell>
  ),
});
