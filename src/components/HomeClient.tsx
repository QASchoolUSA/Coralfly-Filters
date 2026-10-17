"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useVehicleStore } from "@/lib/vehicle-store";
import type { Product } from "@/sanity/types";

const VEHICLE_DATA = [
  {
    make: "Volvo",
    models: ["VNL 760", "VNL 860", "VHD 300", "VNX 630"],
    engines: ["D13TC 455 HP", "D13 500 HP", "Cummins X15 500 HP"],
  },
  {
    make: "Freightliner",
    models: ["Cascadia 126", "Cascadia 116", "114SD", "122SD"],
    engines: ["Detroit DD15 505 HP", "Detroit DD13 450 HP", "Cummins X15 500 HP"],
  },
  {
    make: "Kenworth",
    models: ["T680", "W900L", "T880"],
    engines: ["PACCAR MX-13 455 HP", "PACCAR MX-11 430 HP", "Cummins X15 500 HP"],
  },
  {
    make: "Peterbilt",
    models: ["Model 579", "Model 389", "Model 567"],
    engines: ["PACCAR MX-13 455 HP", "Cummins X15 500 HP"],
  },
  {
    make: "Mack",
    models: ["Anthem", "Pinnacle", "Granite"],
    engines: ["Mack MP8 505 HP", "Mack MP7 425 HP"],
  },
  {
    make: "International",
    models: ["LT Series", "RH Series", "Lonestar"],
    engines: ["International A26 475 HP", "Cummins X15 500 HP"],
  },
];

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

