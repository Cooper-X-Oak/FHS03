import { sitemapSections } from "@/lib/sitemap-xml";
import { sitemap } from "@/lib/sitemap";
export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapSections.map((s) => `<sitemap><loc>${sitemap.site.domain}/sitemaps/${s}/</loc></sitemap>`).join("")}</sitemapindex>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
