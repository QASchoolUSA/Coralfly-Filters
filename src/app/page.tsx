import { HomeClient } from "@/components/HomeClient";
import { getFeaturedProducts, getProducts } from "@/sanity/products";

export default async function HomePage() {
  const [products, featured] = await Promise.all([
    getProducts(),
    getFeaturedProducts(12),
  ]);

  return <HomeClient products={products} featured={featured} />;
}
