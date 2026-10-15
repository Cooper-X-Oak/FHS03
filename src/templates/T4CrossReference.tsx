import { pageById, requiredLinks } from '@/lib/sitemap';
import { Breadcrumb, CrossReferenceTable, FAQ } from '@/components/ContentComponents';
import { StickyQuoteBar } from '@/components/StickyQuoteBar';
import { Hero, Section, Cards, TextSections, CtaBand, type TemplateProps } from './shared';
export function T4CrossReference({page, content}: TemplateProps) {
  const links = requiredLinks(page);
  return <main id="main" data-stage={page.stage} data-template="T4" data-variant={page.variant}><Breadcrumb page={page}/><Hero page={page} content={content} partNumber/>
    {page.variant==='hub' ? <Section title="Start with the name on your filter" module="Hub: brand list"><Cards pages={links.filter(p=>p.template==='T4')}/><p>FHS is an independent supplier. Brand names identify the original filters only. Trademarks belong to their owners.</p></Section> : <Section title="Verified model lookup" module="Brand: product families we replace (+ verified models when available)"><CrossReferenceTable source={page.path} id={`${page.id}-lookup`}/></Section>}
    <Section title="How matching works" module="How matching works: part no. / photo → spec → quote"><ol className="steps"><li><h3 className="type-h3">Identify the exact model</h3><p>Send the full part number, including suffixes. Photograph the label and both ends if the code is unclear.</p></li><li><h3 className="type-h3">Compare the specification</h3><p>We review dimensions, media, seals, retention and operating limits against the process requirements.</p></li><li><h3 className="type-h3">Agree on evaluation</h3><p>Confirm any sample evaluation, fit check and acceptance criteria before switching the production line.</p></li></ol></Section>
    <Section title="What a match needs to establish" module="What we match and what we don't"><TextSections content={content}/></Section>
    <Section title="Find the relevant product family" module="Related product landings"><Cards pages={links.filter(p=>p.template!=='T4'&&p.id!=='quote')}/>{page.variant==='brand'&&<a href={pageById('replacement').path}>{pageById('replacement').label}</a>}</Section>
    <Section title="Before replacing a branded filter" module="FAQ"><FAQ entries={content.faq || []}/></Section><CtaBand page={page}/><StickyQuoteBar label={page.label} source={page.path} quotePath={pageById('quote').path} whatsapp={process.env.NEXT_PUBLIC_WHATSAPP}/>
  </main>;
}
