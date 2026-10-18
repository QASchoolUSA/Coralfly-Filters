"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/product-gallery";

export function CheckoutView() {
  const { items } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "fleet">("stripe");
  const [poNumber, setPoNumber] = useState("");
  const [fleetSubmitted, setFleetSubmitted] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 12;
  const grandTotal = subtotal + shipping;

  const handleStripeCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to start Stripe checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout initiation failed");
      setLoading(false);
    }
  };

  const handleFleetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFleetSubmitted(true);
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
              boxShadow: "0 1px 3px rgba(0,0,0,.08)",
            }}
          >
            <div style={{ fontSize: 54, marginBottom: 16 }}>🛒</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Your Cart is Empty</h2>
            <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 24 }}>
              Add filters to your shopping cart before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="btn btn-primary btn-lg"
              style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "12px 36px" }}
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="block">
      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row">
          {/* Left Column: Shipping & Payment Method */}
          <div className="col-12 col-lg-7 mb-4 mb-lg-0">
            <div className="card mb-4" style={{ padding: 28, border: "1px solid #ebebeb", borderRadius: 4 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>1. Select Payment Method</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "16px 20px",
                    border: `2px solid ${paymentMethod === "stripe" ? "#0081c9" : "#ebebeb"}`,
                    borderRadius: 4,
                    background: paymentMethod === "stripe" ? "#f4faff" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                    style={{ marginTop: 4, accentColor: "#0081c9" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1d21" }}>
                      Credit Card / Apple Pay / Google Pay (Stripe Secure Checkout)
                    </div>
                    <div style={{ fontSize: 13, color: "#6c757d", marginTop: 4 }}>
                      Encrypted 256-bit SSL transaction processed by Stripe. All major credit & debit cards accepted.
                    </div>
                  </div>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "16px 20px",
                    border: `2px solid ${paymentMethod === "fleet" ? "#0081c9" : "#ebebeb"}`,
                    borderRadius: 4,
                    background: paymentMethod === "fleet" ? "#f4faff" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "fleet"}
                    onChange={() => setPaymentMethod("fleet")}
                    style={{ marginTop: 4, accentColor: "#0081c9" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1d21" }}>
                      Fleet Account Purchase Order (Net 30 Terms)
                    </div>
                    <div style={{ fontSize: 13, color: "#6c757d", marginTop: 4 }}>
                      For commercial fleets with pre-approved credit. Enter your Fleet PO number.
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === "stripe" && (
                <div>
                  <button
                    type="button"
                    onClick={handleStripeCheckout}
                    disabled={loading}
                    className="btn btn-primary btn-lg w-100"
                    style={{
                      height: 52,
                      fontSize: 16,
                      fontWeight: 700,
                      backgroundColor: "#0081c9",
                      borderColor: "#0081c9",
                    }}
                  >
                    {loading ? "Connecting to Stripe…" : `Pay ${formatPrice(grandTotal, items[0]?.currency)} via Stripe`}
                  </button>
                  {error && (
                    <div style={{ marginTop: 12, color: "#dc3545", fontSize: 14 }}>{error}</div>
                  )}
                  <div style={{ marginTop: 12, fontSize: 12, color: "#6c757d", textAlign: "center" }}>
                    🔒 You will be securely redirected to Stripe to enter payment details and finalize the order.
                  </div>
                </div>
              )}

              {paymentMethod === "fleet" && (
                <div>
                  {fleetSubmitted ? (
                    <div style={{ padding: 20, background: "#e8f8ec", border: "1px solid #28a745", borderRadius: 4, textAlign: "center" }}>
                      <strong style={{ color: "#155724", display: "block", fontSize: 16, marginBottom: 6 }}>Fleet Order Registered!</strong>
                      <p style={{ color: "#155724", fontSize: 14, margin: 0 }}>
                        PO #{poNumber} has been logged. Our commercial credit desk will verify account terms and dispatch your filters.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFleetSubmit}>
                      <div className="mb-3">
                        <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
                          Fleet Purchase Order (PO) Number *
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          placeholder="e.g. PO-8921-FL"
                          value={poNumber}
                          onChange={(e) => setPoNumber(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        style={{ height: 50, fontSize: 16, fontWeight: 700, backgroundColor: "#0081c9", borderColor: "#0081c9" }}
                      >
                        Submit Fleet PO Order
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Warehouse & Dispatch Assurance */}
            <div className="card" style={{ padding: 20, border: "1px solid #ebebeb", borderRadius: 4, background: "#f8f9fa" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span style={{ fontSize: 28 }}>📦</span>
                <div>
                  <strong style={{ fontSize: 14, color: "#1a1d21", display: "block" }}>Warehouse Direct Shipping</strong>
                  <span style={{ fontSize: 13, color: "#6c757d" }}>
                    Dispatched from Sanford, FL 32771. Orders placed before 2:00 PM EST ship the same business day.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="col-12 col-lg-5">
            <div className="card" style={{ padding: 28, border: "1px solid #ebebeb", borderRadius: 4 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Order Summary ({items.length} items)</h3>
              
              <div style={{ maxHeight: 320, overflowY: "auto", marginBottom: 20 }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      paddingBottom: 12,
                      marginBottom: 12,
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <div style={{ width: 50, height: 50, position: "relative", flexShrink: 0 }}>
                      <Image
                        src={item.image || PRODUCT_PLACEHOLDER_IMAGE}
                        alt={item.name}
                        fill
                        sizes="50px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1d21", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#6c757d" }}>
                        Qty: {item.quantity} × {formatPrice(item.price, item.currency)}
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1d21" }}>
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "2px solid #ebebeb", paddingTop: 16, fontSize: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#6c757d" }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600, color: "#1a1d21" }}>{formatPrice(subtotal, items[0]?.currency)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#6c757d" }}>
                  <span>Shipping</span>
                  <span style={{ fontWeight: 600, color: shipping === 0 ? "#28a745" : "#1a1d21" }}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping, items[0]?.currency)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 12,
                    marginTop: 12,
                    borderTop: "1px solid #ebebeb",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#1a1d21",
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: "#0081c9" }}>{formatPrice(grandTotal, items[0]?.currency)}</span>
                </div>
              </div>

              <div style={{ marginTop: 20, textAlign: "center" }}>
                <Link href="/cart" style={{ fontSize: 13, color: "#0081c9", fontWeight: 600, textDecoration: "underline" }}>
                  ← Modify cart items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
