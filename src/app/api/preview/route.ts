import {draftMode} from 'next/headers';
import {cms} from '@/cms/content';
import {pages} from '@/lib/sitemap';
export async function GET(request:Request) {
  const {user}=await (await cms()).auth({headers:request.headers});
  if(!user || !['admin','editor'].includes(user.role)) return new Response('Authentication required',{status:401});
  const page=pages.find(p=>p.id===new URL(request.url).searchParams.get('page'));
  if(!page) return new Response('Not found',{status:404});
  (await draftMode()).enable();
  return new Response(null,{status:307,headers:{Location:page.path}});
}
