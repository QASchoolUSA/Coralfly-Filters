import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="block order-success">
      <div className="container" style={{ padding: "60px 0" }}>
        <div className="order-success__body" style={{ maxWidth: 740, margin: "0 auto", background: "#fff", border: "1px solid #ebebeb", borderRadius: 4, padding: 48, textAlign: "center" }}>
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

          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Thank You For Your Order!</h1>
          <p style={{ color: "#6c757d", fontSize: 16, marginBottom: 32 }}>
            Your order has been received and is being prepared by our warehouse logistics team. An email confirmation has been sent to your address.
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
              <strong style={{ color: "#0081c9" }}>#CF-892410</strong>
            </div>
            <div>
              <div style={{ color: "#6c757d", fontSize: 12, textTransform: "uppercase" }}>Date</div>
              <strong>October 17, 2026</strong>
            </div>
            <div>
              <div style={{ color: "#6c757d", fontSize: 12, textTransform: "uppercase" }}>Status</div>
              <strong style={{ color: "#28a745" }}>Processing (Paid)</strong>
            </div>
            <div>
              <div style={{ color: "#6c757d", fontSize: 12, textTransform: "uppercase" }}>Shipping Method</div>
              <strong>Ground Freight (2-3 Days)</strong>
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
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
