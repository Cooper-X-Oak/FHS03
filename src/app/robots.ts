import type { MetadataRoute } from 'next';
import { sitemap } from '@/lib/sitemap';
export default function robots(): MetadataRoute.Robots {return {rules:{userAgent:'*',...(process.env.SITE_INDEXABLE === 'true' ? {allow:'/'} : {disallow:'/'})},sitemap:`${sitemap.site.domain}/sitemap.xml`};}
