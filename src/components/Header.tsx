"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useVehicleStore } from "@/lib/vehicle-store";
import { formatPrice } from "@/lib/format";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  category?: string;
  price: number;
  currency: string;
  image?: { url: string; alt?: string };
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // Stores
  const { items: cartItems, openCart, removeItem: removeCartItem } = useCartStore();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const { currentVehicle, openPicker } = useVehicleStore();

  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  // Live Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setDepartmentsOpen(false);
    setSearchFocused(false);
  }

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);

    if (val.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    searchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(val.trim())}`);
        const data = await res.json();
        setSearchResults(data.results || []);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 250);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Site Mobile Header */}
      <header className="site__mobile-header d-xl-none">
        <div className="mobile-header">
          <div className="container">
            <div className="mobile-header__body">
              <button
                className="mobile-header__menu-button"
                type="button"
                aria-label="Open navigation menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg width="18px" height="14px">
                  <path d="M-0,8L-0,6L18,6L18,8L-0,8ZM-0,-0L18,-0L18,2L-0,2L-0,-0ZM14,14L-0,14L-0,12L14,12L14,14Z" />
                </svg>
              </button>

              <Link className="mobile-header__logo" href="/">
                <Image
                  src="/brand/logo.png"
                  alt="CORALFLY"
                  width={130}
                  height={32}
                  style={{ objectFit: "contain", height: "auto" }}
                  priority
                />
              </Link>

              <div className="mobile-header__search mobile-search">
                <form className="mobile-search__body" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    className="mobile-search__input"
                    placeholder="Search filters or part numbers..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  <button
                    type="button"
                    className="mobile-search__vehicle-picker"
                    aria-label="Select Vehicle"
                    onClick={openPicker}
                    title={currentVehicle ? `${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}` : "Select Vehicle"}
                  >
                    <svg width="20" height="20">
                      <path d="M6.6,2c2,0,4.8,0,6.8,0c1,0,2.9,0.8,3.6,2.2C17.7,5.7,17.9,7,18.4,7C20,7,20,8,20,8v1h-1v7.5c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5V16H5v0.5C5,17.3,4.3,18,3.5,18h-1C1.7,18,1,17.3,1,16.5V16V9H0V8c0,0,0.1-1,1.6-1C2.1,7,2.3,5.7,3,4.2C3.7,2.8,5.6,2,6.6,2z M13.3,4H6.7c-0.8,0-1.4,0-2,0.7c-0.5,0.6-0.8,1.5-1,2C3.6,7.1,3.5,7.9,3.7,8C4.5,8.4,6.1,9,10,9c4,0,5.4-0.6,6.3-1c0.2-0.1,0.2-0.8,0-1.2c-0.2-0.4-0.5-1.5-1-2C14.7,4,14.1,4,13.3,4z M4,10c-0.4-0.3-1.5-0.5-2,0c-0.4,0.4-0.4,1.6,0,2c0.5,0.5,4,0.4,4,0C6,11.2,4.5,10.3,4,10z M14,12c0,0.4,3.5,0.5,4,0c0.4-0.4,0.4-1.6,0-2c-0.5-0.5-1.3-0.3-2,0C15.5,10.2,14,11.3,14,12z" />
                    </svg>
                    <span className="mobile-search__vehicle-picker-label">
                      {currentVehicle ? currentVehicle.make : "Vehicle"}
                    </span>
                  </button>
                  <button type="submit" className="mobile-search__button mobile-search__button--search" aria-label="Search">
                    <svg width="20" height="20">
                      <path d="M19.2,17.8c0,0-0.2,0.5-0.5,0.8c-0.4,0.4-0.9,0.6-0.9,0.6s-0.9,0.7-2.8-1.6c-1.1-1.4-2.2-2.8-3.1-3.9C10.9,14.5,9.5,15,8,15c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7c0,1.5-0.5,2.9-1.3,4c1.1,0.8,2.5,2,4,3.1C20,16.8,19.2,17.8,19.2,17.8z M8,3C5.2,3,3,5.2,3,8c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C13,5.2,10.8,3,8,3z" />
                    </svg>
                  </button>
                </form>
              </div>

              <div className="mobile-header__indicators">
                <div className="mobile-indicator">
                  <button type="button" className="mobile-indicator__button" onClick={openCart} aria-label="Cart">
                    <span className="mobile-indicator__icon">
                      <svg width="20" height="20">
                        <circle cx="7" cy="17" r="2" />
                        <circle cx="15" cy="17" r="2" />
                        <path d="M20,4.4V5l-1.8,6.3c-0.1,0.4-0.5,0.7-1,0.7H6.7c-0.4,0-0.8-0.3-1-0.7L3.3,3.9C3.1,3.3,2.6,3,2.1,3H0.4C0.2,3,0,2.8,0,2.6V1.4C0,1.2,0.2,1,0.4,1h2.5c1,0,1.8,0.6,2.1,1.6L5.1,3l2.3,6.8c0,0.1,0.2,0.2,0.3,0.2h8.6c0.1,0,0.3-0.1,0.3-0.2l1.3-4.4C17.9,5.2,17.7,5,17.5,5H9.4C9.2,5,9,4.8,9,4.6V3.4C9,3.2,9.2,3,9.4,3h9.2C19.4,3,20,3.6,20,4.4z" />
                      </svg>
                      {cartCount > 0 && <span className="mobile-indicator__counter">{cartCount}</span>}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Site Desktop Header (Red-Parts Spaceship Variant One) */}
      <header className="site__header d-none d-xl-block">
        <div className="header">
          {/* Topbars */}
          <div className="header__topbar-start-bg" />
          <div className="header__topbar-start">
            <div className="topbar topbar--spaceship-start">
              <div className="topbar__item-text">Call Us: (800) 060-0730</div>
              <div className="topbar__item-text">
                <Link className="topbar__link" href="/about">
                  About Us
                </Link>
              </div>
              <div className="topbar__item-text">
                <Link className="topbar__link" href="/contact">
                  Contacts
                </Link>
              </div>
              <div className="topbar__item-text">
                <Link className="topbar__link" href="/faq">
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          <div className="header__topbar-end-bg" />
          <div className="header__topbar-end">
            <div className="topbar topbar--spaceship-end">
              {/* Language Dropdown */}
              <div className={`topbar__menu ${languageMenuOpen ? "topbar__menu--open" : ""}`}>
                <button
                  className="topbar__button topbar__button--has-arrow topbar__menu-button"
                  type="button"
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  onBlur={() => setTimeout(() => setLanguageMenuOpen(false), 200)}
                >
                  <span className="topbar__button-label">Language:</span>
                  <span className="topbar__button-title">{language}</span>
                  <span className="topbar__button-arrow">
                    <svg width="7px" height="5px">
                      <path d="M0.280,0.282 C0.645,-0.084 1.238,-0.077 1.596,0.297 L3.504,2.310 L5.413,0.297 C5.770,-0.077 6.363,-0.084 6.728,0.282 C7.080,0.634 7.088,1.203 6.746,1.565 L3.504,5.007 L0.262,1.565 C-0.080,1.203 -0.072,0.634 0.280,0.282 Z" />
                    </svg>
                  </span>
                </button>
                <div className="topbar__menu-body">
                  <button type="button" className="topbar__menu-item" onClick={() => setLanguage("EN")}>
                    <img src="/images/languages/language-1.png" alt="English" />
                    <span>English</span>
                  </button>
                  <button type="button" className="topbar__menu-item" onClick={() => setLanguage("FR")}>
                    <img src="/images/languages/language-2.png" alt="French" />
                    <span>French</span>
                  </button>
                  <button type="button" className="topbar__menu-item" onClick={() => setLanguage("DE")}>
                    <img src="/images/languages/language-3.png" alt="German" />
                    <span>German</span>
                  </button>
                  <button type="button" className="topbar__menu-item" onClick={() => setLanguage("ES")}>
                    <img src="/images/languages/language-5.png" alt="Spanish" />
                    <span>Spanish</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Logo & Slogan */}
          <div className="header__logo">
            <Link href="/" className="logo">
              <div className="logo__slogan">Auto parts for Cars, trucks and motorcycles</div>
              <div className="logo__image">
                <Image
                  src="/brand/logo.png"
                  alt="CORALFLY Filters"
                  width={185}
                  height={50}
                  style={{ objectFit: "contain", height: "auto" }}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Slanted Search Bar with Vehicle Trigger */}
          <div className="header__search">
            <div className="search">
              <form className="search__body" onSubmit={handleSearchSubmit}>
                <div className="search__shadow" />
                <input
                  type="text"
                  className="search__input"
                  placeholder="Enter keyword or part number (e.g. OF-220, Air Filter, D13)..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                />

                {/* Vehicle Selector Trigger Button */}
                <button
                  type="button"
                  className="search__button search__button--start"
                  onClick={openPicker}
                  title="Select Vehicle For Fitment"
                  aria-label="Select Vehicle"
                >
                  <span className="search__button-icon">
                    <svg width="20" height="20">
                      <path d="M6.6,2c2,0,4.8,0,6.8,0c1,0,2.9,0.8,3.6,2.2C17.7,5.7,17.9,7,18.4,7C20,7,20,8,20,8v1h-1v7.5c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5V16H5v0.5C5,17.3,4.3,18,3.5,18h-1C1.7,18,1,17.3,1,16.5V16V9H0V8c0,0,0.1-1,1.6-1C2.1,7,2.3,5.7,3,4.2C3.7,2.8,5.6,2,6.6,2z M13.3,4H6.7c-0.8,0-1.4,0-2,0.7c-0.5,0.6-0.8,1.5-1,2C3.6,7.1,3.5,7.9,3.7,8C4.5,8.4,6.1,9,10,9c4,0,5.4-0.6,6.3-1c0.2-0.1,0.2-0.8,0-1.2c-0.2-0.4-0.5-1.5-1-2C14.7,4,14.1,4,13.3,4z M4,10c-0.4-0.3-1.5-0.5-2,0c-0.4,0.4-0.4,1.6,0,2c0.5,0.5,4,0.4,4,0C6,11.2,4.5,10.3,4,10z M14,12c0,0.4,3.5,0.5,4,0c0.4-0.4,0.4-1.6,0-2c-0.5-0.5-1.3-0.3-2,0C15.5,10.2,14,11.3,14,12z" />
                    </svg>
                  </span>
                  <span className="search__button-title" style={{ display: "inline", marginLeft: 6, fontSize: 13, fontWeight: 600 }}>
                    {currentVehicle ? `${currentVehicle.make}` : "Vehicle"}
                  </span>
                </button>

                {/* Submit Search Button */}
                <button type="submit" className="search__button search__button--end" aria-label="Search Submit">
                  <span className="search__button-icon">
                    <svg width="20" height="20">
                      <path d="M19.2,17.8c0,0-0.2,0.5-0.5,0.8c-0.4,0.4-0.9,0.6-0.9,0.6s-0.9,0.7-2.8-1.6c-1.1-1.4-2.2-2.8-3.1-3.9C10.9,14.5,9.5,15,8,15c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7c0,1.5-0.5,2.9-1.3,4c1.1,0.8,2.5,2,4,3.1C20,16.8,19.2,17.8,19.2,17.8z M8,3C5.2,3,3,5.2,3,8c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C13,5.2,10.8,3,8,3z" />
                    </svg>
                  </span>
                </button>

                <div className="search__box" />
                <div className="search__decor">
                  <div className="search__decor-start" />
                  <div className="search__decor-end" />
                </div>

                {/* Live Auto-Suggest Dropdown */}
                {searchFocused && (searchQuery.trim().length >= 2 || searchResults.length > 0) && (
                  <div className="search__dropdown" style={{ display: "block" }}>
                    <div className="suggestions search__suggestions">
                      {searchLoading && (
                        <div style={{ padding: "12px 20px", fontSize: 13, color: "#6c757d" }}>
                          Searching CORALFLY catalog...
                        </div>
                      )}
                      {!searchLoading && searchResults.length === 0 && searchQuery.trim().length >= 2 && (
                        <div style={{ padding: "12px 20px", fontSize: 13, color: "#6c757d" }}>
                          No filters matching &ldquo;{searchQuery}&rdquo;. Try part numbers like OF-220 or AF-410.
                        </div>
                      )}
                      {searchResults.length > 0 && (
                        <div className="suggestions__group">
                          <div className="suggestions__group-title">Matching Products</div>
                          {searchResults.slice(0, 5).map((p) => (
                            <Link
                              key={p.id}
                              href={`/shop/${p.slug}`}
                              className="suggestions__product"
                              onClick={() => setSearchFocused(false)}
                            >
                              <div className="suggestions__product-image">
                                <img
                                  src={p.image?.url || "/images/products/product-1-245x245.jpg"}
                                  alt={p.name}
                                  width={40}
                                  height={40}
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div className="suggestions__product-info">
                                <div className="suggestions__product-name">{p.name}</div>
                                <div className="suggestions__product-rating">
                                  <div className="suggestions__product-rating-stars" style={{ color: "#ffc107", fontSize: 11 }}>
                                    {"★★★★★"}
                                  </div>
                                  <div className="suggestions__product-rating-label">In Stock</div>
                                </div>
                              </div>
                              <div className="suggestions__product-price">
                                {formatPrice(p.price, p.currency)}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Indicators: Dropcart */}
          <div className="header__indicators">
            {/* Cart with Dropcart Preview */}
            <div className="indicator indicator--trigger--click">
              <Link href="/cart" className="indicator__button" onClick={(e) => { e.preventDefault(); openCart(); }}>
                <span className="indicator__icon">
                  <svg width="32" height="32">
                    <circle cx="10.5" cy="27.5" r="2.5" />
                    <circle cx="23.5" cy="27.5" r="2.5" />
                    <path d="M26.4,21H10.2L6.1,4H1V2h6.9l1.2,5H29l-2.6,14z M11.8,19H25l1.9-10H8.5L11.8,19z" />
                  </svg>
                  {cartCount > 0 && <span className="indicator__counter">{cartCount}</span>}
                </span>
                <span className="indicator__title">Shopping Cart</span>
                <span className="indicator__value">{formatPrice(cartSubtotal, "usd")}</span>
              </Link>

              {/* Interactive Hover Dropcart */}
              <div className="indicator__content">
                <div className="dropcart">
                  {cartItems.length === 0 ? (
                    <div style={{ padding: "24px 20px", textAlign: "center", color: "#6c757d", fontSize: 14 }}>
                      Your shopping cart is empty.
                    </div>
                  ) : (
                    <>
                      <ul className="dropcart__list">
                        {cartItems.slice(0, 3).map((item) => (
                          <li key={item.id} className="dropcart__item">
                            <div className="dropcart__item-image image image--type--product">
                              <Link className="image__body" href={`/shop/${item.slug}`}>
                                <img
                                  className="image__tag"
                                  src={item.image || "/images/products/product-1-245x245.jpg"}
                                  alt={item.name}
                                />
                              </Link>
                            </div>
                            <div className="dropcart__item-info">
                              <div className="dropcart__item-name">
                                <Link href={`/shop/${item.slug}`}>{item.name}</Link>
                              </div>
                              <ul className="dropcart__item-features">
                                <li>SKU: {item.sku || "CF-PART"}</li>
                              </ul>
                              <div className="dropcart__item-meta">
                                <div className="dropcart__item-quantity">{item.quantity} ×</div>
                                <div className="dropcart__item-price">
                                  {formatPrice(item.price, item.currency)}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="dropcart__item-remove"
                              aria-label="Remove item"
                              onClick={() => removeCartItem(item.id)}
                            >
                              <svg width="10" height="10">
                                <path d="M8.8,8.8L8.8,8.8c-0.4,0.4-1,0.4-1.4,0L5,6.4L2.6,8.8c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4L3.6,5L1.2,2.6c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0L5,3.6l2.4-2.4c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4L6.4,5l2.4,2.4C9.2,7.8,9.2,8.4,8.8,8.8z" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="dropcart__totals">
                        <table>
                          <tbody>
                            <tr>
                              <th>Subtotal</th>
                              <td>{formatPrice(cartSubtotal, "usd")}</td>
                            </tr>
                            <tr>
                              <th>Shipping</th>
                              <td>{cartSubtotal >= 75 ? "FREE" : "$12.00"}</td>
                            </tr>
                            <tr>
                              <th>Total</th>
                              <td>{formatPrice(cartSubtotal >= 75 ? cartSubtotal : cartSubtotal + 12, "usd")}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="dropcart__actions">
                        <Link href="/cart" className="btn btn-secondary">
                          View Cart
                        </Link>
                        <Link href="/checkout" className="btn btn-primary" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
                          Checkout
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="header__navbar">
            {/* Departments Button & Mega-Menu */}
            <div className="header__navbar-departments">
              <div className={`departments ${departmentsOpen ? "departments--open" : ""}`}>
                <button
                  className="departments__button"
                  type="button"
                  onClick={() => setDepartmentsOpen(!departmentsOpen)}
                >
                  <span className="departments__button-icon">
                    <svg width="16px" height="12px">
                      <path d="M0,7L0,5L16,5L16,7L0,7ZM0,0L16,0L16,2L0,2L0,0ZM12,12L0,12L0,10L12,10L12,12Z" />
                    </svg>
                  </span>
                  <span className="departments__button-title">All Filter Categories</span>
                  <span className="departments__button-arrow">
                    <svg width="9px" height="6px">
                      <path d="M0.2,0.4c0.4-0.4,1-0.5,1.4-0.1l2.9,3l2.9-3c0.4-0.4,1.1-0.4,1.4,0.1c0.3,0.4,0.3,0.9-0.1,1.3L4.5,6L0.3,1.6C-0.1,1.3-0.1,0.7,0.2,0.4z" />
                    </svg>
                  </span>
                </button>

                {/* Mega-Menu Dropdown */}
                <div className="departments__menu">
                  <div className="departments__arrow" />
                  <div className="departments__body">
                    <ul className="departments__list">
                      <li className="departments__list-padding" role="presentation" />

                      <li className="departments__item departments__item--submenu--megamenu departments__item--has-submenu">
                        <Link href="/shop?category=Air%20Filters" className="departments__item-link">
                          Air Filters &amp; Intake
                          <span className="departments__item-arrow">
                            <svg width="7" height="11">
                              <path d="M0.3,10.7L0.3,10.7c0.4,0.4,0.9,0.4,1.3,0L7,5.5L1.6,0.3C1.2-0.1,0.7,0,0.3,0.3l0,0c-0.4,0.4-0.4,1,0,1.3l4,3.9l-4,3.9C-0.1,9.8-0.1,10.4,0.3,10.7z" />
                            </svg>
                          </span>
                        </Link>
                        <div className="departments__item-menu">
                          <div className="megamenu departments__megamenu departments__megamenu--size--xl">
                            <div className="megamenu__image">
                              <img src="/images/departments/departments-2.jpg" alt="Air Filters" />
                            </div>
                            <div className="row">
                              <div className="col-4">
                                <ul className="megamenu__links megamenu-links megamenu-links--root">
                                  <li className="megamenu-links__item megamenu-links__item--has-submenu">
                                    <Link className="megamenu-links__item-link" href="/shop?category=Air%20Filters">
                                      Engine Air Filtration
                                    </Link>
                                    <ul className="megamenu-links">
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Air%20Filters">Primary RadialSeal</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Air%20Filters">Secondary Inner Elements</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Air%20Filters">Heavy Duty Cylindrical</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Air%20Filters">Panel Air Filters</Link>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-4">
                                <ul className="megamenu__links megamenu-links megamenu-links--root">
                                  <li className="megamenu-links__item megamenu-links__item--has-submenu">
                                    <Link className="megamenu-links__item-link" href="/shop?category=Cabin%20Filters">
                                      Cabin Air Filtration
                                    </Link>
                                    <ul className="megamenu-links">
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Cabin%20Filters">Particulate Cabin Filters</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Cabin%20Filters">Activated Carbon Filters</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Cabin%20Filters">HVAC Filter Packs</Link>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-4">
                                <ul className="megamenu__links megamenu-links megamenu-links--root">
                                  <li className="megamenu-links__item megamenu-links__item--has-submenu">
                                    <Link className="megamenu-links__item-link" href="/trucks">
                                      Rig Compatibility
                                    </Link>
                                    <ul className="megamenu-links">
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?make=Volvo">Volvo VNL / VHD</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?make=Freightliner">Freightliner Cascadia</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?make=Kenworth">Kenworth T680 / W900</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?make=Peterbilt">Peterbilt 579 / 389</Link>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="departments__item departments__item--submenu--megamenu departments__item--has-submenu">
                        <Link href="/shop?category=Oil%20Filters" className="departments__item-link">
                          Oil &amp; Lube Filters
                          <span className="departments__item-arrow">
                            <svg width="7" height="11">
                              <path d="M0.3,10.7L0.3,10.7c0.4,0.4,0.9,0.4,1.3,0L7,5.5L1.6,0.3C1.2-0.1,0.7,0,0.3,0.3l0,0c-0.4,0.4-0.4,1,0,1.3l4,3.9l-4,3.9C-0.1,9.8-0.1,10.4,0.3,10.7z" />
                            </svg>
                          </span>
                        </Link>
                        <div className="departments__item-menu">
                          <div className="megamenu departments__megamenu departments__megamenu--size--lg">
                            <div className="megamenu__image">
                              <img src="/images/departments/departments-1.jpg" alt="Oil Filters" />
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <ul className="megamenu__links megamenu-links megamenu-links--root">
                                  <li className="megamenu-links__item megamenu-links__item--has-submenu">
                                    <Link className="megamenu-links__item-link" href="/shop?category=Oil%20Filters">
                                      Commercial Lube Filters
                                    </Link>
                                    <ul className="megamenu-links">
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Oil%20Filters">Spin-On Lube Filters</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Oil%20Filters">By-Pass Filtration Units</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Oil%20Filters">Full-Flow Cartridges</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?category=Oil%20Filters">Synthetic Media High-Cap</Link>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-6">
                                <ul className="megamenu__links megamenu-links megamenu-links--root">
                                  <li className="megamenu-links__item megamenu-links__item--has-submenu">
                                    <Link className="megamenu-links__item-link" href="/shop?category=Oil%20Filters">
                                      Engine Applications
                                    </Link>
                                    <ul className="megamenu-links">
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?q=Detroit+DD15">Detroit DD13 / DD15 / DD16</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?q=Cummins+X15">Cummins X15 / ISX15</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?q=Volvo+D13">Volvo D11 / D13 / D16</Link>
                                      </li>
                                      <li className="megamenu-links__item">
                                        <Link className="megamenu-links__item-link" href="/shop?q=PACCAR+MX">PACCAR MX-11 / MX-13</Link>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="departments__item">
                        <Link href="/shop?category=Fuel%20Filters" className="departments__item-link">
                          Fuel &amp; Water Separators
                        </Link>
                      </li>
                      <li className="departments__item">
                        <Link href="/shop?category=Hydraulic%20Filters" className="departments__item-link">
                          Hydraulic &amp; Transmission
                        </Link>
                      </li>
                      <li className="departments__item">
                        <Link href="/shop?category=Coolant%20Filters" className="departments__item-link">
                          Coolant &amp; Chemical Filters
                        </Link>
                      </li>
                      <li className="departments__item">
                        <Link href="/trucks" className="departments__item-link">
                          Fleet Truck Fitment Guides
                        </Link>
                      </li>
                      <li className="departments__item">
                        <Link href="/shop" className="departments__item-link">
                          Browse All Products
                        </Link>
                      </li>

                      <li className="departments__list-padding" role="presentation" />
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Menu Links */}
            <div className="header__navbar-menu">
              <div className="main-menu">
                <ul className="main-menu__list">
                  <li className="main-menu__item">
                    <Link href="/" className="main-menu__link">
                      Home
                    </Link>
                  </li>

                  <li className="main-menu__item">
                    <Link href="/shop" className="main-menu__link">
                      Shop
                    </Link>
                  </li>

                  <li className="main-menu__item">
                    <Link href="/trucks" className="main-menu__link">
                      Truck Fitment
                    </Link>
                  </li>

                  <li className="main-menu__item">
                    <Link href="/guides" className="main-menu__link">
                      Guides &amp; Tech
                    </Link>
                  </li>

                  <li className="main-menu__item">
                    <Link href="/about" className="main-menu__link">
                      About Us
                    </Link>
                  </li>

                  <li className="main-menu__item">
                    <Link href="/contact" className="main-menu__link">
                      Contact
                    </Link>
                  </li>

                  <li className="main-menu__item">
                    <Link href="/faq" className="main-menu__link">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobilemenu"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1070,
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            style={{
              position: "relative",
              width: 320,
              maxWidth: "85%",
              height: "100%",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #ebebeb",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#0081c9",
                color: "#fff",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16 }}>CORALFLY Navigation</div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: 24,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>

            {/* Vehicle Active Banner in Mobile Menu */}
            <div style={{ padding: 16, backgroundColor: "#f7f7f7", borderBottom: "1px solid #ebebeb" }}>
              <div style={{ fontSize: 12, color: "#6c757d", textTransform: "uppercase", fontWeight: 700 }}>
                Selected Vehicle
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1d21", marginTop: 2 }}>
                {currentVehicle ? `${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}` : "No vehicle selected"}
              </div>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPicker();
                }}
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  width: "100%",
                  backgroundColor: "#0081c9",
                  borderColor: "#0081c9",
                }}
              >
                {currentVehicle ? "Change Vehicle" : "Select Vehicle"}
              </button>
            </div>

            <div style={{ padding: "12px 0", flex: 1 }}>
              <div style={{ padding: "8px 20px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999" }}>
                Main Navigation
              </div>
              <Link href="/" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Home
              </Link>
              <Link href="/shop" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Shop Catalog
              </Link>
              <Link href="/shop?category=Air%20Filters" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Air &amp; Intake Filters
              </Link>
              <Link href="/shop?category=Oil%20Filters" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Oil &amp; Lube Filters
              </Link>
              <Link href="/shop?category=Fuel%20Filters" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Fuel &amp; Water Separators
              </Link>
              <Link href="/trucks" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Truck Fitment
              </Link>
              <Link href="/guides" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Guides &amp; Cross-Reference
              </Link>



              <div style={{ padding: "16px 20px 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999" }}>
                Information
              </div>
              <Link href="/about" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                About Us
              </Link>
              <Link href="/contact" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Contact Us
              </Link>
              <Link href="/faq" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                FAQ
              </Link>
            </div>

            <div style={{ padding: 20, borderTop: "1px solid #ebebeb", fontSize: 13, color: "#6c757d" }}>
              Call Us: <strong>(800) 060-0730</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
