import type { Metadata } from "next";
import { ShopFilters } from "@/components/ShopFilters";
import { getCategories, getProducts } from "@/sanity/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse CORALFLY oil, air, fuel, cabin, and hydraulic filters.",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
          Catalog
        </p>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-foreground">
          Shop filters
        </h1>
        <p className="mt-3 text-base text-muted">
          Find the right CORALFLY filter by category, name, or SKU. Add to cart
          and checkout securely on Stripe.
        </p>
      </div>

      <ShopFilters products={products} categories={categories} />
    </div>
  );
}
