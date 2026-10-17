"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "bank" | "po">("stripe");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Form Fields
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("American Fleet Logistics");
  const [address, setAddress] = useState("4500 Highway 80 West");
  const [city, setCity] = useState("Dallas");
  const [state, setState] = useState("TX");
  const [zip, setZip] = useState("75212");
  const [email, setEmail] = useState("j.doe@fleetlogistics.com");
  const [phone, setPhone] = useState("(214) 555-0199");
  const [orderNotes, setOrderNotes] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 12;
  const grandTotal = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMessage("Please accept the terms and conditions to proceed.");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      if (paymentMethod === "stripe") {
        // Use Stripe Checkout API route
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              id: i.id,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
              image: i.image,
            })),
            customer: { firstName, lastName, email, phone, company, address, city, state, zip },
          }),
        });

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }

      // If bank transfer, PO, or test mode checkout:
      clear();
      router.push("/order-success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to process checkout. Please try again.";
      setErrorMessage(message);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ color: "#6c757d", margin: "16px 0 24px" }}>
          You cannot checkout without any items in your cart.
        </p>
        <Link href="/shop" className="btn btn-primary" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="block">
      {/* Header Breadcrumbs */}
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__spaceship-safe-area" role="presentation" />
                <li className="breadcrumb__item breadcrumb__item--parent breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">Home</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--parent">
                  <Link href="/cart" className="breadcrumb__item-link">Cart</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-link">Checkout</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <form onSubmit={handlePlaceOrder}>
          <div className="row">
            {/* Left Column: Billing Details Form */}
            <div className="col-12 col-lg-7 mb-4 mb-lg-0">
              <div className="card" style={{ padding: 32, border: "1px solid #ebebeb", borderRadius: 4 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Billing Details</h3>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>First Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Last Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Company Name (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Street Address *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="House number and street name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="col-12 col-md-5 mb-3">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Town / City *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>State *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-3 mb-3">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Postcode / ZIP *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3" style={{ borderTop: "1px solid #ebebeb" }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Order Notes (Optional)</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Notes about your order, e.g. special shipping gate instructions or cross-reference requests."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Payment Methods */}
            <div className="col-12 col-lg-5">
              <div className="card" style={{ padding: 32, border: "1px solid #ebebeb", borderRadius: 4 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Your Order</h3>

                {/* Items Summary */}
                <table className="table" style={{ fontSize: 14, marginBottom: 20 }}>
                  <thead style={{ background: "#f8f9fa" }}>
                    <tr>
                      <th>Product</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.name} × <strong>{item.quantity}</strong>
                        </td>
                        <td className="text-right" style={{ fontWeight: 600 }}>
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: "2px solid #ebebeb" }}>
                      <th>Subtotal</th>
                      <td className="text-right" style={{ fontWeight: 700 }}>
                        {formatPrice(subtotal, "usd")}
                      </td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td className="text-right" style={{ fontWeight: 700 }}>
                        {shipping === 0 ? <span style={{ color: "#28a745" }}>FREE</span> : formatPrice(shipping, "usd")}
                      </td>
                    </tr>
                    <tr style={{ borderTop: "2px solid #ebebeb", fontSize: 18 }}>
                      <th style={{ fontWeight: 700 }}>Total</th>
                      <td className="text-right" style={{ fontWeight: 700, color: "#0081c9" }}>
                        {formatPrice(grandTotal, "usd")}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Payment Methods */}
                <div style={{ marginBottom: 24, borderTop: "1px solid #ebebeb", paddingTop: 16 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Payment Method</h4>

                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paymentStripe"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                      style={{ accentColor: "#0081c9" }}
                    />
                    <label className="form-check-label" htmlFor="paymentStripe" style={{ fontSize: 14, fontWeight: 600 }}>
                      Credit Card (Stripe Checkout)
                    </label>
                    <div style={{ fontSize: 12, color: "#6c757d", marginLeft: 22 }}>
                      Pay securely with Visa, MasterCard, American Express, or Apple Pay.
                    </div>
                  </div>

                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paymentBank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      style={{ accentColor: "#0081c9" }}
                    />
                    <label className="form-check-label" htmlFor="paymentBank" style={{ fontSize: 14, fontWeight: 600 }}>
                      Direct Bank Wire / ACH
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paymentPO"
                      checked={paymentMethod === "po"}
                      onChange={() => setPaymentMethod("po")}
                      style={{ accentColor: "#0081c9" }}
                    />
                    <label className="form-check-label" htmlFor="paymentPO" style={{ fontSize: 14, fontWeight: 600 }}>
                      Fleet Net 30 Purchase Order
                    </label>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="mb-4">
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#495057", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      style={{ marginTop: 3, accentColor: "#0081c9" }}
                    />
                    <span>
                      I have read and agree to the website <Link href="/terms" style={{ color: "#0081c9" }}>terms and conditions</Link> *
                    </span>
                  </label>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger mb-3" style={{ fontSize: 13, padding: "8px 12px" }}>
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-block btn-lg"
                  style={{
                    width: "100%",
                    height: 50,
                    fontSize: 16,
                    fontWeight: 700,
                    backgroundColor: "#0081c9",
                    borderColor: "#0081c9",
                  }}
                >
                  {loading ? "Processing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="block-space block-space--layout--before-footer" />
    </div>
  );
}
