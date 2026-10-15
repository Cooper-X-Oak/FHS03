/** Synchronize structural metadata only. Editorial content is never seeded here. */
import {cms} from './content';
import {pages, currentPageId, handoffMap, templateModules} from '../lib/sitemap';
import type {Page as CmsPage} from '../payload-types';
type StageProduct = NonNullable<NonNullable<NonNullable<CmsPage['content']>['stages']>[number]['products']>[number];

export async function syncStructure() {
  const payload = await cms();
  const existing = await payload.find({collection:'pages', pagination:false, depth:0, draft:true, overrideAccess:true});
  let created = 0; let updated = 0;
  for (const page of pages) {
    const matches = existing.docs.filter(doc => !handoffMap[doc.pageId] && currentPageId(doc.pageId) === page.id);
    if (matches.length > 1) throw new Error(`Duplicate CMS structure: ${page.id}`);
    const data = {pageId:page.id as CmsPage['pageId'], path:page.path, title:page.title, h1:page.h1, template:page.template, stage:page.stage, index_status:page.index_status, launch_batch:page.launch_batch, main_keyword:page.main_keyword, is_live:page.is_live, modules:templateModules(page).map(name=>({name}))};
    if (matches[0]) {
      const content = matches[0].content;
      const normalized = content ? {...content, stages:content.stages?.map(stage=>({...stage, products:stage.products?.map(id=>currentPageId(id) as StageProduct)}))} : undefined;
      await payload.update({collection:'pages', id:matches[0].id, data:{...data, ...(normalized ? {content:normalized} : {})}, draft:matches[0]._status !== 'published', overrideAccess:true, context:{skipRevalidation:true}});
      updated++;
    } else {
      await payload.create({collection:'pages', data:{...data, _status:'draft'}, draft:true, overrideAccess:true, context:{skipRevalidation:true}});
      created++;
    }
  }
  return {created,updated};
}
