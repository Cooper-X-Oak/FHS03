'use client';
import { useEffect, useState } from 'react';
import { trackQuoteEvent } from '@/lib/client-events';
import { QuoteButton } from './QuoteButton';
export function StickyQuoteBar({label, source, quotePath, whatsapp, module}: {label: string; source: string; quotePath: string; whatsapp?: string; module?: string}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom < 0));
    observer.observe(hero); return () => observer.disconnect();
  }, []);
  return <aside aria-label="Request a quote" className="sticky-quote" hidden={!visible} data-module={module}>
    <div className="container sticky-inner"><strong>{label}</strong>
      {whatsapp ? <a className="button secondary-button" onClick={() => trackQuoteEvent('whatsapp_click', source)} href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Please help with ${label}: ${source}`)}`}>WhatsApp</a> : <span className="type-body-sm">[Confirm WhatsApp number]</span>}
      <QuoteButton source={source} quotePath={quotePath} label="Get a quote" compact/>
    </div>
  </aside>;
}
