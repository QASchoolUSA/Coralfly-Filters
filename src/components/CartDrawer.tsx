"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { useCartItems } from "@/lib/use-cart";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const items = useCartItems();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className={`cart-overlay${isOpen ? " cart-overlay--visible" : ""}`}
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
      />
      <aside
        className={`cart-panel${isOpen ? " cart-panel--open" : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <header className="cart-panel__header">
          <h2 className="cart-panel__title">
            Your Cart
            {itemCount > 0 ? <span className="cart-panel__count">{itemCount}</span> : null}
          </h2>
          <button type="button" className="cart-panel__close" onClick={closeCart} aria-label="Close cart">
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-panel__empty">
            <div className="cart-panel__empty-icon"><BagIcon size={48} /></div>
            <h3>Your cart is empty</h3>
            <p>Discover our filter selection.</p>
            <Link href="/shop" className="btn btn-primary" onClick={closeCart}>
              Browse Products <ArrowIcon />
            </Link>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress Meter for Drawer */}
            <div
              style={{
                padding: "12px 16px",
                background: subtotal >= 75 ? "#e8f8ec" : "#e8f4fb",
                borderBottom: `1px solid ${subtotal >= 75 ? "#c3e6cb" : "#b8daff"}`,
                fontSize: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  fontWeight: 600,
                  color: subtotal >= 75 ? "#155724" : "#004085",
                }}
              >
                <span>
                  {subtotal >= 75
                    ? "🎉 FREE Standard Shipping Unlocked!"
                    : `Add $${(75 - subtotal).toFixed(2)} for Free Shipping`}
                </span>
                <span>{Math.min(100, Math.round((subtotal / 75) * 100))}%</span>
              </div>
              <div style={{ height: 6, background: "rgba(0,0,0,0.08)", borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, Math.round((subtotal / 75) * 100))}%`,
                    backgroundColor: subtotal >= 75 ? "#28a745" : "#0081c9",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            <div className="cart-panel__items">
              {items.map((item) => (
                <article className="cart-item-card" key={item.id}>
                  <Link href={`/shop/${item.slug}`} className="cart-item-card__image" onClick={closeCart}>
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={100} height={100} />
                    ) : <BagIcon size={28} />}
                  </Link>
                  <div className="cart-item-card__body">
                    <Link href={`/shop/${item.slug}`} onClick={closeCart}>
                      <h3 className="cart-item-card__name">{item.name}</h3>
                    </Link>
                    {item.sku ? <span className="cart-item-card__part">SKU {item.sku}</span> : null}
                    <div className="cart-item-card__controls">
                      <div className="cart-item-card__qty" aria-label={`Quantity ${item.quantity}`}>
                        <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <span className="cart-item-card__price">{formatPrice(item.price * item.quantity, item.currency)}</span>
                    </div>
                  </div>
                  <button type="button" className="cart-item-card__remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                    <CloseIcon />
                  </button>
                </article>
              ))}
            </div>
            <footer className="cart-panel__footer">
              <div className="cart-panel__summary">
                <div className="cart-panel__row"><span>Subtotal</span><span>{formatPrice(subtotal, items[0]?.currency)}</span></div>
                <div className="cart-panel__row">
                  <span>Shipping</span>
                  <span style={{ color: subtotal >= 75 ? "#28a745" : "inherit", fontWeight: subtotal >= 75 ? 700 : 400 }}>
                    {subtotal >= 75 ? "FREE" : "$12.00 (or free over $75)"}
                  </span>
                </div>
                <div className="cart-panel__row cart-panel__row--total"><span>Total</span><span>{formatPrice(subtotal, items[0]?.currency)}</span></div>
              </div>
              <CheckoutButton />
              <Link href="/cart" className="cart-panel__view-cart" onClick={closeCart}>View full cart</Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

function CloseIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m18 6-12 12M6 6l12 12" /></svg>;
}

function BagIcon({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
}

function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
