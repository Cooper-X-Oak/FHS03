import {sitemapIndexXml} from '@/lib/seo-sitemap';
export function GET() {return new Response(sitemapIndexXml(),{headers:{'Content-Type':'application/xml; charset=utf-8'}});}
