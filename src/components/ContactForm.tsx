"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const subjectLabel = String(form.get("subject") || "General inquiry");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`CORALFLY ${subjectLabel}: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subjectLabel}\n\n${message}`);
    window.location.href = `mailto:sales@coralfly.com?subject=${subject}&body=${body}`;
    setStatus(true);
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="form-row">
      <div className="form-group"><label htmlFor="contact-name">Full Name *</label><input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your name" /></div>
      <div className="form-group"><label htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></div>
    </div>
    <div className="form-row">
      <div className="form-group"><label htmlFor="contact-phone">Phone</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" /></div>
      <div className="form-group"><label htmlFor="contact-subject">Subject *</label><select id="contact-subject" name="subject" required defaultValue=""><option value="" disabled>Select a topic</option><option>Product Inquiry</option><option>Order Support</option><option>Bulk / Fleet Pricing</option><option>Compatibility Question</option><option>Returns</option><option>Other</option></select></div>
    </div>
    <div className="form-group"><label htmlFor="contact-message">Message *</label><textarea id="contact-message" name="message" required placeholder="Tell us the filter number, truck make, model, and year, or describe your question..." /></div>
    <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
    {status ? <p className="contact-form-status" role="status">Opening your email app. If it does not open, email sales@coralfly.com.</p> : null}
  </form>;
}
