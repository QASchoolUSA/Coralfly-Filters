"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/sanity/types";

type Props = {
  products: Product[];
  categories: string[];
};

export function ShopFilters({ products, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.sku?.toLowerCase().includes(q) ||
        product.description?.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="shop-search">
          Search products
        </label>
        <input
          id="shop-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or SKU"
          className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm outline-none ring-brand focus:ring-2 sm:max-w-sm"
        />
        <label className="sr-only" htmlFor="shop-category">
          Category
        </label>
        <select
          id="shop-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm outline-none ring-brand focus:ring-2 sm:max-w-[220px]"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <p className="text-sm text-muted sm:ml-auto">
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <ProductGrid
        products={filtered}
        emptyMessage="No products match your filters."
      />
    </div>
  );
}
