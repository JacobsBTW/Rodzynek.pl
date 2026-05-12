import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Hero, Marquee } from "@/components/site/hero";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
    </SiteShell>
  );
}
