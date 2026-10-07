"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCartItemCount } from "@/lib/use-cart";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Oil%20Filters", label: "Oil" },
  { href: "/shop?category=Air%20Filters", label: "Air" },
  { href: "/shop?category=Fuel%20Filters", label: "Fuel" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const itemCount = useCartItemCount();

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative shrink-0"
          aria-label="CORALFLY home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo.png"
            alt="CORALFLY — Reliable Filter Reliable service"
            width={220}
            height={67}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const pathOnly = link.href.split("?")[0];
            const active =
              pathname === pathOnly ||
              (pathOnly !== "/" && pathname.startsWith(`${pathOnly}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm uppercase tracking-[0.12em] transition-colors ${
                  active && !link.href.includes("?")
                    ? "text-brand"
                    : "text-foreground hover:text-brand"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/shop"
            className="hidden h-11 items-center justify-center bg-brand px-4 font-display text-xs uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark sm:inline-flex"
          >
            Shop now
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
            aria-label={`Cart${itemCount ? `, ${itemCount} items` : ""}`}
            onClick={() => setOpen(false)}
          >
            <CartIcon />
            {itemCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 bg-foreground transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 bg-foreground transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-foreground transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 font-display text-sm uppercase tracking-[0.12em] text-foreground hover:bg-brand-light hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center bg-brand font-display text-xs uppercase tracking-[0.14em] text-white"
              >
                Shop now
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 7h15l-1.4 8.2a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L5.5 3H3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
