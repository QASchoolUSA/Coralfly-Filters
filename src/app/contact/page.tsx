import type { Metadata } from "next";
import Link from "next/link";
import { ContactClient } from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Connect with CORALFLY commercial filtration engineers, fleet sales, and customer service in Sanford, FL.",
};

export default function ContactPage() {
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
                  <span className="breadcrumb__item-link">Contact Us</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row">
          {/* Contact Details (Left) */}
          <div className="col-12 col-lg-5 mb-4 mb-lg-0">
            <div className="card" style={{ padding: 36, border: "1px solid #ebebeb", borderRadius: 4, height: "100%" }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Warehouse & Sales Office</h3>
              <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Have questions regarding OEM filter cross-references, fleet quantity orders, or existing shipments?
                Our filtration support specialists are available 24/7 every day.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 14 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 20, color: "#0081c9" }}>📍</div>
                  <div>
                    <strong style={{ display: "block", color: "#1a1d21", marginBottom: 2 }}>Main Logistics Facility</strong>
                    <span style={{ color: "#6c757d" }}>1660 Retreat View Cir, Sanford, FL 32771</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 20, color: "#0081c9" }}>📞</div>
                  <div>
                    <strong style={{ display: "block", color: "#1a1d21", marginBottom: 2 }}>Phone Support</strong>
                    <a href="tel:+14077681488" style={{ color: "#0081c9", fontWeight: 600, textDecoration: "none" }}>
                      (407) 768-1488
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 20, color: "#0081c9" }}>✉️</div>
                  <div>
                    <strong style={{ display: "block", color: "#1a1d21", marginBottom: 2 }}>Email Inquiries</strong>
                    <a href="mailto:support@coralflyfilters.com" style={{ color: "#0081c9" }}>support@coralflyfilters.com</a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 20, color: "#0081c9" }}>⏰</div>
                  <div>
                    <strong style={{ display: "block", color: "#1a1d21", marginBottom: 2 }}>Hours of Operation</strong>
                    <span style={{ color: "#6c757d" }}>24/7 Hours Everyday</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32, padding: 20, background: "#e8f4fb", borderRadius: 4, border: "1px solid #c5d9e5" }}>
                <strong style={{ color: "#0081c9", display: "block", marginBottom: 4 }}>Fleet & Distributor Accounts</strong>
                <span style={{ fontSize: 13, color: "#495057" }}>
                  Managing more than 15 power units? Ask about our quarterly auto-restock programs and volume pricing.
                </span>
              </div>
            </div>
          </div>

          {/* Inquiry Form (Right) */}
          <div className="col-12 col-lg-7">
            <ContactClient />
          </div>
        </div>
      </div>
    </div>
  );
}
