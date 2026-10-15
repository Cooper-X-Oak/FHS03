import { sectionXml, sitemapSections } from "@/lib/sitemap-xml";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;
  if (!sitemapSections.includes(section))
    return new Response(null, { status: 404 });
  return new Response(await sectionXml(section), {
    headers: { "Content-Type": "application/xml" },
  });
}
