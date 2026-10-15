import {
  catalogModels,
  catalogPath,
  catalogSlug,
  findModel,
  modelPage,
  modelContent,
  modelIndexable,
} from "@/cms/catalog";
import { pageById } from "@/lib/sitemap";
import { draftMode } from "next/headers";
import { publicContent } from "@/content/public-content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicPages, pages, sitemap } from "@/lib/sitemap";
import {
  publishedNews,
  newsSlug,
  newsPath,
  findNews,
  newsPage,
  newsContent,
} from "@/cms/news";
import { assertPageCoverage, getPageContent } from "@/cms/content";
import { SiteShell } from "@/components/SiteShell";
import { T1Home } from "@/templates/T1Home";
import { T3ProductLanding } from "@/templates/T3ProductLanding";
import { T9Tool } from "@/templates/T9Tool";
import { T2SectionHub } from "@/templates/T2SectionHub";
import { T4CrossReference } from "@/templates/T4CrossReference";
import { T5Application } from "@/templates/T5Application";
import { T6CustomerType } from "@/templates/T6CustomerType";
import { T7Article } from "@/templates/T7Article";
import { T8Archive } from "@/templates/T8Archive";
import { T10Company } from "@/templates/T10Company";
type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ slug?: string[] }>;
};
export const dynamicParams = true;
export const revalidate = false;
export async function generateStaticParams() {
  await assertPageCoverage();
  return [
    ...publicPages.map((p) => p.path),
    ...(await publishedNews()).map((doc) => newsPath(doc.slug)),
    ...(await catalogModels()).map((doc) => catalogPath(doc.slug!)),
  ].map((path) => ({ slug: path.split("/").filter(Boolean) }));
}
async function resolve(params: Props["params"]) {
  const { slug = [] } = await params;
  const path = `/${slug.join("/")}${slug.length ? "/" : ""}`;
  const page = pages.find((p) => p.path === path);
  if (page) {
    const draft = (await draftMode()).isEnabled;
    if (!page.is_live && !draft) return null;
    return { page, content: await getPageContent(page.id, draft) };
  }
  const modelSlug = catalogSlug(path);
  if (modelSlug) {
    const model = await findModel(modelSlug);
    return model
      ? { page: modelPage(model), content: modelContent(model), model }
      : null;
  }
  const articleSlug = newsSlug(path);
  if (!articleSlug) return null;
  const doc = await findNews(articleSlug);
  return doc ? { page: newsPage(doc), content: newsContent(doc) } : null;
}
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const resolved = await resolve(params);
  if (!resolved) return {};
  const { page } = resolved;
  const content = publicContent(resolved.content);
  const title = content.seoTitle || page.title;
  if (title.length > 60)
    console.warn(`${page.id}: title exceeds 60 characters (${title.length})`);
  const query = await searchParams;
  return {
    title,
    description:
      content.description ||
      `${page.h1}. Send your model or photo for a quote.`,
    alternates: {
      canonical:
        sitemap.site.domain +
        ("model" in resolved &&
        resolved.model &&
        !modelIndexable(resolved.model)
          ? pageById(resolved.model.pageId).path
          : page.path),
    },
    robots:
      process.env.SITE_INDEXABLE === "true" &&
      page.is_live === true &&
      !(await draftMode()).isEnabled &&
      page.index_status !== "noindex" &&
      !(page.id === "catalog" && query.q) &&
      (page.indexable ?? sitemap.pageTypes[page.type].indexable) &&
      (!("model" in resolved) ||
        !resolved.model ||
        modelIndexable(resolved.model))
        ? { index: true, follow: true }
        : { index: false, follow: true },
  };
}
export default async function PageRoute({ params, searchParams }: Props) {
  const props = await resolve(params);
  if (!props) notFound();
  const { page } = props;
  props.content = publicContent(props.content);
  const query = await searchParams;
  if (
    process.env.NODE_ENV === "development" &&
    (await draftMode()).isEnabled &&
    page.id === "high-flow" &&
    query.fixture
  ) {
    const { highFlowFixture } = await import("@/fixtures/high-flow");
    props.content = highFlowFixture(query.fixture === "empty");
  }
  const templates = {
    T1: T1Home,
    T2: T2SectionHub,
    T3: T3ProductLanding,
    T4: T4CrossReference,
    T5: T5Application,
    T6: T6CustomerType,
    T7: T7Article,
    T8: T8Archive,
    T9: T9Tool,
    T10: T10Company,
  };
  const Template = templates[page.template as keyof typeof templates];
  if (!Template) notFound();

  return (
    <SiteShell page={page}>
      <Template {...props} />
    </SiteShell>
  );
}
