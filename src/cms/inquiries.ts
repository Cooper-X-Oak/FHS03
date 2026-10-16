import { randomUUID } from 'node:crypto';
import {mailTransport,inquirySubject,inquiryText,autoReplyEnabled} from '../lib/inquiry-mail';
import { cms } from './content';
import type { LeadInput, Attachment } from '../lib/leads';

export async function saveInquiry(input: LeadInput, attachment?: Attachment|Attachment[]) {
  const payload = await cms();
  const reference = randomUUID();
  const uploadedIds:number[]=[];
  try {
  for (const item of !attachment?[]:Array.isArray(attachment)?attachment:[attachment]) {
    const attachment=item;
    const upload = await payload.create({ collection: 'attachments', overrideAccess: true, data: {}, file: { data: attachment.content, name: `${reference}-${attachment.filename}`, mimetype: attachment.contentType, size: attachment.content.length } });
    uploadedIds.push(upload.id);
  }
    return await payload.create({ collection: 'inquiries', overrideAccess: true, data: { ...input, reference, attachments: uploadedIds, status: 'new', salesEmailStatus: 'pending', buyerEmailStatus: 'pending' } });
  } catch (error) {
    for(const id of uploadedIds) await payload.delete({ collection: 'attachments', id, overrideAccess: true }).catch(() => console.error('Orphan attachment requires staff cleanup:', reference));
    throw error;
  }
}

export async function deliverInquiry(inquiry: Awaited<ReturnType<typeof saveInquiry>>, attachment?: Attachment|Attachment[]) {
  const payload = await cms();
  const transport = mailTransport();
  try {
    if (inquiry.salesEmailStatus !== 'sent') {
      const input = inquiry as unknown as LeadInput;
      await transport.sendMail({from:process.env.LEAD_FROM,to:process.env.LEAD_RECIPIENT,replyTo:inquiry.email||undefined,subject:inquirySubject(input),text:inquiryText(input),attachments:attachment?(Array.isArray(attachment)?attachment:[attachment]):[]});
      await payload.update({ collection: 'inquiries', id: inquiry.id, overrideAccess: true, data: { salesEmailStatus: 'sent' } });
    }
    if (autoReplyEnabled() && inquiry.buyerEmailStatus !== 'sent') {
      await transport.sendMail({ from: process.env.LEAD_FROM, to: inquiry.email || '', replyTo: process.env.LEAD_RECIPIENT, subject: `We received your filtration request — ${inquiry.reference}`, text: `Hello ${inquiry.name},\n\nGot it. I will reply within 24 hours.\n\nReference: ${inquiry.reference}\n\nNina\nFHS Filtration` });
      await payload.update({ collection: 'inquiries', id: inquiry.id, overrideAccess: true, data: { buyerEmailStatus: 'sent' } });
    }
  } finally { transport.close(); }
}
