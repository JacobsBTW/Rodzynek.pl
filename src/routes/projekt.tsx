import { createFileRoute } from "@tanstack/react-router";
import { PublicSectionPage } from "@/components/site/public-page";
import { getPublicHead } from "@/lib/public-content";

export const Route = createFileRoute("/projekt")({
  head: () => getPublicHead("pl", "project"),
  component: () => <PublicSectionPage locale="pl" page="project" />,
});
