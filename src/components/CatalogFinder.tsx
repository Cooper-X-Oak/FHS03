'use client';
import { useState } from 'react';
import Image from 'next/image';
import { en } from '@/locales/en';
import { MAX_ENQUIRY_ITEMS } from '@/lib/enquiry-selection';
import { quoteUrl } from '@/lib/quote-url';

export type CatalogItem = {id:string;label:string;path:string;family:string;summary:string;image?:string;imageAlt?:string};
export function CatalogFinder({items, source, quotePath}: {items:CatalogItem[];source:string;quotePath:string}) {
  const [query,setQuery] = useState('');
  const [family,setFamily] = useState('');
  const [selection,setSelection] = useState<string[]>([]);
  const copy = en.catalog;
  const selected = selection.flatMap(id => {const item = items.find(item=>item.id===id); return item ? [item] : [];});
  const matches = items.filter(item=>(!family||item.family===family)&&`${item.label} ${item.summary}`.toLowerCase().includes(query.trim().toLowerCase()));
  const atLimit = selected.length >= MAX_ENQUIRY_ITEMS;
  const toggle = (id:string) => setSelection(current=>current.includes(id) ? current.filter(value=>value!==id) : current.length < MAX_ENQUIRY_ITEMS ? [...current,id] : current);
  const href = quoteUrl(quotePath, source, selected.length ? {selection:JSON.stringify(selected.map(({id,label,path})=>({id,label,path})))} : {});
  return <div className="catalog-layout">
    <div className="catalog-results">
      <div className="catalog-controls">
        <label className="field">{copy.search}<input value={query} onChange={e=>setQuery(e.target.value)} type="search" placeholder={copy.searchHint}/></label>
        <label className="field">{copy.family}<select value={family} onChange={e=>setFamily(e.target.value)}><option value="">{copy.all}</option>{[...new Set(items.map(item=>item.family))].map(f=><option key={f} value={f}>{f}</option>)}</select></label>
      </div>
      <p className="catalog-count" role="status"><span className="mono">{matches.length}</span> {copy.results}</p>
      <div className="card-grid catalog-grid">{matches.map(item=>{
        const added=selection.includes(item.id);
        return <article className="card catalog-card" key={item.id} data-selected={added}>
          {item.image && <a className="product-media" href={item.path} tabIndex={-1} aria-hidden="true"><Image src={item.image} alt="" width={480} height={360}/></a>}
          <span className="type-label-caps">{item.family}</span>
          <h3 className="type-h3"><a href={item.path}>{item.label}</a></h3>
          <p className="type-body-sm">{item.summary}</p>
          <button type="button" className={added ? 'button secondary-button' : 'button quote-button'} aria-pressed={added} disabled={!added&&atLimit} onClick={()=>toggle(item.id)}>{added ? copy.added : copy.add}<span aria-hidden="true">{added ? '✓' : '+'}</span><span className="sr-only">: {item.label}</span></button>
        </article>;
      })}</div>
      {!matches.length&&<p className="empty-state">{copy.empty}</p>}
    </div>
    <aside className="enquiry-selection" aria-label={copy.selected}>
      <p className="type-label-caps">{copy.selected}</p>
      <p className="selection-count" role="status">{selected.length.toString().padStart(2,'0')}</p>
      {selected.length ? <ul>{selected.map(item=><li key={item.id}><span>{item.label}</span><button type="button" onClick={()=>toggle(item.id)} aria-label={`${copy.remove} ${item.label}`}>×</button></li>)}</ul> : <p>{copy.none}</p>}
      {atLimit&&<p className="caption" role="status">{copy.limit}</p>}
      <a data-quote className="button quote-button" href={href}>{copy.review}<span aria-hidden="true">→</span></a>
      {selected.length>0&&<button type="button" className="selection-clear" onClick={()=>setSelection([])}>{copy.clear}</button>}
    </aside>
  </div>;
}
