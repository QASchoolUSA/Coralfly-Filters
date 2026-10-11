import type { Product } from "@/sanity/types";

export function slugifyCatalogName(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getCatalogMakes(products: Product[]) {
  const makes = new Map<string, string>();
  for (const product of products) for (const make of product.compatibleMakes ?? []) {
    const clean = make.trim();
    if (clean && !makes.has(slugifyCatalogName(clean))) makes.set(slugifyCatalogName(clean), clean);
  }
  return [...makes.entries()].map(([slug, name]) => ({ slug, name }));
}

export function getCatalogCategories(products: Product[]) {
  const categories = new Map<string, string>();
  for (const product of products) {
    const category = product.category?.trim();
    if (category && !categories.has(slugifyCatalogName(category))) categories.set(slugifyCatalogName(category), category);
  }
  return [...categories.entries()].map(([slug, name]) => ({ slug, name }));
}
