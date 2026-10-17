"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { items, setQuantity, removeItem, clear } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");

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
      <div className="block" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="card" style={{ padding: 48, textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Your Cart is Currently Empty</h2>
            <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 24 }}>
              Before proceeding to checkout, you must add some heavy duty filtration products to your cart.
            </p>
            <div>
              <Link
                href="/shop"
                className="btn btn-primary btn-lg"
                style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "12px 32px" }}
              >
                Browse All Filters
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
        <div className="cart block">
          <div className="cart__table cart-table">
            <table className="cart-table__table table" style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 4 }}>
              <thead className="cart-table__head" style={{ background: "#f8f9fa", borderBottom: "2px solid #ebebeb" }}>
                <tr className="cart-table__row">
                  <th className="cart-table__column cart-table__column--image" style={{ width: 100 }}>Image</th>
                  <th className="cart-table__column cart-table__column--product">Product</th>
                  <th className="cart-table__column cart-table__column--price" style={{ width: 120 }}>Price</th>
                  <th className="cart-table__column cart-table__column--quantity" style={{ width: 140 }}>Quantity</th>
                  <th className="cart-table__column cart-table__column--total" style={{ width: 120 }}>Total</th>
                  <th className="cart-table__column cart-table__column--remove" style={{ width: 60 }}></th>
                </tr>
              </thead>
              <tbody className="cart-table__body">
                {items.map((item) => (
                  <tr key={item.id} className="cart-table__row" style={{ borderBottom: "1px solid #ebebeb" }}>
                    <td className="cart-table__column cart-table__column--image">
                      <Link href={`/shop/${item.slug}`}>
                        <img
                          src={item.image || "/images/products/product-1-245x245.jpg"}
                          alt={item.name}
                          style={{ width: 72, height: 72, objectFit: "contain" }}
                        />
                      </Link>
                    </td>
                    <td className="cart-table__column cart-table__column--product">
                      <Link href={`/shop/${item.slug}`} style={{ fontWeight: 700, color: "#1a1d21", textDecoration: "none", fontSize: 15 }}>
                        {item.name}
                      </Link>
                      <div style={{ fontSize: 12, color: "#6c757d", marginTop: 4 }}>
                        SKU: {item.sku || "CF-PART"}
                      </div>
                    </td>
                    <td className="cart-table__column cart-table__column--price" style={{ fontWeight: 600, fontSize: 15 }}>
                      {formatPrice(item.price, item.currency)}
                    </td>
                    <td className="cart-table__column cart-table__column--quantity">
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid #ebebeb", borderRadius: 3, width: 100, height: 38 }}>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, Math.max(1, item.quantity - 1))}
                          style={{ width: 30, height: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 16 }}
                        >
                          −
                        </button>
                        <span style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: 14 }}>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          style={{ width: 30, height: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 16 }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="cart-table__column cart-table__column--total" style={{ fontWeight: 700, fontSize: 15, color: "#0081c9" }}>
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </td>
                    <td className="cart-table__column cart-table__column--remove text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="btn btn-light btn-sm"
                        style={{ color: "#dc3545", border: "none", background: "none", fontSize: 18, cursor: "pointer" }}
                        title="Remove item"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <Link href="/shop" className="btn btn-secondary btn-sm">
              &larr; Continue Shopping
            </Link>
            <button
              type="button"
              onClick={() => clear()}
              className="btn btn-light btn-sm"
              style={{ color: "#6c757d", border: "1px solid #dee2e6" }}
            >
              Clear Shopping Cart
            </button>
          </div>

          {/* Coupon and Cart Totals Row */}
          <div className="cart__totals row" style={{ marginTop: 24 }}>
            {/* Coupon Box */}
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              <div className="card" style={{ padding: 24, border: "1px solid #ebebeb", borderRadius: 4 }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Coupon Discount</h4>
                <p style={{ fontSize: 13, color: "#6c757d", marginBottom: 16 }}>
                  Have a fleet account coupon? Enter your promotional code below. (Try: <strong>FLEET10</strong>)
                </p>
                <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Coupon Code..."
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    style={{ height: 42, textTransform: "uppercase" }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ height: 42, padding: "0 20px", backgroundColor: "#0081c9", borderColor: "#0081c9", whiteSpace: "nowrap" }}
                  >
                    Apply Coupon
                  </button>
                </form>
                {discountPercent > 0 && (
                  <div style={{ color: "#28a745", fontSize: 13, marginTop: 8, fontWeight: 600 }}>
                    ✓ 10% Fleet Discount Applied!
                  </div>
                )}
                {couponError && (
                  <div style={{ color: "#dc3545", fontSize: 13, marginTop: 8 }}>
                    {couponError}
                  </div>
                )}
              </div>
            </div>

            {/* Cart Totals Box */}
            <div className="col-12 col-lg-6">
              <div className="card" style={{ padding: 24, border: "1px solid #ebebeb", borderRadius: 4 }}>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Order Summary</h4>
                <table className="table" style={{ fontSize: 15, marginBottom: 24 }}>
                  <tbody>
                    <tr>
                      <th style={{ borderTop: "none", color: "#6c757d", fontWeight: 500 }}>Subtotal</th>
                      <td style={{ borderTop: "none", textAlign: "right", fontWeight: 700 }}>
                        {formatPrice(subtotal, "usd")}
                      </td>
                    </tr>
                    {discountPercent > 0 && (
                      <tr>
                        <th style={{ color: "#28a745", fontWeight: 500 }}>Fleet Coupon (10%)</th>
                        <td style={{ textAlign: "right", color: "#28a745", fontWeight: 700 }}>
                          −{formatPrice(discountAmount, "usd")}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <th style={{ color: "#6c757d", fontWeight: 500 }}>Shipping</th>
                      <td style={{ textAlign: "right", fontWeight: 700 }}>
                        {shippingAmount === 0 ? (
                          <span style={{ color: "#28a745" }}>FREE (Orders $75+)</span>
                        ) : (
                          formatPrice(shippingAmount, "usd")
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th style={{ color: "#6c757d", fontWeight: 500 }}>Estimated Tax</th>
                      <td style={{ textAlign: "right", fontWeight: 700 }}>$0.00</td>
                    </tr>
                    <tr style={{ borderTop: "2px solid #ebebeb", fontSize: 18 }}>
                      <th style={{ fontWeight: 700, color: "#1a1d21" }}>Total</th>
                      <td style={{ textAlign: "right", fontWeight: 700, color: "#0081c9" }}>
                        {formatPrice(grandTotal, "usd")}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ display: "flex", gap: 12 }}>
                  <Link
                    href="/shop"
                    className="btn btn-secondary"
                    style={{ flex: 1, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    href="/checkout"
                    className="btn btn-primary"
                    style={{
                      flex: 1,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      fontWeight: 700,
                      backgroundColor: "#0081c9",
                      borderColor: "#0081c9",
                    }}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-space block-space--layout--before-footer" />
    </div>
  );
}
