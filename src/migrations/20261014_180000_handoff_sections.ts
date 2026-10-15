import {type MigrateUpArgs, type MigrateDownArgs, sql} from '@payloadcms/db-postgres';
export async function up({db}: MigrateUpArgs) { await db.execute(sql`
ALTER TYPE "public"."enum_pages_content_stages_products" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum_pages_page_id" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum__pages_v_version_content_stages_products" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum__pages_v_version_page_id" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum_products_page_id" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum_cross_references_page_id" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum_news_content_stages_products" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum_news_related_pages" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum__news_v_version_content_stages_products" ADD VALUE IF NOT EXISTS 'depth';
ALTER TYPE "public"."enum__news_v_version_related_pages" ADD VALUE IF NOT EXISTS 'depth';
ALTER TABLE "products" ADD COLUMN "slug" varchar;
ALTER TABLE "products" ADD COLUMN "section" varchar;
ALTER TABLE "products" ADD COLUMN "length" varchar;
ALTER TABLE "products" ADD COLUMN "end_cap" varchar;
ALTER TABLE "products" ADD COLUMN "seals" varchar;
ALTER TABLE "products" ADD COLUMN "housing_fit" varchar;
ALTER TABLE "products" ADD COLUMN "replacement_brands" varchar;
ALTER TABLE "products" ADD COLUMN "indexable" boolean DEFAULT false;
CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
`); }
export async function down({db}: MigrateDownArgs) { await db.execute(sql`DROP INDEX IF EXISTS products_slug_idx; ALTER TABLE products DROP COLUMN slug, DROP COLUMN section, DROP COLUMN length, DROP COLUMN end_cap, DROP COLUMN seals, DROP COLUMN housing_fit, DROP COLUMN replacement_brands, DROP COLUMN indexable;`); }
