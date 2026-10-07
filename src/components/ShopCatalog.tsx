import { ShopFilters } from "./ShopFilters";
import { getCategories, getProducts } from "@/sanity/products";

export async function ShopCatalog() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <ShopFilters products={products} categories={categories} />;
}
