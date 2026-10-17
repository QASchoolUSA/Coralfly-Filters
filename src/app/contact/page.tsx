"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setMessage("");
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
                  <span className="breadcrumb__item-link">Contact Us</span>
                </li>
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
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Warehouse &amp; Sales Office</h3>
              <p style={{ color: "#6c757d", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Have questions regarding OEM filter cross-references, fleet quantity orders, or existing shipments?
                Our filtration support specialists are available Monday through Friday.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 14 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 20, color: "#0081c9" }}>📍</div>
                  <div>
                    <strong style={{ display: "block", color: "#1a1d21", marginBottom: 2 }}>Main Logistics Facility</strong>
                    <span style={{ color: "#6c757d" }}>715 Industrial Pkwy, Logistics Hub, USA</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 20, color: "#0081c9" }}>📞</div>
                  <div>
                    <strong style={{ display: "block", color: "#1a1d21", marginBottom: 2 }}>Toll-Free Phone</strong>
                    <span style={{ color: "#0081c9", fontWeight: 600 }}>(800) 060-0730</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 20, color: "#0081c9" }}>✉️</div>
                  <div>
                    <strong style={{ display: "block", color: "#1a1d21", marginBottom: 2 }}>Email Inquiries</strong>
                    <a href="mailto:sales@coralfly.com" style={{ color: "#0081c9" }}>sales@coralfly.com</a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 20, color: "#0081c9" }}>⏰</div>
                  <div>
                    <strong style={{ display: "block", color: "#1a1d21", marginBottom: 2 }}>Hours of Operation</strong>
                    <span style={{ color: "#6c757d" }}>Mon–Fri: 08:00 AM – 05:00 PM EST</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32, padding: 20, background: "#e8f4fb", borderRadius: 4, border: "1px solid #c5d9e5" }}>
                <strong style={{ color: "#0081c9", display: "block", marginBottom: 4 }}>Fleet &amp; Distributor Accounts</strong>
                <span style={{ fontSize: 13, color: "#495057" }}>
                  Managing more than 15 power units? Ask about our quarterly auto-restock programs and volume pricing.
                </span>
              </div>
            </div>
          </div>

          {/* Inquiry Form (Right) */}
          <div className="col-12 col-lg-7">
            <div className="card" style={{ padding: 36, border: "1px solid #ebebeb", borderRadius: 4 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Leave Us A Message</h3>
              <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 24 }}>
                Fill out the form below and one of our product engineers will get back to you within 2 business hours.
              </p>

              {submitted ? (
                <div style={{ padding: 32, textAlign: "center", background: "#e8f8ec", border: "1px solid #28a745", borderRadius: 4 }}>
                  <div style={{ fontSize: 36, color: "#28a745", marginBottom: 12 }}>✓</div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, color: "#155724", marginBottom: 8 }}>Message Sent Successfully!</h4>
                  <p style={{ color: "#155724", fontSize: 14, margin: 0 }}>
                    Thank you, {name}. A member of our technical team will review your inquiry and follow up promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Filter fitment for 2022 Freightliner Cascadia"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      className="form-control"
                      placeholder="Please include vehicle make, model, engine serial number, or existing filter part numbers..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{
                      height: 48,
                      padding: "0 36px",
                      fontSize: 15,
                      fontWeight: 700,
                      backgroundColor: "#0081c9",
                      borderColor: "#0081c9",
                    }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
