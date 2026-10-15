import { NextResponse } from 'next/server';
import { leadSchema, mailConfigured, rateLimit, validateAttachment } from '@/lib/leads';
import { saveInquiry, deliverInquiry } from '@/cms/inquiries';
import { plannedSource } from '@/cms/news';
import { recordEvent } from '@/lib/events';
import { sameOrigin } from '@/lib/request-origin';
import { PayloadTooLargeError, readLimitedBody } from '@/lib/request-body';
export const runtime = 'nodejs';
const maxBody = 6 * 1024 * 1024;
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({error: 'Please send your request from this website.'}, {status: 403});
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data')) return NextResponse.json({error: 'Use the quote form to send your request.'}, {status: 415});
  if (Number(request.headers.get('content-length') || 0) > maxBody) return NextResponse.json({error: 'Your upload is too large. Maximum file size is 5 MB.'}, {status: 413});
  try {
    const bytes = await readLimitedBody(request,maxBody);
    const form = await new Response(new Uint8Array(bytes), {headers: {'content-type': request.headers.get('content-type')!}}).formData();
    if (form.get('website')) return NextResponse.json({ok: true});
    const result = leadSchema.safeParse(Object.fromEntries(form.entries()));
    if (!result.success) return NextResponse.json({error: 'Please check the highlighted fields.', fields: result.error.flatten().fieldErrors}, {status: 400});
    if (!await plannedSource(result.data.sourcePage)) return NextResponse.json({error: 'The source page is invalid. Reload the quote form.'}, {status: 400});
    const file = form.get('attachment'); let attachment;
    if (file instanceof File && file.size) {
      try {attachment = validateAttachment(file.name, file.type, Buffer.from(await file.arrayBuffer()));} catch (error) {return NextResponse.json({error: (error as Error).message, fields: {attachment: [(error as Error).message]}}, {status: 400});}
    }
    if (!mailConfigured()) return NextResponse.json({error: 'Quote delivery is not configured yet. Your request has not been sent. Please try again when the site is ready.'}, {status: 503});
    const ip = process.env.TRUST_PROXY === 'true' ? request.headers.get('x-forwarded-for')?.split(',')[0].trim() : undefined;
    if (!(await rateLimit(`email:${result.data.email.toLowerCase()}`)) || (ip && !(await rateLimit(`ip:${ip}`)))) return NextResponse.json({error: 'Too many requests. Please try again in one hour.'}, {status: 429, headers: {'Retry-After': '3600'}});
    const lead = await saveInquiry(result.data, attachment);
    await recordEvent('quote_submit', result.data.sourcePage).catch(() => console.error('Quote event unavailable:', lead.id));
    try {await deliverInquiry(lead, attachment);} catch {console.error('Quote email pending; persisted request:', lead.id);}
    return NextResponse.json({ok: true, requestId: lead.reference});
  } catch(error) {
    if(error instanceof PayloadTooLargeError) return NextResponse.json({error:'Your upload is too large. Maximum file size is 5 MB.'},{status:413});
    return NextResponse.json({error: 'We could not save your request. Please try again.'}, {status: 500});
  }
}
