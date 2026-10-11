"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/sanity/types";

type Props = {
  products: Product[];
  categories: string[];
};

function getCompatibleMakes(products: Product[]): string[] {
  const makes = new Map<string, string>();

  for (const product of products) {
    for (const value of product.compatibleMakes ?? []) {
      const make = value.trim();
      if (!make) continue;

      const key = make.toLocaleLowerCase();
      if (!makes.has(key)) makes.set(key, make);
    }
  }

  return [...makes.values()].sort((a, b) => a.localeCompare(b));
}

export function ShopFilters({ products, categories }: Props) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "all";
  const makes = getCompatibleMakes(products);
  const requestedMake = searchParams.get("make")?.trim();
  const initialMake = requestedMake
    ? makes.find(
        (make) => make.toLocaleLowerCase() === requestedMake.toLocaleLowerCase(),
      ) || "all"
    : "all";
  const initial =
    urlCategory !== "all" && categories.includes(urlCategory)
      ? urlCategory
      : "all";

  return (
    <ShopFiltersInner
      key={`${initial}:${initialMake}`}
      products={products}
      categories={categories}
      makes={makes}
      initialCategory={initial}
      initialMake={initialMake}
    />
  );
}

function ShopFiltersInner({
  products,
  categories,
  makes,
  initialCategory,
  initialMake,
}: Props & { makes: string[]; initialCategory: string; initialMake: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [make, setMake] = useState(initialMake);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesMake =
        make === "all" ||
        product.compatibleMakes?.some(
          (compatibleMake) => compatibleMake.toLowerCase() === make.toLowerCase(),
        ) === true;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.sku?.toLowerCase().includes(q) ||
        product.description?.toLowerCase().includes(q) ||
        product.compatibleMakes?.some((compatibleMake) =>
          compatibleMake.toLowerCase().includes(q),
        );
      return matchesCategory && matchesMake && matchesQuery;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.name.localeCompare(b.name),
      );
    }

    return list;
  }, [products, query, category, make, sort]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`h-9 px-3 font-display text-[11px] uppercase tracking-[0.12em] transition-colors ${
            category === "all"
              ? "bg-brand text-white"
              : "border border-border text-foreground hover:border-brand hover:text-brand"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`h-9 px-3 font-display text-[11px] uppercase tracking-[0.12em] transition-colors ${
              category === cat
                ? "bg-brand text-white"
                : "border border-border text-foreground hover:border-brand hover:text-brand"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="shop-search">
          Search products by name, SKU, or truck make
        </label>
        <input
          id="shop-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, SKU, or truck make"
          className="h-11 w-full border border-border bg-white px-3 text-sm outline-none ring-brand focus:ring-2 sm:max-w-sm"
        />
        <label className="sr-only" htmlFor="shop-make">
          Filter by truck make
        </label>
        <select
          id="shop-make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          disabled={makes.length === 0}
          className="h-11 w-full border border-border bg-white px-3 text-sm outline-none ring-brand focus:ring-2 disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted sm:max-w-[220px]"
        >
          {makes.length ? (
            <>
              <option value="all">All truck makes</option>
              {makes.map((compatibleMake) => (
                <option key={compatibleMake} value={compatibleMake}>
                  {compatibleMake}
                </option>
              ))}
            </>
          ) : (
            <option value="all">No truck makes listed</option>
          )}
        </select>
        <label className="sr-only" htmlFor="shop-sort">
          Sort
        </label>
        <select
          id="shop-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-11 w-full border border-border bg-white px-3 text-sm outline-none ring-brand focus:ring-2 sm:max-w-[200px]"
        >
          <option value="featured">Best selling</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name A–Z</option>
        </select>
        <p className="text-sm font-medium text-foreground sm:ml-auto">
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
