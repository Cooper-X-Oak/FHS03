import { z } from 'zod';
import { randomUUID, createHash } from 'node:crypto';
import { mkdir, writeFile, rename, readFile } from 'node:fs/promises';
import path from 'node:path';
import {mailTransport,inquirySubject,inquiryText} from './inquiry-mail';

export const leadSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(120),
  email: z.email('Enter a valid work email.').max(254),
  company: z.string().trim().max(160).default(''),
  country: z.string().trim().max(100).default(''),
  whatsappNumber: z.string().trim().max(160).default(''),
  page_id: z.string().max(100).default(''), template: z.string().max(10).default(''),
  entry_location: z.enum(['hero','mid','end','sticky','longtail','nav']).default('end'),
  customer_type: z.string().max(30).default(''), page_url: z.string().max(1000).default(''), referrer: z.string().max(1000).default(''),
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
  if (!bytes.length || bytes.length > 10 * 1024 * 1024) throw new Error('Choose a nonempty file no larger than 10 MB.');
  const isPdf = bytes.subarray(0, 5).toString() === '%PDF-';
  const isPng = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const isJpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const ext=path.extname(name).toLowerCase();
  const xlsx=ext==='.xlsx'&&bytes.subarray(0,4).equals(Buffer.from([80,75,3,4]))&&bytes.includes(Buffer.from('[Content_Types].xml'))&&bytes.includes(Buffer.from('xl/workbook.xml'))&&!bytes.includes(Buffer.from('vbaProject.bin'));
  const csv=ext==='.csv'&&!bytes.includes(0)&&!/[\x01-\x08\x0b\x0c\x0e-\x1f]/.test(bytes.toString('utf8'))&&!bytes.toString('utf8').includes('\uFFFD');
  const dwg=ext==='.dwg'&&/^AC10\d{2}$/.test(bytes.subarray(0,6).toString());
  const allowed = (type === 'application/pdf' && isPdf && ext==='.pdf') || (type === 'image/png' && isPng && ext==='.png') || (type === 'image/jpeg' && isJpeg && /\.jpe?g$/i.test(name)) || (xlsx&&['','application/octet-stream','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(type)) || (csv&&['','text/csv','application/vnd.ms-excel','text/plain'].includes(type)) || (dwg&&['','application/octet-stream','image/vnd.dwg','application/acad','application/x-acad'].includes(type));
  if (!allowed) throw new Error('Upload a JPG, PNG, PDF, XLSX, CSV or DWG file with matching file contents.');
  const contentType=xlsx?'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':csv?'text/csv':dwg?'image/vnd.dwg':type;
  return {filename: path.basename(name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120), content: bytes, contentType};
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
  const transport = mailTransport();
  try {
    await transport.sendMail({from: process.env.LEAD_FROM, to: process.env.LEAD_RECIPIENT, replyTo: lead.record.email, subject: inquirySubject(lead.record), text: inquiryText(lead.record), attachments: attachment ? [attachment] : []});
    await atomicJson(path.join(lead.dir, 'request.json'), {...lead.record, emailStatus: 'sent', emailedAt: new Date().toISOString()});
  } finally { transport.close(); }
}
