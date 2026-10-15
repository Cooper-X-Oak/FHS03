import fs from 'node:fs/promises';
import path from 'node:path';
import type {PageContent} from '../content/types';
import {publishableContent} from './publishable-content';

/** Private fixtures are never bundled, stored in CMS or served without editor preview. */
export async function localPreviewContent(pageId:string, variant:unknown, authorized:boolean):Promise<PageContent|null> {
  if(!authorized || process.env.BIBLE_LOCAL_FIXTURES !== 'true' || pageId!=='high-flow' || !['full','empty'].includes(String(variant)))return null;
  const hostname=new URL(process.env.APP_ORIGIN||'https://invalid.example').hostname;
  if(!['localhost','127.0.0.1'].includes(hostname))return null;
  const file=path.join(process.cwd(),'.devtemp','build-v21','fixtures',`high-flow-${variant}.json`);
  return publishableContent(JSON.parse(await fs.readFile(file,'utf8')) as PageContent);
}
