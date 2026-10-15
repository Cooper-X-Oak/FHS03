import Script from 'next/script';
import {en} from '@/locales/en';
import type { ReactNode } from 'react';
import './globals.css';
export default function RootLayout({children}: {children: ReactNode}) {return <html lang="en"><body>{process.env.NEXT_PUBLIC_FRONTEND_PREVIEW === 'true' && <div className="preview-notice" role="note">{en.preview.banner}</div>}{children}{process.env.NEXT_PUBLIC_FRONTEND_PREVIEW !== 'true' && process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && <Script src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL} data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID} strategy="afterInteractive"/>}</body></html>;}
