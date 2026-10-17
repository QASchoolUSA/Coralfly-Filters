import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductDetail } from "@/components/ProductDetail";
import { getProductBySlug, getProducts } from "@/sanity/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.description };
}

async function ProductDetailLoader({ params }: Props) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
          Loading filter specifications...
        </div>
      }
    >
      <ProductDetailLoader params={params} />
    </Suspense>
  );
}
