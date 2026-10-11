import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "CORALFLY privacy information for online shoppers." };

export default function PrivacyPage() {
  return <><div className="page-header"><h1>Privacy Policy</h1><p>Last updated: October 2026</p></div><section className="section"><div className="container legal-content">
    <h2>Information You Provide</h2><p>When you place an order or contact CORALFLY, you may provide information such as your name, email address, phone number, shipping address, and order details.</p>
    <h2>How Information Is Used</h2><p>Information is used to process orders, communicate about purchases, respond to customer support requests, and operate the CORALFLY storefront.</p>
    <h2>Payment Security</h2><p>Payments are completed through Stripe&apos;s hosted checkout. CORALFLY does not receive your full card details through the storefront checkout flow.</p>
    <h2>Shopping Cart Storage</h2><p>Your cart is saved in your browser so it can be available when you return to the site. You can clear your cart from the cart page.</p>
    <h2>Third-Party Services</h2><p>When you continue to checkout, information needed to complete your payment and order is shared with Stripe. Those services handle information under their own privacy terms.</p>
    <h2>Your Questions</h2><p>For privacy questions or requests about information you provided to CORALFLY, email <a href="mailto:sales@coralfly.com">sales@coralfly.com</a>.</p>
  </div></section></>;
}
