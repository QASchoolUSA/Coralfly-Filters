import type { Product } from "./types";

export const fixtureProducts: Product[] = [
  {
    _id: "fixture-oil-filter-pro",
    name: "Oil Filter Pro OF-220",
    slug: "oil-filter-pro-of-220",
    description:
      "High-efficiency oil filtration for commercial and heavy duty engines. Multi-layer synthetic blend traps fine particulates while maintaining steady lubrication flow under load.",
    price: 24.99,
    currency: "usd",
    sku: "CF-OF-220",
    category: "Oil Filters",
    compatibleMakes: ["Freightliner", "Kenworth", "Peterbilt", "Volvo"],
    featured: true,
    inStock: true,
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
      "Heavy duty radial air filter engineered for dusty environments and long haul commercial routes. Rigid frame and sealed gasket keep unfiltered air out of the intake path.",
    price: 32.5,
    currency: "usd",
    sku: "CF-AF-410",
    category: "Air Filters",
    compatibleMakes: ["Freightliner", "Kenworth", "Volvo"],
    featured: true,
    inStock: true,
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
      "Heavy-duty fuel filter with water separation for commercial diesel systems. Protects common-rail injectors from moisture and fine contamination.",
    price: 41.0,
    currency: "usd",
    sku: "CF-FF-90",
    category: "Fuel Filters",
    compatibleMakes: ["Freightliner", "Peterbilt", "Mack"],
    featured: true,
    inStock: true,
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
      "Activated-carbon commercial cab air filter that reduces diesel exhaust fumes, pollen, and roadway dust for cleaner sleeper-cab air.",
    price: 18.75,
    currency: "usd",
    sku: "CF-CF-55",
    category: "Cabin Filters",
    compatibleMakes: ["Freightliner", "Kenworth", "Peterbilt", "Volvo"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        alt: "Cabin air filter",
      },
    ],
    specs: [
      { label: "Layers", value: "3-stage + carbon" },
      { label: "Fitment", value: "Commercial HVAC" },
    ],
  },
  {
    _id: "fixture-coolant-filter",
    name: "Coolant Filter CL-18",
    slug: "coolant-filter-cl-18",
    description:
      "Heavy duty spin-on coolant filtration cartridge with chemical inhibitor release to prevent liner pitting, scale, and corrosion.",
    price: 29.95,
    currency: "usd",
    sku: "CF-CL-18",
    category: "Coolant Filters",
    compatibleMakes: ["Freightliner", "Kenworth", "Volvo", "Mack"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
        alt: "Engine bay cooling system",
      },
    ],
    specs: [
      { label: "Capacity", value: "Standard spin-on" },
      { label: "Additive", value: "SCA slow-release" },
    ],
  },
  {
    _id: "fixture-air-cascadia-620",
    name: "Freightliner Cascadia Air Cleaner AF-620",
    slug: "freightliner-cascadia-air-cleaner-af-620",
    description:
      "Direct OEM-replacement primary radial air element designed specifically for Freightliner Cascadia Detroit DD13 and DD15 platforms.",
    price: 48.5,
    currency: "usd",
    sku: "CF-AF-620",
    category: "Air Filters",
    compatibleMakes: ["Freightliner"],
    featured: true,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
        alt: "Freightliner air cleaner element",
      },
    ],
    specs: [
      { label: "Fitment", value: "Freightliner Cascadia 2010-2024" },
      { label: "Engine", value: "Detroit DD13 / DD15" },
      { label: "Type", value: "Primary RadialSeal" },
    ],
  },
  {
    _id: "fixture-air-kenworth-710",
    name: "Kenworth T680 Heavy Air Element AF-710",
    slug: "kenworth-t680-heavy-air-element-af-710",
    description:
      "High-capacity primary intake air element for Kenworth T680, T800, and W900 trucks powered by PACCAR MX-13 or Cummins X15 engines.",
    price: 52.0,
    currency: "usd",
    sku: "CF-AF-710",
    category: "Air Filters",
    compatibleMakes: ["Kenworth", "Peterbilt"],
    featured: true,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
        alt: "Kenworth air filter element",
      },
    ],
    specs: [
      { label: "Fitment", value: "Kenworth T680 / Peterbilt 579" },
      { label: "Engine", value: "PACCAR MX-13 / Cummins X15" },
      { label: "Efficiency", value: "99.9% at SAE J726" },
    ],
  },
  {
    _id: "fixture-air-volvo-950",
    name: "Volvo VNL High-Airflow Filter AF-950",
    slug: "volvo-vnl-high-airflow-filter-af-950",
    description:
      "OEM precision fit air filter for Volvo VNL and Mack Anthem trucks with Volvo D11, D13, or MP8 engines. Built to handle severe cross-country hauls.",
    price: 56.0,
    currency: "usd",
    sku: "CF-AF-950",
    category: "Air Filters",
    compatibleMakes: ["Volvo", "Mack"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
        alt: "Volvo VNL air intake filter",
      },
    ],
    specs: [
      { label: "Fitment", value: "Volvo VNL / Mack Anthem" },
      { label: "Engine", value: "Volvo D13 / Mack MP8" },
      { label: "Seal", value: "Molded polyurethane" },
    ],
  },
  {
    _id: "fixture-oil-detroit-310",
    name: "Detroit DD15 Synthetic Lube Filter OF-310",
    slug: "detroit-dd15-synthetic-lube-filter-of-310",
    description:
      "Full-flow commercial oil filter cartridge for Detroit Diesel DD13, DD15, and DD16 engines installed in Freightliner and Western Star rigs.",
    price: 34.0,
    currency: "usd",
    sku: "CF-OF-310",
    category: "Oil Filters",
    compatibleMakes: ["Freightliner"],
    featured: true,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
        alt: "Detroit oil filter cartridge",
      },
    ],
    specs: [
      { label: "Engine", value: "Detroit DD13 / DD15 / DD16" },
      { label: "Interchange", value: "A4711800209 / LF17511" },
      { label: "Media", value: "Microglass Synthetic" },
    ],
  },
  {
    _id: "fixture-oil-cummins-440",
    name: "Cummins X15 Spin-On Lube Filter OF-440",
    slug: "cummins-x15-spin-on-lube-filter-of-440",
    description:
      "Heavy-duty spin-on lube filter for Cummins X15, ISX15, and QSX engines on Kenworth and Peterbilt fleet trucks. Meets extended 50k mile drain specs.",
    price: 38.5,
    currency: "usd",
    sku: "CF-OF-440",
    category: "Oil Filters",
    compatibleMakes: ["Kenworth", "Peterbilt"],
    featured: true,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
        alt: "Cummins spin on oil filter",
      },
    ],
    specs: [
      { label: "Engine", value: "Cummins X15 / ISX15" },
      { label: "Thread", value: "2 1/4 - 12 UN" },
      { label: "Interchange", value: "LF14000NN / BD7154" },
    ],
  },
  {
    _id: "fixture-oil-volvo-580",
    name: "Volvo D13 Twin Lube Filter Set OF-580",
    slug: "volvo-d13-twin-lube-filter-set-of-580",
    description:
      "Matched primary full-flow and secondary by-pass oil filter kit for Volvo D11, D13, and Mack MP7, MP8 commercial engines.",
    price: 49.95,
    currency: "usd",
    sku: "CF-OF-580",
    category: "Oil Filters",
    compatibleMakes: ["Volvo", "Mack"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
        alt: "Volvo lube filter kit",
      },
    ],
    specs: [
      { label: "Engine", value: "Volvo D11 / D13 / Mack MP8" },
      { label: "Interchange", value: "21707133 / LF667 / LF3654" },
      { label: "Gasket", value: "Included Viton" },
    ],
  },
  {
    _id: "fixture-fuel-cascadia-1976",
    name: "Freightliner Cascadia Fuel Separator FS-1976",
    slug: "freightliner-cascadia-fuel-separator-fs-1976",
    description:
      "Detroit Diesel DD13/DD15 primary fuel water separator element with self-venting drain and high-efficiency water-stripping synthetic media.",
    price: 44.5,
    currency: "usd",
    sku: "CF-FS-1976",
    category: "Fuel Filters",
    compatibleMakes: ["Freightliner"],
    featured: true,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
        alt: "Freightliner fuel separator",
      },
    ],
    specs: [
      { label: "Efficiency", value: "98% free water separation" },
      { label: "Engine", value: "Detroit DD13 / DD15" },
      { label: "Interchange", value: "A4720900451 / FS19764" },
    ],
  },
  {
    _id: "fixture-fuel-paccar-2020",
    name: "PACCAR MX Fuel Element Kit FS-2020",
    slug: "paccar-mx-fuel-element-kit-fs-2020",
    description:
      "Dual primary and secondary fuel filter cartridge set for PACCAR MX-11 and MX-13 engines powering Kenworth and Peterbilt aerodynamic tractors.",
    price: 54.0,
    currency: "usd",
    sku: "CF-FS-2020",
    category: "Fuel Filters",
    compatibleMakes: ["Kenworth", "Peterbilt"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
        alt: "PACCAR fuel filter kit",
      },
    ],
    specs: [
      { label: "Engine", value: "PACCAR MX-11 / MX-13" },
      { label: "Includes", value: "Primary + Secondary + O-rings" },
      { label: "Interchange", value: "1948408 / FS20203" },
    ],
  },
  {
    _id: "fixture-fuel-volvo-340",
    name: "Volvo D13 Fuel Filtration Kit FF-340",
    slug: "volvo-d13-fuel-filtration-kit-ff-340",
    description:
      "OEM-spec fuel and water separator set for Volvo VNL and Mack commercial tractors. Prevents injector tip erosion under severe high-pressure common rail operation.",
    price: 46.0,
    currency: "usd",
    sku: "CF-FF-340",
    category: "Fuel Filters",
    compatibleMakes: ["Volvo", "Mack"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
        alt: "Volvo fuel filter kit",
      },
    ],
    specs: [
      { label: "Engine", value: "Volvo D13 / Mack MP8" },
      { label: "Interchange", value: "20976003 / 21764936" },
      { label: "Micron", value: "5 Micron Absolute" },
    ],
  },
  {
    _id: "fixture-cabin-cascadia-110",
    name: "Freightliner Cascadia HVAC Cabin Filter CF-110",
    slug: "freightliner-cascadia-hvac-cabin-filter-cf-110",
    description:
      "Direct drop-in cabin fresh air and recirculation filter pair for 2008-2024 Freightliner Cascadia trucks. Multi-layer electrostatic media.",
    price: 22.0,
    currency: "usd",
    sku: "CF-CF-110",
    category: "Cabin Filters",
    compatibleMakes: ["Freightliner"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        alt: "Cascadia cabin filter",
      },
    ],
    specs: [
      { label: "Fitment", value: "Freightliner Cascadia" },
      { label: "Interchange", value: "ABP N10G 91559 / PA4681" },
      { label: "Media", value: "Electrostatic Synthetic" },
    ],
  },
  {
    _id: "fixture-cabin-paccar-220",
    name: "Kenworth / Peterbilt Cab Air Filter CF-220",
    slug: "kenworth-peterbilt-cab-air-filter-cf-220",
    description:
      "Commercial cab fresh-air filter element for Kenworth T680, T880 and Peterbilt 579, 567 sleep cabs. Traps highway brake dust and pollen.",
    price: 24.5,
    currency: "usd",
    sku: "CF-CF-220",
    category: "Cabin Filters",
    compatibleMakes: ["Kenworth", "Peterbilt"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        alt: "Kenworth cab air filter",
      },
    ],
    specs: [
      { label: "Fitment", value: "Kenworth T680 / Peterbilt 579" },
      { label: "Interchange", value: "X1987001 / AF27688" },
      { label: "Type", value: "Pleated Activated Carbon" },
    ],
  },
  {
    _id: "fixture-cabin-volvo-330",
    name: "Volvo VNL Sleeper Cabin Filter CF-330",
    slug: "volvo-vnl-sleeper-cabin-filter-cf-330",
    description:
      "Activated-charcoal cabin air filter designed for Volvo VNL 760, 860, and VNX trucks. Eliminates exterior odor and keeps interior air fresh.",
    price: 26.0,
    currency: "usd",
    sku: "CF-CF-330",
    category: "Cabin Filters",
    compatibleMakes: ["Volvo"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        alt: "Volvo sleeper cabin filter",
      },
    ],
    specs: [
      { label: "Fitment", value: "Volvo VNL / VNX / VNR" },
      { label: "Interchange", value: "82348995 / AF26405" },
      { label: "Media", value: "Activated Carbon" },
    ],
  },
  {
    _id: "fixture-coolant-fleet-88",
    name: "Extended Drain SCA Coolant Filter CL-88",
    slug: "extended-drain-sca-coolant-filter-cl-88",
    description:
      "16-Unit supplemental coolant additive release filter for Class 8 commercial diesel engines. Prevents cylinder liner cavitation and radiator clogging.",
    price: 36.0,
    currency: "usd",
    sku: "CF-CL-88",
    category: "Coolant Filters",
    compatibleMakes: ["Freightliner", "Kenworth", "Peterbilt", "Volvo"],
    featured: false,
    inStock: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
        alt: "Extended drain coolant filter",
      },
    ],
    specs: [
      { label: "Additive", value: "16 Units Slow Release SCA" },
      { label: "Thread", value: "11/16 - 16 UN" },
      { label: "Interchange", value: "WF2075 / PR3383" },
    ],
  },
];
