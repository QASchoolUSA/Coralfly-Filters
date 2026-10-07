import type { Product } from "./types";

export const fixtureProducts: Product[] = [
  {
    _id: "fixture-oil-filter-pro",
    name: "Oil Filter Pro OF-220",
    slug: "oil-filter-pro-of-220",
    description:
      "High-efficiency oil filtration for commercial and light industrial engines. Multi-layer media traps fine particulates while maintaining steady flow under load.",
    price: 24.99,
    currency: "usd",
    sku: "CF-OF-220",
    category: "Oil Filters",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
        alt: "Oil filter on workshop bench",
      },
    ],
    specs: [
      { label: "Filtration", value: "15 micron" },
      { label: "Thread", value: "M20 × 1.5" },
      { label: "Bypass", value: "Yes" },
    ],
  },
  {
    _id: "fixture-air-filter-max",
    name: "Air Filter Max AF-410",
    slug: "air-filter-max-af-410",
    description:
      "Panel air filter engineered for dusty environments. Rigid frame and sealed gasket keep unfiltered air out of the intake path.",
    price: 32.5,
    currency: "usd",
    sku: "CF-AF-410",
    category: "Air Filters",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
        alt: "Automotive air filter",
      },
    ],
    specs: [
      { label: "Media", value: "Pleated cellulose" },
      { label: "Efficiency", value: "99.5%" },
      { label: "Service life", value: "12 months / 15k mi" },
    ],
  },
  {
    _id: "fixture-fuel-filter-hd",
    name: "Fuel Filter HD FF-90",
    slug: "fuel-filter-hd-ff-90",
    description:
      "Heavy-duty fuel filter with water separation for diesel systems. Protects injectors from contamination and moisture.",
    price: 41.0,
    currency: "usd",
    sku: "CF-FF-90",
    category: "Fuel Filters",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
        alt: "Fuel system components",
      },
    ],
    specs: [
      { label: "Type", value: "Spin-on" },
      { label: "Water drain", value: "Included" },
      { label: "Max pressure", value: "7 bar" },
    ],
  },
  {
    _id: "fixture-cabin-filter",
    name: "Cabin Filter CF-55",
    slug: "cabin-filter-cf-55",
    description:
      "Activated-carbon cabin filter that reduces odors, pollen, and fine dust for cleaner in-cabin air.",
    price: 18.75,
    currency: "usd",
    sku: "CF-CF-55",
    category: "Cabin Filters",
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        alt: "Cabin air filter",
      },
    ],
    specs: [
      { label: "Layers", value: "3-stage + carbon" },
      { label: "Fitment", value: "Universal panel" },
    ],
  },
  {
    _id: "fixture-hydraulic-filter",
    name: "Hydraulic Filter HY-300",
    slug: "hydraulic-filter-hy-300",
    description:
      "Industrial hydraulic return-line filter for construction and agricultural equipment. Built for continuous duty cycles.",
    price: 67.0,
    currency: "usd",
    sku: "CF-HY-300",
    category: "Hydraulic Filters",
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
        alt: "Industrial hydraulic equipment",
      },
    ],
    specs: [
      { label: "Beta rating", value: "β10 ≥ 200" },
      { label: "Flow", value: "Up to 120 L/min" },
      { label: "Housing", value: "Steel cartridge" },
    ],
  },
  {
    _id: "fixture-coolant-filter",
    name: "Coolant Filter CL-18",
    slug: "coolant-filter-cl-18",
    description:
      "Coolant filtration cartridge that extends system life by capturing scale and corrosion byproducts.",
    price: 29.95,
    currency: "usd",
    sku: "CF-CL-18",
    category: "Coolant Filters",
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
        alt: "Engine bay cooling system",
      },
    ],
    specs: [
      { label: "Capacity", value: "Standard spin-on" },
      { label: "Additive", value: "Compatible" },
    ],
  },
];
