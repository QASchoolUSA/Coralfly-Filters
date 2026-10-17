import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CORALFLY privacy policy and customer data protection information.",
};

export default function PrivacyPage() {
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
                  <span className="breadcrumb__item-link">Privacy Policy</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="card" style={{ padding: 40, border: "1px solid #ebebeb", borderRadius: 4, maxWidth: 860, margin: "0 auto", fontSize: 15, lineHeight: 1.7, color: "#495057" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>1. Information We Collect</h2>
          <p style={{ marginBottom: 20 }}>
            When you purchase filtration products, register an account, or contact our support engineers,
            we collect your name, company name, delivery address, email, phone number, and selected vehicle specs.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>2. How Your Information is Handled</h2>
          <p style={{ marginBottom: 20 }}>
            Customer data is strictly used to fulfill shipments, provide tracking updates, verify vehicle fitment,
            and service ongoing warranty requests. We do not sell or lease customer information to third parties.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>3. Payment Information Security</h2>
          <p style={{ marginBottom: 20 }}>
            All payments are encrypted using 256-bit SSL encryption through Stripe. CORALFLY does not store credit card numbers
            or sensitive banking credentials on our local servers.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>4. Local Storage &amp; Cookies</h2>
          <p style={{ marginBottom: 20 }}>
            We utilize browser local storage to preserve your selected active vehicle, garage fleet list, and shopping cart
            items across sessions. You may clear this data anytime via your browser settings.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 12 }}>5. Contact Our Privacy Team</h2>
          <p style={{ margin: 0 }}>
            For questions or data access requests, please contact us at <a href="mailto:privacy@coralfly.com" style={{ color: "#0081c9" }}>privacy@coralfly.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
