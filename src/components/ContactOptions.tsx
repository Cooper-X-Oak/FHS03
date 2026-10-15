'use client';
import Image from 'next/image';
import { useState, useSyncExternalStore } from 'react';
import { trackQuoteEvent } from '@/lib/client-events';
import { en } from '@/locales/en';

const subscribe = (listener: () => void) => { window.addEventListener('popstate', listener); return () => window.removeEventListener('popstate', listener); };

export function ContactOptions({ source, whatsapp, wechatQR }: { source: string; whatsapp?: string | null; wechatQR?: { url: string; width: number; height: number; alt: string } }) {
  const [open, setOpen] = useState(false);
  const originPage = useSyncExternalStore(subscribe, () => {
    const candidate = new URLSearchParams(window.location.search).get('sourcePage');
    return candidate?.startsWith('/') && !candidate.startsWith('//') && candidate.length <= 300 ? candidate : source;
  }, () => source);
  return <div className="stack">
    <div className="contact-options">
      {whatsapp && <a className="button secondary-button" onClick={() => trackQuoteEvent('whatsapp_click', originPage)} href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello FHS, I am looking for a replacement filter. Source page: ${originPage}`)}`}>{en.quote.whatsapp}</a>}
      <button type="button" className="button secondary-button" aria-expanded={open} onClick={() => { setOpen(!open); if (!open) trackQuoteEvent('wechat_open', originPage); }}>{en.quote.wechat}</button>
    </div>
    {open && <div className="contact-qr">
      {wechatQR ? <Image unoptimized src={wechatQR.url} alt={wechatQR.alt} width={wechatQR.width} height={wechatQR.height}/> : <p>[Confirm WeChat QR code]</p>}
    </div>}
  </div>;
}
