import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { PublicHomePage } from "@/components/site/public-page";
import { getPublicHead, normalizePathname } from "@/lib/public-content";

export const Route = createFileRoute("/en")({
  head: ({ match, matches }) =>
    matches[matches.length - 1]?.id === match.id ? getPublicHead("en", "home") : {},
  component: EnRouteComponent,
});

function EnRouteComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (normalizePathname(pathname) === "/en") {
    return <PublicHomePage locale="en" />;
  }

  return <Outlet />;
}
