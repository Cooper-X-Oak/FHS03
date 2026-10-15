import {productModels} from '@/cms/public-data';
import {type Page} from '@/lib/sitemap';
import {ModelCard} from './ModelCard';
export async function ProductModels({page,section}:{page:Page;section?:string}) {const models=(await productModels(page.id)).filter(model=>section ? model.section===section : !model.section);return models.length ? <div className="card-grid">{models.map(model=><ModelCard key={model.id} model={model} source={page.path}/>)}</div> : null;}
