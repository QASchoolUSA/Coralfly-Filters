import { ProductCard } from "./ProductCard";
import type { Product } from "@/sanity/types";

type Props = {
  products: Product[];
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  emptyMessage = "No products found.",
}: Props) {
  if (!products.length) {
    return (
      <p className="rounded-md border border-dashed border-border bg-surface px-4 py-12 text-center text-sm text-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
  );
}