export function HomeClient({
  products,
  featured,
}: {
  products: Product[];
  featured: Product[];
}) {
  const router = useRouter();
  const { selectVehicle } = useVehicleStore();

  // Finder form state
  const [year, setYear] = useState("2023");
  const [make, setMake] = useState("Volvo");
  const [model, setModel] = useState("VNL 760");
  const [engine, setEngine] = useState("D13TC 455 HP");

  // Tab filters for Featured block
  const [featuredTab, setFeaturedTab] = useState("All");

  // Tab filters for Zone block
  const [zoneTab, setZoneTab] = useState("Featured");

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const makeObj = VEHICLE_DATA.find((m) => m.make === make) || VEHICLE_DATA[0];

  const handleMakeChange = (newMake: string) => {
    setMake(newMake);
    const found = VEHICLE_DATA.find((m) => m.make === newMake);
    if (found) {
      setModel(found.models[0]);
      setEngine(found.engines[0]);
    }
  };

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    selectVehicle({ year, make, model, engine });
    router.push(`/shop?make=${encodeURIComponent(make)}&year=${encodeURIComponent(year)}`);
  };

  // Filtered products for Featured block
  const featuredPool = featured && featured.length > 0 ? featured : products;
  const filteredFeatured = featuredPool.filter((p) => {
    if (featuredTab === "All") return true;
    if (featuredTab === "Air Filters") return p.category?.toLowerCase().includes("air");
    if (featuredTab === "Oil Filters") return p.category?.toLowerCase().includes("oil");
    if (featuredTab === "Fuel Filters") return p.category?.toLowerCase().includes("fuel");
    if (featuredTab === "Cabin Filters") return p.category?.toLowerCase().includes("cabin");
    return true;
  });

  // Latest blog posts data
  const posts = [
    {
      id: 1,
      title: "How to Choose the Right Heavy-Duty Oil Filter for Long Haul Rigs",
      date: "OCTOBER 15, 2026",
      image: "/images/posts/post-1-730x485.jpg",
      slug: "freightliner-cascadia-filter-guide",
      author: "Filtration Engineering Team",
      comments: 6,
    },
    {
      id: 2,
      title: "Understanding Micron Ratings & Gasket Integrity in Diesel Fuel Systems",
      date: "SEPTEMBER 28, 2026",
      image: "/images/posts/post-2-730x485.jpg",
      slug: "oem-filter-cross-reference-guide",
      author: "Technical Specialist",
      comments: 14,
    },
    {
      id: 3,
      title: "The Fleet Operator's Comprehensive Guide to Air Intake Pre-Cleaners",
      date: "SEPTEMBER 12, 2026",
      image: "/images/posts/post-3-730x485.jpg",
      slug: "volvo-vnl-d13-filtration-specs",
      author: "Service Support",
      comments: 9,
    },
  ];

  return (
    <>
      {/* 1. Block Finder Hero Banner */}
      <div className="block-finder block">
        <div className="decor block-finder__decor decor--type--bottom">
          <div className="decor__body">
            <div className="decor__start" />
            <div className="decor__end" />
            <div className="decor__center" />
          </div>
        </div>

        <div
          className="block-finder__image"
          style={{ backgroundImage: "url('/images/finder-1903x500.jpg')" }}
        />

        <div className="block-finder__body container container--max--xl">
          <div className="block-finder__title">Find The Right Filters For Your Truck</div>
          <div className="block-finder__subtitle">
            Over thousands of heavy-duty filters and verified OEM cross-references in stock
          </div>

          <form className="block-finder__form" onSubmit={handleFinderSubmit}>
            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="year"
                aria-label="Vehicle Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="make"
                aria-label="Vehicle Make"
                value={make}
                onChange={(e) => handleMakeChange(e.target.value)}
              >
                {VEHICLE_DATA.map((v) => (
                  <option key={v.make} value={v.make}>
                    {v.make}
                  </option>
                ))}
              </select>
            </div>

            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="model"
                aria-label="Vehicle Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                {makeObj.models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="block-finder__form-control block-finder__form-control--select">
              <select
                name="engine"
                aria-label="Vehicle Engine"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
              >
                {makeObj.engines.map((eng) => (
                  <option key={eng} value={eng}>
                    {eng}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="block-finder__form-control block-finder__form-control--button"
              type="submit"
              style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}
            >
              Search Filters
            </button>
          </form>
        </div>
      </div>

      {/* 2. Block Features Top Strip */}
      <div className="block-features block block-features--layout--top-strip">
        <div className="container">
          <ul className="block-features__list">
            <li className="block-features__item">
              <div className="block-features__item-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 18H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v5" />
                  <polyline points="16 5 21 10 21 16 19 16" />
                  <circle cx="6.5" cy="18.5" r="2.5" />
                  <circle cx="16.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className="block-features__item-info">
                <div className="block-features__item-title">Free Shipping</div>
                <div className="block-features__item-subtitle">For orders from $75</div>
              </div>
            </li>

            <li className="block-features__item">
              <div className="block-features__item-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="block-features__item-info">
                <div className="block-features__item-title">Support 24/7</div>
                <div className="block-features__item-subtitle">Expert filtration specialists</div>
              </div>
            </li>

            <li className="block-features__item">
              <div className="block-features__item-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className="block-features__item-info">
                <div className="block-features__item-title">100% Secure Checkout</div>
                <div className="block-features__item-subtitle">Encrypted Stripe payments</div>
              </div>
            </li>

            <li className="block-features__item">
              <div className="block-features__item-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="block-features__item-info">
                <div className="block-features__item-title">Fleet Discounts</div>
                <div className="block-features__item-subtitle">Savings on bulk case packs</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 3. Featured Products Carousel with Category Tabs */}
      <div className="block block-products-carousel" data-layout="grid-5">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">Featured Products</h2>
              <div className="section-header__spring" />
              <ul className="section-header__groups">
                <li className="section-header__groups-item">
                  <button
                    type="button"
                    className={`section-header__groups-button ${featuredTab === "All" ? "section-header__groups-button--active" : ""}`}
                    onClick={() => setFeaturedTab("All")}
                  >
                    All
                  </button>
                </li>
                <li className="section-header__groups-item">
                  <button
                    type="button"
                    className={`section-header__groups-button ${featuredTab === "Air Filters" ? "section-header__groups-button--active" : ""}`}
                    onClick={() => setFeaturedTab("Air Filters")}
                  >
                    Air Filters
                  </button>
                </li>
                <li className="section-header__groups-item">
                  <button
                    type="button"
                    className={`section-header__groups-button ${featuredTab === "Oil Filters" ? "section-header__groups-button--active" : ""}`}
                    onClick={() => setFeaturedTab("Oil Filters")}
                  >
                    Oil Filters
                  </button>
                </li>
                <li className="section-header__groups-item">
                  <button
                    type="button"
                    className={`section-header__groups-button ${featuredTab === "Fuel Filters" ? "section-header__groups-button--active" : ""}`}
                    onClick={() => setFeaturedTab("Fuel Filters")}
                  >
                    Fuel Filters
                  </button>
                </li>
                <li className="section-header__groups-item">
                  <button
                    type="button"
                    className={`section-header__groups-button ${featuredTab === "Cabin Filters" ? "section-header__groups-button--active" : ""}`}
                    onClick={() => setFeaturedTab("Cabin Filters")}
                  >
                    Cabin Filters
                  </button>
                </li>
              </ul>
              <div className="section-header__arrows">
                <div className="arrow section-header__arrow section-header__arrow--prev arrow--prev">
                  <button className="arrow__button" type="button" aria-label="Previous">
                    <svg width="7" height="11">
                      <path d="M6.7,0.3L6.7,0.3c-0.4-0.4-0.9-0.4-1.3,0L0,5.5l5.4,5.2c0.4,0.4,0.9,0.3,1.3,0l0,0c0.4-0.4,0.4-1,0-1.3l-4-3.9l4-3.9C7.1,1.2,7.1,0.6,6.7,0.3z" />
                    </svg>
                  </button>
                </div>
                <div className="arrow section-header__arrow section-header__arrow--next arrow--next">
                  <button className="arrow__button" type="button" aria-label="Next">
                    <svg width="7" height="11">
                      <path d="M0.3,10.7L0.3,10.7c0.4,0.4,0.9,0.4,1.3,0L7,5.5L1.6,0.3C1.2-0.1,0.7,0,0.3,0.3l0,0c-0.4,0.4-0.4,1,0,1.3l4,3.9l-4,3.9C-0.1,9.8-0.1,10.4,0.3,10.7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {filteredFeatured.slice(0, 5).map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2dot4 mb-4">
                <ProductCard product={product} layout="grid" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 4. Block Sale with Live Countdown Timer */}
      <div className="block block-sale">
        <div className="block-sale__content">
          <div className="block-sale__header">
            <div className="block-sale__title">Special Fleet Offers</div>
            <div className="block-sale__subtitle">
              Limited time commercial discount on genuine CORALFLY high-capacity filters
            </div>

            {/* Live Countdown Timer */}
            <div className="block-sale__timer">
              <div className="timer block-sale__timer-clock">
                <div className="timer__part">
                  <div className="timer__part-value timer__part-value--days">{timeLeft.days}</div>
                  <div className="timer__part-title">Days</div>
                </div>
                <div className="timer__dots">:</div>
                <div className="timer__part">
                  <div className="timer__part-value timer__part-value--hours">{timeLeft.hours}</div>
                  <div className="timer__part-title">Hours</div>
                </div>
                <div className="timer__dots">:</div>
                <div className="timer__part">
                  <div className="timer__part-value timer__part-value--minutes">{timeLeft.minutes}</div>
                  <div className="timer__part-title">Mins</div>
                </div>
                <div className="timer__dots">:</div>
                <div className="timer__part">
                  <div className="timer__part-value timer__part-value--seconds">{timeLeft.seconds}</div>
                  <div className="timer__part-title">Secs</div>
                </div>
              </div>
            </div>

            <div className="block-sale__controls">
              <Link href="/shop" className="block-sale__link" style={{ color: "#0081c9" }}>
                Touch To View All Deals →
              </Link>
            </div>
          </div>

          <div className="block-sale__body">
            <div
              className="block-sale__image"
              style={{ backgroundImage: "url('/images/banners/banner1.jpg')" }}
            />
            <div className="row" style={{ width: "100%", margin: 0 }}>
              {products.slice(0, 4).map((product) => (
                <div key={product._id} className="col-12 col-sm-6 col-lg-3 p-2">
                  <ProductCard product={product} layout="grid" badge="SALE -20%" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-lg" />

      {/* 5. Block Zone (Featured Category Card + Product Showcase) */}
      <div className="block block-zone">
        <div className="container">
          <div className="block-zone__body">
            {/* Left Category Card */}
            <div className="block-zone__card category-card category-card--layout--overlay">
              <div className="category-card__image">
                <img src="/images/categories/category-overlay-1.jpg" alt="Air Filtration" />
              </div>
              <div className="category-card__overlay" />
              <div className="category-card__content">
                <div className="category-card__title">
                  <Link href="/shop?category=Air%20Filters">Engine &amp; Cabin Filtration</Link>
                </div>
                <ul className="category-card__links">
                  <li>
                    <Link href="/shop?category=Air%20Filters">Primary RadialSeal Air</Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Air%20Filters">Secondary Inner Elements</Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Cabin%20Filters">Carbon Activated Cabin</Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Air%20Filters">Heavy-Duty Pre-Cleaners</Link>
                  </li>
                  <li>
                    <Link href="/shop?category=Air%20Filters">Industrial Gaskets &amp; Seals</Link>
                  </li>
                </ul>
                <div className="category-card__all">
                  <Link href="/shop?category=Air%20Filters">Shop All Intake Filters</Link>
                </div>
              </div>
            </div>

            {/* Right Widget Product Carousel with Tabs */}
            <div className="block-zone__widget">
              <div className="block-zone__widget-header">
                <div className="block-zone__tabs">
                  <button
                    type="button"
                    className={`block-zone__tabs-button ${zoneTab === "Featured" ? "block-zone__tabs-button--active" : ""}`}
                    onClick={() => setZoneTab("Featured")}
                  >
                    Featured
                  </button>
                  <button
                    type="button"
                    className={`block-zone__tabs-button ${zoneTab === "Bestsellers" ? "block-zone__tabs-button--active" : ""}`}
                    onClick={() => setZoneTab("Bestsellers")}
                  >
                    Bestsellers
                  </button>
                  <button
                    type="button"
                    className={`block-zone__tabs-button ${zoneTab === "Popular" ? "block-zone__tabs-button--active" : ""}`}
                    onClick={() => setZoneTab("Popular")}
                  >
                    Popular
                  </button>
                </div>
              </div>

              <div className="block-zone__widget-body">
                <div className="row">
                  {products.slice(0, 4).map((product) => (
                    <div key={product._id} className="col-12 col-sm-6 col-lg-3 mb-3">
                      <ProductCard product={product} layout="grid" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-sm" />

      {/* 6. Promotional Banners (2-Column) */}
      <div className="block-banners block">
        <div className="container">
          <div className="block-banners__list">
            <Link
              href="/shop?q=Fleet"
              className="block-banners__item block-banners__item--style--one"
            >
              <div
                className="block-banners__item-image"
                style={{ backgroundImage: "url('/images/banners/banner1.jpg')" }}
              />
              <div className="block-banners__item-title">Heavy Duty Fleet Packs</div>
              <div className="block-banners__item-details">
                Save up to 25% when buying filter case quantities for commercial fleets and repair shops.
              </div>
              <span className="block-banners__item-button btn btn-primary btn-sm" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
                Shop Fleet Cases
              </span>
            </Link>

            <Link
              href="/guides/oem-filter-cross-reference-guide"
              className="block-banners__item block-banners__item--style--two"
            >
              <div
                className="block-banners__item-image"
                style={{ backgroundImage: "url('/images/banners/banner2.jpg')" }}
              />
              <div className="block-banners__item-title">100% Guaranteed Fitment</div>
              <div className="block-banners__item-details">
                Engineered to meet or exceed OEM specifications for Volvo, Freightliner, Kenworth, and Cummins.
              </div>
              <span className="block-banners__item-button btn btn-primary btn-sm" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
                Cross Reference Tool
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 7. New Arrivals */}
      <div className="block block-products-carousel" data-layout="grid-5">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">New Arrivals</h2>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {products.slice(0, 5).map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2dot4 mb-4">
                <ProductCard product={product} layout="grid" badge="NEW" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 8. Latest News & Tech Guides */}
      <div className="block block-posts-carousel block-posts-carousel--layout--grid">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">Latest Technical Guides &amp; News</h2>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-4 mb-4">
                <div className="post-card post-card--layout--grid" style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 3, overflow: "hidden" }}>
                  <div className="post-card__image">
                    <Link href={`/guides/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: "100%", height: 210, objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                  <div className="post-card__info" style={{ padding: 20 }}>
                    <div className="post-card__category" style={{ fontSize: 11, fontWeight: 700, color: "#0081c9", textTransform: "uppercase", marginBottom: 6 }}>
                      Special Technical Report
                    </div>
                    <div className="post-card__name" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>
                      <Link href={`/guides/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {post.title}
                      </Link>
                    </div>
                    <div className="post-card__date" style={{ fontSize: 12, color: "#999" }}>
                      By {post.author} on {post.date} • {post.comments} Comments
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 9. Brand Logos Strip */}
      <div className="block block-brands block-brands--layout--columns-8-full">
        <div className="container">
          <div className="section-header mb-3">
            <div className="section-header__body">
              <h2 className="section-header__title" style={{ fontSize: 18 }}>Compatible Heavy Duty Brands</h2>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <ul className="block-brands__list">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
              <li key={i} className="block-brands__item">
                <Link href="/trucks" className="block-brands__item-link">
                  <img src={`/images/brands/brand-${i}.png`} alt={`Brand ${i}`} />
                </Link>
                <div className="block-brands__divider" role="presentation" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 10. Multi-Column Product Lists (4 Columns) */}
      <div className="block block-products-columns">
        <div className="container">
          <div className="row">
            {/* Column 1: Top Rated */}
            <div className="col-12 col-md-6 col-xl-3 mb-4 mb-xl-0">
              <div className="block-products-columns__title">Top Rated Filters</div>
              <div className="block-products-columns__list">
                {products.slice(0, 3).map((p) => (
                  <div key={p._id} className="block-products-columns__list-item mb-3">
                    <ProductCard product={p} layout="horizontal" />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Special Offers */}
            <div className="col-12 col-md-6 col-xl-3 mb-4 mb-xl-0">
              <div className="block-products-columns__title">Special Offers</div>
              <div className="block-products-columns__list">
                {products.slice(1, 4).map((p) => (
                  <div key={p._id} className="block-products-columns__list-item mb-3">
                    <ProductCard product={p} layout="horizontal" />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Bestsellers */}
            <div className="col-12 col-md-6 col-xl-3 mb-4 mb-md-0">
              <div className="block-products-columns__title">Bestsellers</div>
              <div className="block-products-columns__list">
                {products.slice(2, 5).map((p) => (
                  <div key={p._id} className="block-products-columns__list-item mb-3">
                    <ProductCard product={p} layout="horizontal" />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Recently Added */}
            <div className="col-12 col-md-6 col-xl-3">
              <div className="block-products-columns__title">Recently Added</div>
              <div className="block-products-columns__list">
                {products.slice(3, 6).map((p) => (
                  <div key={p._id} className="block-products-columns__list-item mb-3">
                    <ProductCard product={p} layout="horizontal" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--before-footer" />
    </>
  );
}
