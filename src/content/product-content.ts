import type { PageContent } from './types';
export function productContent(label:string, content: Omit<PageContent,'specs'|'faq'>, fields:string[]): PageContent {
  return {...content,specs:fields.map(field=>({label:field,value:`[Confirm ${label}: ${field.toLowerCase()}]`,note:'Confirm for the exact offered construction.'})),faq:[
    {question:'What is the minimum order?',answer:`[Confirm ${label}: minimum order quantity]`},
    {question:'Can I evaluate a sample?',answer:`[Confirm ${label}: sample policy]`},
    {question:'What is the lead time?',answer:`[Confirm ${label}: lead time]`},
    {question:'What should I send for a replacement quote?',answer:'Send the full existing code, a label and connection photo, the housing model, liquid and operating conditions, and quantity. We will compare the requirements before confirming a match.'},
  ]};
}
