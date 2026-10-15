import type {Page} from './sitemap';
import type {PageContent} from '../content/types';
export function pageDescription(page:Page, content:PageContent):string {
  if(content.description?.trim())return content.description.trim();
  const action='Send your model or photo for a quote.';
  const subject=page.main_keyword||page.label;
  const lead=`Explore ${subject} with FHS Filtration. Discuss your application, specifications and purchasing requirements with Nina.`;
  const available=160-action.length-1;
  return `${lead.length>available?lead.slice(0,available-1).replace(/\s+\S*$/,'')+'.':lead} ${action}`;
}
