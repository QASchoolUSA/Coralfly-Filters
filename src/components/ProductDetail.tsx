import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./AddToCartButton";
import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/sanity/products";

type Props = {
  slug: string;
};

export async function ProductDetail({ slug }: Props) {
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const image = product.images[0];
  const compareAt =
    product.price > 0 ? Math.round(product.price * 1.18 * 100) / 100 : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav className="text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-brand">
          Shop
        </Link>
        {product.category ? (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-brand"
            >
              {product.category}
            </Link>
          </>
        ) : null}
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-square overflow-hidden border border-border bg-surface">
          {product.featured ? (
            <span className="absolute left-4 top-4 z-10 bg-brand px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-white">
              Best seller
            </span>
          ) : null}
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

          <div className="mt-5 flex items-baseline gap-3">
            <p className="text-3xl font-bold text-foreground">
              {formatPrice(product.price, product.currency)}
            </p>
            {compareAt ? (
              <p className="text-lg text-muted line-through">
                {formatPrice(compareAt, product.currency)}
              </p>
            ) : null}
          </div>
          <p className="mt-2 text-sm font-medium text-emerald-700">
            In stock · Ships today · Free shipping on orders $75+
          </p>

          {product.description ? (
            <p className="mt-5 text-base leading-relaxed text-muted">
              {product.description}
            </p>
          ) : null}

          <div className="mt-8 border border-border bg-surface p-5">
            <p className="font-display text-xs uppercase tracking-[0.14em] text-foreground">
              Buy now
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={product} className="w-full sm:flex-1" />
              <Link
                href="/cart"
                className="inline-flex h-12 items-center justify-center border border-border bg-white px-7 font-display text-sm uppercase tracking-[0.14em] text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                Go to cart
              </Link>
            </div>
            <ul className="mt-4 space-y-1.5 text-xs text-muted">
              <li>✓ Secure Stripe hosted checkout</li>
              <li>✓ Easy returns on unused filters</li>
              <li>✓ Need a match? Contact our team</li>
            </ul>
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
