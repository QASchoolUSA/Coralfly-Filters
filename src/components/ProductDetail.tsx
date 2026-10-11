import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProductBySlug, getProducts } from "@/sanity/products";

export async function ProductDetail({ slug }: { slug: string }) {
  const [product, products] = await Promise.all([getProductBySlug(slug), getProducts()]);
  if (!product) notFound();
  const related = products
    .filter((candidate) => candidate._id !== product._id && candidate.category === product.category)
    .slice(0, 4);
  return <ProductDetailClient product={product} related={related} />;
}
