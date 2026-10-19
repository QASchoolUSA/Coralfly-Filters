"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { useCartItems } from "@/lib/use-cart";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/product-gallery";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartItems();

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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingAmount = subtotal >= 75 || subtotal === 0 ? 0 : 12;
  const progressPercent = Math.min(100, Math.round((subtotal / 75) * 100));
  const amountToFreeShipping = Math.max(0, 75 - subtotal);
  const currency = items[0]?.currency || "usd";

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeCart]);

  const handleCheckout = async () => {
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

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className={`cart-overlay${isOpen ? " cart-overlay--visible" : ""}`}
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
      />
      <aside
        className={`cart-panel${isOpen ? " cart-panel--open" : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <header className="cart-panel__header">
          <h2 className="cart-panel__title">
            Your Cart
            {itemCount > 0 ? (
              <span className="cart-panel__count">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            ) : null}
          </h2>
          <button
            type="button"
            className="cart-panel__close"
            onClick={closeCart}
            aria-label="Close cart drawer"
          >
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-panel__empty">
            <div className="cart-panel__empty-icon" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h3>Your cart is empty</h3>
            <p>Explore our complete OEM-grade catalog of heavy duty filtration solutions.</p>
            <Link
              href="/shop"
              className="cart-panel__empty-btn"
              onClick={closeCart}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress Meter */}
            <div className={`cart-panel__meter ${subtotal >= 75 ? "cart-panel__meter--unlocked" : ""}`}>
              <div className="cart-panel__meter-header">
                <span className="cart-panel__meter-title">
                  {subtotal >= 75 ? "🎉" : "🚚"}{" "}
                  {subtotal >= 75 ? (
                    <span><strong>FREE Standard Shipping</strong> Unlocked!</span>
                  ) : (
                    <span>Add <strong>${amountToFreeShipping.toFixed(2)}</strong> for Free Shipping</span>
                  )}
                </span>
                <span className="cart-panel__meter-badge">
                  {subtotal >= 75 ? "UNLOCKED" : `${progressPercent}%`}
                </span>
              </div>
              <div className="cart-panel__meter-track">
                <div
                  className="cart-panel__meter-bar"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Scrollable Items List */}
            <div className="cart-panel__items">
              {items.map((item) => (
                <article
                  className={`cart-item-card ${removingIds.includes(item.id) ? "cart-item-card--removing" : ""}`}
                  key={item.id}
                >
                  <Link
                    href={`/shop/${item.slug}`}
                    className="cart-item-card__image"
                    onClick={closeCart}
                  >
                    <Image
                      src={item.image || PRODUCT_PLACEHOLDER_IMAGE}
                      alt={item.name}
                      fill
                      sizes="74px"
                      style={{ objectFit: "contain" }}
                    />
                  </Link>

                  <div className="cart-item-card__body">
                    <div className="cart-item-card__header">
                      <Link
                        href={`/shop/${item.slug}`}
                        className="cart-item-card__name"
                        onClick={closeCart}
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        className="cart-item-card__remove"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>

                    <div className="cart-item-card__meta">
                      <span className="cart-item-card__sku">
                        SKU: {item.sku || "CF-PART"}
                      </span>
                      <span className="cart-item-card__stock">
                        <svg width="7" height="7" viewBox="0 0 8 8" fill="#16a34a">
                          <circle cx="4" cy="4" r="4" />
                        </svg>
                        In Stock
                      </span>
                    </div>

                    <div className="cart-item-card__unit-price">
                      {formatPrice(item.price, item.currency)} each
                    </div>

                    <div className="cart-item-card__controls">
                      {/* Modern Capsule Stepper */}
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

                      <span className="cart-item-card__price">
                        {formatPrice(item.price * item.quantity, item.currency)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Drawer Footer */}
            <footer className="cart-panel__footer">
              <div className="cart-panel__summary">
                <div className="cart-panel__row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="cart-panel__row">
                  <span>Shipping</span>
                  {shippingAmount === 0 ? (
                    <span className="cart-panel__free-badge">FREE</span>
                  ) : (
                    <span>{formatPrice(shippingAmount, currency)}</span>
                  )}
                </div>
                <div className="cart-panel__row cart-panel__row--total">
                  <span>Estimated Total</span>
                  <span>{formatPrice(subtotal + shippingAmount, currency)}</span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                type="button"
                className="cart-panel__checkout-btn"
                disabled={checkoutLoading || items.length === 0}
                onClick={handleCheckout}
              >
                {checkoutLoading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Redirecting to Stripe…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Proceed to Checkout
                  </>
                )}
              </button>

              {checkoutError && (
                <div style={{ marginTop: 8, fontSize: 12, color: "#ef4444", textAlign: "center" }}>
                  {checkoutError}
                </div>
              )}

              {/* Secondary Link: View Full Cart */}
              <Link
                href="/cart"
                className="cart-panel__view-cart-btn"
                onClick={closeCart}
              >
                View Full Cart
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              {/* Trust Assurances Strip */}
              <div className="cart-panel__trust">
                <div className="cart-panel__trust-item">
                  <span>🔒</span>
                  <span>256-Bit SSL Encrypted Checkout via Stripe</span>
                </div>
                <div className="cart-panel__payment-icons">
                  <span>Visa</span>
                  <span>•</span>
                  <span>Mastercard</span>
                  <span>•</span>
                  <span>Amex</span>
                  <span>•</span>
                  <span>Apple Pay</span>
                </div>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
