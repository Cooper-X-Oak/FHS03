'use client';
import {bibleUi} from '@/locales/en-bible';

import {trackEvent} from '@/lib/client-events';
export function focusRequest(entry:string,text?:string){const form=document.querySelector<HTMLTextAreaElement>('#contact textarea[name="message"], textarea[name="message"]');if(!form)return;const hidden=form.form?.elements.namedItem('entry_location') as HTMLInputElement|null;if(hidden)hidden.value=entry;if(text)form.value=text;form.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});form.focus({preventScroll:true});}
export function RequestLink({entry='hero',secondary=false,children=bibleUi["Send your model or photo"]}:{entry?:string;secondary?:boolean;children?:React.ReactNode}){return <a className={`button ${secondary?'secondary-button':'quote-button'}`} href="#contact" data-entry={entry} onClick={event=>{event.preventDefault();trackEvent('cta_click',{entry_location:entry});focusRequest(entry);}}>{children}</a>;}
export function LongtailLink(){return <div className="container" data-module="C2"><a href="#contact" data-entry="longtail" onClick={event=>{event.preventDefault();trackEvent('longtail_click',{entry_location:'longtail'});focusRequest('longtail');}}>{bibleUi["Can't find it? Send a photo of your old filter."]}</a></div>;}
