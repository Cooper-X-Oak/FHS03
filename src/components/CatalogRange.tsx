'use client';
import {bibleUi} from '@/locales/en-bible';

import {useSyncExternalStore} from 'react';
import {focusRequest} from './RequestLink';
import {trackEvent} from '@/lib/client-events';
const subscribe=(listener:()=>void)=>{window.addEventListener('popstate',listener);return()=>window.removeEventListener('popstate',listener);};
export function CatalogRange({items}:{items:{id:string;label:string;path:string;summary:string}[]}){
 const query=useSyncExternalStore(subscribe,()=>new URLSearchParams(location.search).get('q')||'',()=> '');
 const results=items.filter(item=>`${item.label} ${item.summary}`.toLowerCase().includes(query.toLowerCase()));
 function change(value:string){const url=new URL(location.href);if(value)url.searchParams.set('q',value);else url.searchParams.delete('q');history.replaceState(null,'',url);window.dispatchEvent(new PopStateEvent('popstate'));if(value){let robots=document.querySelector<HTMLMetaElement>('meta[name="robots"]');if(!robots){robots=document.createElement('meta');robots.name='robots';document.head.append(robots);}robots.content='noindex, follow';}}
 return <section className="section" data-module="M05"><div className="container"><label htmlFor="range-search">{bibleUi["Search the product range"]}</label><input id="range-search" type="search" value={query} onChange={event=>change(event.target.value)}/>{results.length?<div className="table-wrap"><table><thead><tr><th>{bibleUi["Product range"]}</th><th>{bibleUi["Scope"]}</th></tr></thead><tbody>{results.map(item=><tr key={item.id}><th><a href={item.path}>{item.label}</a></th><td>{item.summary}</td></tr>)}</tbody></table></div>:<p><a href="#contact" data-entry="longtail" onClick={event=>{event.preventDefault();trackEvent('longtail_click',{entry_location:'longtail'});focusRequest('longtail',query);}}>{bibleUi["Send your search to Nina"]}</a></p>}</div></section>;
}
