import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service", description: "Terms for ordering from the CORALFLY online store." };

export default function TermsPage() {
  return <><div className="page-header"><h1>Terms of Service</h1><p>Last updated: October 2026</p></div><section className="section"><div className="container legal-content">
    <h2>Agreement to Terms</h2><p>By accessing and using the CORALFLY website, you agree to these terms. If you do not agree, please do not use the site or its services.</p>
    <h2>Products and Pricing</h2><p>Products are subject to availability. Prices are shown in US dollars and may change. Product descriptions, specifications, and listed compatibility are provided to help with selection; confirm the part number and application before ordering.</p>
    <h2>Orders and Payment</h2><p>Orders are subject to acceptance and availability. By placing an order, you confirm that the information you provide is accurate and that you are authorized to use the selected payment method. Payment is completed through Stripe&apos;s hosted checkout.</p>
    <h2>Shipping</h2><p>Orders placed before 2:00 PM are processed the same day. Free shipping is available on orders of $75 or more. Shipping options and delivery estimates are presented during checkout.</p>
    <h2>Returns</h2><p>For return assistance and eligibility, contact CORALFLY at <a href="mailto:sales@coralfly.com">sales@coralfly.com</a> before sending a product back.</p>
    <h2>Product Use</h2><p>Customers are responsible for verifying the filter&apos;s part number, application, and installation requirements. Contact the equipment manufacturer or a qualified technician if you are unsure about service requirements.</p>
    <h2>Limitation of Liability</h2><p>To the extent permitted by law, CORALFLY is not liable for indirect, incidental, or consequential damages arising from the use of this site or products purchased through it.</p>
    <h2>Contact</h2><p>Questions about these terms? Email <a href="mailto:sales@coralfly.com">sales@coralfly.com</a>.</p>
  </div></section></>;
}
