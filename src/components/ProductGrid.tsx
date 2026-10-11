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
      <p className="shop-empty-state">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
  );
}
