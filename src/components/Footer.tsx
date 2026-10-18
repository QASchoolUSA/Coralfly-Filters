"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="site__footer">
      <div className="site-footer">
        <div className="decor site-footer__decor decor--type--bottom">
          <div className="decor__body">
            <div className="decor__start" />
            <div className="decor__end" />
            <div className="decor__center" />
          </div>
        </div>

        <div className="site-footer__widgets">
          <div className="container">
            <div className="row">
              {/* Column 1: Contacts */}
              <div className="col-12 col-xl-4">
                <div className="site-footer__widget footer-contacts">
                  <h5 className="footer-contacts__title">Contact Us</h5>
                  <div className="footer-contacts__text">
                    CORALFLY is a premier provider of heavy duty commercial and industrial filtration solutions. Reliable Filter Reliable Service.
                  </div>
                  <address className="footer-contacts__contacts">
                    <dl>
                      <dt>Phone Number</dt>
                      <dd>
                        <a href="tel:+14077681488" style={{ color: "inherit", textDecoration: "none" }}>
                          (407) 768-1488
                        </a>
                      </dd>
                    </dl>
                    <dl>
                      <dt>Email Address</dt>
                      <dd>
                        <a href="mailto:support@coralflyfilters.com" style={{ color: "inherit", textDecoration: "none" }}>
                          support@coralflyfilters.com
                        </a>
                      </dd>
                    </dl>
                    <dl>
                      <dt>Warehouse Location</dt>
                      <dd>
                        <Link href="/contact" style={{ color: "inherit", textDecoration: "none" }}>
                          1660 Retreat View Cir, Sanford, FL 32771
                        </Link>
                      </dd>
                    </dl>
                    <dl>
                      <dt>Working Hours</dt>
                      <dd>24/7 Hours Everyday</dd>
                    </dl>
                  </address>
                </div>
              </div>

              {/* Column 2: Information */}
              <div className="col-6 col-md-3 col-xl-2">
                <div className="site-footer__widget footer-links">
                  <h5 className="footer-links__title">Information</h5>
                  <ul className="footer-links__list">
                    <li className="footer-links__item">
                      <Link href="/about" className="footer-links__link">About Us</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/delivery" className="footer-links__link">Delivery Information</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/privacy" className="footer-links__link">Privacy Policy</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/terms" className="footer-links__link">Terms & Conditions</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/trucks" className="footer-links__link">Truck Brands</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/contact" className="footer-links__link">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 3: Customer Care */}
              <div className="col-6 col-md-3 col-xl-2">
                <div className="site-footer__widget footer-links">
                  <h5 className="footer-links__title">Customer Care</h5>
                  <ul className="footer-links__list">
                    <li className="footer-links__item">
                      <Link href="/faq" className="footer-links__link">Filtration FAQ</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/returns" className="footer-links__link">Returns & Warranty</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/guides" className="footer-links__link">Maintenance Guides</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/guides/oem-filter-cross-reference-guide" className="footer-links__link">OEM Cross-Reference</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/contact" className="footer-links__link">Technical Support</Link>
                    </li>
                    <li className="footer-links__item">
                      <Link href="/cart" className="footer-links__link">Shopping Cart</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 4: Newsletter */}
              <div className="col-12 col-md-6 col-xl-4">
                <div className="site-footer__widget footer-newsletter">
                  <h5 className="footer-newsletter__title">Newsletter</h5>
                  <div className="footer-newsletter__text">
                    Enter your email address below to receive our latest filtration engineering guides and fleet discount coupons.
                  </div>

                  {subscribed ? (
                    <div style={{ color: "#28a745", fontWeight: 600, fontSize: 14, margin: "16px 0" }}>
                      ✓ Thank you for subscribing to CORALFLY updates!
                    </div>
                  ) : (
                    <form className="footer-newsletter__form" onSubmit={handleSubscribe}>
                      <label className="sr-only" htmlFor="footer-newsletter-address">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="footer-newsletter__form-input"
                        id="footer-newsletter-address"
                        placeholder="Email Address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button type="submit" className="footer-newsletter__form-button">
                        Subscribe
                      </button>
                    </form>
                  )}

                  <div className="footer-newsletter__text footer-newsletter__text--social">
                    Free shipping on orders $75+ · Same-day fulfillment before 2 PM EST
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Payments Strip */}
        <div className="site-footer__bottom">
          <div className="container">
            <div className="site-footer__bottom-row">
              <div className="site-footer__copyright">
                © 2026 CORALFLY Filters — Reliable Filter Reliable Service. All Rights Reserved.
              </div>
              <div className="site-footer__payments">
                <Image
                  src="/images/payments.png"
                  alt="Stripe, Visa, MasterCard, PayPal, Amex"
                  width={280}
                  height={24}
                  style={{ height: "auto", maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
