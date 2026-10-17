import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your CORALFLY filters cart and checkout securely.",
};

export default function CartPage() {
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
                <li className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-link">Shopping Cart</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <CartView />
    </>
  );
}
