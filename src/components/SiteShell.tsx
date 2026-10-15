import fs from "node:fs";
import path from "node:path";
import { quoteUrl } from "@/lib/quote-url";
import type { ReactNode } from "react";
import {
  isPublicPage,
  pageById,
  resolvePage,
  sectionAnchor,
  sitemap,
  type Page,
} from "@/lib/sitemap";
import { SiteHeader, type HeaderMenu } from "./SiteHeader";
import { SiteFooter } from "./ContentComponents";
export function SiteShell({
  page,
  children,
}: {
  page: Page;
  children: ReactNode;
}) {
  const link = (ref: string) => {
    const p = resolvePage(ref);
    return {
      label: p.label,
      path: p.id === "quote" ? quoteUrl(p.path, page.path) : p.path,
    };
  };
  const menus: HeaderMenu[] = sitemap.site.navigation.header
    .filter((menu) => isPublicPage(resolvePage(menu.page)))
    .map((menu) => {
      const p = resolvePage(menu.page);
      const columns = menu.panels
        ? menu.panels
            .filter((panel) => isPublicPage(resolvePage(panel.page)))
            .map((panel) => ({
              ...link(panel.page),
              items: panel.cards
                .filter((card) => isPublicPage(resolvePage(card.page)))
                .map((card) => {
                  const target = link(card.page);
                  const image =
                    card.image &&
                    fs.existsSync(
                      path.join(process.cwd(), "public/assets", card.image),
                    )
                      ? `/assets/${card.image}`
                      : undefined;
                  return {
                    ...target,
                    label: card.section || target.label,
                    path:
                      target.path +
                      (card.section ? `#${sectionAnchor(card.section)}` : ""),
                    blurb: card.blurb,
                    image,
                  };
                }),
            }))
        : (
            menu.columns ||
            menu.groups || [{ label: p.label, items: menu.items || [] }]
          ).map((col) => ({
            label: col.page ? resolvePage(col.page).label : col.label || "",
            path: col.page ? link(col.page).path : undefined,
            items: col.items
              .filter((ref) => isPublicPage(resolvePage(ref)))
              .map(link),
          }));
      return {
        ...link(menu.page),
        presentation: ["products", "applications"].includes(p.id)
          ? "media"
          : "links",
        mobileVisible: ["products", "applications"].includes(p.id),
        columns,
        secondary: menu.secondary
          ?.filter((ref) => isPublicPage(resolvePage(ref)))
          .map(link),
        shortcuts: menu.shortcuts
          ?.filter((ref) => isPublicPage(resolvePage(ref)))
          .map(link),
      };
    });
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader
        menus={menus}
        home={pageById("home")}
        catalog={pageById("catalog")}
        quote={resolvePage(sitemap.site.navigation.cta)}
        source={page.path}
      />
      {children}
      <SiteFooter source={page.path} />
    </>
  );
}
