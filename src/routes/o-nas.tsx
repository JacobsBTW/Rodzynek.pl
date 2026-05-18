import { createFileRoute } from "@tanstack/react-router";
import { PublicSectionPage } from "@/components/site/public-page";
import { getPublicHead } from "@/lib/public-content";

export const Route = createFileRoute("/o-nas")({
  head: () => getPublicHead("pl", "about"),
  component: () => <PublicSectionPage locale="pl" page="about" />,
});
