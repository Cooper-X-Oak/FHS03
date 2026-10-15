import {draftMode} from 'next/headers';
import fs from 'node:fs/promises';
import path from 'node:path';
export async function GET(_request:Request,{params}:{params:Promise<{asset:string}>}) {
  const {asset}=await params;
  const host=new URL(process.env.APP_ORIGIN||'https://invalid.example').hostname;
  if(process.env.BIBLE_LOCAL_FIXTURES!=='true'||!['localhost','127.0.0.1'].includes(host)||!(await draftMode()).isEnabled||!['overall.webp','end-cap.webp','detail.webp','dimensions.webp'].includes(asset))return new Response('Not found',{status:404});
  try {const bytes=await fs.readFile(path.join(process.cwd(),'.devtemp','build-v21','fixtures',asset));return new Response(bytes,{headers:{'Content-Type':'image/webp','Cache-Control':'private, max-age=3600','X-Robots-Tag':'noindex'}});}catch{return new Response('Not found',{status:404});}
}
