import Link from "next/link";
import { ProductGrid } from "./ProductGrid";
import { getFeaturedProducts, getProducts } from "@/sanity/products";

export async function HomeCatalog() {
  const [featured, all] = await Promise.all([
    getFeaturedProducts(8),
    getProducts(),
  ]);

  const bestsellers = featured.slice(0, 4);
  const more = all
    .filter((p) => !bestsellers.some((b) => b._id === p._id))
    .slice(0, 8);
  const rest = more.length ? more : all.slice(0, 8);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
              Best sellers
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] text-foreground sm:text-4xl">
              Top picks this week
            </h2>
            <p className="mt-2 text-sm text-muted">
              High-demand CORALFLY filters — add to cart and checkout in minutes.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center border border-brand px-5 font-display text-xs uppercase tracking-[0.14em] text-brand transition-colors hover:bg-brand hover:text-white"
          >
            View all products
          </Link>
        </div>
        <ProductGrid products={bestsellers} />
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
                More to buy
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] text-foreground sm:text-4xl">
                Keep your cart full
              </h2>
            </div>
            <p className="text-sm text-muted">{all.length} products in stock</p>
          </div>
          <ProductGrid products={rest} />
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center bg-brand px-8 font-display text-sm uppercase tracking-[0.14em] text-white hover:bg-brand-dark"
            >
              Browse full catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
