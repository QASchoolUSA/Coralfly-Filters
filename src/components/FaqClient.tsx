"use client";

import Link from "next/link";
import { useState } from "react";
import { FAQ_SECTIONS } from "@/lib/faq-data";

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
