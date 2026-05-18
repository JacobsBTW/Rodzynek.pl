import { createFileRoute } from "@tanstack/react-router";
import { PublicSectionPage } from "@/components/site/public-page";
import { getPublicHead } from "@/lib/public-content";

export const Route = createFileRoute("/warsztaty")({
  head: () => getPublicHead("pl", "workshops"),
  component: () => <PublicSectionPage locale="pl" page="workshops" />,
});
