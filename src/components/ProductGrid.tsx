import { ProductCard } from "./ProductCard";
import type { Product } from "@/sanity/types";

type Props = {
  products: Product[];
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  emptyMessage = "No products found in this category.",
}: Props) {
  if (!products.length) {
    return (
      <div className="card text-center" style={{ padding: 48, border: "1px solid #ebebeb", borderRadius: 4 }}>
        <p style={{ color: "#6c757d", fontSize: 15, margin: 0 }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="row g-2 g-sm-3 g-md-4">
      {products.map((product, index) => (
        <div key={product._id} className="col-6 col-md-4 col-xl-3 mb-3 mb-md-4">
          <ProductCard product={product} index={index} layout="grid" />
        </div>
      ))}
    </div>
  );
}
