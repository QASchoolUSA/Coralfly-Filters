"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useQuickviewStore } from "@/lib/quickview-store";
import { useVehicleStore } from "@/lib/vehicle-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/sanity/types";

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
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  const imageUrl =
    product.images[0]?.url || "/images/products/product-1-245x245.jpg";

  const oldPrice =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice
      : product.price * 1.25;

  return (
    <div className={`product-card product-card--layout--${layout}`}>
      {/* Action Buttons: Quickview */}
      <div className="product-card__actions-list">
        <button
          className="product-card__action product-card__action--quickview"
          type="button"
          aria-label="Quick view"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickview(product);
          }}
        >
          <svg width="16" height="16">
            <path d="M14,15h-4v-2h3v-3h2v4C15,14.6,14.6,15,14,15z M13,3h-3V1h4c0.6,0,1,0.4,1,1v4h-2V3z M6,3H3v3H1V2c0-0.6,0.4-1,1-1h4V3z M3,13h3v2H2c-0.6,0-1-0.4-1-1v-4h2V13z" />
          </svg>
        </button>
      </div>

      {/* Product Image & Vehicle Fit Badge */}
      <div className="product-card__image">
        <div className="image image--type--product">
          <Link href={`/shop/${product.slug}`} className="image__body">
            <img className="image__tag" src={imageUrl} alt={product.name} />
          </Link>
        </div>

        {currentVehicle && isCompatible && (
          <div className="status-badge status-badge--style--success product-card__fit status-badge--has-icon status-badge--has-text">
            <div className="status-badge__body">
              <div className="status-badge__icon">
                <svg width="13" height="13">
                  <path d="M12,4.4L5.5,11L1,6.5l1.4-1.4l3.1,3.1L10.6,3L12,4.4z" />
                </svg>
              </div>
              <div className="status-badge__text">
                Part Fit for {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-card__info">
        <div className="product-card__meta">
          <span className="product-card__meta-title">SKU:</span>{" "}
          {product.sku || "CF-" + product.slug.toUpperCase()}
        </div>

        <div className="product-card__name">
          <div>
            {badge && (
              <div className="product-card__badges">
                <div className="tag-badge tag-badge--hot">{badge}</div>
              </div>
            )}
            <Link href={`/shop/${product.slug}`}>{product.name}</Link>
          </div>
        </div>

        <div className="product-card__rating">
          <div className="rating product-card__rating-stars">
            <div className="rating__body">
              <div className="rating__star rating__star--active" />
              <div className="rating__star rating__star--active" />
              <div className="rating__star rating__star--active" />
              <div className="rating__star rating__star--active" />
              <div className="rating__star rating__star--active" />
            </div>
          </div>
          <div className="product-card__rating-label">5.0 on 8 reviews</div>
        </div>

        {layout === "list" && (
          <div className="product-card__description" style={{ marginTop: 8, fontSize: 13, color: "#6c757d" }}>
            {product.description || "Heavy-duty commercial grade filtration for extreme uptime and fleet performance."}
          </div>
        )}
      </div>

      {/* Product Footer: Price & Add To Cart Button */}
      <div className="product-card__footer">
        <div className="product-card__prices">
          <div className="product-card__price product-card__price--current">
            {formatPrice(product.price, product.currency)}
          </div>
          <div className="product-card__price product-card__price--old">
            {formatPrice(oldPrice, product.currency)}
          </div>
        </div>

        <button
          className="product-card__addtocart-icon"
          type="button"
          aria-label={added ? "Added to cart" : "Add to cart"}
          onClick={handleAddToCart}
          style={{
            backgroundColor: added ? "#28a745" : undefined,
            color: added ? "#fff" : undefined,
          }}
        >
          <svg width="20" height="20">
            <circle cx="7" cy="17" r="2" />
            <circle cx="15" cy="17" r="2" />
            <path d="M20,4.4V5l-1.8,6.3c-0.1,0.4-0.5,0.7-1,0.7H6.7c-0.4,0-0.8-0.3-1-0.7L3.3,3.9C3.1,3.3,2.6,3,2.1,3H0.4C0.2,3,0,2.8,0,2.6V1.4C0,1.2,0.2,1,0.4,1h2.5c1,0,1.8,0.6,2.1,1.6L5.1,3l2.3,6.8c0,0.1,0.2,0.2,0.3,0.2h8.6c0.1,0,0.3-0.1,0.3-0.2l1.3-4.4C17.9,5.2,17.7,5,17.5,5H9.4C9.2,5,9,4.8,9,4.6V3.4C9,3.2,9.2,3,9.4,3h9.2C19.4,3,20,3.6,20,4.4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
