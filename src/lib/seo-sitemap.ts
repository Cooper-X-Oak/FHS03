import {publicPages, sitemap} from './sitemap';
import {getPageContent} from '../cms/content';
import {catalogModels, catalogPath, modelIndexable} from '../cms/catalog';
import {publishedNews, newsPath} from '../cms/news';

export const sitemapSections = ['products','applications','replacement','knowledge','company'] as const;
export type SitemapSection = typeof sitemapSections[number];
export const xmlEscape = (value:string) => value.replace(/[<>&"']/g, c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export function sectionFor(path:string):SitemapSection {
  return sitemapSections.find(s=>s !== 'company' && path.startsWith(`/${s}/`)) || 'company';
}
export async function sitemapXml(section:SitemapSection) {
  const entries:{url:string; images:string[]}[] = [];
  for (const page of publicPages.filter(p=>p.index_status==='index' && sectionFor(p.path)===section)) {
    const content = await getPageContent(page.id);
    entries.push({url:sitemap.site.domain+page.path, images:(content.gallery||[]).flatMap(item=>typeof item.image==='object' && item.image.url ? [new URL(item.image.url,sitemap.site.domain).href] : [])});
  }
  if (section==='products') for(const doc of (await catalogModels()).filter(modelIndexable)) entries.push({url:sitemap.site.domain+catalogPath(doc.slug!),images:(doc.images||[]).flatMap(image=>typeof image==='object'&&image.url?[new URL(image.url,sitemap.site.domain).href]:[])});
  if (section===sectionFor(newsPath('example'))) for(const doc of await publishedNews()) entries.push({url:sitemap.site.domain+newsPath(doc.slug),images:[]});
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries.map(e=>`<url><loc>${xmlEscape(e.url)}</loc>${e.images.map(url=>`<image:image><image:loc>${xmlEscape(url)}</image:loc></image:image>`).join('')}</url>`).join('')}</urlset>`;
}
export function sitemapIndexXml() {
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapSections.map(s=>`<sitemap><loc>${xmlEscape(sitemap.site.domain)}/sitemaps/${s}/</loc></sitemap>`).join('')}</sitemapindex>`;
}
