"use client";

import { useState } from "react";

export function ContactClient() {
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
  );
}
