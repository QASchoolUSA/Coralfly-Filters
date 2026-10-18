import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutView } from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout for CORALFLY commercial filtration orders.",
};

export default function CheckoutPage() {
  return (
    <>
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
                  <Link href="/shop" className="breadcrumb__item-link">Shop</Link>
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

      <CheckoutView />
    </>
  );
}
