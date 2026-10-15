import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" ADD COLUMN "content_article" jsonb;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_content_article" jsonb;
  ALTER TABLE "news_locales" ADD COLUMN "content_article" jsonb;
  ALTER TABLE "_news_v_locales" ADD COLUMN "version_content_article" jsonb;`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" DROP COLUMN "content_article";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_content_article";
  ALTER TABLE "news_locales" DROP COLUMN "content_article";
  ALTER TABLE "_news_v_locales" DROP COLUMN "version_content_article";`);
}
