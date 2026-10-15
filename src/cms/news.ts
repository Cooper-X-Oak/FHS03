import {catalogSlug,findModel} from './catalog';
import type { Page } from '../lib/sitemap';
import { isPublicPage, sitemap, pageById } from '../lib/sitemap';
import { cms, decodeContent, type StoredContent } from './content';
import type { News } from '../payload-types';

export function newsPath(slug: string) { return sitemap.collections['news-items'].path.replace('{slug}', slug); }
export function newsSlug(path: string) {
  const [prefix, suffix] = sitemap.collections['news-items'].path.split('{slug}');
  if (!path.startsWith(prefix) || !path.endsWith(suffix)) return null;
  const slug = path.slice(prefix.length, suffix ? -suffix.length : undefined);
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;
}
export async function publishedNews() {
  if (!isPublicPage(pageById("news"))) return [];
  return (await (await cms()).find({ collection: 'news', locale: 'en', fallbackLocale: false, draft: false, where: { and: [{ _status: { equals: 'published' } }, { translationComplete: { equals: true } }] }, pagination: false, depth: 0, sort: '-date', overrideAccess: true })).docs;
}
export async function findNews(slug: string) {
  if (!isPublicPage(pageById("news"))) return undefined;
  const result = await (await cms()).find({ collection: 'news', locale: 'en', fallbackLocale: false, draft: false, where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }, { translationComplete: { equals: true } }] }, limit: 1, depth: 0, overrideAccess: true });
  return result.docs[0];
}
export function newsPage(doc: News): Page {
  const collection = sitemap.collections['news-items'];
  return { id: `news:${doc.slug}`, path: newsPath(doc.slug), parent: collection.parent, type: collection.type, template: collection.template, stage: 'full', cluster: null, label: doc.title, title: `${doc.title} | FHS Filtration`, h1: doc.title, priority: 'p2', status: 'live', linksTo: [...(doc.relatedPages || []).map(id => `{pages.${pageById(id).id}}`), '{pages.quote}'] };
}
export function newsContent(doc: News) { return decodeContent(doc.content as StoredContent); }
export async function plannedSource(path: string) {
  if (Object.values(sitemap.pages).some(page => page.path === path && page.stage !== 'planned')) return true;
  const model=catalogSlug(path);if(model) return Boolean(await findModel(model));
  const slug = newsSlug(path);
  return Boolean(slug && await findNews(slug));
}
