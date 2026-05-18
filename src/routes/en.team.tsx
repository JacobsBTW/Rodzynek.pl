import { createFileRoute } from "@tanstack/react-router";
import { PublicSectionPage } from "@/components/site/public-page";
import { getPublicHead } from "@/lib/public-content";

export const Route = createFileRoute("/en/team")({
  head: () => getPublicHead("en", "team"),
  component: () => <PublicSectionPage locale="en" page="team" />,
});
