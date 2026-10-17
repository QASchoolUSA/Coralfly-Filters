"use client";

import Link from "next/link";
import { useState } from "react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("CF-89241");
  const [email, setEmail] = useState("j.doe@fleetlogistics.com");
  const [tracked, setTracked] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && email) {
      setTracked(true);
    }
  };

  return (
    <div className="block">
      {/* Header Breadcrumbs */}
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__item breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">Home</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-arrow">/</span>
                  <span className="breadcrumb__item-link">Track Order</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">Track Order</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card" style={{ padding: 36, border: "1px solid #ebebeb", borderRadius: 4 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Check Your Shipment</h3>
              <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                To track your order please enter your Order ID in the box below and press the &ldquo;Track&rdquo; button.
                This was given to you on your receipt and in the confirmation email you should have received.
              </p>

              <form onSubmit={handleTrack}>
                <div className="form-group mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Order ID
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Found in your order confirmation email (e.g. CF-89241)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Billing Email
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="Email used during checkout"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{
                    width: "100%",
                    height: 46,
                    fontSize: 15,
                    fontWeight: 700,
                    backgroundColor: "#0081c9",
                    borderColor: "#0081c9",
                  }}
                >
                  Track Shipment
                </button>
              </form>

              {/* Real-time Order Tracking Status Result */}
              {tracked && (
                <div style={{ marginTop: 32, borderTop: "1px solid #ebebeb", paddingTop: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1d21" }}>
                      Status for Order <span style={{ color: "#0081c9" }}>#{orderId}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, background: "#e8f8ec", color: "#28a745", padding: "4px 10px", borderRadius: 3 }}>
                      IN TRANSIT
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#28a745", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                        ✓
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Order Received &amp; Verified</div>
                        <div style={{ fontSize: 12, color: "#999" }}>Dallas Hub — Oct 16, 2026, 09:14 AM</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#28a745", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                        ✓
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Palletized &amp; Loaded onto Linehaul</div>
                        <div style={{ fontSize: 12, color: "#999" }}>Regional Distribution Center — Oct 16, 2026, 02:45 PM</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#0081c9", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                        •
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#0081c9" }}>Out for Local Freight Delivery</div>
                        <div style={{ fontSize: 12, color: "#555" }}>Scheduled Arrival by 04:30 PM Today</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", opacity: 0.5 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#ccc", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                        ○
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#777" }}>Delivered to Receiving Dock</div>
                        <div style={{ fontSize: 12, color: "#999" }}>Signature required upon dropoff</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
