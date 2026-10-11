"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const quickLinks = [
  ["/shop", "All Products"],
  ["/guides", "Guides"],
  ["/faq", "FAQ"],
  ["/about", "About Us"],
  ["/contact", "Contact"],
];

const categories = [
  ["/filters/oil-filters", "Oil Filters"],
  ["/filters/air-filters", "Air Filters"],
  ["/filters/fuel-filters", "Fuel Filters"],
  ["/filters/cabin-filters", "Cabin Filters"],
];

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <Link href="/" className="footer-logo" aria-label="CORALFLY home">
              <Image src="/brand/logo.png" alt="CORALFLY — Reliable Filter Reliable service" width={190} height={58} />
            </Link>
            <p className="footer-description">Premium filtration solutions for truck and equipment operators. Reliable Filter Reliable service.</p>
          </div>
          <FooterLinks title="Quick Links" items={quickLinks} />
          <FooterLinks title="Filter Types" items={categories} />
          <div className="footer-section">
            <h2 className="footer-heading">Contact Us</h2>
            <ul className="footer-contact">
              <li><MailIcon /><a href="mailto:sales@coralfly.com">sales@coralfly.com</a></li>
              <li><ClockIcon /><span>Mon–Fri: 8:00 AM–5:00 PM</span></li>
            </ul>
            <p className="footer-shipping-note">Free shipping $75+ · Same-day processing</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year ? `${year} ` : ""}CORALFLY. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, items }: { title: string; items: string[][] }) {
  return <div className="footer-section">
    <h2 className="footer-heading">{title}</h2>
    <ul className="footer-links">{items.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
  </div>;
}

function MailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function ClockIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}
