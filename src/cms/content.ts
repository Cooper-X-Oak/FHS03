import { getPayload } from 'payload';
import config from '../payload.config';
import {publishableContent} from '../lib/publishable-content';
import type { PageContent } from '../content/types';
import { pages, allPages, currentPageId, handoffMap } from '../lib/sitemap';

export const cms = () => getPayload({ config });
export function encodeContent(content: PageContent) {
  return { ...content, sections: content.sections.map(section => ({ ...section, paragraphs: section.paragraphs.map(text => ({ text })) })), selection: content.selection?.map(text => ({ text })), mistakes: content.mistakes?.map(text => ({ text })) };
}
export type StoredContent = ReturnType<typeof encodeContent>;
export function decodeContent(content: StoredContent): PageContent {
  return { ...content, sections: (content.sections || []).map(section => ({ ...section, paragraphs: (section.paragraphs || []).map(item => item.text) })), selection: content.selection?.map(item => item.text), mistakes: content.mistakes?.map(item => item.text) };
}
export async function assertPageCoverage() {
  const payload = await cms();
  const result = await payload.find({ collection: 'pages', limit: 1000, depth: 0, locale: 'en', draft: false, overrideAccess: true });
  const active = result.docs.filter(doc => !handoffMap[doc.pageId] && !allPages.some(p => p.id === doc.pageId && p.stage === 'planned'));
  const actual = active.map(doc => currentPageId(String(doc.pageId)));
  const expected = pages.map(page => page.id);
  const missing = expected.filter(id => !actual.includes(id));
  const extra = actual.filter(id => !expected.includes(id));
  if (missing.length || extra.length || actual.length !== expected.length) throw new Error(`CMS/SITEMAP mismatch. Missing: ${missing.join(', ')}; extra: ${extra.join(', ')}`);
  return active;
}
export async function getPageContent(id: string, preview = false): Promise<PageContent> {
  const payload = await cms();
  const result = await payload.find({ collection: 'pages', where: { pageId: { equals: id } }, locale: 'en', fallbackLocale: false, draft: preview, limit: 1, depth: 1, overrideAccess: true });
  const doc = result.docs[0];
  if (!doc || (!preview && doc._status !== 'published')) throw new Error(`Missing published English CMS content: ${id}`);
  if (!doc.content) return {description:'',intro:'',sections:[]};
  const content = decodeContent(doc.content as StoredContent);
  return publishableContent({...content, stages: content.stages?.map(stage => ({...stage, products: [...new Set((stage.products||[]).map(currentPageId))]}))});
}
