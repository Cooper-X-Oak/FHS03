import { randomUUID } from 'node:crypto';
import nodemailer from 'nodemailer';
import { cms } from './content';
import type { LeadInput, Attachment } from '../lib/leads';

export async function saveInquiry(input: LeadInput, attachment?: Attachment) {
  const payload = await cms();
  const reference = randomUUID();
  let uploadedId: number | undefined;
  if (attachment) {
    const upload = await payload.create({ collection: 'attachments', overrideAccess: true, data: {}, file: { data: attachment.content, name: `${reference}-${attachment.filename}`, mimetype: attachment.contentType, size: attachment.content.length } });
    uploadedId = upload.id;
  }
  try {
    return await payload.create({ collection: 'inquiries', overrideAccess: true, data: { ...input, reference, attachments: uploadedId ? [uploadedId] : [], status: 'new', salesEmailStatus: 'pending', buyerEmailStatus: 'pending' } });
  } catch (error) {
    if (uploadedId) await payload.delete({ collection: 'attachments', id: uploadedId, overrideAccess: true }).catch(() => console.error('Orphan attachment requires staff cleanup:', reference));
    throw error;
  }
}

export async function deliverInquiry(inquiry: Awaited<ReturnType<typeof saveInquiry>>, attachment?: Attachment) {
  const payload = await cms();
  const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined, connectionTimeout: 10000, socketTimeout: 15000 });
  try {
    if (inquiry.salesEmailStatus !== 'sent') {
      const fields = ['reference','name','email','company','country','brand','partNumber','application','quantity','message','sourcePage','utm_source','utm_medium','utm_campaign','utm_term','utm_content'] as const;
      await transport.sendMail({ from: process.env.LEAD_FROM, to: process.env.LEAD_RECIPIENT, replyTo: inquiry.email || undefined, subject: `FHS quote request ${inquiry.reference}`, text: fields.map(key => `${key}: ${inquiry[key] || ''}`).join('\n'), attachments: attachment ? [attachment] : [] });
      await payload.update({ collection: 'inquiries', id: inquiry.id, overrideAccess: true, data: { salesEmailStatus: 'sent' } });
    }
    if (inquiry.buyerEmailStatus !== 'sent') {
      await transport.sendMail({ from: process.env.LEAD_FROM, to: inquiry.email || '', replyTo: process.env.LEAD_RECIPIENT, subject: `We received your filtration request — ${inquiry.reference}`, text: `Hello ${inquiry.name},\n\nWe received your filtration request. A person replies within 24 hours. We will review the part number, photo or process description and confirm the details with you.\n\nReference: ${inquiry.reference}\n\nFHS Filtration` });
      await payload.update({ collection: 'inquiries', id: inquiry.id, overrideAccess: true, data: { buyerEmailStatus: 'sent' } });
    }
  } finally { transport.close(); }
}
