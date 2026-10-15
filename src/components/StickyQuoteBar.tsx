"use client";
import { useEffect, useState } from "react";

import { RequestLink } from "./RequestLink";
export function StickyQuoteBar({
  label,
  source,
  quotePath,
  whatsapp,
  module,
  quoteOnly = false,
}: {
  label: string;
  source: string;
  quotePath: string;
  whatsapp?: string;
  module?: string;
  quoteOnly?: boolean;
}) {
  void quotePath;
  void source;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    let passed = false;
    let submitVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      passed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      setVisible(passed && !submitVisible);
    });
    const submit = document.querySelector('#contact button[type="submit"]');
    const formObserver = new IntersectionObserver(([entry]) => {
      submitVisible = entry.isIntersecting;
      setVisible(passed && !submitVisible);
    });
    observer.observe(hero);
    if (submit) formObserver.observe(submit);
    return () => {
      observer.disconnect();
      formObserver.disconnect();
    };
  }, []);
  return (
    <aside
      aria-label="Request a quote"
      className="sticky-quote"
      hidden={!visible}
      data-module={module}
    >
      <div className="container sticky-inner">
        <strong>{label}</strong>
        {whatsapp ? (
          <a
            className="button secondary-button"
            data-entry="sticky"
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi Nina, I'm looking at ${label} on fhsfiltration.com.`)}`}
          >
            WhatsApp
          </a>
        ) : null}
        {!quoteOnly && <RequestLink entry="sticky">Send request</RequestLink>}
      </div>
    </aside>
  );
}
