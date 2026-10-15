import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import type { Attachment as StoredAttachment } from '../payload-types';
import type { Attachment } from '../lib/leads';

// Trusted server-side mail delivery only; public downloads go through Payload access control.
export async function readPrivateAttachment(doc: StoredAttachment): Promise<Attachment> {
  if (!doc.filename || !doc.mimeType) throw new Error('Attachment metadata is incomplete.');
  let content: Buffer;
  if (process.env.CMS_LOCAL_STORAGE === 'true' && !process.env.R2_PRIVATE_BUCKET) {
    const root = path.resolve('data/attachments');
    const file = path.resolve(root, doc.filename);
    if (!file.startsWith(root + path.sep)) throw new Error('Invalid attachment path.');
    content = await readFile(file);
  } else {
    const client = new S3Client({ endpoint: process.env.R2_ENDPOINT, region: 'auto', forcePathStyle: true, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY! } });
    try {
      const key = doc._objectKey || [doc.prefix, doc.filename].filter(Boolean).join('/');
      const result = await client.send(new GetObjectCommand({ Bucket: process.env.R2_PRIVATE_BUCKET, Key: key }));
      if (!result.Body) throw new Error('Attachment object is missing.');
      content = Buffer.from(await result.Body.transformToByteArray());
    } finally { client.destroy(); }
  }
  return { filename: doc.filename, contentType: doc.mimeType, content };
}
