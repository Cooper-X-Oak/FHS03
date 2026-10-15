import { PageSections, ungroupedContent } from '@/components/PageSections';
import { children, requiredLinks, sitemap, pageById } from '@/lib/sitemap';
import { Breadcrumb, CrossReferenceTable, FAQ, ProofStrip, SpecOptionsTable, StructuredData } from '@/components/ContentComponents';
import { StickyQuoteBar } from '@/components/StickyQuoteBar';
import { QuoteButton } from '@/components/QuoteButton';
import { en } from '@/locales/en';
import { Hero, Section, Cards, TextSections, CtaBand, type TemplateProps } from './shared';

export function T3ProductLanding({page, content}: TemplateProps) {
  const links = requiredLinks(page);
  const copy = en.landing;
  const body = ungroupedContent(page,content);
  const related = links.filter(p => !['T4','T5','T9'].includes(p.template));
  return <main id="main" className="product-landing" data-stage={page.stage} data-template="T3" data-variant={page.variant}>
    <Breadcrumb page={page}/><Hero page={page} content={content}/>
    <Section title={copy.supply} id="supply" layout={page.variant==='category' ? 'range' : 'split'} module={page.variant==='category' ? 'Category: product group entry cards' : 'Product: supply scope and available options'}>
      {page.variant==='category' && <Cards pages={children(page)}/>}
      <TextSections content={body}/>
    </Section>
    <Section title={copy.types} empty={!page.sections?.length} layout="split" module="Product sub-types from page sections">
      <PageSections page={page} content={content} models={false}/>
    </Section>
    <Section title={copy.selection} layout="split" module="Selection guidance and available specifications">
      <p className="type-body-lg">{copy.selectionIntro}</p>
      {content.selection?.length ? <ol className="selection-steps">{content.selection.map(step=><li key={step}>{step}</li>)}</ol> : null}
      {!!content.specs?.length && <details className="spec-disclosure"><summary>{copy.options}</summary><SpecOptionsTable source={page.path} rows={content.specs}/></details>}
      <a className="text-action" href={pageById('catalog').path}>{copy.catalog}<span aria-hidden="true">↗</span></a>
    </Section>
    <Section title={copy.replacement} layout="split" module="Replacement enquiry with verified references">
      <CrossReferenceTable source={page.path} id={page.id+'-cross-part'}/>
      <div className="related-links">{links.filter(p=>p.template==='T4').map(p=><a href={p.path} key={p.id}>{p.label}<span aria-hidden="true">↗</span></a>)}</div>
    </Section>
    <Section title={copy.applications} layout="quiet" module="Application links">
      <div className="related-links">{links.filter(p=>p.template==='T5').map(p=><a href={p.path} key={p.id}>{p.label}<span aria-hidden="true">↗</span></a>)}<a href={pageById('applications').path}>{pageById('applications').label}<span aria-hidden="true">↗</span></a></div>
    </Section>
    <Section title={copy.evidence} layout="split" module="Enquiry support">
      <ProofStrip/><p>{copy.photo}</p><QuoteButton source={page.path} quotePath={pageById('quote').path}/>
    </Section>
    <Section title={copy.faq} empty={!content.faq?.length} layout="split" module="Purchasing questions"><FAQ entries={content.faq || []}/></Section>
    <Section title={copy.related} empty={!related.length} layout="range" module="Related product groups and guides"><Cards pages={related}/></Section>
    <CtaBand page={page}/>
    <StickyQuoteBar module="Sticky quote + WhatsApp" label={page.label} source={page.path} quotePath={pageById('quote').path} whatsapp={process.env.NEXT_PUBLIC_WHATSAPP}/>
    {page.type==='product' && <StructuredData data={{'@context':'https://schema.org','@type':'ProductGroup',name:page.h1,description:content.description,url:sitemap.site.domain+page.path,brand:{'@type':'Brand',name:'FHS Filtration'},productGroupID:page.id}}/>}
  </main>;
}
