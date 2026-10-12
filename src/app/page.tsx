import { Hero } from "@/components/Hero";
import { HomeClient } from "@/components/HomeClient";
import { getFeaturedProducts, getProducts } from "@/sanity/products";

export default async function HomePage() {
  const [products, featured] = await Promise.all([getProducts(), getFeaturedProducts(8)]);
  return <><Hero featuredImage={featured[0]?.images[0]} featuredAlt={featured[0]?.name} /><HomeClient products={products} featured={featured} /></>;
}
