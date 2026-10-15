import { children, pageById, requiredLinks } from '@/lib/sitemap';
import { Breadcrumb, ProofStrip } from '@/components/ContentComponents';
import { PartNumberInput } from '@/components/PartNumberInput';
import { en } from '@/locales/en';
import { Hero, Section, Cards, TextSections, CtaBand, type TemplateProps } from './shared';
export function T2SectionHub({page, content}: TemplateProps) {
  const childIds=new Set(children(page).map(p=>p.id));
  return <main id="main" className="section-hub" data-stage={page.stage} data-template="T2" data-variant="">
    <Breadcrumb page={page}/><Hero page={page} content={content} quote/>
    <Section title={page.id==='products' ? en.landing.range : en.landing.hubExplore} layout="range" module="Child page cards"><Cards pages={children(page)}/><TextSections content={content}/></Section>
    <Section title={en.landing.replacementTitle} layout="split" module="Finder shortcut (catalog / part number)"><PartNumberInput source={page.path} quotePath={pageById('quote').path} id={page.id+'-finder'}/><div className="related-links">{requiredLinks(page).filter(p=>!childIds.has(p.id)&&p.id!=='quote').map(p=><a href={p.path} key={p.id}>{p.label}<span aria-hidden="true">↗</span></a>)}</div></Section>
    <Section title={en.landing.evidence} layout="quiet" module="Proof strip"><ProofStrip/></Section><CtaBand page={page}/>
  </main>;
}
