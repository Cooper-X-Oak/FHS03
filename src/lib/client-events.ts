"use client";
export type QuoteEvent =
  "quote_start" | "quote_submit" | "whatsapp_click" | "wechat_open";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    umami?: { track: (event: string, data: Record<string, string>) => void };
  }
}
export function trackQuoteEvent(event: QuoteEvent, sourcePage: string) {
  if (process.env.NEXT_PUBLIC_FRONTEND_PREVIEW === "true") return;
  void sourcePage;
  trackEvent(
    (
      {
        quote_start: "form_start",
        quote_submit: "form_submit_success",
        whatsapp_click: "whatsapp_click",
        wechat_open: "wechat_qr_view",
      } as const
    )[event],
  );
}
export type TrackingEvent =
  | "whatsapp_click"
  | "form_submit_success"
  | "email_click"
  | "form_start"
  | "form_submit_error"
  | "file_attach"
  | "part_number_submit"
  | "cta_click"
  | "longtail_click"
  | "wechat_qr_view";
export function trackEvent(
  event: TrackingEvent,
  extra: Record<string, string> = {},
) {
  const main = document.querySelector("main");
  const input = {
    page_id: main?.getAttribute("data-page-id") || "",
    template: main?.getAttribute("data-template") || "",
    entry_location: "end",
    ...extra,
  };
  const allowed = ["page_id", "template", "entry_location", "customer_type"];
  const data = Object.fromEntries(
    Object.entries(input).filter(([k]) => allowed.includes(k)),
  );
  if (data.template === "T6")
    data.customer_type =
      data.page_id === "distributors" ? "distributor" : "integrator";
  window.gtag?.("event", event, data);
}
export function firstTouch(): Record<string, string> {
  try {
    const old = sessionStorage.getItem("fhs_first_touch");
    if (old) return JSON.parse(old);
    const q = new URLSearchParams(location.search);
    const data: Record<string, string> = { referrer: document.referrer };
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ])
      data[key] = q.get(key)?.slice(0, 200) || "";
    sessionStorage.setItem("fhs_first_touch", JSON.stringify(data));
    return data;
  } catch {
    return { referrer: document.referrer };
  }
}
