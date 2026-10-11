"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useCartItemCount } from "@/lib/use-cart";
import { SearchIcon, SearchOverlay } from "@/components/SearchOverlay";

export function MobileTabBar() {
  const pathname = usePathname();
  const count = useCartItemCount();
  const openCart = useCartStore((state) => state.openCart);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const items = [
    { href: "/", label: "Home", icon: <HomeIcon /> },
    { href: "/shop", label: "Shop", icon: <GridIcon /> },
  ];

  return <>
    <div className="mobile-tab-bar">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return <Link key={item.href} href={item.href} className={`tab-bar-item${active ? " tab-bar-item-active" : ""}`}>
          <span className="tab-bar-icon-wrapper">{item.icon}</span><span className="tab-bar-label">{item.label}</span>
        </Link>;
      })}
      <button type="button" className="tab-bar-item" onClick={() => setSearchOpen(true)} aria-label="Search products">
        <span className="tab-bar-icon-wrapper"><SearchIcon /></span><span className="tab-bar-label">Search</span>
      </button>
      <button type="button" className="tab-bar-item" onClick={openCart} aria-label={`Open cart${count ? `, ${count} items` : ""}`}>
        <span className="tab-bar-icon-wrapper"><BagIcon />{count > 0 ? <span className="tab-bar-badge">{count}</span> : null}</span><span className="tab-bar-label">Cart</span>
      </button>
    </div>
    <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
  </>;
}

function HomeIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V10Z" /></svg>;
}

function GridIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>;
}

function BagIcon() {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
}
