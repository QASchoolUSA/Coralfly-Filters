"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useQuickviewStore } from "@/lib/quickview-store";
import { useVehicleStore } from "@/lib/vehicle-store";
import { formatPrice } from "@/lib/format";

export function QuickviewModal() {
  const { activeProduct, isOpen, closeQuickview } = useQuickviewStore();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { currentVehicle } = useVehicleStore();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !activeProduct) return null;
  const mainImage = activeProduct.images[0]?.url || "/images/products/product-1-245x245.jpg";

  const handleAddToCart = () => {
    addItem(activeProduct, quantity);
    closeQuickview();
    openCart();
  };

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.65)", zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 780 }}>
        <div className="modal-content" style={{ borderRadius: 4, overflow: "hidden", position: "relative" }}>
          <button
            type="button"
            className="quickview__close"
            onClick={closeQuickview}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              zIndex: 10,
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              cursor: "pointer",
              color: "#333",
            }}
          >
            &times;
          </button>

          <div className="modal-body" style={{ padding: 32 }}>
            <div className="row">
              <div className="col-12 col-md-6 mb-4 mb-md-0">
                <div
                  style={{
                    border: "1px solid #ebebeb",
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    width: "100%",
                    height: 320,
                    background: "#fff",
                  }}
                >
                  <Image
                    src={mainImage}
                    alt={activeProduct.name}
                    fill
                    style={{ objectFit: "contain", padding: 16 }}
                  />
                  {currentVehicle && (
                    <div
                      className="status-badge status-badge--style--success status-badge--has-icon"
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        right: 12,
                        display: "flex",
                        alignItems: "center",
                        padding: "6px 12px",
                        background: "#e8f8ec",
                        color: "#28a745",
                        borderRadius: 3,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 6 }}>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Verified Fit for {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div style={{ fontSize: 13, color: "#6c757d", marginBottom: 6 }}>
                  SKU: <strong style={{ color: "#333" }}>{activeProduct.sku || "CF-" + activeProduct.slug.toUpperCase()}</strong>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 12, color: "#1a1d21" }}>
                  <Link href={`/shop/${activeProduct.slug}`} onClick={closeQuickview} style={{ color: "inherit", textDecoration: "none" }}>
                    {activeProduct.name}
                  </Link>
                </h3>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ display: "flex", color: "#ffc107" }}>
                    {"★★★★★"}
                  </div>
                  <span style={{ fontSize: 13, color: "#6c757d" }}>4.9 on 18 reviews</span>
                  <span style={{ margin: "0 4px", color: "#ccc" }}>•</span>
                  <span style={{ fontSize: 13, color: "#28a745", fontWeight: 600 }}>In Stock</span>
                </div>

                <div style={{ fontSize: 26, fontWeight: 700, color: "#0081c9", marginBottom: 16 }}>
                  {formatPrice(activeProduct.price, activeProduct.currency)}
                  <span style={{ fontSize: 16, color: "#999", textDecoration: "line-through", marginLeft: 10, fontWeight: 400 }}>
                    {formatPrice(activeProduct.price * 1.25, activeProduct.currency)}
                  </span>
                </div>

                <p style={{ fontSize: 14, color: "#5c6570", lineHeight: 1.5, marginBottom: 20 }}>
                  {activeProduct.description || "Premium high-grade commercial filtration media designed for maximum dirt-holding capacity and reliable service intervals."}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ebebeb",
                      borderRadius: 3,
                      height: 44,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ width: 36, height: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}
                    >
                      −
                    </button>
                    <span style={{ width: 40, textAlign: "center", fontWeight: 700, fontSize: 15 }}>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ width: 36, height: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 18 }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddToCart}
                    style={{
                      height: 44,
                      padding: "0 28px",
                      fontSize: 14,
                      fontWeight: 700,
                      backgroundColor: "#0081c9",
                      borderColor: "#0081c9",
                      flex: 1,
                    }}
                  >
                    Add to Cart
                  </button>
                </div>

                <div style={{ fontSize: 13 }}>
                  <Link
                    href={`/shop/${activeProduct.slug}`}
                    onClick={closeQuickview}
                    style={{ color: "#0081c9", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    View Full Product Details &amp; Specifications →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
