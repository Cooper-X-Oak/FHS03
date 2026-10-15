import { contactDetails, approvedProof, approvedCertifications, approvedCases, verifiedReferences } from '@/cms/public-data';
import { isPublicPage, pages, type Page, ancestors, pageById, resolvePage, sitemap } from '@/lib/sitemap';
import { breadcrumbData, jsonLd } from '@/lib/structured-data';
import { PartNumberInput } from './PartNumberInput';
import { QuoteButton } from './QuoteButton';
import Image from 'next/image';
import { productMedia } from '@/lib/product-media';
import { en } from '@/locales/en';
export function StructuredData({data}: {data: unknown}) {return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd(data)}}/>;}
export function Breadcrumb({page}: {page: Page}) {
  if (page.id === 'home') return null;
  return <><nav className="container breadcrumb type-body-sm" aria-label="Breadcrumb"><ol>{[...ancestors(page), page].map(p => <li key={p.id}>{p.id === page.id || !isPublicPage(p) ? <span aria-current="page">{p.label}</span> : <a href={p.path}>{p.label}</a>}</li>)}</ol></nav><StructuredData data={breadcrumbData(page)}/></>;
}
export function SpecOptionsTable({rows, source}: {rows: {label: string; value: string; note?: string}[]; source: string}) {
  return <div className="stack"><div className="table-wrap" tabIndex={0} role="region" aria-label="Specification options"><table><caption className="sr-only">Specification options to confirm for your order</caption><thead><tr><th scope="col">Option</th><th scope="col">Specification</th><th scope="col">Selection note</th></tr></thead><tbody>{rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td className="mono">{row.value}</td><td>{row.note}</td></tr>)}</tbody></table></div><div><QuoteButton source={source} quotePath={pageById('quote').path} label="Configure and quote"/></div></div>;
}
export type VerifiedRow = {brand: string; partNumber: string; equivalent: string; spec: string; checkedAt: string; verified: true};
export async function CrossReferenceTable({rows, source, id}: {rows?: VerifiedRow[]; source: string; id: string}) {
  if (!rows) { const page = pages.find(page => page.path === source); rows = page ? (await verifiedReferences(page.id)).map(row => ({brand:row.brand,partNumber:row.partNumber,equivalent:row.equivalent,spec:row.spec,checkedAt:row.checkedAt,verified:true})) : []; }
  const verified = rows.filter(row => row.verified && row.checkedAt);
  return <div className="stack">{verified.length ? <div className="table-wrap" tabIndex={0} role="region" aria-label="Verified equivalents"><table><caption className="sr-only">Verified filter cross references</caption><thead><tr>{['Brand','Their part number','FHS equivalent','Key specification','Status'].map(t => <th scope="col" key={t}>{t}</th>)}</tr></thead><tbody>{verified.map(row => <tr key={row.brand + row.partNumber}><td>{row.brand}</td><td className="mono">{row.partNumber}</td><td className="mono">{row.equivalent}</td><td className="mono">{row.spec}</td><td><span className="verified-tag">Verified</span><br/><time className="type-data-sm" dateTime={row.checkedAt}>{row.checkedAt}</time></td></tr>)}</tbody></table></div> : <div className="empty-state"><h3 className="type-h3">Have a part number? Start here.</h3><p>There are no published verified matches yet. Send the full part number and operating conditions. We will compare dimensions, materials and performance requirements before proposing an equivalent.</p><PartNumberInput source={source} quotePath={pageById('quote').path} id={id}/></div>}<p className="caption">Trademarks belong to their owners.</p></div>;
}
export async function ProofStrip({metrics}: {metrics?: {value: string; label: string}[]}) {
  metrics ??= (await approvedProof()).map(item => ({value:item.value,label:item.label}));
  if (!metrics.length) return null;
  return <div className="proof-strip">{metrics.map(metric => <div key={metric.label}><strong className="type-h1 mono">{metric.value}</strong><span>{metric.label}</span></div>)}</div>;
}
export async function CaseCard({title, industry, before, after, country, href}: {title?: string; industry?: string; before?: string; after?: string; country?: string; href?: string}) {
  if (!title) { const item = (await approvedCases())[0]; if (item) { title=item.title;industry=item.industry || undefined;before=item.before || undefined;after=item.after || undefined;country=item.country || undefined; } }
  if (!title) return null;
  return <article className="card"><span className="type-label-caps">{industry || 'Customer evidence'}</span><h3 className="type-h3">{title || '[Confirm approved customer case]'}</h3>{before && after && <p className="mono">{before} → {after}</p>}{country && <p>{country}</p>}{href && <a href={href}>Read the case</a>}</article>;
}
export async function CertificationBadge({name, href}: {name?: string; href?: string}) {
  if (!name) { const item=(await approvedCertifications())[0]; if(item && typeof item.certificate==='object' && item.certificate.url) {name=item.name;href=item.certificate.url;} }
  return name && href ? <a className="certification-badge type-label-caps" href={href}>{name}</a> : null;
}
export function ProductCard({page, description, spec}: {page: Page; description?: string; spec?: string}) {
  const image = productMedia(page);
  return <article className="card product-card">{image && <a href={page.path} className="product-media" tabIndex={-1} aria-hidden="true"><Image src={image} alt="" width={480} height={360}/></a>}<h3 className="type-h3"><a href={page.path}>{page.label}</a></h3>{spec && <p className="type-data-sm">{spec}</p>}{description && <p className="type-body-sm">{description}</p>}<a className="card-link" href={page.path}>{en.landing.groupLink}<span aria-hidden="true">↗</span></a></article>;
}
export function ApplicationCard({page, description}: {page: Page; description?: string}) {
  return <article className="card application-card"><h3 className="type-h3"><a href={page.path}>{page.label}</a></h3>{description && <p>{description}</p>}<a href={page.path}>See the process <span aria-hidden="true">→</span></a></article>;
}
export type FaqEntry = {question: string; answer: string};
export function FAQ({entries}: {entries: FaqEntry[]}) {
  return <div className="faq">{entries.map(entry => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}<StructuredData data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:entries.map(e => ({'@type':'Question',name:e.question,acceptedAnswer:{'@type':'Answer',text:e.answer}}))}}/></div>;
}
export async function SiteFooter({source}: {source: string}) {
  const contact = await contactDetails();
  const links = sitemap.site.navigation.footer.map(resolvePage).filter(isPublicPage);
  const groups = [links.filter(p => p.path.startsWith('/products/')), links.filter(p => !p.path.startsWith('/products/') && !['privacy','terms','quote'].includes(p.id)), links.filter(p => ['privacy','terms','quote'].includes(p.id))];
  return <footer className="site-footer" data-theme="dark"><div className="container footer-grid">{groups.map((group, i) => <div key={i}><h2 className="type-h4">{['Products','Explore FHS','Information'][i]}</h2><ul>{group.map(p => <li key={p.id}>{p.id === 'quote' ? <QuoteButton source={source} quotePath={p.path} label={p.label} compact/> : <a href={p.path}>{p.label}</a>}</li>)}</ul></div>)}<div><h2 className="type-h4">Contact</h2><p className="mono">{contact.salesEmail || process.env.NEXT_PUBLIC_SALES_EMAIL || '[Confirm sales email]'}</p><p>WhatsApp: <span className="mono">{contact.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP || '[Confirm WhatsApp number]'}</span></p><p className="type-body-sm">Send a part number, a photo or a short description. A person replies within <span className="mono">24 hours</span>.</p></div></div><div className="container footer-note type-body-sm">{contact.companySummary}</div></footer>;
}
