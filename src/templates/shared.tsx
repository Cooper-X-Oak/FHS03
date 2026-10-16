import {SectionTabs} from '@/components/PageSections';
import type { ReactNode } from 'react';
import { isPublicPage, pageById, sitemap, type Page } from '@/lib/sitemap';
import type { PageContent } from '@/content/types';
import { PartNumberInput } from '@/components/PartNumberInput';
import { QuoteButton } from '@/components/QuoteButton';
import { ApplicationCard, ProductCard } from '@/components/ContentComponents';
import Image from 'next/image';
import { productMedia } from '@/lib/product-media';
import { en } from '@/locales/en';
export type TemplateProps = {page: Page; content: PageContent; previewFixture?: boolean};
export function Section({title, children, id, module, layout = 'default', empty = false}: {title: string; children: ReactNode; id?: string; module?: string; layout?: 'default'|'split'|'quiet'|'range'; empty?: boolean}) {if (empty) return null; return <section className={`section section-${layout}`} id={id} data-theme={module === 'CTA band' || module === 'CTA: send what you use now' ? 'dark' : undefined} data-module={module}><div className="container section-frame">{title && <div className="section-heading"><h2 className="type-h2">{title}</h2></div>}<div className="section-content">{children}</div></div></section>;}
export function Hero({page, content, partNumber = false, quote = false}: TemplateProps & {partNumber?: boolean; quote?: boolean}) {
  if (page.template === 'T3') {
    const image=productMedia(page);
    return <><section className="hero product-group-hero" data-theme="dark" data-hero data-module={sitemap.templates.T3.modules[0]}><div className={`container product-group-hero-grid${image ? '' : ' without-media'}`}><div className="hero-copy"><p className="group-label type-label-caps">{page.label}</p><h1 className="type-display">{page.h1}</h1><p className="intro type-body-lg">{content.intro}</p><div className="hero-actions"><QuoteButton source={page.path} quotePath={pageById('quote').path} label={en.landing.request}/><a href="#supply" className="text-action">{en.landing.supply}<span aria-hidden="true">↓</span></a></div><p className="hero-help type-body-sm">{en.landing.photo}</p></div>{image&&<div className="group-hero-media"><Image src={image} alt={page.label} width={720} height={600} priority/><span className="type-label-caps">{page.label}</span></div>}</div></section><SectionTabs page={page}/></>;
  }
  return <><section className={page.template === 'T1' ? 'hero home-hero' : 'hero'} data-theme="dark" data-hero data-module={page.template === 'T9' ? undefined : sitemap.templates[page.template].modules[0]}><div className={page.template === 'T1' ? 'container home-hero-grid' : 'container'}><div className="hero-copy"><p className="eyebrow type-label-caps">FHS Filtration / {page.label}</p><h1 className="type-display">{page.h1}</h1><p className="intro type-body-lg">{content.intro}</p>{page.template === 'T1' && <a className="text-action home-browse" href={pageById('products').path}>{en.landing.browse}<span aria-hidden="true">↗</span></a>}{partNumber && <PartNumberInput source={page.path} quotePath={pageById('quote').path} id={`${page.id}-hero-part`}/>} {quote && <QuoteButton source={page.path} quotePath={pageById('quote').path}/>}</div>{page.template === 'T1' && <svg className="filtration-drawing" viewBox="0 0 480 240" role="img" aria-label="Water flowing through a filter cartridge, bag and housing; conceptual filtration illustration">
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 120H58M134 120H196M264 120H332M418 120H470"/>
      <path d="m43 114 10 6-10 6m131-12 10 6-10 6m140-12 10 6-10 6m138-12 10 6-10 6"/>
      <ellipse cx="96" cy="54" rx="30" ry="9"/><path d="M66 54v125c0 12 60 12 60 0V54M76 63v114m10-112v114m10-113v115m10-116v114m10-116v112"/>
      <ellipse cx="230" cy="60" rx="31" ry="7"/><path d="M199 60v93c0 40 62 40 62 0V60m-52 17 42 78m-42-51 30 57m-18-84 30 56m-42 0 30-56m-30 82 42-78m-30 81 30-57"/>
      <path d="M341 58h70v118h-70zM336 53h80v8h-80zM354 53V38h44v15M375 38V25m-9 0h18M354 176v21m44-21v21M330 106h11m70 0h15m-51 70v18"/>
      <path d="M20 214h440M96 199v19m134-19v19m145-14v14" strokeDasharray="3 5"/>
    </g>
    <g fill="currentColor" className="drawing-labels"><text x="96" y="234" textAnchor="middle">Cartridge</text><text x="230" y="234" textAnchor="middle">Bag</text><text x="375" y="234" textAnchor="middle">Housing</text></g>
  </svg>}</div></section><SectionTabs page={page}/></>;
}
export function Cards({pages}: {pages: Page[]}) {return <div className="card-grid">{pages.filter(isPublicPage).map(p => p.template === 'T5' ? <ApplicationCard key={p.id} page={p}/> : p.template === 'T3' ? <ProductCard key={p.id} page={p}/> : <article className="card" key={p.id}><h3 className="type-h3"><a href={p.path}>{p.label}</a></h3><p>{p.h1}</p><a href={p.path}>Explore {p.label.toLowerCase()} <span aria-hidden="true">→</span></a></article>)}</div>;}
export function TextSections({content, idPrefix='section'}: {content: PageContent; idPrefix?: string}) {return <div className="article-body stack">{content.sections.map((s, i) => <section id={`${idPrefix}-${i}`} key={s.heading}><h3 className="type-h3">{s.heading}</h3>{s.paragraphs.map(p => <p key={p}>{p}</p>)}{s.table && <div className="table-wrap" tabIndex={0} role="region" aria-label={s.heading}><table><thead><tr>{s.table.headings.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{s.table.rows.map((row, n) => <tr key={n}>{row.map((cell, c) => c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>)}</tr>)}</tbody></table></div>}</section>)}</div>;}
export function CtaBand({page, title = en.landing.ctaTitle}: {page: Page; title?: string}) {return <Section title={title} layout="split" module={page.template === 'T5' ? 'CTA: send what you use now' : 'CTA band'}><p className="type-body-lg">{en.landing.ctaBody}</p><QuoteButton source={page.path} quotePath={pageById('quote').path}/></Section>;}
