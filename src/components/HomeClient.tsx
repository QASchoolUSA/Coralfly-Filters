"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
];

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

import {
  OilFilterIcon,
  AirFilterIcon,
  FuelFilterIcon,
  CabinFilterIcon,
  TruckIcon,
} from "@/components/CategoryIcons";

const FILTER_TYPE_DIRECTORIES = [
  {
    id: "oil-filters",
    title: "Oil Filters",
    badge: "Lube & Bypass",
    subtitle: "Heavy-duty full-flow spin-on and bypass lube cartridges",
    iconType: "oil" as const,
    categoryParam: "Oil Filters",
    options: [
      { label: "Oil Filter for Volvo", make: "Volvo" },
      { label: "Oil Filter for Freightliner", make: "Freightliner" },
      { label: "Oil Filter for Kenworth", make: "Kenworth" },
      { label: "Oil Filter for Peterbilt", make: "Peterbilt" },
      { label: "Oil Filter for Mack", make: "Mack" },
    ],
  },
  {
    id: "air-filters",
    title: "Air Filters",
    badge: "RadialSeal",
    subtitle: "High-airflow engine intake and secondary safety elements",
    iconType: "air" as const,
    categoryParam: "Air Filters",
    options: [
      { label: "Air Filter for Volvo", make: "Volvo" },
      { label: "Air Filter for Freightliner", make: "Freightliner" },
      { label: "Air Filter for Kenworth", make: "Kenworth" },
      { label: "Air Filter for Peterbilt", make: "Peterbilt" },
      { label: "Air Filter for Mack", make: "Mack" },
    ],
  },
  {
    id: "fuel-filters",
    title: "Fuel & Separators",
    badge: "Water Separation",
    subtitle: "Primary and secondary diesel fuel spin-ons with water bowls",
    iconType: "fuel" as const,
    categoryParam: "Fuel Filters",
    options: [
      { label: "Fuel Filter for Volvo", make: "Volvo" },
      { label: "Fuel Filter for Freightliner", make: "Freightliner" },
      { label: "Fuel Filter for Kenworth", make: "Kenworth" },
      { label: "Fuel Filter for Peterbilt", make: "Peterbilt" },
      { label: "Fuel Filter for Mack", make: "Mack" },
    ],
  },
  {
    id: "cabin-filters",
    title: "Cabin Air Filters",
    badge: "HVAC Clean Air",
    subtitle: "Multi-stage activated carbon sleeper-cab ventilation",
    iconType: "cabin" as const,
    categoryParam: "Cabin Filters",
    options: [
      { label: "Cabin Filter for Volvo", make: "Volvo" },
      { label: "Cabin Filter for Freightliner", make: "Freightliner" },
      { label: "Cabin Filter for Kenworth", make: "Kenworth" },
      { label: "Cabin Filter for Peterbilt", make: "Peterbilt" },
      { label: "Cabin Filter for Mack", make: "Mack" },
    ],
  },
];

