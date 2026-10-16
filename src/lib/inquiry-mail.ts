import nodemailer from 'nodemailer';
import type {LeadInput} from './leads';
import {pages} from './sitemap';
const oneLine=(value:string)=>value.replace(/[\r\n]+/g,' ').trim();
export function inquirySubject(input:Pick<LeadInput,'message'|'name'|'company'|'country'>){
 const details=[input.company,input.country].filter(Boolean).map(oneLine).join(', ');
 return `Inquiry: ${Array.from(oneLine(input.message)).slice(0,40).join('')} — ${oneLine(input.name)}${details?` (${details})`:''}`;
}
export function inquiryText(input:LeadInput){
 const page=pages.find(p=>p.id===input.page_id||p.path===input.sourcePage);
 const fields:Record<string,string>={Name:input.name,Email:input.email,Company:input.company,Country:input.country,Request:input.message,Brand:input.brand,'Part number':input.partNumber,Quantity:input.quantity,Application:input.application,WhatsApp:input.whatsappNumber,'Source page':page?.label||input.sourcePage,'Source URL':input.page_url||input.sourcePage,page_id:input.page_id,entry_location:input.entry_location,template:input.template,customer_type:input.customer_type,referrer:input.referrer,utm_source:input.utm_source,utm_medium:input.utm_medium,utm_campaign:input.utm_campaign,utm_term:input.utm_term,utm_content:input.utm_content};
 return Object.entries(fields).map(([key,value])=>`${key}: ${value||''}`).join('\n\n');
}
export function mailTransport(){
 const port=Number(process.env.SMTP_PORT||587);
 return nodemailer.createTransport({host:process.env.SMTP_HOST,port,secure:port===465,auth:process.env.SMTP_USER?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}:undefined,connectionTimeout:10000,socketTimeout:15000});
}
export const autoReplyEnabled=()=>process.env.LEAD_AUTOREPLY_ENABLED==='true';
