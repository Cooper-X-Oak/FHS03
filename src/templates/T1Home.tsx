import { pageById, requiredLinks, sitemap, resolvePage } from '@/lib/sitemap';
import { ProofStrip, StructuredData } from '@/components/ContentComponents';
import { en } from '@/locales/en';
import { Hero, Section, Cards, CtaBand, TextSections, type TemplateProps } from './shared';

export function T1Home({page, content}: TemplateProps) {
  const copy=en.landing;
  const productMenu=sitemap.site.navigation.header.find(menu=>resolvePage(menu.page).id==='products');
  const groups=(productMenu?.panels || []).map(panel=>resolvePage(panel.page)).filter(p=>!p.deferred);
  return <main id="main" className="home-landing" data-stage={page.stage} data-template="T1" data-variant="">
    <Hero page={page} content={content} partNumber/>
    <Section title={copy.industries} module="Industry entry buttons above the fold"><div className="industry-entries">{['food-beverage','water','electroplating','chemical'].map(id=>{const target=pageById(id);return <a key={id} href={target.path}>{target.label}<span aria-hidden="true">↗</span></a>;})}</div></Section>
    <Section title={copy.range} layout="range" module="Product group landing entries"><p className="section-intro">{copy.rangeIntro}</p><Cards pages={groups}/></Section>
    <Section title={copy.ways} layout="split" module="Three ways in: products · replacement · applications">
      <div className="intent-list">{['products','replacement','applications'].map((id,i)=>{const target=pageById(id);return <a href={target.path} key={id}><div><h3 className="type-h3">{target.label}</h3><p>{copy.routes[i]}</p></div><span aria-hidden="true">↗</span></a>;})}</div>
      <TextSections content={content}/>
    </Section>
    <Section title={copy.customers} layout="quiet" module="Customer types"><Cards pages={requiredLinks(page).filter(p=>p.template==='T6')}/></Section>
    <Section title={copy.process} layout="split" module="How your request is handled"><ol className="selection-steps">{copy.steps.map(step=><li key={step.title}><h3 className="type-h3">{step.title}</h3><p>{step.body}</p></li>)}</ol><ProofStrip/></Section>
    <CtaBand page={page}/>
    <div className="container more-links">{requiredLinks(page).filter(p=>['T2','T8','T10'].includes(p.template)).map(p=><a href={p.path} key={p.id}>{p.label}</a>)}</div>
    <StructuredData data={{'@context':'https://schema.org','@type':'Organization',name:'FHS Filtration',url:sitemap.site.domain,logo:sitemap.site.domain+'/assets/logo/fhs-logo.png'}}/>
  </main>;
}
