import type { Metadata } from "next";
import Link from "next/link";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your CORALFLY Stripe checkout completed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="block order-success">
      <ClearCartOnSuccess />
      <div className="container" style={{ padding: "60px 0" }}>
        <div
          className="order-success__body"
          style={{
            maxWidth: 740,
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #ebebeb",
            borderRadius: 4,
            padding: 48,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#e8f8ec",
              color: "#28a745",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              margin: "0 auto 20px",
            }}
          >
            ✓
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Payment & Order Confirmed!</h1>
          <p style={{ color: "#6c757d", fontSize: 16, marginBottom: 32 }}>
            Thank you for ordering with CORALFLY. Stripe has securely processed your payment.
            Your filters are being packed for immediate dispatch.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              background: "#f8f9fa",
              border: "1px solid #ebebeb",
              borderRadius: 4,
              padding: "16px 20px",
              marginBottom: 32,
              fontSize: 14,
              textAlign: "left",
            }}
          >
            <div>
              <div style={{ color: "#6c757d", fontSize: 12, textTransform: "uppercase" }}>Order Number</div>
              <strong style={{ color: "#0081c9" }}>#CF-ST-892410</strong>
            </div>
            <div>
              <div style={{ color: "#6c757d", fontSize: 12, textTransform: "uppercase" }}>Payment Status</div>
              <strong style={{ color: "#28a745" }}>Paid via Stripe</strong>
            </div>
            <div>
              <div style={{ color: "#6c757d", fontSize: 12, textTransform: "uppercase" }}>Dispatch</div>
              <strong>Same-Day Priority</strong>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <Link
              href="/contact"
              className="btn btn-secondary"
              style={{ padding: "12px 24px" }}
            >
              Contact Support
            </Link>
            <Link
              href="/shop"
              className="btn btn-primary"
              style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "12px 28px", fontWeight: 700 }}
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
