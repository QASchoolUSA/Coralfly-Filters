import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for purchasing from the CORALFLY commercial filtration store.",
};

export default function TermsPage() {
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
                  <span className="breadcrumb__item-link">Terms and Conditions</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Terms and Conditions</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="card" style={{ padding: 40, border: "1px solid #ebebeb", borderRadius: 4, maxWidth: 860, margin: "0 auto", fontSize: 15, lineHeight: 1.7, color: "#495057" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>1. Agreement to Terms</h2>
          <p style={{ marginBottom: 20 }}>
            By accessing or ordering from the CORALFLY online store, you agree to be bound by these Terms and Conditions.
            Our catalog is designed to provide commercial fleets, owner-operators, and repair facilities with high-quality filtration hardware.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>2. Product Information &amp; Fitment</h2>
          <p style={{ marginBottom: 20 }}>
            While we take rigorous measures to ensure fitment data, thread sizes, and micron ratings are completely accurate,
            purchasers are responsible for confirming equipment model numbers and existing part numbers before ordering.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>3. Orders &amp; Payments</h2>
          <p style={{ marginBottom: 20 }}>
            We accept credit cards, debit cards, and Apple Pay processed through secure, PCI-compliant Stripe gateways.
            Corporate fleet accounts approved for Net 30 terms must settle invoices within 30 calendar days from delivery receipt.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>4. Shipping &amp; Delivery</h2>
          <p style={{ marginBottom: 20 }}>
            Orders placed prior to 2:00 PM EST on standard business days are processed for same-day dispatch.
            Orders of $75 or more qualify for free standard ground shipping across the contiguous United States.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>5. Returns &amp; Warranty</h2>
          <p style={{ marginBottom: 20 }}>
            Unused filters in original, unblemished cartons may be returned within 30 days of receipt.
            All CORALFLY products carry a 12-month manufacturer defect warranty under standard operating hours and maintenance intervals.
          </p>
        </div>
      </div>
    </div>
  );
}
