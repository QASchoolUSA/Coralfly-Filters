import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/format";
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const image = product.images[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/shop"
        className="font-display text-xs uppercase tracking-[0.16em] text-muted hover:text-brand"
      >
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-xs uppercase tracking-[0.16em] text-muted">
              No image
            </div>
          )}
        </div>

        <div>
          {product.category ? (
            <p className="font-display text-xs uppercase tracking-[0.18em] text-brand">
              {product.category}
            </p>
          ) : null}
          <h1 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] text-foreground sm:text-4xl">
            {product.name}
          </h1>
          {product.sku ? (
            <p className="mt-2 text-sm text-muted">SKU: {product.sku}</p>
          ) : null}
          <p className="mt-4 text-2xl font-semibold text-foreground">
            {formatPrice(product.price, product.currency)}
          </p>
          {product.description ? (
            <p className="mt-5 text-base leading-relaxed text-muted">
              {product.description}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton product={product} className="w-full sm:w-auto" />
            <Link
              href="/cart"
              className="inline-flex h-12 items-center justify-center border border-border px-7 font-display text-sm uppercase tracking-[0.14em] text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              View cart
            </Link>
          </div>

          {product.specs?.length ? (
            <div className="mt-10 border-t border-border pt-8">
              <h2 className="font-display text-sm uppercase tracking-[0.16em] text-foreground">
                Specifications
              </h2>
              <dl className="mt-4 divide-y divide-border">
                {product.specs.map((spec) => (
                  <div
                    key={`${spec.label}-${spec.value}`}
                    className="grid grid-cols-2 gap-4 py-3 text-sm"
                  >
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="font-medium text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
