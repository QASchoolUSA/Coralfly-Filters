"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckoutButton } from "./CheckoutButton";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { useCartItems } from "@/lib/use-cart";

export function CartView() {
  const items = useCartItems();
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!items.length) return <div className="cart-empty"><div className="cart-empty-icon"><BagIcon /></div><h2>Your cart is empty</h2><p>Discover the CORALFLY filter selection.</p><Link href="/shop" className="btn btn-primary btn-lg">Continue Shopping</Link></div>;
  const currency = items[0]?.currency || "usd";

  return <div className="cart-layout">
    <ul className="cart-items">{items.map((item) => <li className="cart-item" key={item.id}>
      <Link href={`/shop/${item.slug}`} className="cart-item-image">{item.image ? <Image src={item.image} alt={item.name} width={120} height={120} /> : <BagIcon />}</Link>
      <div className="cart-item-info"><Link href={`/shop/${item.slug}`} className="cart-item-name">{item.name}</Link>{item.sku ? <p className="cart-item-part">SKU: {item.sku}</p> : null}<div className="cart-item-bottom"><div className="quantity-selector"><button type="button" className="quantity-btn" onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>−</button><output className="quantity-value">{item.quantity}</output><button type="button" className="quantity-btn" onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div><span className="cart-item-price">{formatPrice(item.price * item.quantity, item.currency)}</span></div></div>
      <button type="button" className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
    </li>)}</ul>
    <aside className="cart-summary"><h2>Order Summary</h2><div className="cart-summary-row"><span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span></div><div className="cart-summary-row"><span>Shipping</span><span>Calculated at checkout</span></div><p className="cart-summary-free">Free shipping on orders $75+</p><div className="cart-summary-row total"><span>Estimated total</span><span>{formatPrice(subtotal, currency)}</span></div><p className="checkout-note">Shipping and applicable taxes are finalized during Stripe checkout.</p><CheckoutButton /></aside>
  </div>;
}

function BagIcon() { return <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>; }
