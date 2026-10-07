import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductDetail } from "@/components/ProductDetail";
import { getProductBySlug, getProducts } from "@/sanity/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

async function ProductPageContent({ params }: Props) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid animate-pulse gap-10 lg:grid-cols-2">
            <div className="aspect-[4/3] bg-surface" />
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-surface" />
              <div className="h-10 w-3/4 rounded bg-surface" />
              <div className="h-6 w-20 rounded bg-surface" />
              <div className="h-24 w-full rounded bg-surface" />
            </div>
          </div>
        </div>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}
