import {type Page, sectionAnchor} from '@/lib/sitemap';
import type {PageContent} from '@/content/types';
import {TextSections} from '@/templates/shared';
import {ProductModels} from './ProductModels';
export function SectionTabs({page}:{page:Page}) {return page.sections?.length ? <nav className="container section-tabs" aria-label={`${page.label} sections`}>{page.sections.map(heading=><a href={`#${sectionAnchor(heading)}`} key={heading}>{heading}</a>)}</nav> : null;}
export function PageSections({page,content,models=true}:{page:Page;content:PageContent;models?:boolean}) {return <div className="stack">{page.sections?.map(heading=>{const sections=content.sections.filter(section=>section.heading===heading||section.heading.startsWith(`${heading} — `));return <section className="page-subsection" id={sectionAnchor(heading)} key={heading}><h3 className="type-h3">{heading}</h3>{sections.length ? <TextSections content={{...content,sections}} idPrefix={sectionAnchor(heading)}/> : <p>[Confirm {page.label}: {heading} content]</p>}{models&&page.template==='T3'&&<ProductModels page={page} section={heading}/>}</section>;})}</div>;}
export const ungroupedContent=(page:Page,content:PageContent):PageContent => ({...content,sections:content.sections.filter(section=>!page.sections?.some(heading=>section.heading===heading||section.heading.startsWith(`${heading} — `)))});
