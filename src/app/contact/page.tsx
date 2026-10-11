import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact Us", description: "Contact CORALFLY for filter matching, product questions, and order support." };

export default function ContactPage() {
  return <>
    <div className="page-header"><h1>Contact Us</h1><p>Have a question? We&apos;re here to help you find the right filter.</p></div>
    <section className="section"><div className="container"><div className="contact-grid">
      <div><h2 className="contact-form-heading">Send us a Message</h2><div id="message"><ContactForm /></div></div>
      <aside>
        <div className="contact-info-card"><h2>Get in Touch</h2>
          <div className="contact-info-item"><div className="contact-info-icon"><MailIcon /></div><div className="contact-info-text"><h3>Email</h3><a href="mailto:sales@coralfly.com">sales@coralfly.com</a></div></div>
          <div className="contact-info-item"><div className="contact-info-icon"><ClockIcon /></div><div className="contact-info-text"><h3>Business Hours</h3><p>Mon–Fri: 8:00 AM–5:00 PM</p></div></div>
        </div>
        <div className="contact-info-card contact-fleet-card"><h2>Fleet Operators</h2><p className="contact-fleet-text">Managing a fleet? Get in touch with your volume needs and our team can help you find the right products.</p><Link href="#message" className="btn btn-outline contact-fleet-btn">Request Fleet Pricing</Link></div>
      </aside>
    </div></div></section>
  </>;
}

function MailIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>; }
function ClockIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>; }
