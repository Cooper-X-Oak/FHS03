'use client';
import {bibleUi} from '@/locales/en-bible';

import { RequestLink } from './RequestLink';
export function StickyQuoteBar({label, source, quotePath, whatsapp, module, quoteOnly=false}: {label: string; source: string; quotePath: string; whatsapp?: string; module?: string; quoteOnly?: boolean}) {
  void quotePath;void source;
  if(quoteOnly&&!whatsapp)return null;
  return <aside aria-label={bibleUi["Request a quote"]} className="sticky-quote" data-module={module||'C4'}>
    <div className="container sticky-inner"><strong>{label}</strong>
      {whatsapp ? <a className="button secondary-button" data-entry="sticky" href={`https://wa.me/${whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(`Hi Nina, I'm looking at ${label} on fhsfiltration.com.`)}`}>{bibleUi["WhatsApp"]}</a> : null}
      {!quoteOnly&&<RequestLink entry="sticky">{bibleUi["Send request"]}</RequestLink>}
    </div>
  </aside>;
}
