import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Hero, Marquee } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Workshops } from "@/components/site/workshops";
import { Projekt } from "@/components/site/projekt";
import { Team } from "@/components/site/team";
import { Contact } from "@/components/site/contact";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <div id="o-nas"><About /></div>
      <div id="warsztaty"><Workshops /></div>
      <div id="projekt"><Projekt /></div>
      <div id="zespol"><Team /></div>
      <div id="kontakt"><Contact /></div>
    </SiteShell>
  );
}
