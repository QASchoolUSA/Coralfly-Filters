"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { calculateCartShipping, getCartShippingBreakdown } from "@/lib/shipping";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/product-gallery";

export function CartView() {
  const { items, setQuantity, removeItem, clear } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<string[]>([]);

  const handleRemoveItem = (id: string) => {
    setRemovingIds((prev) => [...prev, id]);
    setTimeout(() => {
      removeItem(id);
      setRemovingIds((prev) => prev.filter((itemId) => itemId !== id));
    }, 240);
  };

  const handleProceedToCheckout = async () => {
    if (items.length === 0) return;
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to initiate Stripe checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed");
      setCheckoutLoading(false);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingAmount = calculateCartShipping(items);
  const shippingBreakdown = getCartShippingBreakdown(items);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingAmount);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCoupon = coupon.trim().toUpperCase();
    if (cleanCoupon === "FLEET10" || cleanCoupon === "CORALFLY") {
      setDiscountPercent(10);
      setCouponError("");
      setCoupon("");
    } else {
      setCouponError("Invalid coupon code. Try FLEET10 for 10% fleet discount.");
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountPercent(0);
    setCouponError("");
  };

  if (items.length === 0) {
    return (
      <div className="cf-cart-container">
        <div className="cf-cart-empty">
          <div className="cf-cart-empty__icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h2 className="cf-cart-empty__title">Your Shopping Cart is Empty</h2>
          <p className="cf-cart-empty__desc">
            Your heavy duty filtration cart has no items. Explore our complete OEM-grade catalog of oil,
            fuel, air, and cabin filters for commercial fleets.
          </p>
          <div className="cf-cart-empty__actions">
            <Link href="/shop" className="cf-cart-empty__primary-btn">
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cf-cart-container">
      {/* Main Grid: Items Card + Summary Sidebar */}
      <div className="cf-cart-grid">
        {/* Left Side: Cart Items */}
        <div className="cf-cart-card">
          <div className="cf-cart-card__header">
            <h2 className="cf-cart-card__title">
              Shopping Cart
              <span className="cf-cart-card__count">
                {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
              </span>
            </h2>
            <button
              type="button"
              className="cf-cart-card__clear-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your cart?")) {
                  clear();
                }
              }}
            >
              Clear Cart
            </button>
          </div>

          {/* Mobile View: Sleek Horizontal Cards */}
          <div className="cf-cart-mobile-list">
            {items.map((item) => (
              <div
                key={item.id}
                className={`cf-cart-m-item ${removingIds.includes(item.id) ? "cf-cart-m-item--removing" : ""}`}
              >
                <Link href={`/shop/${item.slug}`} className="cf-cart-m-thumb">
                  <Image
                    src={item.image || PRODUCT_PLACEHOLDER_IMAGE}
                    alt={item.name}
                    fill
                    sizes="86px"
                    style={{ objectFit: "contain" }}
                  />
                </Link>

                <div className="cf-cart-m-info">
                  <div className="cf-cart-m-header">
                    <Link href={`/shop/${item.slug}`} className="cf-cart-m-title">
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      className="cf-cart-m-remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  <div className="cf-cart-m-meta">
                    <span className="cf-cart-m-sku">SKU: {item.sku || "CF-PART"}</span>
                    <span className="cf-cart-m-stock">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="#16a34a">
                        <circle cx="4" cy="4" r="4" />
                      </svg>
                      In Stock
                    </span>
                  </div>

                  <div className="cf-cart-m-unit-price">
                    {formatPrice(item.price, item.currency)} each
                  </div>

                  <div className="cf-cart-m-actions">
                    <div className="cf-stepper">
                      <button
                        type="button"
                        className="cf-stepper__btn"
                        onClick={() => setQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cf-stepper__val">{item.quantity}</span>
                      <button
                        type="button"
                        className="cf-stepper__btn"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="cf-cart-m-total">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Modern Table */}
          <div className="cf-cart-desktop-view">
            <table className="cf-cart-d-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th className="cf-text-center">Quantity</th>
                  <th className="cf-text-right">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className={removingIds.includes(item.id) ? "cf-cart-row--removing" : ""}
                  >
                    <td>
                      <div className="cf-cart-d-product">
                        <Link href={`/shop/${item.slug}`} className="cf-cart-d-thumb">
                          <Image
                            src={item.image || PRODUCT_PLACEHOLDER_IMAGE}
                            alt={item.name}
                            fill
                            sizes="76px"
                            style={{ objectFit: "contain" }}
                          />
                        </Link>
                        <div className="cf-cart-d-details">
                          <Link href={`/shop/${item.slug}`} className="cf-cart-d-title">
                            {item.name}
                          </Link>
                          <div className="cf-cart-d-sku">
                            SKU: {item.sku || "CF-PART"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="cf-cart-d-price">
                      {formatPrice(item.price, item.currency)}
                    </td>
                    <td className="cf-text-center">
                      <div className="cf-stepper">
                        <button
                          type="button"
                          className="cf-stepper__btn"
                          onClick={() => setQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="cf-stepper__val">{item.quantity}</span>
                        <button
                          type="button"
                          className="cf-stepper__btn"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="cf-cart-d-total cf-text-right">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </td>
                    <td className="cf-text-right">
                      <button
                        type="button"
                        className="cf-cart-d-remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Card Navigation */}
          <div className="cf-cart-card__footer">
            <Link href="/shop" className="cf-cart-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Side: Sticky Order Summary */}
        <div className="cf-summary-card">
          <div className="cf-summary-card__header">
            <h3 className="cf-summary-card__title">Order Summary</h3>
          </div>

          <div className="cf-summary-card__body">
            {/* Promo Code Input */}
            <div className="cf-promo-container">
              {discountPercent > 0 ? (
                <div className="cf-promo-applied">
                  <span>✓ 10% Fleet Discount Applied</span>
                  <button
                    type="button"
                    className="cf-promo-remove"
                    onClick={handleRemoveCoupon}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form className="cf-promo-form" onSubmit={handleApplyCoupon}>
                  <input
                    type="text"
                    className="cf-promo-input"
                    placeholder="Promo code (e.g. FLEET10)"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      if (couponError) setCouponError("");
                    }}
                  />
                  <button type="submit" className="cf-promo-btn">
                    Apply
                  </button>
                </form>
              )}
              {couponError && <div className="cf-promo-error">{couponError}</div>}
              {discountPercent === 0 && (
                <div className="cf-promo-hint">Use code FLEET10 for 10% fleet savings</div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="cf-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal, "usd")}</span>
            </div>

            <div className="cf-summary-row">
              <span>Delivery / Shipping</span>
              <span>{formatPrice(shippingAmount, "usd")}</span>
            </div>

            {shippingBreakdown.length > 0 && (
              <div
                style={{
                  margin: "8px 0 14px",
                  padding: "10px 12px",
                  background: "rgba(0, 129, 201, 0.05)",
                  borderRadius: 6,
                  border: "1px solid rgba(0, 129, 201, 0.15)",
                  fontSize: 12,
                }}
              >
                <div style={{ fontWeight: 600, color: "#0081c9", marginBottom: 4 }}>
                  Itemized Delivery Rates:
                </div>
                {shippingBreakdown.map((tier) => (
                  <div
                    key={tier.category}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#64748b",
                      lineHeight: 1.5,
                    }}
                  >
                    <span>
                      {tier.label} &times; {tier.totalQuantity}
                    </span>
                    <span>{formatPrice(tier.subtotalShipping, "usd")}</span>
                  </div>
                ))}
                <div
                  style={{
                    color: "#64748b",
                    marginTop: 6,
                    paddingTop: 6,
                    borderTop: "1px dashed rgba(0, 129, 201, 0.2)",
                    fontSize: 11,
                    fontStyle: "italic",
                  }}
                >
                  Frequent & recurring fleet accounts: Contact dispatch for contracted rates.
                </div>
              </div>
            )}

            {discountPercent > 0 && (
              <div className="cf-summary-row cf-summary-row--highlight">
                <span>Fleet Discount ({discountPercent}%)</span>
                <span>-{formatPrice(discountAmount, "usd")}</span>
              </div>
            )}

            <div className="cf-summary-row">
              <span>Estimated Tax</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="cf-summary-divider" />

            <div className="cf-summary-total">
              <span className="cf-summary-total__label">Estimated Total</span>
              <span className="cf-summary-total__val">
                {formatPrice(grandTotal, "usd")}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              type="button"
              className="cf-checkout-btn"
              disabled={checkoutLoading || items.length === 0}
              onClick={handleProceedToCheckout}
            >
              {checkoutLoading ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Redirecting to Stripe…
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Proceed to Checkout
                </>
              )}
            </button>

            {checkoutError && (
              <div className="cf-checkout-error">{checkoutError}</div>
            )}

            {/* Trust Assurances Strip */}
            <div className="cf-trust-strip">
              <div className="cf-trust-item">
                <span className="cf-trust-item__icon">🔒</span>
                <span>256-Bit SSL Encrypted Checkout via Stripe</span>
              </div>
              <div className="cf-trust-item">
                <span className="cf-trust-item__icon">⚡</span>
                <span>Fast Same-Day Commercial Fleet Dispatch</span>
              </div>
              <div className="cf-trust-item">
                <span className="cf-trust-item__icon">🛡️</span>
                <span>100% Fitment Guarantee & 30-Day Returns</span>
              </div>
            </div>

            <div className="cf-payment-icons">
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>Amex</span>
              <span>•</span>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
