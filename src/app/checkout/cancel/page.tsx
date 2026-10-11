import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Checkout Cancelled", description: "Your Stripe checkout was cancelled. Your cart is still available." };

export default function CheckoutCancelPage() {
  return <section className="section"><div className="container status-page"><div className="status-page__icon status-page__icon--cancel">×</div><p className="section-label">Checkout</p><h1 className="status-page__title">Checkout Cancelled</h1><p className="status-page__copy">No charge was made. Your cart is still saved if you want to try again.</p><div className="status-page__actions"><Link href="/cart" className="btn btn-primary btn-lg">Return to Cart</Link><Link href="/shop" className="btn btn-outline btn-lg">Keep Shopping</Link></div></div></section>;
}
