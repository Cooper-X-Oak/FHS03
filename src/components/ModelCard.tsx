import Image from 'next/image';
import type {Product} from '@/payload-types';
import {catalogPath} from '@/cms/catalog';
import {pageById} from '@/lib/sitemap';
import {quoteUrl} from '@/lib/quote-url';
export function ModelCard({model,source}:{model:Product;source:string}) {const photo=model.images?.find(image=>typeof image==='object'&&image.url);return <article className="card"><h3 className="type-h3">{model.slug ? <a href={catalogPath(model.slug)}>{model.model}</a> : model.model}</h3>{photo && typeof photo==='object' && photo.url && <Image src={photo.url} alt={photo.alt} width={320} height={200}/>}<p>{model.name}</p><dl>{[['Material',model.material],['Micron range',model.micronRange],['Length',model.length || model.sizes],['End cap',model.endCap],['Replacement brands',model.replacementBrands]].filter(([,value])=>value).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{model.replacementBrands&&<p className="caption">Trademarks belong to their owners.</p>}<a data-quote className="button quote-button" href={quoteUrl(pageById('quote').path,source,{partNumber:model.model})}>Quote this model</a></article>;}
