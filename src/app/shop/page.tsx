import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { ShopCatalog } from "@/components/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop Filters",
  description:
    "Buy CORALFLY oil, air, fuel, cabin, and hydraulic filters online. In stock with secure Stripe checkout.",
};

export default function ShopPage() {
  return (
    <div>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
            Online store
          </p>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-foreground">
            Shop filters
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Browse in-stock CORALFLY filters, add to cart, and checkout securely
            with Stripe. Free shipping on orders $75+.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground">
            <li className="font-medium">✓ In stock</li>
            <li className="font-medium">✓ Fast processing</li>
            <li className="font-medium">✓ Stripe secure pay</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ShopCatalog />
        </Suspense>
      </div>
    </div>
  );
}
