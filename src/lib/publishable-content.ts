import type {PageContent, SectionContent} from '../content/types';
import {copyViolations} from './copy-policy';

// Unconfirmed editorial fields stay in the CMS, but never become public claims.
export function visibleText(value:unknown):string {
  return typeof value==='string' && !/\[(?:confirm|pending|todo)\b[^\]]*\]/i.test(value) && copyViolations(value).length===0 ? value.trim() : '';
}
export function visibleSections(input:SectionContent[] = []):SectionContent[] {
  return input.map(section=>({...section, heading:visibleText(section.heading), paragraphs:(section.paragraphs||[]).map(visibleText).filter(Boolean), table:section.table?.rows?.length ? {...section.table, rows:section.table.rows.filter(row=>row.length && row.every(cell=>visibleText(cell)))} : undefined})).filter(section=>section.paragraphs.length || section.table?.rows.length);
}
export function publishableContent(content:PageContent):PageContent {
  return {...content, intro:visibleText(content.intro), description:visibleText(content.description), seoTitle:visibleText(content.seoTitle), request_hint:visibleText(content.request_hint), formPrompt:visibleText(content.formPrompt),
    sections:visibleSections(content.sections),
    moduleContent:Object.fromEntries(Object.entries(content.moduleContent||{}).filter(([,rows])=>Array.isArray(rows)).map(([key,rows])=>[key,visibleSections(rows)])),
    selection:content.selection?.map(visibleText).filter(Boolean), mistakes:content.mistakes?.map(visibleText).filter(Boolean),
    specs:content.specs?.filter(row=>visibleText(row.label)&&visibleText(row.value)).map(row=>({...row,note:visibleText(row.note)})),
    faq:content.faq?.filter(row=>visibleText(row.question)&&visibleText(row.answer)),
    gallery:content.gallery?.filter(item=>typeof item.image==='object'&&item.image.url).map(item=>({...item,caption:visibleText(item.caption)})),
    stages:content.stages?.filter(stage=>visibleText(stage.title)&&visibleText(stage.description)),
  };
}
