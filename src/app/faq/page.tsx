"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_SECTIONS = [
  {
    category: "Shipping & Fulfillment",
    items: [
      {
        q: "What is your shipping cutoff for same-day dispatch?",
        a: "All in-stock orders placed Monday through Friday before 2:00 PM EST are picked, packed, and handed over to freight or parcel carriers (UPS, FedEx) the very same day.",
      },
      {
        q: "How does the free shipping threshold work?",
        a: "Every domestic US order with a subtotal of $75.00 or greater automatically qualifies for free standard ground shipping at checkout. No promo code needed.",
      },
      {
        q: "Do you ship bulk pallet quantities to commercial fleet terminals?",
        a: "Yes. For volume fleet orders and case pallet loads, our logistics team arranges LTL freight delivery with liftgate service directly to your terminal or repair shop dock.",
      },
    ],
  },
  {
    category: "Compatibility & Cross-Reference",
    items: [
      {
        q: "How can I verify a filter will fit my specific truck engine?",
        a: "Use our vehicle selector at the top of the page to select your rig's Year, Make, Model, and Engine. Compatible products will display a green 'Verified Fit' badge. You can also search by OEM part numbers.",
      },
      {
        q: "Can I cross-reference aftermarket filter part numbers like Baldwin, Fleetguard, or Wix?",
        a: "Yes! Enter any recognized cross-reference number (e.g. LF16015, B7299, 57746XD) into the top search bar, and our catalog will locate the equivalent CORALFLY specification.",
      },
      {
        q: "Do CORALFLY filters meet or exceed OEM warranty requirements?",
        a: "Yes. All CORALFLY filters are engineered and manufactured under ISO 9001 and IATF 16949 certified quality management systems, fully preserving engine warranties under the Magnuson-Moss Warranty Act.",
      },
    ],
  },
  {
    category: "Fleet Billing & Orders",
    items: [
      {
        q: "Do you offer Net 30 corporate purchase order terms?",
        a: "Yes. Fleets operating 5 or more commercial power units can establish credit terms with Net 30 billing. Contact support@coralflyfilters.com or select 'Fleet Purchase Order' at checkout.",
      },
      {
        q: "Can I receive wholesale pricing on full carton quantities?",
        a: "Yes. When ordering case packs (typically 6 or 12 filters per master carton), volume discounts are automatically reflected in your cart totals.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy for unused filters?",
        a: "We offer a 30-day hassle-free return policy for unopened, uninstalled filters in their original packaging. Contact support to generate a prepaid return authorization slip.",
      },
    ],
  },
];

export function FaqClient() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "0-0": true,
    "1-0": true,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
                  <span className="breadcrumb__item-link">FAQ</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Frequently Asked Questions</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            {FAQ_SECTIONS.map((section, sIdx) => (
              <div key={section.category} className="mb-5">
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1d21", marginBottom: 16 }}>
                  {section.category}
                </h3>

                <div className="accordion" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {section.items.map((item, iIdx) => {
                    const key = `${sIdx}-${iIdx}`;
                    const isOpen = !!openItems[key];
                    return (
                      <div
                        key={item.q}
                        className="card"
                        style={{
                          border: "1px solid #ebebeb",
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(key)}
                          style={{
                            width: "100%",
                            padding: "16px 20px",
                            background: isOpen ? "#f8f9fa" : "#fff",
                            border: "none",
                            textAlign: "left",
                            fontWeight: 700,
                            fontSize: 15,
                            color: isOpen ? "#0081c9" : "#1a1d21",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <span>{item.q}</span>
                          <span style={{ fontSize: 18, color: "#999", marginLeft: 12 }}>
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <div style={{ padding: "16px 20px", fontSize: 14, lineHeight: 1.6, color: "#5c6570", borderTop: "1px solid #ebebeb" }}>
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div
              className="card text-center"
              style={{
                background: "#f8f9fa",
                border: "1px solid #ebebeb",
                padding: 36,
                borderRadius: 4,
              }}
            >
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Still have questions?</h4>
              <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 16 }}>
                Our heavy duty filtration engineers are ready to assist with fitment confirmation or custom fleet setups.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", padding: "10px 28px" }}
                >
                  Contact Our Support Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return <FaqClient />;
}
