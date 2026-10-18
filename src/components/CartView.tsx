"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { items, setQuantity, removeItem } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

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
  const shippingAmount = subtotal >= 75 || subtotal === 0 ? 0 : 12;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "FLEET10" || coupon.trim().toUpperCase() === "CORALFLY") {
      setDiscountPercent(10);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try FLEET10 for 10% off.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="block" style={{ padding: "80px 0" }}>
        <div className="container">
          <div
            className="card"
            style={{
              padding: "48px 32px",
              textAlign: "center",
              maxWidth: 580,
              margin: "0 auto",
              boxShadow: "0 1px 3px rgba(0,0,0,.09)",
            }}
          >
            <div style={{ fontSize: 54, marginBottom: 16 }}>🛒</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: "#212529" }}>
              Your Shopping Cart is Empty
            </h2>
            <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
              Your heavy duty filtration cart is currently empty. Explore our complete catalog of oil,
              fuel, air, and cabin filters for commercial fleets.
            </p>
            <div>
              <Link
                href="/shop"
                className="btn btn-primary btn-lg"
                style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "12px 36px" }}
              >
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="block">
      <div className="container">
        <div className="cart">
          {/* Free Shipping Progress Meter */}
          <div
            style={{
              background: subtotal >= 75 ? "#e8f8ec" : "#e8f4fb",
              border: `1px solid ${subtotal >= 75 ? "#c3e6cb" : "#b8daff"}`,
              borderRadius: 6,
              padding: "16px 20px",
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: subtotal >= 75 ? "#155724" : "#004085" }}>
                {subtotal >= 75 ? (
                  <span>🎉 Congratulations! You have unlocked <strong>FREE Standard Shipping</strong>!</span>
                ) : (
                  <span>
                    Add <strong>${(75 - subtotal).toFixed(2)}</strong> more to your order to unlock <strong>FREE Standard Shipping</strong>!
                  </span>
                )}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: subtotal >= 75 ? "#28a745" : "#0081c9" }}>
                {Math.min(100, Math.round((subtotal / 75) * 100))}%
              </span>
            </div>
            <div style={{ height: 8, background: "rgba(0,0,0,0.08)", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, Math.round((subtotal / 75) * 100))}%`,
                  backgroundColor: subtotal >= 75 ? "#28a745" : "#0081c9",
                  transition: "width 0.4s ease",
                  borderRadius: 4,
                }}
              />
            </div>
          </div>

          {/* Main Cart Table */}
          <div className="cart__table cart-table">
            <table className="cart-table__table">
              <thead className="cart-table__head">
                <tr className="cart-table__row">
                  <th className="cart-table__column cart-table__column--image">Image</th>
                  <th className="cart-table__column cart-table__column--product">Product</th>
                  <th className="cart-table__column cart-table__column--price">Price</th>
                  <th className="cart-table__column cart-table__column--quantity">Quantity</th>
                  <th className="cart-table__column cart-table__column--total">Total</th>
                  <th className="cart-table__column cart-table__column--remove"></th>
                </tr>
              </thead>
              <tbody className="cart-table__body">
                {items.map((item) => (
                  <tr key={item.id} className="cart-table__row">
                    <td className="cart-table__column cart-table__column--image">
                      <div className="image image--type--product">
                        <Link href={`/shop/${item.slug}`} className="image__body" style={{ position: "relative", width: 80, height: 80, display: "block" }}>
                          <Image
                            className="image__tag"
                            src={item.image || "/images/products/product-1-245x245.jpg"}
                            alt={item.name}
                            fill
                            sizes="80px"
                            style={{ objectFit: "contain" }}
                          />
                        </Link>
                      </div>
                    </td>
                    <td className="cart-table__column cart-table__column--product">
                      <Link href={`/shop/${item.slug}`} className="cart-table__product-name">
                        {item.name}
                      </Link>
                      <ul className="cart-table__options">
                        <li>SKU: {item.sku || "CF-PART"}</li>
                      </ul>
                    </td>
                    <td className="cart-table__column cart-table__column--price" data-title="Price">
                      {formatPrice(item.price, item.currency)}
                    </td>
                    <td className="cart-table__column cart-table__column--quantity" data-title="Quantity">
                      <div className="cart-table__quantity input-number">
                        <input
                          className="form-control input-number__input"
                          type="number"
                          min={1}
                          value={item.quantity}
                          readOnly
                        />
                        <div
                          className="input-number__add"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          role="button"
                          aria-label="Increase quantity"
                        />
                        <div
                          className="input-number__sub"
                          onClick={() => setQuantity(item.id, Math.max(1, item.quantity - 1))}
                          role="button"
                          aria-label="Decrease quantity"
                        />
                      </div>
                    </td>
                    <td className="cart-table__column cart-table__column--total" data-title="Total">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </td>
                    <td className="cart-table__column cart-table__column--remove">
                      <button
                        type="button"
                        className="cart-table__remove btn btn-sm btn-icon btn-muted"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <svg width="12" height="12">
                          <path d="M10.8,10.8L10.8,10.8c-0.4,0.4-1,0.4-1.4,0L6,7.4l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4L4.6,6L1.2,2.6c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0L6,4.6l3.4-3.4c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4L7.4,6l3.4,3.4C11.2,9.8,11.2,10.4,10.8,10.8z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="cart-table__foot">
                <tr>
                  <td colSpan={6}>
                    <div className="cart-table__actions">
                      <form className="cart-table__coupon-form form-row" onSubmit={handleApplyCoupon}>
                        <div className="form-group mb-0 col flex-grow-1">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Coupon Code"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-0 col-auto">
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                            style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}
                          >
                            Apply Coupon
                          </button>
                        </div>
                        {discountPercent > 0 && (
                          <div className="col-12 mt-2" style={{ color: "#28a745", fontSize: 13, fontWeight: 500 }}>
                            ✓ 10% Fleet Coupon Applied!
                          </div>
                        )}
                        {couponError && (
                          <div className="col-12 mt-2" style={{ color: "#dc3545", fontSize: 13 }}>
                            {couponError}
                          </div>
                        )}
                      </form>
                      <div className="cart-table__update-button">
                        <Link
                          href="/shop"
                          className="btn btn-sm btn-primary"
                          style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Cart Totals Box */}
          <div className="cart__totals">
            <div className="card">
              <div className="card-body card-body--padding--2">
                <h3 className="card-title">Cart Totals</h3>
                <table className="cart__totals-table">
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <td>{formatPrice(subtotal, "usd")}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Shipping</th>
                      <td>
                        {shippingAmount === 0 ? "FREE" : formatPrice(shippingAmount, "usd")}
                        <div>
                          <span style={{ fontSize: 13, color: "#6c757d" }}>
                            {shippingAmount === 0
                              ? "Free shipping on orders $75+"
                              : "Standard Freight Shipping"}
                          </span>
                        </div>
                      </td>
                    </tr>
                    {discountPercent > 0 && (
                      <tr>
                        <th>Discount ({discountPercent}%)</th>
                        <td style={{ color: "#28a745" }}>
                          -{formatPrice(discountAmount, "usd")}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <th>Tax</th>
                      <td>$0.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <td>{formatPrice(grandTotal, "usd")}</td>
                    </tr>
                  </tfoot>
                </table>
                <button
                  type="button"
                  className="btn btn-primary btn-xl btn-block"
                  disabled={checkoutLoading || items.length === 0}
                  onClick={handleProceedToCheckout}
                  style={{
                    backgroundColor: "#0081c9",
                    borderColor: "#0081c9",
                    cursor: checkoutLoading ? "wait" : "pointer",
                  }}
                >
                  {checkoutLoading ? "Redirecting to Stripe…" : "Proceed to checkout"}
                </button>
                {checkoutError && (
                  <div className="mt-2 text-danger small text-center">
                    {checkoutError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-space block-space--layout--before-footer" />
    </div>
  );
}
