import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/shop", label: "Shop filters" },
  { href: "/about", label: "About CORALFLY" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Image
            src="/brand/logo.png"
            alt="CORALFLY"
            width={180}
            height={44}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-md font-display text-sm uppercase tracking-[0.14em] text-brand">
            Reliable Filter Reliable service
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Industrial-grade filtration built for uptime. Browse the catalog,
            add what you need, and check out securely with Stripe.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
              Explore
            </h2>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
              Support
            </h2>
            <p className="mt-3 text-sm text-muted">
              Need help matching a filter?
              <br />
              <Link href="/contact" className="text-brand hover:underline">
                Talk to our team
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 CORALFLY. All rights reserved.</p>
          <p>Secure checkout powered by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
