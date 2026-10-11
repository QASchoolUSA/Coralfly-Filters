"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useCartItemCount } from "@/lib/use-cart";
import { SearchIcon, SearchOverlay } from "@/components/SearchOverlay";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const count = useCartItemCount();
  const openCart = useCartStore((state) => state.openCart);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo" aria-label="CORALFLY home">
            <Image src="/brand/logo.png" alt="CORALFLY — Reliable Filter Reliable service" width={180} height={55} priority />
          </Link>
          <div className="navbar-links-desktop">
            {links.map((link) => <Link key={link.href} href={link.href} className={`nav-link${pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)) ? " nav-link-active" : ""}`}>{link.label}</Link>)}
          </div>
          <div className="navbar-actions">
            <button type="button" className="search-button" aria-label="Search products" onClick={() => setSearchOpen(true)}><SearchIcon /></button>
            <button type="button" className="cart-button" aria-label={`Open cart${count ? `, ${count} items` : ""}`} onClick={openCart}>
              <BagIcon />
              {count > 0 ? <span className="cart-badge">{count}</span> : null}
            </button>
            <button type="button" className="mobile-menu-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        <button type="button" className={`mobile-menu-backdrop${mobileOpen ? " mobile-menu-backdrop-visible" : ""}`} aria-label="Close menu" onClick={() => setMobileOpen(false)} />
        <div className={`mobile-menu${mobileOpen ? " mobile-menu-open" : ""}`}>
          <div className="mobile-menu-inner">
            {links.map((link) => <Link key={link.href} href={link.href} className={`mobile-nav-link${pathname === link.href ? " mobile-nav-link-active" : ""}`} onClick={() => setMobileOpen(false)}>{link.label}</Link>)}
            <button type="button" className="mobile-nav-link mobile-cart-link" onClick={() => { setMobileOpen(false); openCart(); }}><BagIcon /> Cart {count ? <span className="mobile-cart-count">({count})</span> : null}</button>
          </div>
        </div>
      </nav>
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
    </>
  );
}

function BagIcon() {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
}

function MenuIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

function CloseIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12" /></svg>;
}
