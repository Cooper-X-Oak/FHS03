"use client";
import { useEffect, useState } from "react";
import { firstTouch, trackEvent } from "@/lib/client-events";
export function Analytics() {
  const [banner, setBanner] = useState(false);
  useEffect(() => {
    firstTouch();
    window.dataLayer ||= [];
    window.gtag = (...args) => window.dataLayer!.push(args);
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    let consent = "";
    try {
      consent = localStorage.getItem("fhs_analytics_consent") || "";
    } catch {}
    if (consent === "granted") enable();
    else if (!consent) queueMicrotask(() => setBanner(true));
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (!a) return;
      const entry =
        a.dataset.entry ||
        a.closest("[data-entry]")?.getAttribute("data-entry") ||
        "end";
      if (a.href.startsWith("https://wa.me/"))
        trackEvent("whatsapp_click", { entry_location: entry });
      if (a.href.startsWith("mailto:"))
        trackEvent("email_click", { entry_location: entry });
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  function enable() {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    const id = process.env.NEXT_PUBLIC_GA4_ID;
    if (id && /^G-[A-Z0-9]+$/.test(id) && !document.getElementById("ga4")) {
      const s = document.createElement("script");
      s.id = "ga4";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.append(s);
      window.gtag?.("js", new Date());
      window.gtag?.("config", id, {
        send_page_view: false,
        page_location: location.origin + location.pathname,
        page_referrer: document.referrer
          ? new URL(document.referrer).origin
          : "",
      });
      window.gtag?.("event", "page_view", {
        page_location: location.origin + location.pathname,
        page_title: document.title,
      });
    }
  }
  function choose(value: string) {
    try {
      localStorage.setItem("fhs_analytics_consent", value);
    } catch {}
    if (value === "granted") enable();
    setBanner(false);
  }
  return banner ? (
    <aside className="cookie-consent" aria-label="Analytics cookies">
      <p>Allow analytics cookies to help us improve this website?</p>
      <button onClick={() => choose("denied")}>Reject</button>
      <button onClick={() => choose("granted")}>Allow analytics</button>
    </aside>
  ) : null;
}
