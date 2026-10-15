import {catalogModels,findModel,catalogSlug,catalogPath} from '@/cms/catalog';
import {ModelCard} from '@/components/ModelCard';
import {SpecOptionsTable, StructuredData} from '@/components/ContentComponents';
import { Breadcrumb } from '@/components/ContentComponents';
import { QuoteContacts } from '@/components/QuoteContacts';
import { QuoteForm } from '@/components/QuoteForm';
import { pageById, pages, ancestors, sitemap } from '@/lib/sitemap';
import { CatalogFinder } from '@/components/CatalogFinder';
import { PartNumberInput } from '@/components/PartNumberInput';
import { Hero, Section, type TemplateProps } from './shared';
import { productMedia } from '@/lib/product-media';
import { en } from '@/locales/en';
export async function T9Tool({page, content}: TemplateProps) {
  if(page.variant === 'item') {const model=await findModel(catalogSlug(page.path)!);if(!model) throw new Error('Missing catalogue model');return <main id="main" data-stage={page.stage} data-template="T9" data-variant="item"><Breadcrumb page={page}/><Hero page={page} content={content}/><Section title="Model specifications" module="Item: one catalog card (model, spec, photo, fits, replaces) + quote with the model prefilled"><ModelCard model={model} source={page.path}/><SpecOptionsTable rows={content.specs||[]} source={page.path}/><p><a href={pageById(model.pageId).path}>Explore {pageById(model.pageId).label}</a></p></Section><StructuredData data={{'@context':'https://schema.org','@type':'ProductGroup',name:page.h1,description:content.description,url:sitemap.site.domain+page.path,productGroupID:model.model,brand:{'@type':'Brand',name:'FHS Filtration'}}}/></main>;}
  const models=page.variant==='catalog' ? await catalogModels() : [];
  if (page.variant === 'catalog') return <main id="main" className="catalog-page" data-stage={page.stage} data-template="T9" data-variant="catalog"><Breadcrumb page={page}/><Hero page={page} content={content}/><Section title={en.catalog.title} module="Catalog: product cards with enquiry selection; no result turns into a quote request"><p className="section-intro">{en.catalog.intro}</p><CatalogFinder source={page.path} quotePath={pageById('quote').path} items={[...models.map(model=>{
    const photo=model.images?.find(image=>typeof image==='object'&&image.url);
    return {id:`model:${model.id}`,label:model.model,path:catalogPath(model.slug!),family:pageById(model.pageId).label,summary:model.name,image:photo&&typeof photo==='object' ? photo.url || undefined : undefined};
  }), ...pages.filter(p=>p.template==='T3' && !p.deferred).map(p=>({id:p.id,label:p.label,path:p.path,family:ancestors(p).find(a=>a.template==='T3')?.label || p.label,summary:p.h1,image:productMedia(p)}))]}/><div className="catalog-help"><PartNumberInput source={page.path} quotePath={pageById('quote').path} id="catalog-part"/><p><a href={pageById('replacement').path}>{pageById('replacement').label}</a></p></div></Section></main>;
  return <main id="main" data-stage={page.stage} data-template="T9" data-variant={page.variant}><Breadcrumb page={page}/><Hero page={page} content={content}/><Section title="Tell us what you need" module="Quote: brand, part number, photo, application, quantity, contact + source page + email, WhatsApp, WeChat"><QuoteForm defaultSource={page.path} privacyPath={pageById('privacy').path}/><QuoteContacts source={page.path}/></Section></main>;
}
