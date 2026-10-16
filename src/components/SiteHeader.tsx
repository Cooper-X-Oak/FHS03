'use client';
import {bibleUi} from '@/locales/en-bible';

import {RequestLink} from './RequestLink';
import Image from 'next/image';
import {en} from '@/locales/en';
import { useEffect, useRef, useState } from 'react';
import styles from '../../design-system/components/SiteHeader/runtime.module.css';
type Link = {label: string; path: string; blurb?: string; image?: string; is_live?: boolean};
export type HeaderMenu = Link & {presentation?: 'media'|'links'; mobileVisible?: boolean; secondary?: Link[]; shortcuts?: Link[]; columns: {label: string; path?: string; items: Link[]}[]};
function NavigationArrow({back = false}: {back?: boolean}) {
  return <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={back ? 'm14 6-6 6 6 6m6-12-6 6 6 6' : 'm4 6 6 6-6 6m6-12 6 6-6 6'}/></svg>;
}
export function SiteHeader({menus, home, catalog, quote, source, contactAvailable=true,subduedCta=false}: {menus: HeaderMenu[]; home: Link; catalog: Link; quote: Link; source: string; contactAvailable?: boolean; subduedCta?:boolean}) {
  const [active, setActive] = useState<number|null>(null);
  const [category, setCategory] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<(HTMLButtonElement|null)[]>([]);
  const backButtons = useRef<(HTMLButtonElement|null)[]>([]);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const close = () => { setActive(null); setMobile(false); };
  const open = (index: number) => { if (active !== index) { setCategory(0); setActive(index); if (mobile) requestAnimationFrame(() => backButtons.current[index]?.focus()); } };
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const reset = () => { setActive(null); setMobile(false); setCollapsed(false); };
    desktop.addEventListener('change', reset);
    return () => desktop.removeEventListener('change', reset);
  }, []);
  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      if (y <= 24) { setCollapsed(false); previousY = y; return; }
      if (Math.abs(y - previousY) < 10) return;
      const keyboardFocus = header.current?.contains(document.activeElement) && document.activeElement?.matches(':focus-visible');
      const hide = y > previousY && y > (header.current?.offsetHeight ?? 120) + 24 && !keyboardFocus;
      setCollapsed(hide);
      if (hide) { setActive(null); setMobile(false); }
      previousY = y;
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header data-module="M01" ref={header} className={`site-header ${styles.header}`} data-collapsed={collapsed} data-open={active !== null || mobile} onFocusCapture={() => setCollapsed(false)} onBlur={e => {if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) close();}} onKeyDown={e => {if (e.key === 'Escape') {e.preventDefault(); if (mobile) menuToggle.current?.focus(); else if (active !== null) triggers.current[active]?.focus(); close();}}}>
    {(active !== null || mobile) && <button className={styles.backdrop} tabIndex={-1} aria-label={bibleUi["Close navigation"]} onClick={close}/>}
    <div className={styles.frame} onMouseLeave={e => {if (window.matchMedia('(min-width: 1280px) and (hover: hover)').matches && !e.currentTarget.contains(document.activeElement)) setActive(null);}}>
      <div className="header-inner">
        <a href={home.is_live ? home.path : undefined} className="logo" role={home.is_live?undefined:'img'} aria-label={bibleUi["FHS Filtration home"]}><Image src="/assets/logo/fhs-logo.png" alt={bibleUi["FHS Filtration"]} width={80} height={45} priority/></a>
        <nav id="main-navigation" aria-label={bibleUi["Main"]} className={mobile ? 'main-nav open' : 'main-nav'} data-detail={active !== null}>
          {menus.map((menu, index) => <div className="nav-item" key={menu.path} data-active={active === index}>
            <button ref={el => {triggers.current[index] = el;}} className={`nav-trigger${source.startsWith(menu.path) ? ' current' : ''}`} aria-expanded={active === index} aria-controls={`mega-${index}`} onMouseEnter={() => {if (window.matchMedia('(min-width: 1280px) and (hover: hover)').matches) open(index);}} onClick={() => {if (active === index) setActive(null); else open(index);}}><span>{menu.label}</span><svg className={styles.chevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 6 7 7 7-7M5 12l7 7 7-7"/></svg></button>
            <div className="mega-menu" id={`mega-${index}`} hidden={active !== index}>
              <button ref={el => {backButtons.current[index] = el;}} className={styles.back} onClick={() => {setActive(null); requestAnimationFrame(() => triggers.current[index]?.focus());}}><NavigationArrow back/>{bibleUi["All sections"]}</button>
              <div className={styles.directory}>
                <div className={styles.categories} aria-label={`${menu.label} categories`}>
                  <a className={styles.overview} href={menu.path}>{menu.label} {bibleUi["overview"]}<NavigationArrow/></a>
                  {menu.columns.map((col, colIndex) => <button key={col.label} onFocus={() => setCategory(colIndex)} aria-pressed={category === colIndex} aria-controls={`directory-${index}-${colIndex}`} onMouseEnter={() => {if (window.matchMedia('(hover: hover)').matches) setCategory(colIndex);}} onClick={() => setCategory(colIndex)}>{col.label}<NavigationArrow/></button>)}
                {menu.secondary?.length ? <div className={styles.secondary}>{menu.secondary.map(item => <a key={item.path} href={item.path}>{item.label}<NavigationArrow/></a>)}</div> : null}
                </div>
                <div className={styles.contents} data-presentation={menu.presentation}>
                  {menu.columns.map((col, colIndex) => <section key={col.label} id={`directory-${index}-${colIndex}`} hidden={category !== colIndex} aria-label={col.label}>
                    <h2>{col.path ? <a href={col.path}>{col.label}<NavigationArrow/></a> : col.label}</h2>
                    <ul>{col.items.map(item => <li key={item.path}><a href={item.path} data-has-image={Boolean(item.image)}>{menu.presentation === 'media' ? <><span className={styles.cardMedia} aria-hidden="true">{item.image ? <Image src={item.image} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 1279px) 45vw, 25vw"/> : <span className={styles.imagePending}>{en.navigation.imagePending}</span>}</span><span className={styles.cardCopy}><span className={styles.cardTitle}>{item.label}<NavigationArrow/></span>{item.blurb && <small className={styles.blurb}>{item.blurb}</small>}</span></> : <><span>{item.label}{item.blurb && <small className={styles.blurb}>{item.blurb}</small>}</span><NavigationArrow/></>}</a></li>)}</ul>
                  </section>)}
                </div>
              </div>
              {menu.shortcuts?.length ? <nav className={styles.shortcuts} aria-label={`${menu.label} shortcuts`}>{menu.shortcuts.map(item => <a key={item.path} href={item.path}>{item.label}<NavigationArrow/></a>)}</nav> : null}
            </div>
          </div>)}
          {catalog.is_live&&<a className={styles.mobileSearch} href={catalog.is_live ? catalog.path : undefined}>{bibleUi["Search"]}<NavigationArrow/></a>}
        </nav>
        <div className={styles.actions}>
          {catalog.is_live&&<a className={styles.search} href={catalog.is_live ? catalog.path : undefined} aria-label={`Search ${catalog.label}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span>{bibleUi["Search"]}</span></a>}
          {contactAvailable?<RequestLink entry="nav" secondary={subduedCta}/>:quote.is_live?<a className="button quote-button" data-entry="nav" href={quote.path}>{bibleUi["Send request"]}</a>:null}
          <button ref={menuToggle} className="menu-toggle" aria-label={mobile ? bibleUi["Close menu"] : bibleUi["Open menu"]} aria-expanded={mobile} aria-controls="main-navigation" onClick={() => {setMobile(!mobile); setActive(null);}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{mobile ? <path d="m6 6 12 12M6 18 18 6"/> : <path d={"M4 8h16M4 16h16"}/>}</svg></button>
        </div>
      </div>
      <nav className="mobile-priority-nav" aria-label={bibleUi["Product and industry entry points"]}>{menus.filter(menu => menu.mobileVisible).map(menu => <a key={menu.path} href={menu.path}>{menu.label}<NavigationArrow/></a>)}</nav>
    </div>
  </header>;
}
