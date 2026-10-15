import { z } from 'zod';
import { randomUUID, createHash } from 'node:crypto';
import { mkdir, writeFile, rename, readFile } from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';

export const leadSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(120),
  email: z.email('Enter a valid work email.').max(254),
  company: z.string().trim().min(1, 'Enter your company.').max(160),
  country: z.string().trim().min(1, 'Enter your country.').max(100),
  message: z.string().trim().min(10, 'Describe your filter or process in at least 10 characters.').max(8000),
  brand: z.string().trim().max(160).default(''),
  application: z.string().trim().max(300).default(''),
  quantity: z.string().trim().max(160).default(''),
  partNumber: z.string().trim().max(160).default(''),
  sourcePage: z.string().max(300),
  utm_source: z.string().max(200).default(''), utm_medium: z.string().max(200).default(''),
  utm_campaign: z.string().max(200).default(''), utm_term: z.string().max(200).default(''), utm_content: z.string().max(200).default(''),
});
export type LeadInput = z.infer<typeof leadSchema>;
export function storageDir() {return process.env.LEAD_STORAGE_DIR || path.join(process.cwd(), 'data', 'leads');}
export function mailConfigured() {return Boolean(process.env.SMTP_HOST && process.env.LEAD_FROM && process.env.LEAD_RECIPIENT);}
export type Attachment = {filename: string; content: Buffer; contentType: string};
export function validateAttachment(name: string, type: string, bytes: Buffer): Attachment {
  if (bytes.length > 5 * 1024 * 1024) throw new Error('Choose a file smaller than 5 MB.');
  const isPdf = bytes.subarray(0, 5).toString() === '%PDF-';
  const isPng = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const isJpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const allowed = (type === 'application/pdf' && isPdf && /\.pdf$/i.test(name)) || (type === 'image/png' && isPng && /\.png$/i.test(name)) || (type === 'image/jpeg' && isJpeg && /\.jpe?g$/i.test(name));
  if (!allowed) throw new Error('Upload a JPG, PNG or PDF file with matching file contents.');
  return {filename: path.basename(name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120), content: bytes, contentType: type};
}
async function atomicJson(file: string, data: unknown) {
  const temp = `${file}.${randomUUID()}.tmp`;
  await writeFile(temp, JSON.stringify(data, null, 2), {mode: 0o600, flag: 'wx'});
  await rename(temp, file);
}
// Single Node process deployment. Persistent storage survives restarts; do not use ephemeral serverless disks.
let rateQueue = Promise.resolve();
export async function rateLimit(identity: string, now = Date.now()): Promise<boolean> {
  let accepted = false;
  const job = rateQueue.then(async () => {
    const dir = path.join(storageDir(), '_rate'); await mkdir(dir, {recursive: true, mode: 0o700});
    const key = createHash('sha256').update(identity).digest('hex'); const file = path.join(dir, `${key}.json`);
    let timestamps: number[] = [];
    try { timestamps = JSON.parse(await readFile(file, 'utf8')); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
    timestamps = timestamps.filter(t => t > now - 3600000);
    if (timestamps.length >= 5) return;
    timestamps.push(now); await atomicJson(file, timestamps); accepted = true;
  });
  rateQueue = job.catch(() => {}); await job; return accepted;
}
export async function storeLead(input: LeadInput, attachment?: Attachment) {
  const id = randomUUID(); const dir = path.join(/* turbopackIgnore: true */ storageDir(), id);
  await mkdir(dir, {recursive: true, mode: 0o700});
  if (attachment) await writeFile(path.join(dir, 'attachment'), attachment.content, {flag: 'wx', mode: 0o600});
  const record = {id, createdAt: new Date().toISOString(), ...input, attachment: attachment ? {filename: attachment.filename, contentType: attachment.contentType} : null, emailStatus: 'pending'};
  await atomicJson(path.join(dir, 'request.json'), record);
  return {id, dir, record};
}
export async function sendLeadEmail(lead: Awaited<ReturnType<typeof storeLead>>, attachment?: Attachment) {
  const transport = nodemailer.createTransport({host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: process.env.SMTP_USER ? {user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD} : undefined, connectionTimeout: 10000, socketTimeout: 15000});
  try {
    await transport.sendMail({from: process.env.LEAD_FROM, to: process.env.LEAD_RECIPIENT, replyTo: lead.record.email, subject: `FHS quote request ${lead.id}`, text: Object.entries(lead.record).filter(([key]) => key !== 'attachment').map(([key, value]) => `${key}: ${value}`).join('\n'), attachments: attachment ? [attachment] : []});
    await atomicJson(path.join(lead.dir, 'request.json'), {...lead.record, emailStatus: 'sent', emailedAt: new Date().toISOString()});
  } finally { transport.close(); }
}
