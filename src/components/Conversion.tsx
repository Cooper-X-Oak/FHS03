import Image from 'next/image';
import {contactDetails, approvedProof} from '@/cms/public-data';
import {isPublicPage, pageById, type Page} from '@/lib/sitemap';
import {QuoteForm} from './QuoteForm';
import {LongtailLink, RequestLink} from './RequestLink';
import {StickyQuoteBar} from './StickyQuoteBar';
export function TrademarkNotice(){return <p className="caption" data-module="M11">Trademarks belong to their owners. FHS is not affiliated with these brands. Brand names are used only to describe compatibility.</p>;}
export async function Evidence(){const items=await approvedProof();return items.length ? <section className="section" data-module="M13"><div className="container proof-strip">{items.map(item=><div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></section>:null;}
export async function ContactModule({page,hint,entry='end',id='contact'}:{page:Page;hint?:string;entry?:'hero'|'end';id?:string}){
 const contact=await contactDetails();const photo=contact.contactPhoto;const wa=contact.whatsapp?`https://wa.me/${contact.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(`Hi Nina, I'm looking at ${page.label} on fhsfiltration.com.`)}`:undefined;
 return <section className="section" id={id} data-module="C1" data-entry={entry}><div className="container contact-module"><div data-module="M21">{photo&&typeof photo==='object'&&photo.url&&<Image src={photo.url} alt={photo.alt||contact.contactName||''} width={photo.width||240} height={photo.height||240}/>}<h2>{contact.contactName}</h2>{contact.contactIntro&&<p>{contact.contactIntro}</p>}<p data-module="M22">Nina will reply within 24 hours.</p>{wa&&<a data-module="M20" data-entry={entry} href={wa}>WhatsApp</a>}</div><div data-module="M19"><QuoteForm defaultSource={page.path} pageId={page.id} template={page.template} entry={entry} formId={id} full={page.id==='quote'} replacement={page.template==='T4'} whatsappUrl={wa} privacyPath={isPublicPage(pageById('privacy'))?pageById('privacy').path:undefined} messagePrompt={hint}/></div></div></section>;
}
export async function MobileContact({page}:{page:Page}){const contact=await contactDetails();return <StickyQuoteBar label={page.label} source={page.path} quotePath={pageById('quote').path} whatsapp={contact.whatsapp||undefined} quoteOnly={page.id==='quote'}/>;}
export {LongtailLink,RequestLink};
