"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { formatFitmentSummary } from "@/lib/catalog";
import type { Product } from "@/sanity/types";

export function ProductCard({
  product,
  badge,
}: {
  product: Product;
  index?: number;
  badge?: string;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [added, setAdded] = useState(false);

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const savings =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice - product.price
      : 0;

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];
  const fitmentSummary = formatFitmentSummary(product);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock === false) return;

    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
    openCart();
  }

  const isOutOfStock = product.inStock === false;

  return (
    <article className="product-card group">
      {/* Studio Product Visual Area */}
      <div className="product-card-visual">
        <Link
          href={`/shop/${product.slug}`}
          className="product-card-image-link"
          aria-label={`View ${product.name}`}
        >
          <div className="product-card-image-wrapper">
            {primaryImage ? (
              <>
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || product.name}
                  className="product-card-image product-card-image--primary"
                  width={480}
                  height={480}
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
                />
                {secondaryImage ? (
                  <Image
                    src={secondaryImage.url}
                    alt={secondaryImage.alt || `${product.name} alternate angle`}
                    className="product-card-image product-card-image--secondary"
                    width={480}
                    height={480}
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : null}
              </>
            ) : (
              <div className="product-card-placeholder">
                <FilterGlyph />
              </div>
            )}
          </div>
        </Link>

        {/* Top-Left Badges Stack */}
        <div className="product-card-badge-stack">
          {discount > 0 ? (
            <span className="product-card-badge product-card-badge--sale">
              Save {discount}%
            </span>
          ) : null}
          {badge ? (
            <span className="product-card-badge product-card-badge--featured">
              {badge}
            </span>
          ) : null}
          {isOutOfStock ? (
            <span className="product-card-badge product-card-badge--oos">
              Out of Stock
            </span>
          ) : null}
        </div>
      </div>

      {/* Product Information Body */}
      <div className="product-card-info">
        {/* Header Row: Category + Live Stock Indicator */}
        <div className="product-card-header-row">
          {product.category ? (
            <span className="product-card-category">{product.category}</span>
          ) : (
            <span className="product-card-category">CORALFLY</span>
          )}
          <div
            className={`product-card-stock ${
              isOutOfStock ? "product-card-stock--out" : "product-card-stock--in"
            }`}
          >
            {!isOutOfStock ? <span className="product-card-stock-dot" /> : null}
            <span>{isOutOfStock ? "Backorder" : "In Stock"}</span>
          </div>
        </div>

        {/* Product Title */}
        <Link href={`/shop/${product.slug}`} className="product-card-title-link">
          <h3 className="product-card-name" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* Fitment and Specs Tags */}
        <div className="product-card-meta">
          {fitmentSummary ? (
            <div
              className="product-card-fitment-chip"
              title={`Verified fitment: ${fitmentSummary}`}
            >
              <TruckIcon />
              <span>{fitmentSummary}</span>
            </div>
          ) : null}

          {product.sku ? (
            <div className="product-card-specs-row">
              <span className="product-card-sku-tag">SKU: {product.sku}</span>
            </div>
          ) : null}
        </div>

        {/* High-Visibility Obvious Pricing & Add to Cart Footer */}
        <div className="product-card-footer">
          <div className="product-card-pricing-block">
            <div className="product-card-price-row">
              <span className="product-card-price">
                {formatPrice(product.price, product.currency)}
              </span>
              {discount > 0 && product.compareAtPrice ? (
                <span className="product-card-compare">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </span>
              ) : null}
            </div>

            {discount > 0 ? (
              <div className="product-card-savings-pill">
                <span>Save {formatPrice(savings, product.currency)}</span>
                <span className="product-card-savings-pct">({discount}% OFF)</span>
              </div>
            ) : null}
          </div>

          {/* Primary Add to Cart Action */}
          <button
            className={`product-card-btn ${added ? "product-card-btn--added" : ""}`}
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={
              isOutOfStock
                ? "Product out of stock"
                : added
                ? "Added to Cart"
                : `Add ${product.name} to Cart`
            }
          >
            {isOutOfStock ? (
              <span>Out of Stock</span>
            ) : added ? (
              <>
                <CheckIcon />
                <span>Added to Cart ✓</span>
              </>
            ) : (
              <>
                <BagIcon />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterGlyph() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="16" y="10" width="32" height="44" rx="5" />
      <path d="M21 19h22M21 25h22M21 31h22M21 37h22M21 43h22" opacity=".55" />
      <circle cx="32" cy="32" r="6" opacity=".4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10Z" />
      <circle cx="17" cy="18.5" r="2.5" />
      <circle cx="7" cy="18.5" r="2.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
