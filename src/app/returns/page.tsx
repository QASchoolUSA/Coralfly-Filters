import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns and Warranty",
  description:
    "CORALFLY 30-day hassle-free return policy, RMA instructions, and Magnuson-Moss OEM warranty guarantee.",
};

export default function ReturnsPage() {
  return (
    <div className="block">
      {/* Header Breadcrumbs */}
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__spaceship-safe-area" role="presentation" />
                <li className="breadcrumb__item breadcrumb__item--parent breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">Home</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-link">Returns & Warranty</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Returns & Warranty Policy</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        {/* Top 3 benefit cards */}
        <div className="row mb-4">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <div className="card h-100 p-4" style={{ border: "1px solid #ebebeb", borderRadius: 4, background: "#fff" }}>
              <div style={{ fontSize: 28, color: "#0081c9", marginBottom: 12 }}>🔄</div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>30-Day Hassle-Free Returns</h4>
              <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Unopened and uninstalled filters can be returned within 30 days of delivery with full product refund.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <div className="card h-100 p-4" style={{ border: "1px solid #ebebeb", borderRadius: 4, background: "#fff" }}>
              <div style={{ fontSize: 28, color: "#0081c9", marginBottom: 12 }}>🛡️</div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>OEM Warranty Protection</h4>
              <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                CORALFLY filters meet or exceed OEM specifications and are fully protected under the Magnuson-Moss Warranty Act.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100 p-4" style={{ border: "1px solid #ebebeb", borderRadius: 4, background: "#fff" }}>
              <div style={{ fontSize: 28, color: "#0081c9", marginBottom: 12 }}>⚡</div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Quick RMA Processing</h4>
              <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Return merchandise authorizations (RMAs) are reviewed and processed within 1 business day of receipt.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Guidelines Card */}
        <div className="card p-4 p-md-5" style={{ border: "1px solid #ebebeb", borderRadius: 4, background: "#fff", fontSize: 15, lineHeight: 1.7, color: "#495057" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1d21", marginBottom: 16 }}>
            Commercial Returns & Warranty Guidelines
          </h2>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1d21", marginTop: 24, marginBottom: 12 }}>
            1. Return Eligibility
          </h3>
          <p style={{ marginBottom: 16 }}>
            To qualify for a refund or store credit, items must be in brand new, uninstalled condition with intact factory seals, 
            original cartons, and included gasket/O-ring hardware. Filters that have had fuel, oil, or coolant run through them 
            cannot be returned for safety and contamination reasons.
          </p>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1d21", marginTop: 24, marginBottom: 12 }}>
            2. How to Request an RMA
          </h3>
          <ol style={{ paddingLeft: 20, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}>
              Contact our service team at <a href="tel:+14077681488" style={{ color: "#0081c9", fontWeight: 600 }}>(407) 768-1488</a> or 
              email <a href="mailto:support@coralflyfilters.com" style={{ color: "#0081c9", fontWeight: 600 }}>support@coralflyfilters.com</a> with your order number.
            </li>
            <li style={{ marginBottom: 8 }}>
              Our team will issue an RMA number along with shipping label instructions.
            </li>
            <li style={{ marginBottom: 8 }}>
              Repack the filters securely and attach the return label.
            </li>
            <li>
              Once inspected at our facility, refunds are processed back to the original payment method within 2 to 4 business days.
            </li>
          </ol>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1d21", marginTop: 24, marginBottom: 12 }}>
            3. Warranty Guarantee
          </h3>
          <p style={{ marginBottom: 24 }}>
            CORALFLY warrants every filter to be free from defects in materials and craftsmanship during recommended OEM service intervals. 
            Should any filter prove defective under normal operation, CORALFLY will replace the filter or refund the purchase price.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <Link href="/contact" className="btn btn-primary btn-sm" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
              Request Return Authorization
            </Link>
            <Link href="/faq" className="btn btn-secondary btn-sm">
              Read Common FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
