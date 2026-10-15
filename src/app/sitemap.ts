import {catalogModels,catalogPath,modelIndexable} from '@/cms/catalog';
import type { MetadataRoute } from 'next';
import { publishedNews, newsPath } from '@/cms/news';
import { pages, sitemap as map } from '@/lib/sitemap';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {return [...(await catalogModels()).filter(modelIndexable).map(doc=>({url:map.site.domain+catalogPath(doc.slug!)})), ...(await publishedNews()).map(doc=>({url:map.site.domain+newsPath(doc.slug)})), ...pages.filter(p => p.status === 'live' && (p.indexable ?? map.pageTypes[p.type].indexable)).map(p => ({url:map.site.domain+p.path}))];}
