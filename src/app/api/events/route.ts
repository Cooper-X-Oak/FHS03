import { NextResponse } from 'next/server';
import { recordEvent } from '@/lib/events';
import { plannedSource } from '@/cms/news';
import { sameOrigin } from '@/lib/request-origin';
import { PayloadTooLargeError, readLimitedBody } from '@/lib/request-body';
const counts = new Map<string, {count:number; until:number}>();
export async function POST(request: Request) {
  if (!sameOrigin(request,true)) return new NextResponse(null,{status:403});
  if (Number(request.headers.get('content-length') || 0) > 1024) return new NextResponse(null,{status:413});
  try {
    const text = (await readLimitedBody(request,1024)).toString('utf8');
    const data = JSON.parse(text);
    if (!['quote_start','whatsapp_click','wechat_open'].includes(data.event) || typeof data.sourcePage !== 'string' || !await plannedSource(data.sourcePage)) return new NextResponse(null,{status:400});
    const now = Date.now(); const current = counts.get(data.sourcePage);
    const bucket = current && current.until > now ? current : {count:0,until:now+60000};
    if (++bucket.count > 60) return new NextResponse(null,{status:429});
    counts.set(data.sourcePage,bucket); await recordEvent(data.event,data.sourcePage);
    return new NextResponse(null,{status:204});
  } catch(error) {return new NextResponse(null,{status:error instanceof PayloadTooLargeError?413:400});}
}
