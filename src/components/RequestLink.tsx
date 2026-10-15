"use client";
import { trackEvent } from "@/lib/client-events";
export function focusRequest(entry: string, text?: string) {
  const form = document.querySelector<HTMLTextAreaElement>(
    '#contact textarea[name="message"], textarea[name="message"]',
  );
  if (!form) return;
  if (form.form) form.form.dataset.entry = entry;
  const hidden = form.form?.elements.namedItem(
    "entry_location",
  ) as HTMLInputElement | null;
  if (hidden) hidden.value = entry;
  if (text) form.value = text;
  form.scrollIntoView({ behavior: "smooth", block: "center" });
  form.focus({ preventScroll: true });
}
export function RequestLink({
  entry = "hero",
  children = "Send your model or photo",
}: {
  entry?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      className="button quote-button"
      href="#contact"
      data-entry={entry}
      onClick={(event) => {
        event.preventDefault();
        trackEvent("cta_click", { entry_location: entry });
        focusRequest(entry);
      }}
    >
      {children}
    </a>
  );
}
export function LongtailLink() {
  return (
    <div className="container" data-module="C2">
      <a
        href="#contact"
        data-entry="longtail"
        onClick={(event) => {
          event.preventDefault();
          trackEvent("longtail_click", { entry_location: "longtail" });
          focusRequest("longtail");
        }}
      >
        Can&apos;t find it? Send a photo of your old filter.
      </a>
    </div>
  );
}
