import type { Metadata } from "next";
import Link from "next/link";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";

export const metadata: Metadata = { title: "Order Confirmed", description: "Your CORALFLY Stripe checkout completed successfully." };

export default function CheckoutSuccessPage() {
  return <section className="section"><div className="container status-page"><ClearCartOnSuccess /><div className="status-page__icon status-page__icon--success">✓</div><p className="section-label">Checkout</p><h1 className="status-page__title">Payment Received</h1><p className="status-page__copy">Thanks for ordering with CORALFLY. Stripe has confirmed your payment. A receipt will arrive from Stripe if email receipts are enabled on your account.</p><Link href="/shop" className="btn btn-primary btn-lg">Continue Shopping</Link></div></section>;
}
