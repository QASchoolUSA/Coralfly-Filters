"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/sanity/types";

type Props = {
  product: Product;
  className?: string;
};

export function AddToCartButton({ product, className = "" }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(product, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
      className={`inline-flex h-12 items-center justify-center bg-brand px-7 font-display text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dark disabled:opacity-70 ${className}`}
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
