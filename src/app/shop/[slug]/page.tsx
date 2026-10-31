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
  if (!product) return { title: "Product Not Found" };

  const title = product.name;
  const description =
    product.description ||
    `Heavy duty ${product.name} (SKU: ${product.sku || product.slug}) engineered for commercial truck fleet reliability. In stock with fast USA dispatch.`;
  const canonicalUrl = `https://coralflyfilters.com/shop/${slug}`;
  const images = product.images?.length
    ? product.images.map((img) => ({
        url: img.url,
        alt: img.alt || title,
      }))
    : [
        {
          url: "https://coralflyfilters.com/images/og-business-card.png",
          alt: title,
        },
      ];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | CORALFLY`,
      description,
      url: canonicalUrl,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CORALFLY`,
      description,
      images: images.map((i) => i.url),
    },
  };
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
          Loading filter specifications…
        </div>
      }
    >
      <ProductDetailLoader params={params} />
    </Suspense>
  );
}
