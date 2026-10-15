import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_content_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum_pages_content_stages_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum_pages_content_supply_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum__pages_v_version_content_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum__pages_v_version_content_stages_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum__pages_v_version_content_supply_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum_news_content_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum_news_content_stages_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum_news_content_supply_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum__news_v_version_content_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum__news_v_version_content_stages_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TYPE "public"."enum__news_v_version_content_supply_gallery_kind" AS ENUM('overall', 'end-cap', 'detail', 'dimensions');
  CREATE TABLE "pages_content_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum_pages_content_gallery_kind",
  	"caption" varchar
  );
  
  CREATE TABLE "pages_content_stages_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum_pages_content_stages_gallery_kind",
  	"caption" varchar
  );
  
  CREATE TABLE "pages_content_supply_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum_pages_content_supply_gallery_kind",
  	"caption" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum__pages_v_version_content_gallery_kind",
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_stages_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum__pages_v_version_content_stages_gallery_kind",
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_supply_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum__pages_v_version_content_supply_gallery_kind",
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "news_content_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum_news_content_gallery_kind",
  	"caption" varchar
  );
  
  CREATE TABLE "news_content_stages_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum_news_content_stages_gallery_kind",
  	"caption" varchar
  );
  
  CREATE TABLE "news_content_supply_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum_news_content_supply_gallery_kind",
  	"caption" varchar
  );
  
  CREATE TABLE "_news_v_version_content_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum__news_v_version_content_gallery_kind",
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_stages_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum__news_v_version_content_stages_gallery_kind",
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_supply_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kind" "enum__news_v_version_content_supply_gallery_kind",
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_content_stages_products" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_content_stages_products";
  CREATE TYPE "public"."enum_pages_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'accessories', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'lab-membranes', 'cup-filters', 'presses');
  ALTER TABLE "pages_content_stages_products" ALTER COLUMN "value" SET DATA TYPE "public"."enum_pages_content_stages_products" USING "value"::"public"."enum_pages_content_stages_products";
  ALTER TABLE "pages" ALTER COLUMN "page_id" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_page_id";
  CREATE TYPE "public"."enum_pages_page_id" AS ENUM('3m-cuno', 'home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'presses', 'accessories', 'catalog', 'replacement', 'pall', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'water', 'electroplating', 'chemical', 'general-industry', 'solutions', 'oem', 'distributors', 'knowledge', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms', '3m', 'beer', 'soft-drinks', 'pentair', 'millipore', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab-membranes', 'cup-filters', 'juice', 'bottled-water', 'dairy', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'private-label', 'supply', 'end-users', 'selection', 'maintenance');
  ALTER TABLE "pages" ALTER COLUMN "page_id" SET DATA TYPE "public"."enum_pages_page_id" USING "page_id"::"public"."enum_pages_page_id";
  ALTER TABLE "_pages_v_version_content_stages_products" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_content_stages_products";
  CREATE TYPE "public"."enum__pages_v_version_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'accessories', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'lab-membranes', 'cup-filters', 'presses');
  ALTER TABLE "_pages_v_version_content_stages_products" ALTER COLUMN "value" SET DATA TYPE "public"."enum__pages_v_version_content_stages_products" USING "value"::"public"."enum__pages_v_version_content_stages_products";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_id" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_page_id";
  CREATE TYPE "public"."enum__pages_v_version_page_id" AS ENUM('3m-cuno', 'home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'presses', 'accessories', 'catalog', 'replacement', 'pall', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'water', 'electroplating', 'chemical', 'general-industry', 'solutions', 'oem', 'distributors', 'knowledge', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms', '3m', 'beer', 'soft-drinks', 'pentair', 'millipore', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab-membranes', 'cup-filters', 'juice', 'bottled-water', 'dairy', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'private-label', 'supply', 'end-users', 'selection', 'maintenance');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_id" SET DATA TYPE "public"."enum__pages_v_version_page_id" USING "version_page_id"::"public"."enum__pages_v_version_page_id";
  ALTER TABLE "products" ALTER COLUMN "page_id" SET DATA TYPE text;
  DROP TYPE "public"."enum_products_page_id";
  CREATE TYPE "public"."enum_products_page_id" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'accessories', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'lab-membranes', 'cup-filters', 'presses');
  ALTER TABLE "products" ALTER COLUMN "page_id" SET DATA TYPE "public"."enum_products_page_id" USING "page_id"::"public"."enum_products_page_id";
  ALTER TABLE "cross_references" ALTER COLUMN "page_id" SET DATA TYPE text;
  DROP TYPE "public"."enum_cross_references_page_id";
  CREATE TYPE "public"."enum_cross_references_page_id" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'accessories', 'replacement', 'pall', 'eaton', 'parker', 'sartorius', '3m', 'pentair', 'millipore', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab-membranes', 'cup-filters', 'presses', '3m-cuno');
  ALTER TABLE "cross_references" ALTER COLUMN "page_id" SET DATA TYPE "public"."enum_cross_references_page_id" USING "page_id"::"public"."enum_cross_references_page_id";
  ALTER TABLE "news_content_stages_products" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_news_content_stages_products";
  CREATE TYPE "public"."enum_news_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'accessories', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'lab-membranes', 'cup-filters', 'presses');
  ALTER TABLE "news_content_stages_products" ALTER COLUMN "value" SET DATA TYPE "public"."enum_news_content_stages_products" USING "value"::"public"."enum_news_content_stages_products";
  ALTER TABLE "news_related_pages" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_news_related_pages";
  CREATE TYPE "public"."enum_news_related_pages" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'accessories', 'catalog', 'replacement', 'pall', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'water', 'electroplating', 'chemical', 'general-industry', 'solutions', 'oem', 'distributors', 'knowledge', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'cartridge-life', 'plating-problems', 'news', 'about', 'support', 'quote', 'privacy', 'terms', '3m', 'beer', 'soft-drinks', 'pentair', 'millipore', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab-membranes', 'cup-filters', 'presses', '3m-cuno', 'juice', 'bottled-water', 'dairy', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'private-label', 'supply', 'end-users', 'selection', 'maintenance', 'cases');
  ALTER TABLE "news_related_pages" ALTER COLUMN "value" SET DATA TYPE "public"."enum_news_related_pages" USING "value"::"public"."enum_news_related_pages";
  ALTER TABLE "_news_v_version_content_stages_products" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__news_v_version_content_stages_products";
  CREATE TYPE "public"."enum__news_v_version_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'accessories', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'lab-membranes', 'cup-filters', 'presses');
  ALTER TABLE "_news_v_version_content_stages_products" ALTER COLUMN "value" SET DATA TYPE "public"."enum__news_v_version_content_stages_products" USING "value"::"public"."enum__news_v_version_content_stages_products";
  ALTER TABLE "_news_v_version_related_pages" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__news_v_version_related_pages";
  CREATE TYPE "public"."enum__news_v_version_related_pages" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'depth', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'cartridge-housings', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'anode', 'membranes', 'ro-membranes', 'filter-paper', 'plating-paper', 'inkjet', 'lab', 'accessories', 'catalog', 'replacement', 'pall', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'water', 'electroplating', 'chemical', 'general-industry', 'solutions', 'oem', 'distributors', 'knowledge', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'cartridge-life', 'plating-problems', 'news', 'about', 'support', 'quote', 'privacy', 'terms', '3m', 'beer', 'soft-drinks', 'pentair', 'millipore', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'ss-bag-housings', 'pvdf-housings', 'duplex', 'nylon-mesh', 'oil-absorbing', 'uf-membranes', 'food-paper', 'lab-paper', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab-membranes', 'cup-filters', 'presses', '3m-cuno', 'juice', 'bottled-water', 'dairy', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'private-label', 'supply', 'end-users', 'selection', 'maintenance', 'cases');
  ALTER TABLE "_news_v_version_related_pages" ALTER COLUMN "value" SET DATA TYPE "public"."enum__news_v_version_related_pages" USING "value"::"public"."enum__news_v_version_related_pages";
  ALTER TABLE "pages_content_stages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pages_content_stages" ADD COLUMN "request_hint" varchar;
  ALTER TABLE "pages_content_stages" ADD COLUMN "process_image_id" integer;
  ALTER TABLE "pages_content_stages" ADD COLUMN "module_content" jsonb;
  ALTER TABLE "pages_content_supply" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pages_content_supply" ADD COLUMN "request_hint" varchar;
  ALTER TABLE "pages_content_supply" ADD COLUMN "process_image_id" integer;
  ALTER TABLE "pages_content_supply" ADD COLUMN "module_content" jsonb;
  ALTER TABLE "pages" ADD COLUMN "index_status" varchar;
  ALTER TABLE "pages" ADD COLUMN "launch_batch" varchar;
  ALTER TABLE "pages" ADD COLUMN "main_keyword" varchar;
  ALTER TABLE "pages" ADD COLUMN "is_live" boolean DEFAULT false;
  ALTER TABLE "pages_locales" ADD COLUMN "content_seo_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "content_request_hint" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "content_process_image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "content_module_content" jsonb;
  ALTER TABLE "_pages_v_version_content_stages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "_pages_v_version_content_stages" ADD COLUMN "request_hint" varchar;
  ALTER TABLE "_pages_v_version_content_stages" ADD COLUMN "process_image_id" integer;
  ALTER TABLE "_pages_v_version_content_stages" ADD COLUMN "module_content" jsonb;
  ALTER TABLE "_pages_v_version_content_supply" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "_pages_v_version_content_supply" ADD COLUMN "request_hint" varchar;
  ALTER TABLE "_pages_v_version_content_supply" ADD COLUMN "process_image_id" integer;
  ALTER TABLE "_pages_v_version_content_supply" ADD COLUMN "module_content" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_index_status" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_launch_batch" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_main_keyword" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_is_live" boolean DEFAULT false;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_content_seo_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_content_request_hint" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_content_process_image_id" integer;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_content_module_content" jsonb;
  ALTER TABLE "news_content_stages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "news_content_stages" ADD COLUMN "request_hint" varchar;
  ALTER TABLE "news_content_stages" ADD COLUMN "process_image_id" integer;
  ALTER TABLE "news_content_stages" ADD COLUMN "module_content" jsonb;
  ALTER TABLE "news_content_supply" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "news_content_supply" ADD COLUMN "request_hint" varchar;
  ALTER TABLE "news_content_supply" ADD COLUMN "process_image_id" integer;
  ALTER TABLE "news_content_supply" ADD COLUMN "module_content" jsonb;
  ALTER TABLE "news_locales" ADD COLUMN "content_seo_title" varchar;
  ALTER TABLE "news_locales" ADD COLUMN "content_request_hint" varchar;
  ALTER TABLE "news_locales" ADD COLUMN "content_process_image_id" integer;
  ALTER TABLE "news_locales" ADD COLUMN "content_module_content" jsonb;
  ALTER TABLE "_news_v_version_content_stages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "_news_v_version_content_stages" ADD COLUMN "request_hint" varchar;
  ALTER TABLE "_news_v_version_content_stages" ADD COLUMN "process_image_id" integer;
  ALTER TABLE "_news_v_version_content_stages" ADD COLUMN "module_content" jsonb;
  ALTER TABLE "_news_v_version_content_supply" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "_news_v_version_content_supply" ADD COLUMN "request_hint" varchar;
  ALTER TABLE "_news_v_version_content_supply" ADD COLUMN "process_image_id" integer;
  ALTER TABLE "_news_v_version_content_supply" ADD COLUMN "module_content" jsonb;
  ALTER TABLE "_news_v_locales" ADD COLUMN "version_content_seo_title" varchar;
  ALTER TABLE "_news_v_locales" ADD COLUMN "version_content_request_hint" varchar;
  ALTER TABLE "_news_v_locales" ADD COLUMN "version_content_process_image_id" integer;
  ALTER TABLE "_news_v_locales" ADD COLUMN "version_content_module_content" jsonb;
  ALTER TABLE "inquiries" ADD COLUMN "page_id" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "template" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "entry_location" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "page_url" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "referrer" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "whatsapp_number" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "customer_type" varchar;
  ALTER TABLE "contact" ADD COLUMN "contact_name" varchar;
  ALTER TABLE "contact" ADD COLUMN "contact_photo_id" integer;
  ALTER TABLE "contact_locales" ADD COLUMN "contact_intro" varchar;
  ALTER TABLE "contact_locales" ADD COLUMN "company_summary" varchar;
  ALTER TABLE "proof_metrics" ADD COLUMN "confirmed" boolean DEFAULT false;
  ALTER TABLE "pages_content_gallery" ADD CONSTRAINT "pages_content_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_content_gallery" ADD CONSTRAINT "pages_content_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_stages_gallery" ADD CONSTRAINT "pages_content_stages_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_content_stages_gallery" ADD CONSTRAINT "pages_content_stages_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_supply_gallery" ADD CONSTRAINT "pages_content_supply_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_content_supply_gallery" ADD CONSTRAINT "pages_content_supply_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content_supply"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_gallery" ADD CONSTRAINT "_pages_v_version_content_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_gallery" ADD CONSTRAINT "_pages_v_version_content_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_stages_gallery" ADD CONSTRAINT "_pages_v_version_content_stages_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_stages_gallery" ADD CONSTRAINT "_pages_v_version_content_stages_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_content_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_supply_gallery" ADD CONSTRAINT "_pages_v_version_content_supply_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_supply_gallery" ADD CONSTRAINT "_pages_v_version_content_supply_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_content_supply"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_gallery" ADD CONSTRAINT "news_content_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_content_gallery" ADD CONSTRAINT "news_content_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_stages_gallery" ADD CONSTRAINT "news_content_stages_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_content_stages_gallery" ADD CONSTRAINT "news_content_stages_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_content_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_supply_gallery" ADD CONSTRAINT "news_content_supply_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_content_supply_gallery" ADD CONSTRAINT "news_content_supply_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_content_supply"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_gallery" ADD CONSTRAINT "_news_v_version_content_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_gallery" ADD CONSTRAINT "_news_v_version_content_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_stages_gallery" ADD CONSTRAINT "_news_v_version_content_stages_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_stages_gallery" ADD CONSTRAINT "_news_v_version_content_stages_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_version_content_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_supply_gallery" ADD CONSTRAINT "_news_v_version_content_supply_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_supply_gallery" ADD CONSTRAINT "_news_v_version_content_supply_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_version_content_supply"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_content_gallery_order_idx" ON "pages_content_gallery" USING btree ("_order");
  CREATE INDEX "pages_content_gallery_parent_id_idx" ON "pages_content_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_content_gallery_locale_idx" ON "pages_content_gallery" USING btree ("_locale");
  CREATE INDEX "pages_content_gallery_image_idx" ON "pages_content_gallery" USING btree ("image_id");
  CREATE INDEX "pages_content_stages_gallery_order_idx" ON "pages_content_stages_gallery" USING btree ("_order");
  CREATE INDEX "pages_content_stages_gallery_parent_id_idx" ON "pages_content_stages_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_content_stages_gallery_locale_idx" ON "pages_content_stages_gallery" USING btree ("_locale");
  CREATE INDEX "pages_content_stages_gallery_image_idx" ON "pages_content_stages_gallery" USING btree ("image_id");
  CREATE INDEX "pages_content_supply_gallery_order_idx" ON "pages_content_supply_gallery" USING btree ("_order");
  CREATE INDEX "pages_content_supply_gallery_parent_id_idx" ON "pages_content_supply_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_content_supply_gallery_locale_idx" ON "pages_content_supply_gallery" USING btree ("_locale");
  CREATE INDEX "pages_content_supply_gallery_image_idx" ON "pages_content_supply_gallery" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_content_gallery_order_idx" ON "_pages_v_version_content_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_gallery_parent_id_idx" ON "_pages_v_version_content_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_gallery_locale_idx" ON "_pages_v_version_content_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_gallery_image_idx" ON "_pages_v_version_content_gallery" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_content_stages_gallery_order_idx" ON "_pages_v_version_content_stages_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_stages_gallery_parent_id_idx" ON "_pages_v_version_content_stages_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_stages_gallery_locale_idx" ON "_pages_v_version_content_stages_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_stages_gallery_image_idx" ON "_pages_v_version_content_stages_gallery" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_content_supply_gallery_order_idx" ON "_pages_v_version_content_supply_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_supply_gallery_parent_id_idx" ON "_pages_v_version_content_supply_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_supply_gallery_locale_idx" ON "_pages_v_version_content_supply_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_supply_gallery_image_idx" ON "_pages_v_version_content_supply_gallery" USING btree ("image_id");
  CREATE INDEX "news_content_gallery_order_idx" ON "news_content_gallery" USING btree ("_order");
  CREATE INDEX "news_content_gallery_parent_id_idx" ON "news_content_gallery" USING btree ("_parent_id");
  CREATE INDEX "news_content_gallery_locale_idx" ON "news_content_gallery" USING btree ("_locale");
  CREATE INDEX "news_content_gallery_image_idx" ON "news_content_gallery" USING btree ("image_id");
  CREATE INDEX "news_content_stages_gallery_order_idx" ON "news_content_stages_gallery" USING btree ("_order");
  CREATE INDEX "news_content_stages_gallery_parent_id_idx" ON "news_content_stages_gallery" USING btree ("_parent_id");
  CREATE INDEX "news_content_stages_gallery_locale_idx" ON "news_content_stages_gallery" USING btree ("_locale");
  CREATE INDEX "news_content_stages_gallery_image_idx" ON "news_content_stages_gallery" USING btree ("image_id");
  CREATE INDEX "news_content_supply_gallery_order_idx" ON "news_content_supply_gallery" USING btree ("_order");
  CREATE INDEX "news_content_supply_gallery_parent_id_idx" ON "news_content_supply_gallery" USING btree ("_parent_id");
  CREATE INDEX "news_content_supply_gallery_locale_idx" ON "news_content_supply_gallery" USING btree ("_locale");
  CREATE INDEX "news_content_supply_gallery_image_idx" ON "news_content_supply_gallery" USING btree ("image_id");
  CREATE INDEX "_news_v_version_content_gallery_order_idx" ON "_news_v_version_content_gallery" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_gallery_parent_id_idx" ON "_news_v_version_content_gallery" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_gallery_locale_idx" ON "_news_v_version_content_gallery" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_gallery_image_idx" ON "_news_v_version_content_gallery" USING btree ("image_id");
  CREATE INDEX "_news_v_version_content_stages_gallery_order_idx" ON "_news_v_version_content_stages_gallery" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_stages_gallery_parent_id_idx" ON "_news_v_version_content_stages_gallery" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_stages_gallery_locale_idx" ON "_news_v_version_content_stages_gallery" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_stages_gallery_image_idx" ON "_news_v_version_content_stages_gallery" USING btree ("image_id");
  CREATE INDEX "_news_v_version_content_supply_gallery_order_idx" ON "_news_v_version_content_supply_gallery" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_supply_gallery_parent_id_idx" ON "_news_v_version_content_supply_gallery" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_supply_gallery_locale_idx" ON "_news_v_version_content_supply_gallery" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_supply_gallery_image_idx" ON "_news_v_version_content_supply_gallery" USING btree ("image_id");
  ALTER TABLE "pages_content_stages" ADD CONSTRAINT "pages_content_stages_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_content_supply" ADD CONSTRAINT "pages_content_supply_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_content_process_image_id_media_id_fk" FOREIGN KEY ("content_process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_stages" ADD CONSTRAINT "_pages_v_version_content_stages_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_supply" ADD CONSTRAINT "_pages_v_version_content_supply_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_content_process_image_id_media_id_fk" FOREIGN KEY ("version_content_process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_content_stages" ADD CONSTRAINT "news_content_stages_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_content_supply" ADD CONSTRAINT "news_content_supply_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_content_process_image_id_media_id_fk" FOREIGN KEY ("content_process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_stages" ADD CONSTRAINT "_news_v_version_content_stages_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_supply" ADD CONSTRAINT "_news_v_version_content_supply_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_version_content_process_image_id_media_id_fk" FOREIGN KEY ("version_content_process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_contact_photo_id_media_id_fk" FOREIGN KEY ("contact_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_content_stages_process_image_idx" ON "pages_content_stages" USING btree ("process_image_id");
  CREATE INDEX "pages_content_supply_process_image_idx" ON "pages_content_supply" USING btree ("process_image_id");
  CREATE INDEX "pages_content_content_process_image_idx" ON "pages_locales" USING btree ("content_process_image_id");
  CREATE INDEX "_pages_v_version_content_stages_process_image_idx" ON "_pages_v_version_content_stages" USING btree ("process_image_id");
  CREATE INDEX "_pages_v_version_content_supply_process_image_idx" ON "_pages_v_version_content_supply" USING btree ("process_image_id");
  CREATE INDEX "_pages_v_version_content_version_content_process_image_idx" ON "_pages_v_locales" USING btree ("version_content_process_image_id");
  CREATE INDEX "news_content_stages_process_image_idx" ON "news_content_stages" USING btree ("process_image_id");
  CREATE INDEX "news_content_supply_process_image_idx" ON "news_content_supply" USING btree ("process_image_id");
  CREATE INDEX "news_content_content_process_image_idx" ON "news_locales" USING btree ("content_process_image_id");
  CREATE INDEX "_news_v_version_content_stages_process_image_idx" ON "_news_v_version_content_stages" USING btree ("process_image_id");
  CREATE INDEX "_news_v_version_content_supply_process_image_idx" ON "_news_v_version_content_supply" USING btree ("process_image_id");
  CREATE INDEX "_news_v_version_content_version_content_process_image_idx" ON "_news_v_locales" USING btree ("version_content_process_image_id");
  CREATE INDEX "contact_contact_photo_idx" ON "contact" USING btree ("contact_photo_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_content_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_content_stages_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_content_supply_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_content_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_content_stages_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_content_supply_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_content_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_content_stages_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_content_supply_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_version_content_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_version_content_stages_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_version_content_supply_gallery" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_content_gallery" CASCADE;
  DROP TABLE "pages_content_stages_gallery" CASCADE;
  DROP TABLE "pages_content_supply_gallery" CASCADE;
  DROP TABLE "_pages_v_version_content_gallery" CASCADE;
  DROP TABLE "_pages_v_version_content_stages_gallery" CASCADE;
  DROP TABLE "_pages_v_version_content_supply_gallery" CASCADE;
  DROP TABLE "news_content_gallery" CASCADE;
  DROP TABLE "news_content_stages_gallery" CASCADE;
  DROP TABLE "news_content_supply_gallery" CASCADE;
  DROP TABLE "_news_v_version_content_gallery" CASCADE;
  DROP TABLE "_news_v_version_content_stages_gallery" CASCADE;
  DROP TABLE "_news_v_version_content_supply_gallery" CASCADE;
  ALTER TABLE "pages_content_stages" DROP CONSTRAINT "pages_content_stages_process_image_id_media_id_fk";
  
  ALTER TABLE "pages_content_supply" DROP CONSTRAINT "pages_content_supply_process_image_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_content_process_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_version_content_stages" DROP CONSTRAINT "_pages_v_version_content_stages_process_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_version_content_supply" DROP CONSTRAINT "_pages_v_version_content_supply_process_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_locales" DROP CONSTRAINT "_pages_v_locales_version_content_process_image_id_media_id_fk";
  
  ALTER TABLE "news_content_stages" DROP CONSTRAINT "news_content_stages_process_image_id_media_id_fk";
  
  ALTER TABLE "news_content_supply" DROP CONSTRAINT "news_content_supply_process_image_id_media_id_fk";
  
  ALTER TABLE "news_locales" DROP CONSTRAINT "news_locales_content_process_image_id_media_id_fk";
  
  ALTER TABLE "_news_v_version_content_stages" DROP CONSTRAINT "_news_v_version_content_stages_process_image_id_media_id_fk";
  
  ALTER TABLE "_news_v_version_content_supply" DROP CONSTRAINT "_news_v_version_content_supply_process_image_id_media_id_fk";
  
  ALTER TABLE "_news_v_locales" DROP CONSTRAINT "_news_v_locales_version_content_process_image_id_media_id_fk";
  
  ALTER TABLE "contact" DROP CONSTRAINT "contact_contact_photo_id_media_id_fk";
  
  ALTER TABLE "pages_content_stages_products" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_content_stages_products";
  CREATE TYPE "public"."enum_pages_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'depth');
  ALTER TABLE "pages_content_stages_products" ALTER COLUMN "value" SET DATA TYPE "public"."enum_pages_content_stages_products" USING "value"::"public"."enum_pages_content_stages_products";
  ALTER TABLE "pages" ALTER COLUMN "page_id" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_page_id";
  CREATE TYPE "public"."enum_pages_page_id" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'catalog', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'beer', 'juice', 'bottled-water', 'dairy', 'water', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'electroplating', 'chemical', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'general-industry', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'solutions', 'oem', 'distributors', 'private-label', 'supply', 'end-users', 'knowledge', 'selection', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'maintenance', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms', 'depth');
  ALTER TABLE "pages" ALTER COLUMN "page_id" SET DATA TYPE "public"."enum_pages_page_id" USING "page_id"::"public"."enum_pages_page_id";
  ALTER TABLE "_pages_v_version_content_stages_products" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_content_stages_products";
  CREATE TYPE "public"."enum__pages_v_version_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'depth');
  ALTER TABLE "_pages_v_version_content_stages_products" ALTER COLUMN "value" SET DATA TYPE "public"."enum__pages_v_version_content_stages_products" USING "value"::"public"."enum__pages_v_version_content_stages_products";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_id" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_page_id";
  CREATE TYPE "public"."enum__pages_v_version_page_id" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'catalog', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'beer', 'juice', 'bottled-water', 'dairy', 'water', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'electroplating', 'chemical', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'general-industry', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'solutions', 'oem', 'distributors', 'private-label', 'supply', 'end-users', 'knowledge', 'selection', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'maintenance', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms', 'depth');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_id" SET DATA TYPE "public"."enum__pages_v_version_page_id" USING "version_page_id"::"public"."enum__pages_v_version_page_id";
  ALTER TABLE "products" ALTER COLUMN "page_id" SET DATA TYPE text;
  DROP TYPE "public"."enum_products_page_id";
  CREATE TYPE "public"."enum_products_page_id" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'depth');
  ALTER TABLE "products" ALTER COLUMN "page_id" SET DATA TYPE "public"."enum_products_page_id" USING "page_id"::"public"."enum_products_page_id";
  ALTER TABLE "cross_references" ALTER COLUMN "page_id" SET DATA TYPE text;
  DROP TYPE "public"."enum_cross_references_page_id";
  CREATE TYPE "public"."enum_cross_references_page_id" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'depth');
  ALTER TABLE "cross_references" ALTER COLUMN "page_id" SET DATA TYPE "public"."enum_cross_references_page_id" USING "page_id"::"public"."enum_cross_references_page_id";
  ALTER TABLE "news_content_stages_products" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_news_content_stages_products";
  CREATE TYPE "public"."enum_news_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'depth');
  ALTER TABLE "news_content_stages_products" ALTER COLUMN "value" SET DATA TYPE "public"."enum_news_content_stages_products" USING "value"::"public"."enum_news_content_stages_products";
  ALTER TABLE "news_related_pages" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_news_related_pages";
  CREATE TYPE "public"."enum_news_related_pages" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'catalog', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'beer', 'juice', 'bottled-water', 'dairy', 'water', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'electroplating', 'chemical', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'general-industry', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'solutions', 'oem', 'distributors', 'private-label', 'supply', 'end-users', 'knowledge', 'selection', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'maintenance', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms', 'depth');
  ALTER TABLE "news_related_pages" ALTER COLUMN "value" SET DATA TYPE "public"."enum_news_related_pages" USING "value"::"public"."enum_news_related_pages";
  ALTER TABLE "_news_v_version_content_stages_products" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__news_v_version_content_stages_products";
  CREATE TYPE "public"."enum__news_v_version_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'depth');
  ALTER TABLE "_news_v_version_content_stages_products" ALTER COLUMN "value" SET DATA TYPE "public"."enum__news_v_version_content_stages_products" USING "value"::"public"."enum__news_v_version_content_stages_products";
  ALTER TABLE "_news_v_version_related_pages" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__news_v_version_related_pages";
  CREATE TYPE "public"."enum__news_v_version_related_pages" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'catalog', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'beer', 'juice', 'bottled-water', 'dairy', 'water', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'electroplating', 'chemical', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'general-industry', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'solutions', 'oem', 'distributors', 'private-label', 'supply', 'end-users', 'knowledge', 'selection', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'maintenance', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms', 'depth');
  ALTER TABLE "_news_v_version_related_pages" ALTER COLUMN "value" SET DATA TYPE "public"."enum__news_v_version_related_pages" USING "value"::"public"."enum__news_v_version_related_pages";
  DROP INDEX "pages_content_stages_process_image_idx";
  DROP INDEX "pages_content_supply_process_image_idx";
  DROP INDEX "pages_content_content_process_image_idx";
  DROP INDEX "_pages_v_version_content_stages_process_image_idx";
  DROP INDEX "_pages_v_version_content_supply_process_image_idx";
  DROP INDEX "_pages_v_version_content_version_content_process_image_idx";
  DROP INDEX "news_content_stages_process_image_idx";
  DROP INDEX "news_content_supply_process_image_idx";
  DROP INDEX "news_content_content_process_image_idx";
  DROP INDEX "_news_v_version_content_stages_process_image_idx";
  DROP INDEX "_news_v_version_content_supply_process_image_idx";
  DROP INDEX "_news_v_version_content_version_content_process_image_idx";
  DROP INDEX "contact_contact_photo_idx";
  ALTER TABLE "pages_content_stages" DROP COLUMN "seo_title";
  ALTER TABLE "pages_content_stages" DROP COLUMN "request_hint";
  ALTER TABLE "pages_content_stages" DROP COLUMN "process_image_id";
  ALTER TABLE "pages_content_stages" DROP COLUMN "module_content";
  ALTER TABLE "pages_content_supply" DROP COLUMN "seo_title";
  ALTER TABLE "pages_content_supply" DROP COLUMN "request_hint";
  ALTER TABLE "pages_content_supply" DROP COLUMN "process_image_id";
  ALTER TABLE "pages_content_supply" DROP COLUMN "module_content";
  ALTER TABLE "pages" DROP COLUMN "index_status";
  ALTER TABLE "pages" DROP COLUMN "launch_batch";
  ALTER TABLE "pages" DROP COLUMN "main_keyword";
  ALTER TABLE "pages" DROP COLUMN "is_live";
  ALTER TABLE "pages_locales" DROP COLUMN "content_seo_title";
  ALTER TABLE "pages_locales" DROP COLUMN "content_request_hint";
  ALTER TABLE "pages_locales" DROP COLUMN "content_process_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN "content_module_content";
  ALTER TABLE "_pages_v_version_content_stages" DROP COLUMN "seo_title";
  ALTER TABLE "_pages_v_version_content_stages" DROP COLUMN "request_hint";
  ALTER TABLE "_pages_v_version_content_stages" DROP COLUMN "process_image_id";
  ALTER TABLE "_pages_v_version_content_stages" DROP COLUMN "module_content";
  ALTER TABLE "_pages_v_version_content_supply" DROP COLUMN "seo_title";
  ALTER TABLE "_pages_v_version_content_supply" DROP COLUMN "request_hint";
  ALTER TABLE "_pages_v_version_content_supply" DROP COLUMN "process_image_id";
  ALTER TABLE "_pages_v_version_content_supply" DROP COLUMN "module_content";
  ALTER TABLE "_pages_v" DROP COLUMN "version_index_status";
  ALTER TABLE "_pages_v" DROP COLUMN "version_launch_batch";
  ALTER TABLE "_pages_v" DROP COLUMN "version_main_keyword";
  ALTER TABLE "_pages_v" DROP COLUMN "version_is_live";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_content_seo_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_content_request_hint";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_content_process_image_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_content_module_content";
  ALTER TABLE "news_content_stages" DROP COLUMN "seo_title";
  ALTER TABLE "news_content_stages" DROP COLUMN "request_hint";
  ALTER TABLE "news_content_stages" DROP COLUMN "process_image_id";
  ALTER TABLE "news_content_stages" DROP COLUMN "module_content";
  ALTER TABLE "news_content_supply" DROP COLUMN "seo_title";
  ALTER TABLE "news_content_supply" DROP COLUMN "request_hint";
  ALTER TABLE "news_content_supply" DROP COLUMN "process_image_id";
  ALTER TABLE "news_content_supply" DROP COLUMN "module_content";
  ALTER TABLE "news_locales" DROP COLUMN "content_seo_title";
  ALTER TABLE "news_locales" DROP COLUMN "content_request_hint";
  ALTER TABLE "news_locales" DROP COLUMN "content_process_image_id";
  ALTER TABLE "news_locales" DROP COLUMN "content_module_content";
  ALTER TABLE "_news_v_version_content_stages" DROP COLUMN "seo_title";
  ALTER TABLE "_news_v_version_content_stages" DROP COLUMN "request_hint";
  ALTER TABLE "_news_v_version_content_stages" DROP COLUMN "process_image_id";
  ALTER TABLE "_news_v_version_content_stages" DROP COLUMN "module_content";
  ALTER TABLE "_news_v_version_content_supply" DROP COLUMN "seo_title";
  ALTER TABLE "_news_v_version_content_supply" DROP COLUMN "request_hint";
  ALTER TABLE "_news_v_version_content_supply" DROP COLUMN "process_image_id";
  ALTER TABLE "_news_v_version_content_supply" DROP COLUMN "module_content";
  ALTER TABLE "_news_v_locales" DROP COLUMN "version_content_seo_title";
  ALTER TABLE "_news_v_locales" DROP COLUMN "version_content_request_hint";
  ALTER TABLE "_news_v_locales" DROP COLUMN "version_content_process_image_id";
  ALTER TABLE "_news_v_locales" DROP COLUMN "version_content_module_content";
  ALTER TABLE "inquiries" DROP COLUMN "page_id";
  ALTER TABLE "inquiries" DROP COLUMN "template";
  ALTER TABLE "inquiries" DROP COLUMN "entry_location";
  ALTER TABLE "inquiries" DROP COLUMN "page_url";
  ALTER TABLE "inquiries" DROP COLUMN "referrer";
  ALTER TABLE "inquiries" DROP COLUMN "whatsapp_number";
  ALTER TABLE "inquiries" DROP COLUMN "customer_type";
  ALTER TABLE "contact" DROP COLUMN "contact_name";
  ALTER TABLE "contact" DROP COLUMN "contact_photo_id";
  ALTER TABLE "contact_locales" DROP COLUMN "contact_intro";
  ALTER TABLE "contact_locales" DROP COLUMN "company_summary";
  ALTER TABLE "proof_metrics" DROP COLUMN "confirmed";
  DROP TYPE "public"."enum_pages_content_gallery_kind";
  DROP TYPE "public"."enum_pages_content_stages_gallery_kind";
  DROP TYPE "public"."enum_pages_content_supply_gallery_kind";
  DROP TYPE "public"."enum__pages_v_version_content_gallery_kind";
  DROP TYPE "public"."enum__pages_v_version_content_stages_gallery_kind";
  DROP TYPE "public"."enum__pages_v_version_content_supply_gallery_kind";
  DROP TYPE "public"."enum_news_content_gallery_kind";
  DROP TYPE "public"."enum_news_content_stages_gallery_kind";
  DROP TYPE "public"."enum_news_content_supply_gallery_kind";
  DROP TYPE "public"."enum__news_v_version_content_gallery_kind";
  DROP TYPE "public"."enum__news_v_version_content_stages_gallery_kind";
  DROP TYPE "public"."enum__news_v_version_content_supply_gallery_kind";`)
}