const TRUCK_MAKE_DIRECTORIES = [
  {
    id: "volvo",
    title: "Volvo Trucks",
    tag: "VNL 760 · 860 · VNR",
    engine: "D13, D13TC, D11 Engines",
    makeParam: "Volvo",
    options: [
      { label: "Volvo Oil Filters", category: "Oil Filters" },
      { label: "Volvo Air Filters", category: "Air Filters" },
      { label: "Volvo Fuel Separators", category: "Fuel Filters" },
      { label: "Volvo Cabin Air Filters", category: "Cabin Filters" },
    ],
  },
  {
    id: "freightliner",
    title: "Freightliner",
    tag: "Cascadia · 114SD · 122SD",
    engine: "Detroit DD15, DD13, DD16",
    makeParam: "Freightliner",
    options: [
      { label: "Freightliner Oil Filters", category: "Oil Filters" },
      { label: "Freightliner Air Filters", category: "Air Filters" },
      { label: "Freightliner Fuel Separators", category: "Fuel Filters" },
      { label: "Freightliner Cabin Air Filters", category: "Cabin Filters" },
    ],
  },
  {
    id: "kenworth",
    title: "Kenworth",
    tag: "T680 · W900 · T880",
    engine: "PACCAR MX-13, Cummins X15",
    makeParam: "Kenworth",
    options: [
      { label: "Kenworth Oil Filters", category: "Oil Filters" },
      { label: "Kenworth Air Filters", category: "Air Filters" },
      { label: "Kenworth Fuel Separators", category: "Fuel Filters" },
      { label: "Kenworth Cabin Air Filters", category: "Cabin Filters" },
    ],
  },
  {
    id: "peterbilt",
    title: "Peterbilt",
    tag: "Model 579 · 389 · 567",
    engine: "PACCAR MX-13, Cummins X15",
    makeParam: "Peterbilt",
    options: [
      { label: "Peterbilt Oil Filters", category: "Oil Filters" },
      { label: "Peterbilt Air Filters", category: "Air Filters" },
      { label: "Peterbilt Fuel Separators", category: "Fuel Filters" },
      { label: "Peterbilt Cabin Air Filters", category: "Cabin Filters" },
    ],
  },
  {
    id: "mack",
    title: "Mack Trucks",
    tag: "Anthem · Pinnacle · Granite",
    engine: "Mack MP8, MP7 Engines",
    makeParam: "Mack",
    options: [
      { label: "Mack Oil Filters", category: "Oil Filters" },
      { label: "Mack Air Filters", category: "Air Filters" },
      { label: "Mack Fuel Separators", category: "Fuel Filters" },
      { label: "Mack Cabin Air Filters", category: "Cabin Filters" },
    ],
  },
];

function renderDirectoryIcon(type: "oil" | "air" | "fuel" | "cabin") {
  switch (type) {
    case "oil":
      return <OilFilterIcon size={26} />;
    case "air":
      return <AirFilterIcon size={26} />;
    case "fuel":
      return <FuelFilterIcon size={26} />;
    case "cabin":
      return <CabinFilterIcon size={26} />;
  }
}

