import { createFileRoute } from "@tanstack/react-router";
import { PublicSectionPage } from "@/components/site/public-page";
import { getPublicHead } from "@/lib/public-content";

export const Route = createFileRoute("/en/contact")({
  head: () => getPublicHead("en", "contact"),
  component: () => <PublicSectionPage locale="en" page="contact" />,
});
