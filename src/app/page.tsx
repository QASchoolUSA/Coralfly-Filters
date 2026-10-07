import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { TrustStrip } from "@/components/TrustStrip";
import { getFeaturedProducts } from "@/sanity/products";

export default async function HomePage() {
  const featured = await getFeaturedProducts(4);

  return (
    <>
      <Hero />
      <TrustStrip />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
              Featured filters
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] text-foreground sm:text-4xl">
              Built for uptime
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-display text-sm uppercase tracking-[0.14em] text-brand hover:underline"
          >
            View all products
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl uppercase tracking-[0.04em] text-foreground">
              Reliable Filter Reliable service
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              From single replacements to fleet stock-ups, CORALFLY keeps filtration
              simple: clear specs, dependable media, and secure Stripe checkout.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex h-12 shrink-0 items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark"
          >
            Browse catalog
          </Link>
        </div>
      </section>
    </>
  );
}
