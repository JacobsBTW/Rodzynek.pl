import { createFileRoute } from "@tanstack/react-router";
import { PublicSectionPage } from "@/components/site/public-page";
import { getPublicHead } from "@/lib/public-content";

export const Route = createFileRoute("/en/project")({
  head: () => getPublicHead("en", "project"),
  component: () => <PublicSectionPage locale="en" page="project" />,
});
