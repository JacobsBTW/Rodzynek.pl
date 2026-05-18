import { createFileRoute } from "@tanstack/react-router";
import { locales, publicPaths, type Locale, type PublicRouteKey } from "@/lib/public-content";

const BASE_URL = "https://rodzynek.pl";

interface SitemapEntry {
  route: PublicRouteKey;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { route: "home", changefreq: "weekly", priority: "1.0" },
  { route: "about", changefreq: "monthly", priority: "0.8" },
  { route: "workshops", changefreq: "monthly", priority: "0.9" },
  { route: "project", changefreq: "monthly", priority: "0.7" },
  { route: "team", changefreq: "monthly", priority: "0.6" },
  { route: "contact", changefreq: "monthly", priority: "0.9" },
];

function renderUrl(locale: Locale, entry: SitemapEntry): string {
  const loc = `${BASE_URL}${publicPaths[locale][entry.route]}`;
  const alternates = locales.map(
    (alternateLocale) =>
      `    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${BASE_URL}${publicPaths[alternateLocale][entry.route]}" />`,
  );

  return [
    `  <url>`,
    `    <loc>${loc}</loc>`,
    ...alternates,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${publicPaths.pl[entry.route]}" />`,
    entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
    entry.priority ? `    <priority>${entry.priority}</priority>` : null,
    `  </url>`,
  ]
    .filter(Boolean)
    .join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.flatMap((entry) => locales.map((locale) => renderUrl(locale, entry)));

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
