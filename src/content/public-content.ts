import type { PageContent, SectionContent } from "./types";
const usable = (s: string | undefined) =>
  !!s?.trim() && !/\[(?:confirm|photo|todo|pending)\b|\bcoming soon\b/i.test(s);
const sections = (rows: SectionContent[] = []) =>
  rows
    .map((s) => ({ ...s, paragraphs: (s.paragraphs || []).filter(usable) }))
    .filter(
      (s) => usable(s.heading) && (s.paragraphs.length || s.table?.rows.length),
    );
/** Existing editorial drafts remain in CMS. Unresolved placeholders never become public modules. */
export function publicContent(c: PageContent): PageContent {
  return {
    ...c,
    seoTitle: usable(c.seoTitle) ? c.seoTitle : undefined,
    intro: usable(c.intro) ? c.intro : "",
    description: usable(c.description) ? c.description : "",
    sections: sections(c.sections),
    specs: c.specs?.filter((s) => usable(s.label) && usable(s.value)),
    faq: c.faq?.filter((f) => usable(f.question) && usable(f.answer)),
    selection: c.selection?.filter(usable),
    mistakes: c.mistakes?.filter(usable),
    moduleContent: c.moduleContent
      ? Object.fromEntries(
          Object.entries(c.moduleContent).map(([k, v]) => [k, sections(v)]),
        )
      : undefined,
  };
}
