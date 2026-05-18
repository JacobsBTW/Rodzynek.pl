import { createFileRoute } from "@tanstack/react-router";
import { PublicHomePage } from "@/components/site/public-page";
import { getPublicHead } from "@/lib/public-content";

export const Route = createFileRoute("/")({
  head: () => getPublicHead("pl", "home"),
  component: () => <PublicHomePage locale="pl" />,
});
