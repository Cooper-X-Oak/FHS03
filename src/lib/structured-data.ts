import { ancestors, sitemap, type Page } from './sitemap';
export function breadcrumbData(page: Page) {
  return {'@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [...ancestors(page), page].map((p, i) => ({'@type': 'ListItem', position: i + 1, name: p.label, item: sitemap.site.domain + p.path}))};
}
export function jsonLd(data: unknown) { return JSON.stringify(data).replace(/</g, '\\u003c'); }
