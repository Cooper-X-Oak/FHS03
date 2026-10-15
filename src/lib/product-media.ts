import fs from 'node:fs';
import path from 'node:path';
import { children, refId, sitemap, type Page } from './sitemap';

/** Reuse the owner-supplied navigation media; never manufacture product imagery. */
export function productMedia(page: Page): string | undefined {
  const cards = sitemap.site.navigation.header.flatMap(menu => menu.panels?.flatMap(panel => panel.cards) || []);
  const candidates = [page, ...children(page)];
  for (const candidate of candidates) {
    const image = cards.find(card => refId(card.page) === candidate.id && card.image)?.image;
    if (image && fs.existsSync(path.join(process.cwd(), 'public/assets', image))) return `/assets/${image}`;
  }
}
