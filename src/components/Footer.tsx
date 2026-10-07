import Image from "next/image";
import Link from "next/link";

const shopLinks = [
  { href: "/shop", label: "Shop all filters" },
  { href: "/shop?category=Oil%20Filters", label: "Oil filters" },
  { href: "/shop?category=Air%20Filters", label: "Air filters" },
  { href: "/shop?category=Fuel%20Filters", label: "Fuel filters" },
  { href: "/cart", label: "Cart & checkout" },
];

const companyLinks = [
  { href: "/about", label: "About CORALFLY" },
  { href: "/contact", label: "Contact / filter match" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[#0b1e2d] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/brand/logo.png"
            alt="CORALFLY — Reliable Filter Reliable service"
            width={240}
            height={73}
            className="h-11 w-auto brightness-0 invert sm:h-12"
          />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
            Buy CORALFLY filters online with clear pricing, in-stock SKUs, and
            secure Stripe checkout. Reliable Filter Reliable service.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-11 items-center justify-center bg-brand px-5 font-display text-xs uppercase tracking-[0.14em] text-white hover:bg-brand-dark"
          >
            Shop now
          </Link>
        </div>

        <div>
          <h2 className="font-display text-xs uppercase tracking-[0.16em] text-white">
            Shop
          </h2>
          <ul className="mt-3 space-y-2">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xs uppercase tracking-[0.16em] text-white">
            Help
          </h2>
          <ul className="mt-3 space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-white/70">
            Free shipping $75+ · Same-day processing
          </p>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 CORALFLY. All rights reserved.</p>
          <p>Secure checkout powered by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
