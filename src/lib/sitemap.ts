import handoff from './handoff-map.json';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

export type TemplateId = 'T1'|'T2'|'T3'|'T4'|'T5'|'T6'|'T7'|'T8'|'T9'|'T10';
export type Page = {
  page_id?: string; index_status?: 'index'|'noindex'|'not_built'; launch_batch?: string; is_live?: boolean; main_keyword?: string;
  id: string; path: string; indexable?: boolean; deferred?: boolean; parent?: string; type: string; template: TemplateId;
  variant?: string; stage: 'full'|'skeleton'|'planned'; sections?: string[]; cluster: string|null; label: string; title: string; h1: string;
  status: 'planned'|'draft'|'live'|'redirect'; priority: 'p0'|'p1'|'p2'; linksTo: string[];
};
type NavColumn = {page?: string; label?: string; items: string[]};
type NavMenu = {page: string; columns?: NavColumn[]; groups?: NavColumn[]; items?: string[]; panels?: {page: string; cards: {page: string; section?: string; blurb?: string; image?: string}[]}[]; secondary?: string[]; shortcuts?: string[]};
type Sitemap = {
  site: {domain: string; locales: string[]; plannedLocales: string[]; navigation: {header: NavMenu[]; cta: string; footer: string[]}};
  collections: Record<string, {path: string; parent: string; template: TemplateId; variant?: string; type: string}>;
  pages: Record<string, Omit<Page, 'id'>>;
  templates: Record<TemplateId, {name: string; modules: string[]; variants?: string[]}>;
  clusters: Record<string, {primary: string; keywords: string[]}>;
  pageTypes: Record<string, {schema: string; indexable: boolean; linksToPages?: string[]}>;
};
const source = fs.readFileSync(path.join(process.cwd(), 'SITEMAP.md'), 'utf8');
const front = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!front) throw new Error('SITEMAP.md front matter is missing');
export const sitemap = load(front[1]) as Sitemap;
export const allPages: Page[] = Object.entries(sitemap.pages).map(([id, page]) => ({...page, id}));
export const pages = allPages.filter(page => page.stage !== 'planned');
export const isPublicPage = (page: Page) => page.is_live === true && page.stage !== 'planned' && page.index_status !== 'not_built';
export const publicPages = pages.filter(isPublicPage);
// A page restored by the current sitemap is no longer an archived section.
export const handoffMap: Record<string, {page: string; section: string}> = Object.fromEntries(
  Object.entries(handoff).filter(([id]) => !allPages.some(page => page.id === id)),
);
export const currentPageId = (id: string) => id === '3m-cuno' ? '3m' : handoffMap[id]?.page || id;
export const sectionAnchor = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function refId(ref: string): string {
  const match = ref.match(/^\{(?:pages|clusters)\.([^}]+)\}$/);
  if (!match) throw new Error(`Invalid sitemap reference: ${ref}`);
  return match[1];
}
export function pageById(id: string): Page {
  const page = allPages.find(p => p.id === currentPageId(id));
  if (!page) throw new Error(`Unknown page ${id}`);
  return page;
}
export function resolvePage(ref: string) { return pageById(refId(ref)); }
export function ancestors(page: Page): Page[] {
  const chain: Page[] = []; const seen = new Set([page.id]); let cursor = page;
  while (cursor.parent) {
    cursor = resolvePage(cursor.parent);
    if (seen.has(cursor.id)) throw new Error('Sitemap parent cycle');
    seen.add(cursor.id); chain.unshift(cursor);
  }
  return chain;
}
export function keyword(page: Page) { return page.cluster ? sitemap.clusters[refId(page.cluster)].primary : page.label; }
export function children(page: Page) { return publicPages.filter(p => p.parent === `{pages.${page.id}}`); }
export function requiredLinks(page: Page) {
  return [...new Set([...page.linksTo, ...(sitemap.pageTypes[page.type].linksToPages || [])])].map(resolvePage).filter(p => isPublicPage(p) && (page.index_status !== 'index' || p.index_status === 'index'));
}

export function templateModules(page: Page) {
  return sitemap.templates[page.template].modules.filter(module => {
    if (module.startsWith('About:')) return page.id === 'about';
    if (module.startsWith('Legal:')) return page.type === 'utility';
    const conditional = module.match(/^(Category|Product|Hub|Brand|Industry|Quote|Catalog|Item):/);
    return !conditional || conditional[1].toLowerCase() === page.variant;
  });
}
