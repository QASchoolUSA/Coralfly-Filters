import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = { title: "Cart", description: "Review your CORALFLY cart and checkout with Stripe." };

export default function CartPage() {
  return <><div className="page-header"><h1>Your Cart</h1><p>Review your filters and continue to secure checkout.</p></div><section className="section"><div className="container"><CartView /></div></section></>;
}
