import {mkdir,appendFile} from 'node:fs/promises';
import path from 'node:path';
import {pages} from '@/lib/sitemap';
import {storageDir} from '@/lib/leads';
import {sameOrigin} from '@/lib/request-origin';
import {readLimitedBody,PayloadTooLargeError} from '@/lib/request-body';
const buckets=new Map<string,{count:number;until:number}>();
const entries=['hero','mid','end','sticky','longtail','nav'];
export async function POST(request:Request){
 if(!sameOrigin(request,true))return new Response(null,{status:403});
 try{
  const data=JSON.parse((await readLimitedBody(request,512)).toString('utf8'));
  if(!data||Object.keys(data).some(k=>!['page_id','entry_location'].includes(k))||!pages.some(p=>p.id===data.page_id&&p.index_status!=='not_built')||!entries.includes(data.entry_location))return new Response(null,{status:400});
  const now=Date.now();const key=data.page_id+':'+data.entry_location;const previous=buckets.get(key);const bucket=previous&&previous.until>now?previous:{count:0,until:now+60000};
  if(++bucket.count>120)return new Response(null,{status:429});buckets.set(key,bucket);
  await mkdir(storageDir(),{recursive:true,mode:0o700});
  await appendFile(path.join(storageDir(),'whatsapp-clicks.jsonl'),JSON.stringify({page_id:data.page_id,entry_location:data.entry_location,time:new Date().toISOString()})+'\n',{mode:0o600});
  return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
 }catch(error){return new Response(null,{status:error instanceof PayloadTooLargeError?413:400});}
}
