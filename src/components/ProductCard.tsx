"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useQuickviewStore } from "@/lib/quickview-store";
import { useVehicleStore } from "@/lib/vehicle-store";
import { formatPrice } from "@/lib/format";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/product-gallery";
import type { Product } from "@/sanity/types";

function getCategoryLabel(product: Product): string {
  if (product.category) {
    return product.category.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  if (product.productType) {
    return product.productType.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  const lower = (product.name || "").toLowerCase();
  if (lower.includes("air filter")) return "Air Filters";
  if (lower.includes("oil filter")) return "Oil Filters";
  if (lower.includes("fuel filter")) return "Fuel Filters";
  if (lower.includes("cabin filter")) return "Cabin Filters";
  if (lower.includes("lamp") || lower.includes("light")) return "Lighting";
  if (lower.includes("kit")) return "Service Kits";
  return "Heavy Duty Filters";
}

export function ProductCard({
  product,
  layout = "grid",
  badge,
}: {
  product: Product;
  layout?: "grid" | "list" | "horizontal";
  badge?: string;
  index?: number;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const openQuickview = useQuickviewStore((state) => state.openQuickview);

  const { currentVehicle } = useVehicleStore();
  const [added, setAdded] = useState(false);

  const isCompatible =
    !currentVehicle ||
    !product.compatibleMakes ||
    product.compatibleMakes.length === 0 ||
    product.compatibleMakes.some(
      (make) => make.toLowerCase() === currentVehicle.make.toLowerCase()
    );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cart:item-added"));
    }
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  const imageUrl = product.images[0]?.url || PRODUCT_PLACEHOLDER_IMAGE;

  const oldPrice =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice
      : product.price * 1.25;

  const discountPercent =
    oldPrice > product.price
      ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
      : 0;

  const categoryLabel = getCategoryLabel(product);
  const sku = product.sku || "CF-" + product.slug.toUpperCase();

  // Active Promo Badge: explicit badge prop takes priority, otherwise discount badge if >= 10%
  const displayBadge =
    badge || (discountPercent >= 10 ? `-${discountPercent}%` : null);

  return (
    <div
      className={`product-card cf-product-card cf-product-card--${layout} product-card--layout--${layout}`}
    >
      {/* 1. Staged Product Image Container */}
      <div className="cf-card-stage">
        {/* Floating Promo / Status Badge */}
        {displayBadge && (
          <div className="cf-card-badge-wrap">
            <span
              className={`cf-card-badge ${
                displayBadge === "NEW"
                  ? "cf-card-badge--new"
                  : displayBadge === "HOT"
                  ? "cf-card-badge--hot"
                  : "cf-card-badge--sale"
              }`}
            >
              {displayBadge}
            </span>
          </div>
        )}

        {/* Floating Quickview Button */}
        <button
          className="cf-card-quickview"
          type="button"
          aria-label={`Quick view ${product.name}`}
          title="Quick view"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickview(product);
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {/* Linked Product Image */}
        <Link
          href={`/shop/${product.slug}`}
          scroll={true}
          className="cf-card-stage__link"
        >
          <Image
            className="cf-card-stage__img image__tag"
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 576px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Vehicle Fitment Compatibility Pill */}
        {currentVehicle && isCompatible && (
          <div className="cf-card-fitment">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              Fits {currentVehicle.year} {currentVehicle.make}
            </span>
          </div>
        )}
      </div>

      {/* 2. Product Meta & Information */}
      <div className="cf-card-body">
        <div className="cf-card-category-row">
          <span className="cf-card-category">{categoryLabel}</span>
        </div>

        <h3 className="cf-card-title">
          <Link href={`/shop/${product.slug}`} scroll={true}>
            {product.name}
          </Link>
        </h3>

        {layout === "list" && (
          <p className="cf-card-desc">
            {product.description ||
              "Heavy-duty commercial grade filtration for extreme uptime and fleet performance."}
          </p>
        )}

        <div className="cf-card-sku-row">
          <span className="cf-card-sku">SKU: {sku}</span>
        </div>
      </div>

      {/* 3. Pricing & Call To Action */}
      <div className="cf-card-footer">
        <div className="cf-card-price-group">
          <div className="cf-card-prices">
            <span className="cf-card-price-current">
              {formatPrice(product.price, product.currency)}
            </span>
            {oldPrice > product.price && (
              <span className="cf-card-price-old">
                {formatPrice(oldPrice, product.currency)}
              </span>
            )}
          </div>
          <div className="cf-card-stock">
            <span className="cf-card-stock__dot" />
            <span>In Stock</span>
          </div>
        </div>

        <button
          className={`cf-card-btn ${added ? "cf-card-btn--added" : ""}`}
          type="button"
          aria-label={added ? "Added to cart" : `Add ${product.name} to cart`}
          onClick={handleAddToCart}
        >
          {added ? (
            <>
              <svg
                className="cf-card-btn__icon cf-card-btn__icon--check"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="cf-card-btn__label">Added</span>
            </>
          ) : (
            <>
              <svg
                className="cf-card-btn__icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="cf-card-btn__label">Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
