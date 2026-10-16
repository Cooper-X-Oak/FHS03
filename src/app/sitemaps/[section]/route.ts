import {sitemapXml,sitemapSections,type SitemapSection} from '@/lib/seo-sitemap';
export async function GET(_request:Request,{params}:{params:Promise<{section:string}>}) {
  const {section}=await params;
  if(!sitemapSections.includes(section as SitemapSection)) return new Response('Not found',{status:404});
  return new Response(await sitemapXml(section as SitemapSection),{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
