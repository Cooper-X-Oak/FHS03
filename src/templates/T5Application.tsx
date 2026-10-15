import {PageSections, ungroupedContent} from '@/components/PageSections';
import { children, pageById, requiredLinks } from '@/lib/sitemap';
import { Breadcrumb, CaseCard } from '@/components/ContentComponents';
import { StickyQuoteBar } from '@/components/StickyQuoteBar';
import { Hero, Section, Cards, TextSections, CtaBand, type TemplateProps } from './shared';
export function T5Application({page, content}: TemplateProps) {
  const links = requiredLinks(page); const products = links.filter(p=>p.template==='T3');
  return <main id="main" data-stage={page.stage} data-template="T5" data-variant={page.variant}><Breadcrumb page={page}/><Hero page={page} content={content} quote/>
    {page.variant==='industry'&&<Section title="Processes to review" module="Industry: process list">{children(page).length ? <Cards pages={children(page)}/> : <p>Use the stages below to describe your process and the point where filtration is needed.</p>}</Section>}
    <Section title="Where filters sit in the process" module="Process stages diagram (where filters sit)"><p>Illustrative selection sequence. Your operating procedure and equipment requirements determine the final arrangement.</p><ol className="steps">{content.stages?.map(stage=><li key={stage.title}><h3 className="type-h3">{stage.title}</h3><p>{stage.description}</p>{stage.products.map(id=><p key={id}><a href={pageById(id).path}>{pageById(id).label}</a></p>)}</li>)}</ol></Section>
    <Section title="Products to compare at each stage" module="Products per stage (links to product landings)"><Cards pages={products}/><TextSections content={ungroupedContent(page,content)}/><PageSections page={page} content={content}/></Section>
    <Section title="Evidence from an operating process" module="Case with before / after numbers"><CaseCard/>{links.some(p=>p.id==='cases')&&<a href={pageById('cases').path}>Filtration case studies</a>}</Section>
    <Section title="Common mistakes to avoid" module="Common mistakes"><ul>{content.mistakes?.map(text=><li key={text}>{text}</li>)}</ul><div className="stack">{links.filter(p=>p.template!=='T3'&&p.id!=='quote'&&p.id!=='cases').map(p=><a href={p.path} key={p.id}>{p.label}</a>)}</div></Section>
    <CtaBand page={page} title="Ask us to review your process"/><StickyQuoteBar label={page.label} source={page.path} quotePath={pageById('quote').path} whatsapp={process.env.NEXT_PUBLIC_WHATSAPP}/>
  </main>;
}
