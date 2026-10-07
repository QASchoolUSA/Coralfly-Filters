import Link from "next/link";
import { ProductGrid } from "./ProductGrid";
import { getFeaturedProducts } from "@/sanity/products";

export async function FeaturedProducts() {
  const featured = await getFeaturedProducts(4);

  return (
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
  );
}
