import { createFileRoute } from "@tanstack/react-router";
import { PublicSectionPage } from "@/components/site/public-page";
import { getPublicHead } from "@/lib/public-content";

export const Route = createFileRoute("/zespol")({
  head: () => getPublicHead("pl", "team"),
  component: () => <PublicSectionPage locale="pl" page="team" />,
});
