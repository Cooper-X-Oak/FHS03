import { notFound } from 'next/navigation';
import { pageById } from '@/lib/sitemap';
import { SiteShell } from '@/components/SiteShell';
import { PartNumberInput } from '@/components/PartNumberInput';
import { QuoteButton } from '@/components/QuoteButton';
import { StickyQuoteBar } from '@/components/StickyQuoteBar';
import { ApplicationCard, Breadcrumb, CaseCard, CertificationBadge, CrossReferenceTable, FAQ, ProductCard, ProofStrip, SpecOptionsTable } from '@/components/ContentComponents';
export default function Gallery() {
  if (process.env.NODE_ENV !== 'development') notFound();
  const page = pageById('ptfe'); const quote = pageById('quote');
  return <SiteShell page={page}><main id="main"><h1 className="container type-h1">FHS component gallery</h1>{(['light','dark'] as const).map(theme => <section key={theme} className="gallery-theme" data-theme={theme}><div className="container stack"><h2 className="type-h2">{theme} theme</h2><Breadcrumb page={page}/><div data-hero><QuoteButton source={page.path} quotePath={quote.path}/><PartNumberInput source={page.path} quotePath={quote.path} id={`gallery-${theme}`}/></div><div className="card-grid"><ProductCard page={page}/><ApplicationCard page={pageById('water')}/><CaseCard/></div><CertificationBadge/><ProofStrip/><SpecOptionsTable source={page.path} rows={[{label:'Media',value:'[Confirm material]'}]}/><CrossReferenceTable source={page.path} id={`gallery-cross-${theme}`}/><FAQ entries={[{question:'When will someone reply?',answer:'Within 24 hours.'}]}/></div></section>)}<StickyQuoteBar source={page.path} quotePath={quote.path} label={page.label}/></main></SiteShell>;
}
