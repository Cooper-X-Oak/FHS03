import Image from "next/image";
import { ArchiveFilter } from "@/components/ArchiveFilter";
import {
  children,
  isPublicPage,
  pageById,
  publicPages,
  requiredLinks,
  sitemap,
} from "@/lib/sitemap";
import { contactDetails, verifiedReferences } from "@/cms/public-data";
import {
  Breadcrumb,
  FAQ,
  SpecOptionsTable,
  StructuredData,
} from "@/components/ContentComponents";
import {
  ContactModule,
  Evidence,
  LongtailLink,
  MobileContact,
  RequestLink,
  TrademarkNotice,
} from "@/components/Conversion";
import { CatalogRange } from "@/components/CatalogRange";
import { Section, Cards, type TemplateProps } from "./shared";
import type { SectionContent } from "@/content/types";

function Body({
  rows,
}: {
  rows: (SectionContent & { productIds?: string[] })[];
}) {
  return (
    <div className="article-body stack">
      {rows
        .filter((s) => s.paragraphs?.length || s.table?.rows.length)
        .map((s, i) => (
          <section key={i} id={`section-${i}`}>
            <h2>{s.heading}</h2>
            {s.productIds?.length ? (
              <Cards pages={s.productIds.map(pageById).filter(isPublicPage)} />
            ) : null}
            {s.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {s.table?.rows.length && (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {s.table.headings.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((v, k) => (
                          <td key={k}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
    </div>
  );
}
export async function BibleTemplate({ page, content }: TemplateProps) {
  const t = page.template;
  const fixture = process.env.NODE_ENV === "development" && content.fixture === true;
  const homeContact = t === "T1" ? await contactDetails() : null;
  const links = requiredLinks(page);
  const hint = content.request_hint || content.formPrompt;
  const selected = (ids: string[]) => ids.map(pageById).filter(isPublicPage);
  const rows = (key: string) => content.moduleContent?.[key] || [];
  const body = (
    key: string,
    title: string,
    fallback: SectionContent[] = [],
  ) => {
    const value = (rows(key).length ? rows(key) : fallback).filter(
      (s) => s.paragraphs?.length || s.table?.rows.length,
    );
    return value.length ? (
      <Section module={key} title={title}>
        <Body rows={value} />
      </Section>
    ) : null;
  };
  const cards = (key: string, title: string, items = links) =>
    items.length ? (
      <Section module={key} title={title} layout="range">
        <Cards pages={items} />
      </Section>
    ) : fixture ? body(key,title) : null;
  const faq = content.faq?.length ? (
    <Section module="M17" title="Questions before ordering">
      <FAQ entries={content.faq} />
    </Section>
  ) : null;
  const contact = <ContactModule page={page} hint={hint} />;
  const hero = (
    <section
      className={`hero ${t === "T3" ? "product-group-hero" : t === "T1" ? "home-hero" : ""}`}
      data-theme="dark"
      data-hero
      data-module="M02"
    >
      <div className="container">
        <div className="hero-copy">
          <p className="type-label-caps">{page.label}</p>
          <h1 className="type-display">{page.h1}</h1>
          {content.intro && (
            <p
              className="intro type-body-lg"
              data-summary={t === "T7" || undefined}
            >
              {content.intro}
            </p>
          )}
          {!["T4", "T7", "T9", "T10"].includes(t) && <RequestLink />}
          {homeContact?.whatsapp && <a data-entry="hero" href={`https://wa.me/${homeContact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Nina, I'm looking at ${page.label} on fhsfiltration.com.`)}`}>WhatsApp</a>}
        </div>
      </div>
    </section>
  );
  const selection = content.selection?.length ? (
    <Section module="M09" title="How to choose">
      <ol className="selection-steps">
        {content.selection.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ol>
      <RequestLink entry="mid" />
    </Section>
  ) : (
    body("M09", "How to choose")
  );
  const referenceRows = ["T3", "T4"].includes(t)
    ? await verifiedReferences(page.id)
    : [];
  const references = (
    <Section module="M10" title="What it replaces">
      {referenceRows.length ? (
        <div className="table-wrap">
          <table>
            <caption>Trademarks belong to their owners.</caption>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Verified model</th>
                <th>Equivalent</th>
                <th>Specification</th>
              </tr>
            </thead>
            <tbody>
              {referenceRows.map((r) => (
                <tr key={r.id}>
                  <td>{r.brand}</td>
                  <td>{r.partNumber}</td>
                  <td>{r.equivalent}</td>
                  <td>{r.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p>
            Send your current part number or a photo so we can check the match.
          </p>
          <LongtailLink />
        </>
      )}
    </Section>
  );
  const gallery = (kind: string, module: string) => {
    const images = (content.gallery || [])
      .filter((i) => typeof i.image === "object" && i.image.url)
      .filter((i) =>
        kind === "overall" ? i.kind === "overall" : i.kind !== "overall",
      );
    return images.length ? (
      <Section
        module={module}
        title={
          kind === "overall" ? "Product gallery" : "Details and dimensions"
        }
      >
        <div className="card-grid">
          {images.map((item, i) =>
            typeof item.image === "object" && item.image.url ? (
              <figure key={i}>
                <Image
                  src={item.image.url}
                  alt={item.image.alt || ""}
                  width={item.image.width || 1200}
                  height={item.image.height || 900}
                  priority={kind === "overall" && i === 0}
                  loading={kind === "overall" && i === 0 ? "eager" : "lazy"}
                />
                {item.caption && <figcaption>{item.caption}</figcaption>}
                <span className="type-label-caps">{item.kind}</span>
              </figure>
            ) : null,
          )}
        </div>
      </Section>
    ) : null;
  };
  const related = cards(
    "M24",
    "Related products",
    links.filter((p) => p.template === "T3"),
  );
  const articles = cards(
    "M25",
    "Related guides",
    links.filter((p) => p.template === "T7"),
  );
  let modules: React.ReactNode;
  if (t === "T3")
    modules = (
      <>
        {gallery("overall", "M03")}
        {gallery("details", "M04")}
        {page.variant === "category"
          ? cards("M05", "Types and series", children(page))
          : body("M05", "Types and series", content.sections)}
        {content.specs?.length ? (
          <Section module="M06" title="Specification ranges">
            <SpecOptionsTable rows={content.specs} source={page.path} />
          </Section>
        ) : null}
        {selection}
        {references}
        <div className="container">
          <TrademarkNotice />
        </div>
        {cards(
          "M08",
          "Applications",
          links.filter((p) => p.template === "T5"),
        )}
        {body("M16", "Purchasing process")}
        <Evidence fixture={fixture} />
        {faq}
        {contact}
        <LongtailLink />
        {related}
        {articles}
      </>
    );
  else if (t === "T4")
    modules = (
      <>
        <ContactModule page={page} hint={hint} entry="hero" id="hero-contact" />
        {cards(
          "M05",
          "Product families",
          links.filter((p) => p.template === "T3"),
        )}
        {references}
        {body("M04", "Photo and measurement guide")}
        {body("M16", "Matching process")}
        {body("M09", "Matching boundaries", content.sections)}
        <div className="container">
          <TrademarkNotice />
        </div>
        {related}
        {faq}
        {contact}
      </>
    );
  else if (t === "T5")
    modules = (
      <>
        {content.processImage &&
        typeof content.processImage === "object" &&
        content.processImage.url ? (
          <Section module="M08" title="Filtration stages">
            <Image
              src={content.processImage.url}
              alt={content.processImage.alt || ""}
              width={content.processImage.width || 1200}
              height={content.processImage.height || 600}
            />
          </Section>
        ) : null}
        {content.stages?.length ? (
          <Section module="M05" title="Products at each stage">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Category and rating</th>
                    <th>Products</th>
                  </tr>
                </thead>
                <tbody>
                  {content.stages.map((s) => (
                    <tr key={s.title}>
                      <th>{s.title}</th>
                      <td>{s.description}</td>
                      <td>
                        {selected(s.products).map((p) => (
                          <p key={p.id}>
                            <a href={p.path}>{p.label}</a>
                          </p>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        ) : null}
        {content.mistakes?.length ? (
          <Section module="M09" title="Selection points">
            <ul>
              {content.mistakes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Section>
        ) : (
          selection
        )}
        {body("M12", "Available documents")}
        {body("M16", "Quotation scope")}
        {body("M15", "Customer evidence")}
        {faq}
        {contact}
      </>
    );
  else if (t === "T6")
    modules = (
      <>
        {body("M09", "Your supply requirements", content.sections)}
        {cards(
          "M05",
          "Supply range",
          links.filter((p) => p.template === "T3"),
        )}
        {body("M16", "How we work together")}
        <Evidence fixture={fixture} />
        {contact}
      </>
    );
  else if (t === "T7")
    modules = (
      <>
        {content.sections.length > 4 && (
          <nav
            className="container article-contents"
            aria-label="Article contents"
          >
            <ol>
              {content.sections.map((s, i) => (
                <li key={i}>
                  <a href={`#section-${i}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {body("M27", "", content.sections)}
        {selection}
        {related}
        <LongtailLink />
        {articles}
        {contact}
      </>
    );
  else if (t === "T1")
    modules = (
      <>
        {cards(
          "M05",
          "Product categories",
          selected([
            "cartridges",
            "bags",
            "housings",
            "membranes",
            "filter-paper",
          ]),
        )}
        {cards(
          "M26",
          "Who we serve",
          selected(["distributors", "oem", "applications"]),
        )}
        {cards(
          "M10",
          "Replace any brand",
          publicPages.filter((p) => p.template === "T4"),
        )}
        {body("M16", "How we work together")}
        {cards(
          "M08",
          "Applications",
          links.filter((p) => p.template === "T5"),
        )}
        <Evidence fixture={fixture} />
        {articles}
        {contact}
      </>
    );
  else if (t === "T2")
    modules = (
      <>
        {cards("M05", "Explore", children(page))}
        <LongtailLink />
        {contact}
      </>
    );
  else if (t === "T8")
    modules = (
      <>
        {
          <Section
            module="M25"
            title="Guides"
            empty={!links.some((p) => p.template === "T7")}
          >
            <ArchiveFilter
              items={links
                .filter((p) => p.template === "T7")
                .map((p) => ({
                  label: p.label,
                  path: p.path,
                  ...(typeof content.topics?.[p.id] === "object" ? content.topics[p.id] as {category?:string;industry?:string;intent?:string} : {intent: content.topics?.[p.id] as string || ""}),
                }))}
            />
          </Section>
        }
        {contact}
      </>
    );
  else if (t === "T9")
    modules =
      page.id === "catalog" ? (
        <>
          <CatalogRange
            items={publicPages
              .filter((p) => p.template === "T3")
              .map((p) => ({
                id: p.id,
                label: p.label,
                path: p.path,
                summary: p.h1,
              }))}
          />
          {contact}
        </>
      ) : (
        <>
          {contact}
          {body("M16", "What happens next")}
        </>
      );
  else
    modules = (
      <>
        {body("M27", "", content.sections)}
        {page.type !== "utility" && contact}
      </>
    );
  const url = sitemap.site.domain + page.path;
  const type =
    t === "T3"
      ? page.variant === "category"
        ? "CollectionPage"
        : "Product"
      : t === "T7"
        ? "Article"
        : page.id === "quote"
          ? "ContactPage"
          : page.id === "about"
            ? "AboutPage"
            : "WebPage";
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name: page.h1,
    description: content.description,
    url,
    ...(type === "Product"
      ? {
          category: page.label,
          image: (content.gallery || []).flatMap((i) =>
            typeof i.image === "object" && i.image.url ? [i.image.url] : [],
          ),
          material: content.specs?.find((s) => /material/i.test(s.label))
            ?.value,
        }
      : {}),
    ...(type === "Article"
      ? {
          headline: page.h1,
          datePublished: content.article?.publishedAt,
          dateModified: content.article?.modifiedAt,
          image: (content.gallery || []).flatMap((i) =>
            typeof i.image === "object" && i.image.url ? [i.image.url] : [],
          ),
          author: {
            "@type": "Organization",
            name: content.article?.author || "FHS Filtration",
          },
        }
      : {}),
    ...(type === "CollectionPage"
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: children(page).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.label,
              url: sitemap.site.domain + p.path,
            })),
          },
        }
      : {}),
  };
  return (
    <main
      id="main"
      data-page-id={page.id}
      data-template={t}
      data-stage={page.stage}
      data-variant={page.variant}
      className={t === "T3" ? "product-landing" : undefined}
    >
      <Breadcrumb page={page} />
      {hero}
      {modules}
      {page.type !== "utility" && <MobileContact page={page} />}
      <StructuredData data={schema} />
      {t === "T1" && (
        <StructuredData
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FHS Filtration",
              url: sitemap.site.domain,
              logo: sitemap.site.domain + "/assets/logo/fhs-logo.png",
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FHS Filtration",
              url: sitemap.site.domain,
            },
          ]}
        />
      )}
    </main>
  );
}
