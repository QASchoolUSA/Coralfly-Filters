import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery Information",
  description:
    "CORALFLY commercial shipping and delivery details, same-day cutoff times, free shipping thresholds, and freight handling.",
};

export default function DeliveryPage() {
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
                  <span className="breadcrumb__item-link">Delivery Information</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Delivery Information</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        {/* Highlight cards */}
        <div className="row mb-4">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <div className="card h-100 p-4" style={{ border: "1px solid #ebebeb", borderRadius: 4, background: "#fff" }}>
              <div style={{ fontSize: 28, color: "#0081c9", marginBottom: 12 }}>🚚</div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Free Shipping on $75+</h4>
              <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                All domestic orders with a subtotal of $75 or greater automatically receive free standard ground delivery.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <div className="card h-100 p-4" style={{ border: "1px solid #ebebeb", borderRadius: 4, background: "#fff" }}>
              <div style={{ fontSize: 28, color: "#0081c9", marginBottom: 12 }}>⚡</div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Same-Day Dispatch</h4>
              <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Orders placed before 2:00 PM EST ship out the very same day from our logistics hub in Sanford, FL 32771.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100 p-4" style={{ border: "1px solid #ebebeb", borderRadius: 4, background: "#fff" }}>
              <div style={{ fontSize: 28, color: "#0081c9", marginBottom: 12 }}>📦</div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Commercial LTL Freight</h4>
              <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Bulk case packs and pallet shipments are palletized with protective strapping and delivered with liftgate service.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Guidelines Card */}
        <div className="card p-4 p-md-5" style={{ border: "1px solid #ebebeb", borderRadius: 4, background: "#fff", fontSize: 15, lineHeight: 1.7, color: "#495057" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1d21", marginBottom: 16 }}>
            Shipping Policies & Estimated Transit Times
          </h2>
          <p style={{ marginBottom: 20 }}>
            CORALFLY maintains dedicated commercial logistics partnerships with major freight and parcel carriers including 
            UPS, FedEx Ground, and regional freight lines to ensure your truck maintenance operations never face downtime.
          </p>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1d21", marginTop: 24, marginBottom: 12 }}>
            1. Standard Domestic Ground Transit
          </h3>
          <p style={{ marginBottom: 16 }}>
            Most contiguous US destinations receive standard ground deliveries within 1 to 4 business days. Detailed tracking numbers 
            are emailed automatically upon carrier package scanning.
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
            <li><strong>Southeast & East Coast:</strong> 1 - 2 business days</li>
            <li><strong>Midwest & Central:</strong> 2 - 3 business days</li>
            <li><strong>Mountain & West Coast:</strong> 3 - 4 business days</li>
            <li><strong>Alaska & Hawaii:</strong> Expedited air freight available at checkout</li>
          </ul>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1d21", marginTop: 24, marginBottom: 12 }}>
            2. Fleet & Pallet Freight Delivery
          </h3>
          <p style={{ marginBottom: 16 }}>
            For orders containing bulk cartons or total shipping weights exceeding 150 lbs, our team automatically assigns LTL commercial 
            trucking carriers. If your facility does not possess a loading dock, please specify liftgate delivery during checkout or by contacting support.
          </p>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1d21", marginTop: 24, marginBottom: 12 }}>
            3. Package Inspection & Damaged Shipments
          </h3>
          <p style={{ marginBottom: 24 }}>
            Please inspect all cartons upon arrival. If damage occurs during transit, document the outer carton condition and contact 
            our customer care team within 48 hours at <a href="tel:+14077681488" style={{ color: "#0081c9", fontWeight: 600 }}>(407) 768-1488</a> or 
            via <a href="mailto:support@coralflyfilters.com" style={{ color: "#0081c9", fontWeight: 600 }}>support@coralflyfilters.com</a> for an immediate replacement.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <Link href="/shop" className="btn btn-primary btn-sm" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
              Shop All Filters
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-sm">
              Contact Logistics Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
