import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { s3Storage } from '@payloadcms/storage-s3';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import sharp from 'sharp';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { Users, Pages, Products, CrossReferences, News, Cases, Inquiries, Media, Attachments, globals } from './cms/collections';
import { sitemap } from './lib/sitemap';

const secret = process.env.PAYLOAD_SECRET;
if (!secret || secret.length < 32) throw new Error('PAYLOAD_SECRET must contain at least 32 characters.');
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required; there is no file-content fallback.');
const localStorage = process.env.CMS_LOCAL_STORAGE === 'true';
const r2 = ['R2_ENDPOINT', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_MEDIA_BUCKET', 'R2_PRIVATE_BUCKET'].every(key => process.env[key]);
if (!r2 && !localStorage) throw new Error('Configure R2, or explicitly enable CMS_LOCAL_STORAGE for local development.');
const s3Config = { endpoint: process.env.R2_ENDPOINT, region: 'auto', forcePathStyle: true, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID || '', secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '' } };

export default buildConfig({
  secret, sharp,
  serverURL: process.env.APP_ORIGIN || 'http://localhost:3000',
  admin: { user: 'users', importMap: { baseDir: path.resolve('src') } },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL, max: 5 }, push: process.env.CMS_SCHEMA_PUSH === 'true' && process.env.NODE_ENV !== 'production', migrationDir: path.resolve('src/migrations') }),
  collections: [Users, Pages, Products, CrossReferences, News, Cases, Inquiries, Media, Attachments], globals,
  localization: { locales: [...sitemap.site.locales, ...sitemap.site.plannedLocales].map(code => ({ code, label: code.toUpperCase(), rtl: code === 'ar' })), defaultLocale: 'en', fallback: false },
  typescript: { outputFile: path.resolve('src/payload-types.ts') },
  graphQL: { disable: true },
  upload: { limits: { fileSize: 10 * 1024 * 1024 } },
  email: process.env.SMTP_HOST ? nodemailerAdapter({ defaultFromAddress: process.env.LEAD_FROM || 'sales@fhsfiltration.com', defaultFromName: 'FHS Filtration', skipVerify: true, transport: nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined } ) }) : undefined,
  plugins: [
    s3Storage({ enabled: r2, alwaysInsertFields: true, bucket: process.env.R2_MEDIA_BUCKET || 'local-media', config: s3Config, collections: { media: true } }),
    s3Storage({ enabled: r2, alwaysInsertFields: true, bucket: process.env.R2_PRIVATE_BUCKET || 'local-private', config: s3Config, collections: { attachments: true }, clientUploads: false }),
  ],
});
