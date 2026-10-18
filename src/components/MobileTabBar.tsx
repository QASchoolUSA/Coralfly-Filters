"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

type MobileTabBarProps = {
  isCategoriesOpen?: boolean;
  onOpenCategories: () => void;
};

export function MobileTabBar({
  isCategoriesOpen = false,
  onOpenCategories,
}: MobileTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { items, openCart } = useCartStore();

  const cartCount = items.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const isHomeActive = pathname === "/";
  const isShopActive =
    (pathname.startsWith("/shop") || pathname.startsWith("/products")) &&
    !isCategoriesOpen;

  const handleSearchClick = () => {
    // If search input exists in the mobile header, scroll to it & focus
    const mobileSearchInput = document.querySelector<HTMLInputElement>(
      ".cf-mobile-search__input, .mobile-header input, input[type='search']"
    );
    if (mobileSearchInput) {
      mobileSearchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        mobileSearchInput.focus();
      }, 250);
    } else {
      router.push("/shop");
    }
  };

  return (
    <nav className="cf-mobile-tabbar" aria-label="Mobile Navigation Bar">
      <div className="cf-mobile-tabbar__inner">
        {/* Tab 1: Home */}
        <Link
          href="/"
          className={`cf-mobile-tabbar__tab ${
            isHomeActive && !isCategoriesOpen ? "cf-mobile-tabbar__tab--active" : ""
          }`}
          aria-label="Home"
        >
          <div className="cf-mobile-tabbar__icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={isHomeActive && !isCategoriesOpen ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={isHomeActive && !isCategoriesOpen ? "1.5" : "2"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5h-4v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
          </div>
          <span className="cf-mobile-tabbar__label">Home</span>
        </Link>

        {/* Tab 2: Shop Catalog */}
        <Link
          href="/shop"
          className={`cf-mobile-tabbar__tab ${
            isShopActive ? "cf-mobile-tabbar__tab--active" : ""
          }`}
          aria-label="Shop"
        >
          <div className="cf-mobile-tabbar__icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={isShopActive ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={isShopActive ? "1.5" : "2"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <span className="cf-mobile-tabbar__label">Shop</span>
        </Link>

        {/* Tab 3: Categories & Trucks (Center Highlighted Sheet Trigger) */}
        <button
          type="button"
          onClick={onOpenCategories}
          className={`cf-mobile-tabbar__tab cf-mobile-tabbar__tab--categories ${
            isCategoriesOpen ? "cf-mobile-tabbar__tab--active" : ""
          }`}
          aria-label="Browse Categories and Trucks"
          aria-expanded={isCategoriesOpen}
        >
          <div className="cf-mobile-tabbar__icon cf-mobile-tabbar__icon--center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span className="cf-mobile-tabbar__label">Categories</span>
        </button>

        {/* Tab 4: Search */}
        <button
          type="button"
          onClick={handleSearchClick}
          className="cf-mobile-tabbar__tab"
          aria-label="Search Catalog"
        >
          <div className="cf-mobile-tabbar__icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <span className="cf-mobile-tabbar__label">Search</span>
        </button>

        {/* Tab 5: Cart */}
        <button
          type="button"
          onClick={openCart}
          className="cf-mobile-tabbar__tab cf-mobile-tabbar__tab--cart"
          aria-label={`Shopping Cart (${cartCount} items)`}
        >
          <div className="cf-mobile-tabbar__icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="cf-mobile-tabbar__badge">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
          <span className="cf-mobile-tabbar__label">Cart</span>
        </button>
      </div>
    </nav>
  );
}
