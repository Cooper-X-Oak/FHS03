import type {ReactNode} from 'react';
import {Analytics} from '@/components/Analytics';
import './globals.css';
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><head><link rel="preload" href="/fonts/barlow-condensed/latin-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/manrope/latin-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body>{children}<Analytics/></body></html>;}
