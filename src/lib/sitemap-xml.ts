import { publicPages, sitemap } from "./sitemap";
import { getPageContent } from "@/cms/content";
export const sitemapSections = [
  "products",
  "applications",
  "replacement",
  "knowledge",
  "company",
];
export const xmlEscape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export async function sectionXml(section: string) {
  const entries = publicPages.filter(
    (p) =>
      p.index_status === "index" &&
      (sitemapSections
        .slice(0, 4)
        .find((s) => p.path.startsWith("/" + s + "/")) || "company") ===
        section,
  );
  const rows = await Promise.all(
    entries.map(async (p) => {
      const c = await getPageContent(p.id);
      const images =
        p.template === "T3"
          ? (c.gallery || []).flatMap((i) =>
              typeof i.image === "object" && i.image.url
                ? [new URL(i.image.url, sitemap.site.domain).toString()]
                : [],
            )
          : [];
      return `<url><loc>${xmlEscape(sitemap.site.domain + p.path)}</loc>${images.map((url) => `<image:image><image:loc>${xmlEscape(url)}</image:loc></image:image>`).join("")}</url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${rows.join("")}</urlset>`;
}