export function HomeClient({
  products,
}: {
  products: Product[];
  featured?: Product[];
}) {
  const router = useRouter();
  const { selectVehicle } = useVehicleStore();

  // Finder form state (unselected by default)
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const makeObj = VEHICLE_DATA.find((m) => m.make === make);

  const handleMakeChange = (newMake: string) => {
    setMake(newMake);
    setModel("");
    setEngine("");
  };

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    setEngine("");
  };

  const isFinderComplete = Boolean(year && make && model && engine);

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFinderComplete) return;
    selectVehicle({ year, make, model, engine });
    router.push(`/shop?make=${encodeURIComponent(make)}&year=${encodeURIComponent(year)}`);
  };
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
                <option value="">Select Year</option>
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
                <option value="">Select Make</option>
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
                disabled={!make || !makeObj}
                onChange={(e) => handleModelChange(e.target.value)}
              >
                <option value="">{make ? "Select Model" : "Select Make First"}</option>
                {makeObj?.models.map((m) => (
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
                disabled={!model || !makeObj}
                onChange={(e) => setEngine(e.target.value)}
              >
                <option value="">{model ? "Select Engine" : "Select Model First"}</option>
                {makeObj?.engines.map((eng) => (
                  <option key={eng} value={eng}>
                    {eng}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="block-finder__form-control block-finder__form-control--button"
              type="submit"
              disabled={!isFinderComplete}
              style={{
                backgroundColor: isFinderComplete ? "#0081c9" : "#cbd5e1",
                borderColor: isFinderComplete ? "#0081c9" : "#cbd5e1",
                cursor: isFinderComplete ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
              }}
            >
              Search Filters
            </button>
          </form>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 2. Filters by Type Directory */}
      <div className="block block-directory">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <div>
                <h2 className="section-header__title">Filters by Type</h2>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                  Browse core filtration categories with direct fitment options for commercial truck makes
                </div>
              </div>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="home-directory-grid--4col">
            {FILTER_TYPE_DIRECTORIES.map((cat) => (
              <div key={cat.id} className="home-directory-card">
                <div className="home-directory-card__header">
                  <div className="home-directory-card__icon">
                    {renderDirectoryIcon(cat.iconType)}
                  </div>
                  <div className="home-directory-card__header-content">
                    <div className="home-directory-card__title-row">
                      <h3 className="home-directory-card__title">{cat.title}</h3>
                      <span className="home-directory-card__badge">{cat.badge}</span>
                    </div>
                    <p className="home-directory-card__subtitle">{cat.subtitle}</p>
                  </div>
                </div>

                <ul className="home-directory-card__options">
                  {cat.options.map((opt) => (
                    <li key={opt.make} className="home-directory-card__option-item">
                      <Link
                        href={`/shop?category=${encodeURIComponent(cat.categoryParam)}&make=${encodeURIComponent(opt.make)}`}
                        className="home-directory-card__option-link"
                      >
                        <span className="home-directory-card__option-text">
                          <span className="home-directory-card__option-bullet" />
                          {opt.label}
                        </span>
                        <span className="home-directory-card__option-arrow">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="home-directory-card__footer">
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.categoryParam)}`}
                    className="home-directory-card__cta"
                  >
                    <span>Browse All {cat.title}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 3. Filters by Truck Make Directory */}
      <div className="block block-directory">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <div>
                <h2 className="section-header__title">Filters by Truck Make</h2>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                  Select your power unit brand to access verified oil, air, fuel & cabin filtration
                </div>
              </div>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="home-directory-grid--5col">
            {TRUCK_MAKE_DIRECTORIES.map((maker) => (
              <div key={maker.id} className="home-directory-card">
                <div className="home-directory-card__header">
                  <div className="home-directory-card__icon">
                    <TruckIcon size={26} />
                  </div>
                  <div className="home-directory-card__header-content">
                    <div className="home-directory-card__title-row">
                      <h3 className="home-directory-card__title">{maker.title}</h3>
                    </div>
                    <span className="home-directory-card__badge" style={{ display: "inline-block", marginTop: 2 }}>
                      {maker.tag}
                    </span>
                    <p className="home-directory-card__subtitle" style={{ marginTop: 4 }}>
                      {maker.engine}
                    </p>
                  </div>
                </div>

                <ul className="home-directory-card__options">
                  {maker.options.map((opt) => (
                    <li key={opt.category} className="home-directory-card__option-item">
                      <Link
                        href={`/shop?category=${encodeURIComponent(opt.category)}&make=${encodeURIComponent(maker.makeParam)}`}
                        className="home-directory-card__option-link"
                      >
                        <span className="home-directory-card__option-text">
                          <span className="home-directory-card__option-bullet" />
                          {opt.label}
                        </span>
                        <span className="home-directory-card__option-arrow">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="home-directory-card__footer">
                  <Link
                    href={`/shop?make=${encodeURIComponent(maker.makeParam)}`}
                    className="home-directory-card__cta"
                  >
                    <span>Shop All {maker.makeParam} Filters</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 4. Promotional Banners (2-Column) */}
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

      {/* 5. New Arrivals */}
      <div className="block block-products-carousel" data-layout="grid-4">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">New Arrivals</h2>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {products.slice(0, 4).map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
                <ProductCard product={product} layout="grid" badge="NEW" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="block-space block-space--layout--divider-nl" />

      {/* 6. Latest News & Tech Guides */}
      <div className="block block-posts-carousel block-posts-carousel--layout--grid">
        <div className="container">
          <div className="section-header">
            <div className="section-header__body">
              <h2 className="section-header__title">Latest Technical Guides & News</h2>
              <div className="section-header__spring" />
              <div className="section-header__divider" />
            </div>
          </div>

          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-4 mb-4">
                <div className="post-card post-card--layout--grid" style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 3, overflow: "hidden" }}>
                  <div className="post-card__image" style={{ position: "relative", width: "100%", height: 210 }}>
                    <Link href={`/guides/${post.slug}`} style={{ display: "block", position: "relative", width: "100%", height: "100%" }}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
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

      <div className="block-space block-space--layout--before-footer" />
    </>
  );
}
