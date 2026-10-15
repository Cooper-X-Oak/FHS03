import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr', 'de', 'es', 'ar', 'zh', 'ko', 'ja', 'ru', 'pt', 'vi', 'th');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_pages_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories');
  CREATE TYPE "public"."enum_pages_page_id" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'catalog', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'beer', 'juice', 'bottled-water', 'dairy', 'water', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'electroplating', 'chemical', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'general-industry', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'solutions', 'oem', 'distributors', 'private-label', 'supply', 'end-users', 'knowledge', 'selection', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'maintenance', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories');
  CREATE TYPE "public"."enum__pages_v_version_page_id" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'catalog', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'beer', 'juice', 'bottled-water', 'dairy', 'water', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'electroplating', 'chemical', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'general-industry', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'solutions', 'oem', 'distributors', 'private-label', 'supply', 'end-users', 'knowledge', 'selection', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'maintenance', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'fr', 'de', 'es', 'ar', 'zh', 'ko', 'ja', 'ru', 'pt', 'vi', 'th');
  CREATE TYPE "public"."enum_products_page_id" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories');
  CREATE TYPE "public"."enum_cross_references_page_id" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius');
  CREATE TYPE "public"."enum_news_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories');
  CREATE TYPE "public"."enum_news_related_pages" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'catalog', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'beer', 'juice', 'bottled-water', 'dairy', 'water', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'electroplating', 'chemical', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'general-industry', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'solutions', 'oem', 'distributors', 'private-label', 'supply', 'end-users', 'knowledge', 'selection', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'maintenance', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_content_stages_products" AS ENUM('cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories');
  CREATE TYPE "public"."enum__news_v_version_related_pages" AS ENUM('home', 'products', 'cartridges', 'pes', 'ptfe', 'pleated', 'high-flow', 'pp', 'nylon', 'gf', 'pvdf', 'melt-blown', 'wound', 'carbon', 'capsule', 'metal', 'other-cartridges', 'housings', 'pp-bag-housings', 'bag-housings', 'ss-bag-housings', 'cartridge-housings', 'pvdf-housings', 'duplex', 'high-flow-housings', 'special-housings', 'bags', 'liquid-bags', 'nylon-mesh', 'anode', 'oil-absorbing', 'membranes', 'ro-membranes', 'uf-membranes', 'filter-paper', 'plating-paper', 'food-paper', 'lab-paper', 'inkjet', 'videojet', 'domino', 'markem-imaje', 'hitachi', 'willett', 'lab', 'lab-membranes', 'cup-filters', 'presses', 'accessories', 'catalog', 'replacement', 'pall', '3m-cuno', 'eaton', 'parker', 'sartorius', 'applications', 'food-beverage', 'wine', 'edible-oil', 'beer', 'juice', 'bottled-water', 'dairy', 'water', 'ro-pretreatment', 'desalination', 'ultrapure', 'wastewater', 'electroplating', 'chemical', 'paint-coatings', 'ink-manufacturing', 'inkjet-printing', 'general-industry', 'oil-gas', 'energy', 'pharma', 'microelectronics', 'solutions', 'oem', 'distributors', 'private-label', 'supply', 'end-users', 'knowledge', 'selection', 'choose-cartridge', 'micron-rating', 'bag-sizes', 'membrane-materials', 'membrane-vs-depth', 'absolute-vs-nominal', 'bag-vs-cartridge', 'felt-vs-mesh', 'housing-sizing', 'ss304-vs-316l', '022-vs-045', 'ro-prefilter-micron', 'maintenance', 'cartridge-life', 'plating-problems', 'cases', 'news', 'about', 'support', 'quote', 'privacy', 'terms');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('en', 'fr', 'de', 'es', 'ar', 'zh', 'ko', 'ja', 'ru', 'pt', 'vi', 'th');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'quoted', 'won', 'lost');
  CREATE TYPE "public"."enum_inquiries_sales_email_status" AS ENUM('pending', 'sent');
  CREATE TYPE "public"."enum_inquiries_buyer_email_status" AS ENUM('pending', 'sent');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_content_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"table" jsonb
  );
  
  CREATE TABLE "pages_content_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "pages_content_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_content_stages_products" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_content_stages_products",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_content_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_content_mistakes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_content_selection" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_content_supply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_content_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_id" "enum_pages_page_id",
  	"path" varchar,
  	"title" varchar,
  	"h1" varchar,
  	"template" varchar,
  	"stage" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"content_description" varchar,
  	"content_intro" varchar,
  	"content_form_prompt" varchar,
  	"content_topics" jsonb,
  	"translation_complete" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"table" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_stages_products" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_version_content_stages_products",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_content_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_mistakes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_selection" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_supply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_content_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_page_id" "enum__pages_v_version_page_id",
  	"version_path" varchar,
  	"version_title" varchar,
  	"version_h1" varchar,
  	"version_template" varchar,
  	"version_stage" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_content_description" varchar,
  	"version_content_intro" varchar,
  	"version_content_form_prompt" varchar,
  	"version_content_topics" jsonb,
  	"version_translation_complete" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_id" "enum_products_page_id" NOT NULL,
  	"model" varchar NOT NULL,
  	"material" varchar,
  	"micron_range" varchar,
  	"sizes" varchar,
  	"connections" varchar,
  	"datasheet_id" integer,
  	"approved" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "cross_references" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_id" "enum_cross_references_page_id" NOT NULL,
  	"brand" varchar NOT NULL,
  	"part_number" varchar NOT NULL,
  	"equivalent" varchar NOT NULL,
  	"spec" varchar NOT NULL,
  	"checked_at" timestamp(3) with time zone NOT NULL,
  	"checked_by" varchar NOT NULL,
  	"verified" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_content_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "news_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"table" jsonb
  );
  
  CREATE TABLE "news_content_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "news_content_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "news_content_stages_products" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_news_content_stages_products",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "news_content_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_content_mistakes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "news_content_selection" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "news_content_supply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_content_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "news_related_pages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_news_related_pages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"content_description" varchar,
  	"content_intro" varchar,
  	"content_form_prompt" varchar,
  	"content_topics" jsonb,
  	"translation_complete" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_news_v_version_content_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"table" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_stages_products" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__news_v_version_content_stages_products",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_news_v_version_content_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_mistakes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_selection" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_supply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_content_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_related_pages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__news_v_version_related_pages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_content_description" varchar,
  	"version_content_intro" varchar,
  	"version_content_form_prompt" varchar,
  	"version_content_topics" jsonb,
  	"version_translation_complete" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "cases_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"industry" varchar,
  	"country" varchar,
  	"before" varchar,
  	"after" varchar,
  	"approved" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"name" varchar,
  	"email" varchar,
  	"company" varchar,
  	"country" varchar,
  	"brand" varchar,
  	"part_number" varchar,
  	"application" varchar,
  	"quantity" varchar,
  	"source_page" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"utm_term" varchar,
  	"utm_content" varchar,
  	"message" varchar,
  	"status" "enum_inquiries_status" DEFAULT 'new',
  	"sales_email_status" "enum_inquiries_sales_email_status" DEFAULT 'pending',
  	"buyer_email_status" "enum_inquiries_buyer_email_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inquiries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"attachments_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "attachments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"pages_id" integer,
  	"products_id" integer,
  	"cross_references_id" integer,
  	"news_id" integer,
  	"cases_id" integer,
  	"inquiries_id" integer,
  	"media_id" integer,
  	"attachments_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sales_email" varchar,
  	"whatsapp" varchar,
  	"wechat_q_r_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_locales" (
  	"whatsapp_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "proof_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"approved" boolean DEFAULT false
  );
  
  CREATE TABLE "proof" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "certifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"certificate_id" integer NOT NULL,
  	"approved" boolean DEFAULT false
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_modules" ADD CONSTRAINT "pages_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_sections_paragraphs" ADD CONSTRAINT "pages_content_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_sections" ADD CONSTRAINT "pages_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_specs" ADD CONSTRAINT "pages_content_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_faq" ADD CONSTRAINT "pages_content_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_stages_products" ADD CONSTRAINT "pages_content_stages_products_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_content_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_stages" ADD CONSTRAINT "pages_content_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_mistakes" ADD CONSTRAINT "pages_content_mistakes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_selection" ADD CONSTRAINT "pages_content_selection_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_supply" ADD CONSTRAINT "pages_content_supply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_sources" ADD CONSTRAINT "pages_content_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_modules" ADD CONSTRAINT "_pages_v_version_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_sections_paragraphs" ADD CONSTRAINT "_pages_v_version_content_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_sections" ADD CONSTRAINT "_pages_v_version_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_specs" ADD CONSTRAINT "_pages_v_version_content_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_faq" ADD CONSTRAINT "_pages_v_version_content_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_stages_products" ADD CONSTRAINT "_pages_v_version_content_stages_products_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_version_content_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_stages" ADD CONSTRAINT "_pages_v_version_content_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_mistakes" ADD CONSTRAINT "_pages_v_version_content_mistakes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_selection" ADD CONSTRAINT "_pages_v_version_content_selection_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_supply" ADD CONSTRAINT "_pages_v_version_content_supply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_content_sources" ADD CONSTRAINT "_pages_v_version_content_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_datasheet_id_media_id_fk" FOREIGN KEY ("datasheet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_sections_paragraphs" ADD CONSTRAINT "news_content_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_sections" ADD CONSTRAINT "news_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_specs" ADD CONSTRAINT "news_content_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_faq" ADD CONSTRAINT "news_content_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_stages_products" ADD CONSTRAINT "news_content_stages_products_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_content_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_stages" ADD CONSTRAINT "news_content_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_mistakes" ADD CONSTRAINT "news_content_mistakes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_selection" ADD CONSTRAINT "news_content_selection_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_supply" ADD CONSTRAINT "news_content_supply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_content_sources" ADD CONSTRAINT "news_content_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_related_pages" ADD CONSTRAINT "news_related_pages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_sections_paragraphs" ADD CONSTRAINT "_news_v_version_content_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_version_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_sections" ADD CONSTRAINT "_news_v_version_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_specs" ADD CONSTRAINT "_news_v_version_content_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_faq" ADD CONSTRAINT "_news_v_version_content_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_stages_products" ADD CONSTRAINT "_news_v_version_content_stages_products_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v_version_content_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_stages" ADD CONSTRAINT "_news_v_version_content_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_mistakes" ADD CONSTRAINT "_news_v_version_content_mistakes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_selection" ADD CONSTRAINT "_news_v_version_content_selection_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_supply" ADD CONSTRAINT "_news_v_version_content_supply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_content_sources" ADD CONSTRAINT "_news_v_version_content_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_related_pages" ADD CONSTRAINT "_news_v_version_related_pages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cases_paragraphs" ADD CONSTRAINT "cases_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries_rels" ADD CONSTRAINT "inquiries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries_rels" ADD CONSTRAINT "inquiries_rels_attachments_fk" FOREIGN KEY ("attachments_id") REFERENCES "public"."attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cross_references_fk" FOREIGN KEY ("cross_references_id") REFERENCES "public"."cross_references"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cases_fk" FOREIGN KEY ("cases_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_attachments_fk" FOREIGN KEY ("attachments_id") REFERENCES "public"."attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_wechat_q_r_id_media_id_fk" FOREIGN KEY ("wechat_q_r_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_locales" ADD CONSTRAINT "contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "proof_metrics" ADD CONSTRAINT "proof_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_items" ADD CONSTRAINT "certifications_items_certificate_id_media_id_fk" FOREIGN KEY ("certificate_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_items" ADD CONSTRAINT "certifications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "pages_modules_order_idx" ON "pages_modules" USING btree ("_order");
  CREATE INDEX "pages_modules_parent_id_idx" ON "pages_modules" USING btree ("_parent_id");
  CREATE INDEX "pages_content_sections_paragraphs_order_idx" ON "pages_content_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_content_sections_paragraphs_parent_id_idx" ON "pages_content_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_content_sections_paragraphs_locale_idx" ON "pages_content_sections_paragraphs" USING btree ("_locale");
  CREATE INDEX "pages_content_sections_order_idx" ON "pages_content_sections" USING btree ("_order");
  CREATE INDEX "pages_content_sections_parent_id_idx" ON "pages_content_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_content_sections_locale_idx" ON "pages_content_sections" USING btree ("_locale");
  CREATE INDEX "pages_content_specs_order_idx" ON "pages_content_specs" USING btree ("_order");
  CREATE INDEX "pages_content_specs_parent_id_idx" ON "pages_content_specs" USING btree ("_parent_id");
  CREATE INDEX "pages_content_specs_locale_idx" ON "pages_content_specs" USING btree ("_locale");
  CREATE INDEX "pages_content_faq_order_idx" ON "pages_content_faq" USING btree ("_order");
  CREATE INDEX "pages_content_faq_parent_id_idx" ON "pages_content_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_content_faq_locale_idx" ON "pages_content_faq" USING btree ("_locale");
  CREATE INDEX "pages_content_stages_products_order_idx" ON "pages_content_stages_products" USING btree ("order");
  CREATE INDEX "pages_content_stages_products_parent_idx" ON "pages_content_stages_products" USING btree ("parent_id");
  CREATE INDEX "pages_content_stages_products_locale_idx" ON "pages_content_stages_products" USING btree ("locale");
  CREATE INDEX "pages_content_stages_order_idx" ON "pages_content_stages" USING btree ("_order");
  CREATE INDEX "pages_content_stages_parent_id_idx" ON "pages_content_stages" USING btree ("_parent_id");
  CREATE INDEX "pages_content_stages_locale_idx" ON "pages_content_stages" USING btree ("_locale");
  CREATE INDEX "pages_content_mistakes_order_idx" ON "pages_content_mistakes" USING btree ("_order");
  CREATE INDEX "pages_content_mistakes_parent_id_idx" ON "pages_content_mistakes" USING btree ("_parent_id");
  CREATE INDEX "pages_content_mistakes_locale_idx" ON "pages_content_mistakes" USING btree ("_locale");
  CREATE INDEX "pages_content_selection_order_idx" ON "pages_content_selection" USING btree ("_order");
  CREATE INDEX "pages_content_selection_parent_id_idx" ON "pages_content_selection" USING btree ("_parent_id");
  CREATE INDEX "pages_content_selection_locale_idx" ON "pages_content_selection" USING btree ("_locale");
  CREATE INDEX "pages_content_supply_order_idx" ON "pages_content_supply" USING btree ("_order");
  CREATE INDEX "pages_content_supply_parent_id_idx" ON "pages_content_supply" USING btree ("_parent_id");
  CREATE INDEX "pages_content_supply_locale_idx" ON "pages_content_supply" USING btree ("_locale");
  CREATE INDEX "pages_content_sources_order_idx" ON "pages_content_sources" USING btree ("_order");
  CREATE INDEX "pages_content_sources_parent_id_idx" ON "pages_content_sources" USING btree ("_parent_id");
  CREATE INDEX "pages_content_sources_locale_idx" ON "pages_content_sources" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_page_id_idx" ON "pages" USING btree ("page_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_modules_order_idx" ON "_pages_v_version_modules" USING btree ("_order");
  CREATE INDEX "_pages_v_version_modules_parent_id_idx" ON "_pages_v_version_modules" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_sections_paragraphs_order_idx" ON "_pages_v_version_content_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_sections_paragraphs_parent_id_idx" ON "_pages_v_version_content_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_sections_paragraphs_locale_idx" ON "_pages_v_version_content_sections_paragraphs" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_sections_order_idx" ON "_pages_v_version_content_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_sections_parent_id_idx" ON "_pages_v_version_content_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_sections_locale_idx" ON "_pages_v_version_content_sections" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_specs_order_idx" ON "_pages_v_version_content_specs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_specs_parent_id_idx" ON "_pages_v_version_content_specs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_specs_locale_idx" ON "_pages_v_version_content_specs" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_faq_order_idx" ON "_pages_v_version_content_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_faq_parent_id_idx" ON "_pages_v_version_content_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_faq_locale_idx" ON "_pages_v_version_content_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_stages_products_order_idx" ON "_pages_v_version_content_stages_products" USING btree ("order");
  CREATE INDEX "_pages_v_version_content_stages_products_parent_idx" ON "_pages_v_version_content_stages_products" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_content_stages_products_locale_idx" ON "_pages_v_version_content_stages_products" USING btree ("locale");
  CREATE INDEX "_pages_v_version_content_stages_order_idx" ON "_pages_v_version_content_stages" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_stages_parent_id_idx" ON "_pages_v_version_content_stages" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_stages_locale_idx" ON "_pages_v_version_content_stages" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_mistakes_order_idx" ON "_pages_v_version_content_mistakes" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_mistakes_parent_id_idx" ON "_pages_v_version_content_mistakes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_mistakes_locale_idx" ON "_pages_v_version_content_mistakes" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_selection_order_idx" ON "_pages_v_version_content_selection" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_selection_parent_id_idx" ON "_pages_v_version_content_selection" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_selection_locale_idx" ON "_pages_v_version_content_selection" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_supply_order_idx" ON "_pages_v_version_content_supply" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_supply_parent_id_idx" ON "_pages_v_version_content_supply" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_supply_locale_idx" ON "_pages_v_version_content_supply" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_content_sources_order_idx" ON "_pages_v_version_content_sources" USING btree ("_order");
  CREATE INDEX "_pages_v_version_content_sources_parent_id_idx" ON "_pages_v_version_content_sources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_content_sources_locale_idx" ON "_pages_v_version_content_sources" USING btree ("_locale");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_page_id_idx" ON "_pages_v" USING btree ("version_page_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_datasheet_idx" ON "products" USING btree ("datasheet_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");
  CREATE INDEX "cross_references_updated_at_idx" ON "cross_references" USING btree ("updated_at");
  CREATE INDEX "cross_references_created_at_idx" ON "cross_references" USING btree ("created_at");
  CREATE INDEX "news_content_sections_paragraphs_order_idx" ON "news_content_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "news_content_sections_paragraphs_parent_id_idx" ON "news_content_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "news_content_sections_paragraphs_locale_idx" ON "news_content_sections_paragraphs" USING btree ("_locale");
  CREATE INDEX "news_content_sections_order_idx" ON "news_content_sections" USING btree ("_order");
  CREATE INDEX "news_content_sections_parent_id_idx" ON "news_content_sections" USING btree ("_parent_id");
  CREATE INDEX "news_content_sections_locale_idx" ON "news_content_sections" USING btree ("_locale");
  CREATE INDEX "news_content_specs_order_idx" ON "news_content_specs" USING btree ("_order");
  CREATE INDEX "news_content_specs_parent_id_idx" ON "news_content_specs" USING btree ("_parent_id");
  CREATE INDEX "news_content_specs_locale_idx" ON "news_content_specs" USING btree ("_locale");
  CREATE INDEX "news_content_faq_order_idx" ON "news_content_faq" USING btree ("_order");
  CREATE INDEX "news_content_faq_parent_id_idx" ON "news_content_faq" USING btree ("_parent_id");
  CREATE INDEX "news_content_faq_locale_idx" ON "news_content_faq" USING btree ("_locale");
  CREATE INDEX "news_content_stages_products_order_idx" ON "news_content_stages_products" USING btree ("order");
  CREATE INDEX "news_content_stages_products_parent_idx" ON "news_content_stages_products" USING btree ("parent_id");
  CREATE INDEX "news_content_stages_products_locale_idx" ON "news_content_stages_products" USING btree ("locale");
  CREATE INDEX "news_content_stages_order_idx" ON "news_content_stages" USING btree ("_order");
  CREATE INDEX "news_content_stages_parent_id_idx" ON "news_content_stages" USING btree ("_parent_id");
  CREATE INDEX "news_content_stages_locale_idx" ON "news_content_stages" USING btree ("_locale");
  CREATE INDEX "news_content_mistakes_order_idx" ON "news_content_mistakes" USING btree ("_order");
  CREATE INDEX "news_content_mistakes_parent_id_idx" ON "news_content_mistakes" USING btree ("_parent_id");
  CREATE INDEX "news_content_mistakes_locale_idx" ON "news_content_mistakes" USING btree ("_locale");
  CREATE INDEX "news_content_selection_order_idx" ON "news_content_selection" USING btree ("_order");
  CREATE INDEX "news_content_selection_parent_id_idx" ON "news_content_selection" USING btree ("_parent_id");
  CREATE INDEX "news_content_selection_locale_idx" ON "news_content_selection" USING btree ("_locale");
  CREATE INDEX "news_content_supply_order_idx" ON "news_content_supply" USING btree ("_order");
  CREATE INDEX "news_content_supply_parent_id_idx" ON "news_content_supply" USING btree ("_parent_id");
  CREATE INDEX "news_content_supply_locale_idx" ON "news_content_supply" USING btree ("_locale");
  CREATE INDEX "news_content_sources_order_idx" ON "news_content_sources" USING btree ("_order");
  CREATE INDEX "news_content_sources_parent_id_idx" ON "news_content_sources" USING btree ("_parent_id");
  CREATE INDEX "news_content_sources_locale_idx" ON "news_content_sources" USING btree ("_locale");
  CREATE INDEX "news_related_pages_order_idx" ON "news_related_pages" USING btree ("order");
  CREATE INDEX "news_related_pages_parent_idx" ON "news_related_pages" USING btree ("parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_media_id_idx" ON "news_rels" USING btree ("media_id");
  CREATE INDEX "_news_v_version_content_sections_paragraphs_order_idx" ON "_news_v_version_content_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_sections_paragraphs_parent_id_idx" ON "_news_v_version_content_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_sections_paragraphs_locale_idx" ON "_news_v_version_content_sections_paragraphs" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_sections_order_idx" ON "_news_v_version_content_sections" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_sections_parent_id_idx" ON "_news_v_version_content_sections" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_sections_locale_idx" ON "_news_v_version_content_sections" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_specs_order_idx" ON "_news_v_version_content_specs" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_specs_parent_id_idx" ON "_news_v_version_content_specs" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_specs_locale_idx" ON "_news_v_version_content_specs" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_faq_order_idx" ON "_news_v_version_content_faq" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_faq_parent_id_idx" ON "_news_v_version_content_faq" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_faq_locale_idx" ON "_news_v_version_content_faq" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_stages_products_order_idx" ON "_news_v_version_content_stages_products" USING btree ("order");
  CREATE INDEX "_news_v_version_content_stages_products_parent_idx" ON "_news_v_version_content_stages_products" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_content_stages_products_locale_idx" ON "_news_v_version_content_stages_products" USING btree ("locale");
  CREATE INDEX "_news_v_version_content_stages_order_idx" ON "_news_v_version_content_stages" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_stages_parent_id_idx" ON "_news_v_version_content_stages" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_stages_locale_idx" ON "_news_v_version_content_stages" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_mistakes_order_idx" ON "_news_v_version_content_mistakes" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_mistakes_parent_id_idx" ON "_news_v_version_content_mistakes" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_mistakes_locale_idx" ON "_news_v_version_content_mistakes" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_selection_order_idx" ON "_news_v_version_content_selection" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_selection_parent_id_idx" ON "_news_v_version_content_selection" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_selection_locale_idx" ON "_news_v_version_content_selection" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_supply_order_idx" ON "_news_v_version_content_supply" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_supply_parent_id_idx" ON "_news_v_version_content_supply" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_supply_locale_idx" ON "_news_v_version_content_supply" USING btree ("_locale");
  CREATE INDEX "_news_v_version_content_sources_order_idx" ON "_news_v_version_content_sources" USING btree ("_order");
  CREATE INDEX "_news_v_version_content_sources_parent_id_idx" ON "_news_v_version_content_sources" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_content_sources_locale_idx" ON "_news_v_version_content_sources" USING btree ("_locale");
  CREATE INDEX "_news_v_version_related_pages_order_idx" ON "_news_v_version_related_pages" USING btree ("order");
  CREATE INDEX "_news_v_version_related_pages_parent_idx" ON "_news_v_version_related_pages" USING btree ("parent_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_media_id_idx" ON "_news_v_rels" USING btree ("media_id");
  CREATE INDEX "cases_paragraphs_order_idx" ON "cases_paragraphs" USING btree ("_order");
  CREATE INDEX "cases_paragraphs_parent_id_idx" ON "cases_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "cases_updated_at_idx" ON "cases" USING btree ("updated_at");
  CREATE INDEX "cases_created_at_idx" ON "cases" USING btree ("created_at");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE INDEX "inquiries_rels_order_idx" ON "inquiries_rels" USING btree ("order");
  CREATE INDEX "inquiries_rels_parent_idx" ON "inquiries_rels" USING btree ("parent_id");
  CREATE INDEX "inquiries_rels_path_idx" ON "inquiries_rels" USING btree ("path");
  CREATE INDEX "inquiries_rels_attachments_id_idx" ON "inquiries_rels" USING btree ("attachments_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "attachments_updated_at_idx" ON "attachments" USING btree ("updated_at");
  CREATE INDEX "attachments_created_at_idx" ON "attachments" USING btree ("created_at");
  CREATE UNIQUE INDEX "attachments_filename_idx" ON "attachments" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_cross_references_id_idx" ON "payload_locked_documents_rels" USING btree ("cross_references_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("cases_id");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_attachments_id_idx" ON "payload_locked_documents_rels" USING btree ("attachments_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "contact_wechat_q_r_idx" ON "contact" USING btree ("wechat_q_r_id");
  CREATE UNIQUE INDEX "contact_locales_locale_parent_id_unique" ON "contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "proof_metrics_order_idx" ON "proof_metrics" USING btree ("_order");
  CREATE INDEX "proof_metrics_parent_id_idx" ON "proof_metrics" USING btree ("_parent_id");
  CREATE INDEX "certifications_items_order_idx" ON "certifications_items" USING btree ("_order");
  CREATE INDEX "certifications_items_parent_id_idx" ON "certifications_items" USING btree ("_parent_id");
  CREATE INDEX "certifications_items_certificate_idx" ON "certifications_items" USING btree ("certificate_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "pages_modules" CASCADE;
  DROP TABLE "pages_content_sections_paragraphs" CASCADE;
  DROP TABLE "pages_content_sections" CASCADE;
  DROP TABLE "pages_content_specs" CASCADE;
  DROP TABLE "pages_content_faq" CASCADE;
  DROP TABLE "pages_content_stages_products" CASCADE;
  DROP TABLE "pages_content_stages" CASCADE;
  DROP TABLE "pages_content_mistakes" CASCADE;
  DROP TABLE "pages_content_selection" CASCADE;
  DROP TABLE "pages_content_supply" CASCADE;
  DROP TABLE "pages_content_sources" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_version_modules" CASCADE;
  DROP TABLE "_pages_v_version_content_sections_paragraphs" CASCADE;
  DROP TABLE "_pages_v_version_content_sections" CASCADE;
  DROP TABLE "_pages_v_version_content_specs" CASCADE;
  DROP TABLE "_pages_v_version_content_faq" CASCADE;
  DROP TABLE "_pages_v_version_content_stages_products" CASCADE;
  DROP TABLE "_pages_v_version_content_stages" CASCADE;
  DROP TABLE "_pages_v_version_content_mistakes" CASCADE;
  DROP TABLE "_pages_v_version_content_selection" CASCADE;
  DROP TABLE "_pages_v_version_content_supply" CASCADE;
  DROP TABLE "_pages_v_version_content_sources" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "cross_references" CASCADE;
  DROP TABLE "news_content_sections_paragraphs" CASCADE;
  DROP TABLE "news_content_sections" CASCADE;
  DROP TABLE "news_content_specs" CASCADE;
  DROP TABLE "news_content_faq" CASCADE;
  DROP TABLE "news_content_stages_products" CASCADE;
  DROP TABLE "news_content_stages" CASCADE;
  DROP TABLE "news_content_mistakes" CASCADE;
  DROP TABLE "news_content_selection" CASCADE;
  DROP TABLE "news_content_supply" CASCADE;
  DROP TABLE "news_content_sources" CASCADE;
  DROP TABLE "news_related_pages" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v_version_content_sections_paragraphs" CASCADE;
  DROP TABLE "_news_v_version_content_sections" CASCADE;
  DROP TABLE "_news_v_version_content_specs" CASCADE;
  DROP TABLE "_news_v_version_content_faq" CASCADE;
  DROP TABLE "_news_v_version_content_stages_products" CASCADE;
  DROP TABLE "_news_v_version_content_stages" CASCADE;
  DROP TABLE "_news_v_version_content_mistakes" CASCADE;
  DROP TABLE "_news_v_version_content_selection" CASCADE;
  DROP TABLE "_news_v_version_content_supply" CASCADE;
  DROP TABLE "_news_v_version_content_sources" CASCADE;
  DROP TABLE "_news_v_version_related_pages" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "cases_paragraphs" CASCADE;
  DROP TABLE "cases" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "inquiries_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "attachments" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_locales" CASCADE;
  DROP TABLE "proof_metrics" CASCADE;
  DROP TABLE "proof" CASCADE;
  DROP TABLE "certifications_items" CASCADE;
  DROP TABLE "certifications" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_content_stages_products";
  DROP TYPE "public"."enum_pages_page_id";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_content_stages_products";
  DROP TYPE "public"."enum__pages_v_version_page_id";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_products_page_id";
  DROP TYPE "public"."enum_cross_references_page_id";
  DROP TYPE "public"."enum_news_content_stages_products";
  DROP TYPE "public"."enum_news_related_pages";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_content_stages_products";
  DROP TYPE "public"."enum__news_v_version_related_pages";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_inquiries_sales_email_status";
  DROP TYPE "public"."enum_inquiries_buyer_email_status";`)
}
