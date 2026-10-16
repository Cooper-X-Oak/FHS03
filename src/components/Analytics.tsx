'use client';
import {bibleUi} from '@/locales/en-bible';
import {useEffect,useState,useSyncExternalStore} from 'react';
import {firstTouch,trackEvent} from '@/lib/client-events';
import {consentRegions} from '@/lib/consent-policy';
const changed='fhs-consent-change';
let memoryConsent='';
const subscribe=(listener:()=>void)=>{window.addEventListener(changed,listener);window.addEventListener('storage',listener);return()=>{window.removeEventListener(changed,listener);window.removeEventListener('storage',listener);};};
const readConsent=()=>{try{return localStorage.getItem('fhs_analytics_consent')||memoryConsent;}catch{return memoryConsent;}};
const settings=(value:string)=>({analytics_storage:value,ad_storage:value,ad_user_data:value,ad_personalization:value});
function enable(){
 const id=process.env.NEXT_PUBLIC_GA4_ID;
 if(id&&/^G-[A-Z0-9]+$/.test(id)&&!document.getElementById('ga4')){
  const script=document.createElement('script');script.id='ga4';script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;document.head.append(script);
  window.gtag?.('js',new Date());
  window.gtag?.('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_referrer:document.referrer?new URL(document.referrer).origin:''});
  window.gtag?.('event','page_view',{page_location:location.origin+location.pathname,page_title:document.title});
 }
}
export function Analytics(){
 const consent=useSyncExternalStore(subscribe,readConsent,()=> 'pending');
 const [region,setRegion]=useState<{requiresConsent:boolean;defaultConsent:string}|null>(null);
 useEffect(()=>{
  firstTouch();window.dataLayer||=[];window.gtag=(...args)=>{window.dataLayer!.push(args);};
  window.gtag('consent','default',settings('granted'));
  window.gtag('consent','default',{...settings('denied'),region:consentRegions});
  const controller=new AbortController();
  fetch('/api/consent-region/',{credentials:'omit',signal:controller.signal}).then(r=>{if(!r.ok)throw Error('Region unavailable');return r.json();}).then(setRegion).catch(()=>{if(!controller.signal.aborted)setRegion({requiresConsent:true,defaultConsent:'denied'});});
  const click=(event:MouseEvent)=>{const link=event.target instanceof Element?event.target.closest('a'):null;if(!link)return;const entry=link.dataset.entry||link.closest('[data-entry]')?.getAttribute('data-entry')||'end';if(link.href.startsWith('https://wa.me/'))trackEvent('whatsapp_click',{entry_location:entry});if(link.href.startsWith('mailto:'))trackEvent('email_click',{entry_location:entry});};
  document.addEventListener('click',click);return()=>{controller.abort();document.removeEventListener('click',click);};
 },[]);
 useEffect(()=>{if(!region||consent==='pending')return;const value=['granted','denied'].includes(consent)?consent:region.defaultConsent;window.fhsAnalyticsAllowed=value==='granted';window.gtag?.('consent','update',settings(value));if(value==='granted')enable();},[consent,region]);
 function choose(value:string){memoryConsent=value;try{localStorage.setItem('fhs_analytics_consent',value);}catch{}window.dispatchEvent(new Event(changed));}
 return consent===''&&region?.requiresConsent?<aside className="cookie-consent" aria-label={bibleUi['Analytics cookies']}><p>{bibleUi['Allow analytics cookies to help us improve this website?']}</p><button onClick={()=>choose('denied')}>{bibleUi['Reject']}</button><button onClick={()=>choose('granted')}>{bibleUi['Allow analytics']}</button></aside>:null;
}
