"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { useVehicleStore, isAllowedMake } from "@/lib/vehicle-store";
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

type BrowseLink = {
  label: string;
  href: string;
};

type BrowseColumn = {
  title: string;
  links: BrowseLink[];
};

type BrowseTab = {
  id: string;
  title: string;
  subtitle: string;
  iconType: "oil" | "air" | "fuel" | "cabin" | "truck";
  headerTitle: string;
  headerDescription: string;
  primaryHref: string;
  primaryCta: string;
  columns: BrowseColumn[];
};

const BROWSE_FILTER_TYPES: BrowseTab[] = [
  {
    id: "oil",
    title: "Oil Filters",
    subtitle: "Lube, By-Pass, Cartridge",
    iconType: "oil",
    headerTitle: "Commercial Truck Oil & Lube Filtration",
    headerDescription: "Heavy-duty full-flow, bypass, and cartridge oil filtration built to exceed OEM engine specifications.",
    primaryHref: "/shop?category=Oil%20Filters",
    primaryCta: "View All Oil Filters",
    columns: [
      {
        title: "Filter Types & Styles",
        links: [
          { label: "Full-Flow Spin-On Oil Filters", href: "/shop?category=Oil%20Filters" },
          { label: "By-Pass Lube Filters", href: "/shop?category=Oil%20Filters" },
          { label: "Cartridge & Eco Element Filters", href: "/shop?category=Oil%20Filters" },
          { label: "Synthetic Blend Fleet Filters", href: "/shop?category=Oil%20Filters" },
          { label: "Dual Lube Filter Service Kits", href: "/shop?category=Oil%20Filters" },
        ],
      },
      {
        title: "OEM Cross Reference",
        links: [
          { label: "Donaldson P559000 Equivalents", href: "/shop?category=Oil%20Filters" },
          { label: "Fleetguard LF14000NN / LF9009", href: "/shop?category=Oil%20Filters" },
          { label: "Baldwin BD7154 Equivalents", href: "/shop?category=Oil%20Filters" },
          { label: "Wix HD Commercial Filters", href: "/shop?category=Oil%20Filters" },
          { label: "Direct OEM Fit Replacements", href: "/shop?category=Oil%20Filters" },
        ],
      },
      {
        title: "Engine Compatibility",
        links: [
          { label: "Detroit DD13 / DD15 / DD16", href: "/shop?category=Oil%20Filters&make=Freightliner" },
          { label: "Cummins X15 & ISX15 Engines", href: "/shop?category=Oil%20Filters" },
          { label: "PACCAR MX-11 & MX-13", href: "/shop?category=Oil%20Filters&make=Kenworth" },
          { label: "Volvo D11 / D13 & Mack MP8", href: "/shop?category=Oil%20Filters&make=Volvo" },
          { label: "Caterpillar C15 & 3406E", href: "/shop?category=Oil%20Filters" },
        ],
      },
    ],
  },
  {
    id: "air",
    title: "Air Filters",
    subtitle: "RadialSeal, Intake, Safety",
    iconType: "air",
    headerTitle: "Heavy-Duty Air Filtration & Intake",
    headerDescription: "High-airflow engine intake and 99.9% dust filtration for extreme highway and vocational hauling.",
    primaryHref: "/shop?category=Air%20Filters",
    primaryCta: "View All Air Filters",
    columns: [
      {
        title: "Filter Styles",
        links: [
          { label: "Primary RadialSeal Air Filters", href: "/shop?category=Air%20Filters" },
          { label: "Secondary Inner Safety Filters", href: "/shop?category=Air%20Filters" },
          { label: "High-Flow Engine Intake Elements", href: "/shop?category=Air%20Filters" },
          { label: "Cylindrical Heavy Duty Elements", href: "/shop?category=Air%20Filters" },
          { label: "Complete Air Filter Service Sets", href: "/shop?category=Air%20Filters" },
        ],
      },
      {
        title: "Top Truck Fitment",
        links: [
          { label: "Freightliner Cascadia Air Filters", href: "/shop?category=Air%20Filters&make=Freightliner" },
          { label: "Kenworth T680 & W900 Intake", href: "/shop?category=Air%20Filters&make=Kenworth" },
          { label: "Peterbilt 579 & 389 Air Filters", href: "/shop?category=Air%20Filters&make=Peterbilt" },
          { label: "Volvo VNL 760 / 860 Air Filters", href: "/shop?category=Air%20Filters&make=Volvo" },
          { label: "Mack Anthem & Granite Air Filters", href: "/shop?category=Air%20Filters&make=Mack" },
        ],
      },
      {
        title: "Cross Reference Brands",
        links: [
          { label: "Donaldson Blue & RadialSeal Cross", href: "/shop?category=Air%20Filters" },
          { label: "Fleetguard AF26154 / AF25667", href: "/shop?category=Air%20Filters" },
          { label: "Baldwin PA4999 & RS3544 Series", href: "/shop?category=Air%20Filters" },
          { label: "Luber-finer LAF Replacements", href: "/shop?category=Air%20Filters" },
          { label: "Vocational High Dust Elements", href: "/shop?category=Air%20Filters" },
        ],
      },
    ],
  },
  {
    id: "fuel",
    title: "Fuel & Water Separators",
    subtitle: "Primary, Secondary, Clear Bowls",
    iconType: "fuel",
    headerTitle: "Fuel Filters & Water Separators",
    headerDescription: "Critical diesel fuel injection protection removing emulsified water, rust, and particulate matter.",
    primaryHref: "/shop?category=Fuel%20Filters",
    primaryCta: "View All Fuel & Water Separators",
    columns: [
      {
        title: "Separation Systems",
        links: [
          { label: "Primary Fuel / Water Separators", href: "/shop?category=Fuel%20Filters" },
          { label: "Secondary High-Efficiency Fuel Filters", href: "/shop?category=Fuel%20Filters" },
          { label: "Clear Water Collection Bowls", href: "/shop?category=Fuel%20Filters" },
          { label: "WIF Water-In-Fuel Sensor Fitment", href: "/shop?category=Fuel%20Filters" },
          { label: "Davco Fuel Pro Compatible Filters", href: "/shop?category=Fuel%20Filters" },
        ],
      },
      {
        title: "Truck & Engine Applications",
        links: [
          { label: "Detroit DD15 Fuel Filter Module", href: "/shop?category=Fuel%20Filters&make=Freightliner" },
          { label: "Cummins X15 NanoNet Replacements", href: "/shop?category=Fuel%20Filters" },
          { label: "PACCAR MX-13 Fuel Separators", href: "/shop?category=Fuel%20Filters&make=Kenworth" },
          { label: "Volvo D13 & Mack MP8 Separators", href: "/shop?category=Fuel%20Filters&make=Volvo" },
          { label: "Peterbilt 579 / 389 Fuel Elements", href: "/shop?category=Fuel%20Filters&make=Peterbilt" },
        ],
      },
      {
        title: "OEM Equivalent Codes",
        links: [
          { label: "Fleetguard FS19764 / FS19765", href: "/shop?category=Fuel%20Filters" },
          { label: "Donaldson DBF5810 & P551000", href: "/shop?category=Fuel%20Filters" },
          { label: "Baldwin BF1259 / BF1383-O Cross", href: "/shop?category=Fuel%20Filters" },
          { label: "Racor 2020 & 2040 Turbine Series", href: "/shop?category=Fuel%20Filters" },
          { label: "10-Micron & 2-Micron Final Filters", href: "/shop?category=Fuel%20Filters" },
        ],
      },
    ],
  },
  {
    id: "cabin",
    title: "Cabin Air Filters",
    subtitle: "Carbon Activated, Cab HVAC",
    iconType: "cabin",
    headerTitle: "Heavy-Duty Cabin & Sleeper Air Filters",
    headerDescription: "Clean, fresh air for driver health and comfort, blocking diesel soot, pollen, allergens, and road dust.",
    primaryHref: "/shop?category=Cabin%20Filters",
    primaryCta: "View All Cabin Filters",
    columns: [
      {
        title: "Filter Media Options",
        links: [
          { label: "Activated Carbon Odor Defense", href: "/shop?category=Cabin%20Filters" },
          { label: "High-Efficiency Particulate Air", href: "/shop?category=Cabin%20Filters" },
          { label: "Main Cab HVAC Fresh Air Intake", href: "/shop?category=Cabin%20Filters" },
          { label: "Sleeper Berth Recirculation Filters", href: "/shop?category=Cabin%20Filters" },
          { label: "Dual Cab & Sleeper Combo Packs", href: "/shop?category=Cabin%20Filters" },
        ],
      },
      {
        title: "Truck Fitment",
        links: [
          { label: "Freightliner Cascadia Cab & Sleeper", href: "/shop?category=Cabin%20Filters&make=Freightliner" },
          { label: "Kenworth T680 & W900 HVAC Filters", href: "/shop?category=Cabin%20Filters&make=Kenworth" },
          { label: "Peterbilt 579 & 389 Cab Elements", href: "/shop?category=Cabin%20Filters&make=Peterbilt" },
          { label: "Volvo VNL 760 / 860 Cabin Sets", href: "/shop?category=Cabin%20Filters&make=Volvo" },
          { label: "Mack Anthem & Pinnacle Cab Air", href: "/shop?category=Cabin%20Filters&make=Mack" },
        ],
      },
      {
        title: "Specifications & Assurances",
        links: [
          { label: "Blocks 99.5% of Road Diesel Soot", href: "/shop?category=Cabin%20Filters" },
          { label: "Direct Snap-In 5-Minute Install", href: "/shop?category=Cabin%20Filters" },
          { label: "Prevents Cab AC Evaporator Clog", href: "/shop?category=Cabin%20Filters" },
          { label: "Baldwin PA4681 / Donaldson Cross", href: "/shop?category=Cabin%20Filters" },
          { label: "Fleet Volume Pricing Available", href: "/shop?category=Cabin%20Filters" },
        ],
      },
    ],
  },
];

const BROWSE_FILTER_MAKERS: BrowseTab[] = [
  {
    id: "volvo",
    title: "Volvo Trucks",
    subtitle: "VNL 760, 860, D11/D13/D16",
    iconType: "truck",
    headerTitle: "Volvo Commercial Truck Filters",
    headerDescription: "Factory-precision filters engineered specifically for Volvo VNL, VNR, VNX, and D11/D13/D16 engines.",
    primaryHref: "/shop?make=Volvo",
    primaryCta: "View All Volvo Filters",
    columns: [
      {
        title: "Volvo Truck Models",
        links: [
          { label: "Volvo VNL 760 Long Haul", href: "/shop?make=Volvo" },
          { label: "Volvo VNL 860 Flagship Sleeper", href: "/shop?make=Volvo" },
          { label: "Volvo VNR Regional Haul", href: "/shop?make=Volvo" },
          { label: "Volvo VNX Heavy Haul / Severe", href: "/shop?make=Volvo" },
          { label: "Volvo VHD Vocational / Dump", href: "/shop?make=Volvo" },
        ],
      },
      {
        title: "Volvo Filter Categories",
        links: [
          { label: "Volvo Engine Oil & Bypass Filters", href: "/shop?category=Oil%20Filters&make=Volvo" },
          { label: "Volvo Fuel & Water Separators", href: "/shop?category=Fuel%20Filters&make=Volvo" },
          { label: "Volvo RadialSeal Air Filters", href: "/shop?category=Air%20Filters&make=Volvo" },
          { label: "Volvo Cab & Sleeper HVAC Filters", href: "/shop?category=Cabin%20Filters&make=Volvo" },
          { label: "Complete Volvo 4-Filter PM Kits", href: "/shop?make=Volvo" },
        ],
      },
      {
        title: "Engine Fitment & Specs",
        links: [
          { label: "Volvo D13 Turbo Compound Engines", href: "/shop?make=Volvo" },
          { label: "Volvo D11 11-Liter Fleet Power", href: "/shop?make=Volvo" },
          { label: "Volvo D16 Heavy Hauler Engines", href: "/shop?make=Volvo" },
          { label: "Replaces OEM 21707134, 21707132", href: "/shop?make=Volvo" },
          { label: "100% Guaranteed Bolt-On Fitment", href: "/shop?make=Volvo" },
        ],
      },
    ],
  },
  {
    id: "kenworth",
    title: "Kenworth",
    subtitle: "T680, W900, PACCAR MX-13",
    iconType: "truck",
    headerTitle: "Kenworth Commercial Truck Filters",
    headerDescription: "Heavy-duty filtration engineered for Kenworth T680, W900, T880, and PACCAR / Cummins powerplants.",
    primaryHref: "/shop?make=Kenworth",
    primaryCta: "View All Kenworth Filters",
    columns: [
      {
        title: "Kenworth Truck Models",
        links: [
          { label: "Kenworth T680 & T680 Next Gen", href: "/shop?make=Kenworth" },
          { label: "Kenworth W900 & W900L Classic", href: "/shop?make=Kenworth" },
          { label: "Kenworth T880 Vocational Workhorse", href: "/shop?make=Kenworth" },
          { label: "Kenworth T800 Severe Duty", href: "/shop?make=Kenworth" },
          { label: "Kenworth W990 Modern Long Hood", href: "/shop?make=Kenworth" },
        ],
      },
      {
        title: "Kenworth Filter Categories",
        links: [
          { label: "Kenworth PACCAR MX Lube Filters", href: "/shop?category=Oil%20Filters&make=Kenworth" },
          { label: "Kenworth Fuel & Water Separators", href: "/shop?category=Fuel%20Filters&make=Kenworth" },
          { label: "Kenworth RadialSeal Air Filters", href: "/shop?category=Air%20Filters&make=Kenworth" },
          { label: "Kenworth Cab & Sleeper HVAC Elements", href: "/shop?category=Cabin%20Filters&make=Kenworth" },
          { label: "Complete Kenworth PM Service Kits", href: "/shop?make=Kenworth" },
        ],
      },
      {
        title: "Engine Fitment & Specs",
        links: [
          { label: "PACCAR MX-13 12.9-Liter Engines", href: "/shop?make=Kenworth" },
          { label: "PACCAR MX-11 Fleet Powerplants", href: "/shop?make=Kenworth" },
          { label: "Cummins X15 Performance Series", href: "/shop?make=Kenworth" },
          { label: "Replaces PACCAR 1948921PE, 2115995PE", href: "/shop?make=Kenworth" },
          { label: "Heavy-Duty Donaldson Cross", href: "/shop?make=Kenworth" },
        ],
      },
    ],
  },
  {
    id: "freightliner",
    title: "Freightliner",
    subtitle: "Cascadia, Detroit DD15/DD13",
    iconType: "truck",
    headerTitle: "Freightliner Commercial Truck Filters",
    headerDescription: "High-mileage filtration for Freightliner Cascadia, Coronado, M2 106, and Detroit Diesel engines.",
    primaryHref: "/shop?make=Freightliner",
    primaryCta: "View All Freightliner Filters",
    columns: [
      {
        title: "Freightliner Models",
        links: [
          { label: "Freightliner Cascadia 126 & 116", href: "/shop?make=Freightliner" },
          { label: "Freightliner Classic Cascadia", href: "/shop?make=Freightliner" },
          { label: "Freightliner M2 106 Medium Duty", href: "/shop?make=Freightliner" },
          { label: "Freightliner Coronado Highway Tractor", href: "/shop?make=Freightliner" },
          { label: "Freightliner 114SD / 122SD Severe Duty", href: "/shop?make=Freightliner" },
        ],
      },
      {
        title: "Freightliner Filter Categories",
        links: [
          { label: "Detroit DD15 / DD13 Oil Filter Kits", href: "/shop?category=Oil%20Filters&make=Freightliner" },
          { label: "Two-Stage Fuel Filter & Separator Sets", href: "/shop?category=Fuel%20Filters&make=Freightliner" },
          { label: "Cascadia RadialSeal Heavy-Duty Air", href: "/shop?category=Air%20Filters&make=Freightliner" },
          { label: "Cascadia Cab & Sleeper HVAC Filters", href: "/shop?category=Cabin%20Filters&make=Freightliner" },
          { label: "Complete Freightliner PM Service Kits", href: "/shop?make=Freightliner" },
        ],
      },
      {
        title: "Engine Fitment & Specs",
        links: [
          { label: "Detroit DD15 Gen 5 / GHG17 Engines", href: "/shop?make=Freightliner" },
          { label: "Detroit DD13 & DD16 Heavy Duty", href: "/shop?make=Freightliner" },
          { label: "Cummins ISX15 / X15 in Cascadia", href: "/shop?make=Freightliner" },
          { label: "Replaces Detroit A4720900451, A4720900551", href: "/shop?make=Freightliner" },
          { label: "Exceeds OEM Detroit Diesel Specs", href: "/shop?make=Freightliner" },
        ],
      },
    ],
  },
  {
    id: "peterbilt",
    title: "Peterbilt",
    subtitle: "Model 579, 389, Cummins X15",
    iconType: "truck",
    headerTitle: "Peterbilt Commercial Truck Filters",
    headerDescription: "Class-leading filtration for Peterbilt Model 579, 389, 567, and Cummins / PACCAR powerplants.",
    primaryHref: "/shop?make=Peterbilt",
    primaryCta: "View All Peterbilt Filters",
    columns: [
      {
        title: "Peterbilt Models",
        links: [
          { label: "Peterbilt Model 579 UltraLoft", href: "/shop?make=Peterbilt" },
          { label: "Peterbilt Model 389 Classic Hood", href: "/shop?make=Peterbilt" },
          { label: "Peterbilt Model 567 Vocational / Dump", href: "/shop?make=Peterbilt" },
          { label: "Peterbilt Model 386 Aerodynamic", href: "/shop?make=Peterbilt" },
          { label: "Peterbilt Model 587 Wide Cab", href: "/shop?make=Peterbilt" },
        ],
      },
      {
        title: "Peterbilt Filter Categories",
        links: [
          { label: "Peterbilt Cummins X15 Oil Filters", href: "/shop?category=Oil%20Filters&make=Peterbilt" },
          { label: "Peterbilt Fuel & Water Separator Sets", href: "/shop?category=Fuel%20Filters&make=Peterbilt" },
          { label: "Dual Canister Air Filters for 389", href: "/shop?category=Air%20Filters&make=Peterbilt" },
          { label: "Peterbilt Cab & Sleeper HVAC Elements", href: "/shop?category=Cabin%20Filters&make=Peterbilt" },
          { label: "Complete Peterbilt PM Service Kits", href: "/shop?make=Peterbilt" },
        ],
      },
      {
        title: "Engine Fitment & Specs",
        links: [
          { label: "Cummins X15 400–605 HP Powerplants", href: "/shop?make=Peterbilt" },
          { label: "PACCAR MX-13 Peterbilt Engine Packages", href: "/shop?make=Peterbilt" },
          { label: "Cummins ISX15 Dual Overhead Cam", href: "/shop?make=Peterbilt" },
          { label: "Donaldson & Baldwin Cross Reference", href: "/shop?make=Peterbilt" },
          { label: "Exact Bolt-On Fit Guaranteed", href: "/shop?make=Peterbilt" },
        ],
      },
    ],
  },
  {
    id: "mack",
    title: "Mack Trucks",
    subtitle: "Anthem, Pinnacle, MP7/MP8",
    iconType: "truck",
    headerTitle: "Mack Heavy-Duty Truck Filters",
    headerDescription: "Bulldog-tough filtration built for Mack Anthem, Pinnacle, Granite, and Mack MP7 / MP8 / MP10 engines.",
    primaryHref: "/shop?make=Mack",
    primaryCta: "View All Mack Filters",
    columns: [
      {
        title: "Mack Truck Models",
        links: [
          { label: "Mack Anthem Highway Tractor", href: "/shop?make=Mack" },
          { label: "Mack Pinnacle Axle Forward & Back", href: "/shop?make=Mack" },
          { label: "Mack Granite Vocational & Dump", href: "/shop?make=Mack" },
          { label: "Mack LR Refuse & Severe Service", href: "/shop?make=Mack" },
          { label: "Mack TerraPro Heavy Hauler", href: "/shop?make=Mack" },
        ],
      },
      {
        title: "Mack Filter Categories",
        links: [
          { label: "Mack Dual Lube Oil Spin-On Sets", href: "/shop?category=Oil%20Filters&make=Mack" },
          { label: "Mack Fuel & Water Separators", href: "/shop?category=Fuel%20Filters&make=Mack" },
          { label: "Mack RadialSeal Heavy-Duty Air", href: "/shop?category=Air%20Filters&make=Mack" },
          { label: "Mack Anthem Cab & Sleeper Filters", href: "/shop?category=Cabin%20Filters&make=Mack" },
          { label: "Complete Mack PM Service Kits", href: "/shop?make=Mack" },
        ],
      },
      {
        title: "Engine Fitment & Specs",
        links: [
          { label: "Mack MP8 13-Liter Turbo Compound", href: "/shop?make=Mack" },
          { label: "Mack MP7 High Efficiency 11-Liter", href: "/shop?make=Mack" },
          { label: "Mack MP10 16-Liter Heavy Hauler", href: "/shop?make=Mack" },
          { label: "Replaces Mack OEM 21707134, 485GB3191C", href: "/shop?make=Mack" },
          { label: "Fleet Ready & Ships Same-Day from FL", href: "/shop?make=Mack" },
        ],
      },
    ],
  },
  {
    id: "more",
    title: "More Makers & Engines",
    subtitle: "International, Western Star & more",
    iconType: "truck",
    headerTitle: "More Commercial Truck Makers & Engines",
    headerDescription: "Complete commercial filtration coverage for International, Western Star, Cummins, CAT, and Detroit Diesel.",
    primaryHref: "/shop",
    primaryCta: "Browse Full Filter Catalog",
    columns: [
      {
        title: "Additional Truck Makers",
        links: [
          { label: "International Trucks (LT, RH, ProStar)", href: "/shop?make=International" },
          { label: "Western Star (4900, 5700XE, 49X)", href: "/shop?make=Western%20Star" },
          { label: "Isuzu Commercial Medium-Duty", href: "/shop" },
          { label: "Hino Trucks Commercial Fleet", href: "/shop" },
          { label: "Ford Super Duty Commercial F-650/750", href: "/shop" },
        ],
      },
      {
        title: "Major Engine Families",
        links: [
          { label: "Cummins Heavy-Duty Diesel (X15, ISX)", href: "/shop" },
          { label: "Detroit Diesel Engines (DD13, DD15)", href: "/shop" },
          { label: "Caterpillar Heavy Truck (C15, C13)", href: "/shop" },
          { label: "PACCAR MX-11 & MX-13 Engines", href: "/shop" },
          { label: "Navistar International A26 Diesel", href: "/shop" },
        ],
      },
      {
        title: "Fleet Tools & Guarantees",
        links: [
          { label: "100% Guaranteed OEM Cross Reference", href: "/shop" },
          { label: "Donaldson, Fleetguard & Baldwin Cross", href: "/shop" },
          { label: "Bulk Commercial Fleet Tier Discounts", href: "/shop" },
          { label: "Fast Same-Day Florida Dispatch", href: "/shop" },
          { label: "Open Vehicle Fitment Finder Tool", href: "/shop" },
        ],
      },
    ],
  },
];

const ALL_BROWSE_TABS: Record<string, BrowseTab> = {
  ...BROWSE_FILTER_TYPES.reduce((acc, tab) => ({ ...acc, [tab.id]: tab }), {}),
  ...BROWSE_FILTER_MAKERS.reduce((acc, tab) => ({ ...acc, [tab.id]: tab }), {}),
};

function renderBrowseIcon(type: BrowseTab["iconType"]) {
  switch (type) {
    case "oil":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case "air":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
        </svg>
      );
    case "fuel":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
          <path d="M15 10h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L20.5 6.5" />
          <path d="M7 9h4" />
        </svg>
      );
    case "cabin":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "truck":
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
  }
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // Stores
  const { items: cartItems, openCart, removeItem: removeCartItem } = useCartStore();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const { currentVehicle, openPicker, clearCurrentVehicle } = useVehicleStore();

  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [activeBrowseTab, setActiveBrowseTab] = useState<string>("oil");
  const departmentsRef = useRef<HTMLDivElement>(null);

  // Live Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);
  const [desktopSearchFocused, setDesktopSearchFocused] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);
  const [headerCheckoutLoading, setHeaderCheckoutLoading] = useState(false);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)) {
        setMobileSearchFocused(false);
      }
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target as Node)) {
        setDesktopSearchFocused(false);
      }
      if (departmentsRef.current && !departmentsRef.current.contains(e.target as Node)) {
        setDepartmentsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleHeaderCheckout = async () => {
    if (cartItems.length === 0) return;
    setHeaderCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout error");
      window.location.href = data.url;
    } catch {
      router.push("/cart");
    } finally {
      setHeaderCheckoutLoading(false);
    }
  };

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setDepartmentsOpen(false);
    setMobileSearchFocused(false);
    setDesktopSearchFocused(false);
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
      setMobileSearchFocused(false);
      setDesktopSearchFocused(false);
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

            {/* Dedicated Mobile Search Bar */}
            <div className="mobile-header__search-row" ref={mobileSearchRef}>
              <div className="cf-mobile-search-wrapper">
                <form className="cf-mobile-search" onSubmit={handleSearchSubmit}>
                  {/* Vehicle Selector Trigger Button */}
                  <button
                    type="button"
                    className={`cf-mobile-search__vehicle-btn ${
                      currentVehicle && isAllowedMake(currentVehicle.make)
                        ? "cf-mobile-search__vehicle-btn--selected"
                        : ""
                    }`}
                    onClick={openPicker}
                    aria-label="Select Vehicle"
                    title={
                      currentVehicle && isAllowedMake(currentVehicle.make)
                        ? `${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}`
                        : "Select Vehicle"
                    }
                  >
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.6,2c2,0,4.8,0,6.8,0c1,0,2.9,0.8,3.6,2.2C17.7,5.7,17.9,7,18.4,7C20,7,20,8,20,8v1h-1v7.5c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5V16H5v0.5C5,17.3,4.3,18,3.5,18h-1C1.7,18,1,17.3,1,16.5V16V9H0V8c0,0,0.1-1,1.6-1C2.1,7,2.3,5.7,3,4.2C3.7,2.8,5.6,2,6.6,2z M13.3,4H6.7c-0.8,0-1.4,0-2,0.7c-0.5,0.6-0.8,1.5-1,2C3.6,7.1,3.5,7.9,3.7,8C4.5,8.4,6.1,9,10,9c4,0,5.4-0.6,6.3-1c0.2-0.1,0.2-0.8,0-1.2c-0.2-0.4-0.5-1.5-1-2C14.7,4,14.1,4,13.3,4z M4,10c-0.4-0.3-1.5-0.5-2,0c-0.4,0.4-0.4,1.6,0,2c0.5,0.5,4,0.4,4,0C6,11.2,4.5,10.3,4,10z M14,12c0,0.4,3.5,0.5,4,0c0.4-0.4,0.4-1.6,0-2c-0.5-0.5-1.3-0.3-2,0C15.5,10.2,14,11.3,14,12z" />
                    </svg>
                    <span className="cf-mobile-search__vehicle-text">
                      {currentVehicle && isAllowedMake(currentVehicle.make)
                        ? currentVehicle.make
                        : "Vehicle"}
                    </span>
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 1l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Search Input */}
                  <input
                    type="text"
                    className="cf-mobile-search__input"
                    placeholder="Enter Keyword or Part Number..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => setMobileSearchFocused(true)}
                    aria-label="Search filters by keyword or part number"
                  />

                  {/* Clear Query Button */}
                  {searchQuery.trim().length > 0 && (
                    <button
                      type="button"
                      className="cf-mobile-search__clear-btn"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      aria-label="Clear search query"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}

                  {/* Search Submit Button */}
                  <button
                    type="submit"
                    className="cf-mobile-search__submit-btn"
                    aria-label="Search"
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M19.2,17.8c0,0-0.2,0.5-0.5,0.8c-0.4,0.4-0.9,0.6-0.9,0.6s-0.9,0.7-2.8-1.6c-1.1-1.4-2.2-2.8-3.1-3.9C10.9,14.5,9.5,15,8,15c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7c0,1.5-0.5,2.9-1.3,4c1.1,0.8,2.5,2,4,3.1C20,16.8,19.2,17.8,19.2,17.8z M8,3C5.2,3,3,5.2,3,8c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C13,5.2,10.8,3,8,3z" />
                    </svg>
                  </button>
                </form>

                {/* Mobile Search Auto-Suggest Dropdown */}
                {mobileSearchFocused && (searchQuery.trim().length >= 2 || searchResults.length > 0) && (
                  <div className="cf-mobile-search-dropdown">
                    <div className="suggestions">
                      {searchLoading && (
                        <div style={{ padding: "12px 16px", fontSize: 13, color: "#6c757d", display: "flex", alignItems: "center", gap: 8 }}>
                          <span className="cf-search-spinner" /> Searching CORALFLY catalog...
                        </div>
                      )}
                      {!searchLoading && searchResults.length === 0 && searchQuery.trim().length >= 2 && (
                        <div style={{ padding: "14px 16px", fontSize: 13, color: "#6c757d", textAlign: "center" }}>
                          No filters matching &ldquo;{searchQuery}&rdquo;. Try OEM part numbers like OF-220 or AF-410.
                        </div>
                      )}
                      {searchResults.length > 0 && (
                        <div className="suggestions__group">
                          <div
                            style={{
                              padding: "8px 16px",
                              fontSize: 11,
                              fontWeight: 700,
                              textTransform: "uppercase",
                              color: "#64748b",
                              background: "#f8fafc",
                              borderBottom: "1px solid #e2e8f0",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Matching Filters ({searchResults.length})
                          </div>
                          {searchResults.slice(0, 5).map((p) => (
                            <Link
                              key={p.id}
                              href={`/shop/${p.slug}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "10px 16px",
                                borderBottom: "1px solid #f1f5f9",
                                textDecoration: "none",
                                background: "#ffffff",
                              }}
                              onClick={() => setMobileSearchFocused(false)}
                            >
                              <div style={{ width: 42, height: 42, position: "relative", flexShrink: 0, background: "#f8fafc", borderRadius: 4, overflow: "hidden" }}>
                                <Image
                                  src={p.image?.url || "/images/products/product-1-245x245.jpg"}
                                  alt={p.name}
                                  fill
                                  sizes="42px"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "#1e293b",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {p.name}
                                </div>
                                <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600, marginTop: 2 }}>
                                  In Stock • OEM Fit
                                </div>
                              </div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: "#0081c9", whiteSpace: "nowrap" }}>
                                {formatPrice(p.price, p.currency)}
                              </div>
                            </Link>
                          ))}
                          <div style={{ padding: "8px 16px", background: "#f8fafc", textAlign: "center" }}>
                            <button
                              type="button"
                              onClick={(e) => {
                                setMobileSearchFocused(false);
                                handleSearchSubmit(e);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#0081c9",
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: "pointer",
                                padding: "4px 8px",
                              }}
                            >
                              See all matching filters &rarr;
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
              <div className="topbar__item-text">
                <a href="tel:+14077681488" style={{ color: "inherit", textDecoration: "none" }}>
                  Call Us: (407) 768-1488
                </a>
              </div>
              <div className="topbar__item-text">
                <Link className="topbar__link" href="/about">
                  About Us
                </Link>
              </div>
              <div className="topbar__item-text">
                <Link className="topbar__link" href="/contact">
                  Contact Us
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
              <div className="topbar__item-text" style={{ color: "#e8f4fb", fontSize: 13, fontWeight: 500 }}>
                Free Shipping on Orders $75+
              </div>
            </div>
          </div>

          {/* Logo & Slogan */}
          <div className="header__logo">
            <Link href="/" className="logo">
              <div className="logo__slogan">Heavy Duty Filters for Semi Trucks</div>
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
          <div className="header__search" ref={desktopSearchRef}>
            <div className="search">
              <form className="search__body" onSubmit={handleSearchSubmit}>
                <div className="search__shadow" />
                <input
                  type="text"
                  className="search__input"
                  placeholder="Enter Keyword or Part Number"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setDesktopSearchFocused(true)}
                />

                {/* Vehicle Selector Trigger Button */}
                <button
                  type="button"
                  className="search__button search__button--start"
                  onClick={openPicker}
                  title={
                    currentVehicle && isAllowedMake(currentVehicle.make)
                      ? `Selected: ${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model} - Click to change`
                      : "Select Vehicle"
                  }
                  aria-label="Select Vehicle"
                  style={{
                    cursor: "pointer",
                    pointerEvents: "auto",
                    color: currentVehicle && isAllowedMake(currentVehicle.make) ? "#0081c9" : undefined,
                  }}
                >
                  <span className="search__button-icon">
                    <svg width="20" height="20">
                      <path d="M6.6,2c2,0,4.8,0,6.8,0c1,0,2.9,0.8,3.6,2.2C17.7,5.7,17.9,7,18.4,7C20,7,20,8,20,8v1h-1v7.5c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5V16H5v0.5C5,17.3,4.3,18,3.5,18h-1C1.7,18,1,17.3,1,16.5V16V9H0V8c0,0,0.1-1,1.6-1C2.1,7,2.3,5.7,3,4.2C3.7,2.8,5.6,2,6.6,2z M13.3,4H6.7c-0.8,0-1.4,0-2,0.7c-0.5,0.6-0.8,1.5-1,2C3.6,7.1,3.5,7.9,3.7,8C4.5,8.4,6.1,9,10,9c4,0,5.4-0.6,6.3-1c0.2-0.1,0.2-0.8,0-1.2c-0.2-0.4-0.5-1.5-1-2C14.7,4,14.1,4,13.3,4z M4,10c-0.4-0.3-1.5-0.5-2,0c-0.4,0.4-0.4,1.6,0,2c0.5,0.5,4,0.4,4,0C6,11.2,4.5,10.3,4,10z M14,12c0,0.4,3.5,0.5,4,0c0.4-0.4,0.4-1.6,0-2c-0.5-0.5-1.3-0.3-2,0C15.5,10.2,14,11.3,14,12z" />
                    </svg>
                  </span>
                  <span className="search__button-title">Select Vehicle</span>
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
                {desktopSearchFocused && (searchQuery.trim().length >= 2 || searchResults.length > 0) && (
                  <div className="search__dropdown" style={{ display: "block" }}>
                    <div className="suggestions search__suggestions">
                      {searchLoading && (
                        <div style={{ padding: "12px 20px", fontSize: 13, color: "#6c757d", display: "flex", alignItems: "center", gap: 8 }}>
                          <span className="cf-search-spinner" /> Searching CORALFLY catalog...
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
                              onClick={() => setDesktopSearchFocused(false)}
                            >
                              <div className="suggestions__product-image" style={{ position: "relative", width: 40, height: 40 }}>
                                <Image
                                  src={p.image?.url || "/images/products/product-1-245x245.jpg"}
                                  alt={p.name}
                                  fill
                                  sizes="40px"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div className="suggestions__product-info">
                                <div className="suggestions__product-name">{p.name}</div>
                                <div style={{ fontSize: 11, color: "#28a745", fontWeight: 600 }}>In Stock</div>
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
                            <div className="dropcart__item-image image image--type--product" style={{ position: "relative", width: 70, height: 70 }}>
                              <Link className="image__body" href={`/shop/${item.slug}`} style={{ position: "relative", width: "100%", height: "100%", display: "block" }}>
                                <Image
                                  className="image__tag"
                                  src={item.image || "/images/products/product-1-245x245.jpg"}
                                  alt={item.name}
                                  fill
                                  sizes="70px"
                                  style={{ objectFit: "contain" }}
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
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ backgroundColor: "#0081c9", borderColor: "#0081c9", cursor: "pointer" }}
                          onClick={handleHeaderCheckout}
                          disabled={headerCheckoutLoading}
                        >
                          {headerCheckoutLoading ? "Redirecting…" : "Checkout"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="header__navbar">
            {/* Departments Button & Browse Mega-Menu */}
            <div className="header__navbar-departments" ref={departmentsRef}>
              <div className={`departments ${departmentsOpen ? "departments--open" : ""}`}>
                <button
                  className="departments__button"
                  type="button"
                  onClick={() => setDepartmentsOpen(!departmentsOpen)}
                  aria-expanded={departmentsOpen}
                  aria-label="Browse filter categories and makers"
                >
                  <span className="departments__button-icon">
                    <svg width="16px" height="12px" viewBox="0 0 16 12" fill="currentColor">
                      <path d="M0,7L0,5L16,5L16,7L0,7ZM0,0L16,0L16,2L0,2L0,0ZM12,12L0,12L0,10L12,10L12,12Z" />
                    </svg>
                  </span>
                  <span className="departments__button-title">Browse</span>
                  <span className="departments__button-arrow">
                    <svg width="9px" height="6px" viewBox="0 0 9 6" fill="currentColor">
                      <path d="M0.2,0.4c0.4-0.4,1-0.5,1.4-0.1l2.9,3l2.9-3c0.4-0.4,1.1-0.4,1.4,0.1c0.3,0.4,0.3,0.9-0.1,1.3L4.5,6L0.3,1.6C-0.1,1.3-0.1,0.7,0.2,0.4z" />
                    </svg>
                  </span>
                </button>

                {/* Browse Mega-Menu Dropdown */}
                <div className="departments__menu browse-dropdown__menu">
                  <div className="departments__arrow" />
                  <div className="browse-dropdown__body">
                    {/* Left Sidebar: Filter Categories & Truck Makers */}
                    <div className="browse-dropdown__sidebar">
                      {/* Section 1: By Filter Type */}
                      <div className="browse-dropdown__section-title">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        Filter by Type
                      </div>
                      {BROWSE_FILTER_TYPES.map((tab) => {
                        const isActive = activeBrowseTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            className={`browse-dropdown__item ${isActive ? "browse-dropdown__item--active" : ""}`}
                            onMouseEnter={() => setActiveBrowseTab(tab.id)}
                            onFocus={() => setActiveBrowseTab(tab.id)}
                            onClick={() => {
                              router.push(tab.primaryHref);
                              setDepartmentsOpen(false);
                            }}
                          >
                            <div className="browse-dropdown__item-main">
                              <span className="browse-dropdown__item-icon">
                                {renderBrowseIcon(tab.iconType)}
                              </span>
                              <div className="browse-dropdown__item-text">
                                <span className="browse-dropdown__item-title">{tab.title}</span>
                                <span className="browse-dropdown__item-subtitle">{tab.subtitle}</span>
                              </div>
                            </div>
                            <span className="browse-dropdown__item-arrow">
                              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 1L5 5L1 9" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </button>
                        );
                      })}

                      {/* Section 2: Filter by Maker */}
                      <div className="browse-dropdown__section-title">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="1" y="3" width="15" height="13" />
                          <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                          <circle cx="5.5" cy="18.5" r="2.5" />
                          <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                        Filter by Maker
                      </div>
                      {BROWSE_FILTER_MAKERS.map((tab) => {
                        const isActive = activeBrowseTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            className={`browse-dropdown__item ${isActive ? "browse-dropdown__item--active" : ""}`}
                            onMouseEnter={() => setActiveBrowseTab(tab.id)}
                            onFocus={() => setActiveBrowseTab(tab.id)}
                            onClick={() => {
                              router.push(tab.primaryHref);
                              setDepartmentsOpen(false);
                            }}
                          >
                            <div className="browse-dropdown__item-main">
                              <span className="browse-dropdown__item-icon">
                                {renderBrowseIcon(tab.iconType)}
                              </span>
                              <div className="browse-dropdown__item-text">
                                <span className="browse-dropdown__item-title">{tab.title}</span>
                                <span className="browse-dropdown__item-subtitle">{tab.subtitle}</span>
                              </div>
                            </div>
                            <span className="browse-dropdown__item-arrow">
                              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 1L5 5L1 9" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Panel: Active Category / Maker Sub-Dropdown Details */}
                    {(() => {
                      const currentTab = ALL_BROWSE_TABS[activeBrowseTab] || BROWSE_FILTER_TYPES[0];
                      return (
                        <div className="browse-dropdown__panel">
                          <div>
                            {/* Panel Header */}
                            <div className="browse-dropdown__panel-header">
                              <div>
                                <h3 className="browse-dropdown__panel-title">{currentTab.headerTitle}</h3>
                                <p className="browse-dropdown__panel-desc">{currentTab.headerDescription}</p>
                              </div>
                              <Link
                                href={currentTab.primaryHref}
                                className="browse-dropdown__panel-cta"
                                onClick={() => setDepartmentsOpen(false)}
                              >
                                {currentTab.primaryCta} &rarr;
                              </Link>
                            </div>

                            {/* 3-Column Sub-Dropdown Links */}
                            <div className="browse-dropdown__grid">
                              {currentTab.columns.map((col, colIdx) => (
                                <div key={colIdx} className="browse-dropdown__col">
                                  <div className="browse-dropdown__col-title">{col.title}</div>
                                  <ul className="browse-dropdown__links">
                                    {col.links.map((link, linkIdx) => (
                                      <li key={linkIdx}>
                                        <Link
                                          href={link.href}
                                          className="browse-dropdown__link"
                                          onClick={() => setDepartmentsOpen(false)}
                                        >
                                          <span className="browse-dropdown__link-bullet" />
                                          <span>{link.label}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Footer Assurances & Action Strip */}
                          <div className="browse-dropdown__footer">
                            <div className="browse-dropdown__footer-badges">
                              <span className="browse-dropdown__footer-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0081c9" strokeWidth="2.5">
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                100% Guaranteed OEM Fitment
                              </span>
                              <span className="browse-dropdown__footer-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                                  <rect x="1" y="3" width="15" height="13" />
                                  <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                                  <circle cx="5.5" cy="18.5" r="2.5" />
                                  <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                                Fast Dispatch from Sanford, FL (32771)
                              </span>
                              <span className="browse-dropdown__footer-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                24/7 Support Everyday
                              </span>
                            </div>
                            <div className="browse-dropdown__footer-actions">
                              <button
                                type="button"
                                className="browse-dropdown__footer-btn"
                                onClick={() => {
                                  setDepartmentsOpen(false);
                                  openPicker();
                                }}
                              >
                                {currentVehicle ? "Change Vehicle" : "Select Your Truck"}
                              </button>
                              <Link
                                href="/shop"
                                className="browse-dropdown__footer-btn"
                                onClick={() => setDepartmentsOpen(false)}
                                style={{ background: "#0081c9", color: "#ffffff", borderColor: "#0081c9" }}
                              >
                                View All 1,400+ Filters
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
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
                    <Link href="/guides" className="main-menu__link">
                      Guides & Tech
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
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openPicker();
                  }}
                  style={{
                    fontSize: 12,
                    flex: 1,
                    backgroundColor: "#0081c9",
                    borderColor: "#0081c9",
                  }}
                >
                  {currentVehicle ? "Change Vehicle" : "Select Vehicle"}
                </button>
                {currentVehicle && (
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={() => {
                      clearCurrentVehicle();
                    }}
                    style={{
                      fontSize: 12,
                      padding: "0 14px",
                      border: "1px solid #ced4da",
                      color: "#6c757d",
                      backgroundColor: "#fff",
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div style={{ padding: "12px 0", flex: 1 }}>
              <div style={{ padding: "8px 20px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999" }}>
                Main Navigation
              </div>
              <Link href="/" className="topbar__menu-item" style={{ padding: "10px 20px", display: "block" }}>
                Home
              </Link>
              <Link href="/shop" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Browse All Filters
              </Link>
              <Link href="/shop?category=Oil%20Filters" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Oil & Lube Filters
              </Link>
              <Link href="/shop?category=Air%20Filters" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Air & Intake Filters
              </Link>
              <Link href="/shop?category=Fuel%20Filters" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Fuel & Water Separators
              </Link>
              <Link href="/shop?category=Cabin%20Filters" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Cabin Air Filters
              </Link>

              <div style={{ padding: "16px 20px 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999" }}>
                Filter by Truck Maker
              </div>
              <Link href="/shop?make=Volvo" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Volvo Filters
              </Link>
              <Link href="/shop?make=Kenworth" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Kenworth Filters
              </Link>
              <Link href="/shop?make=Freightliner" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Freightliner Filters
              </Link>
              <Link href="/shop?make=Peterbilt" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Peterbilt Filters
              </Link>
              <Link href="/shop?make=Mack" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Mack Filters
              </Link>
              <Link href="/shop" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block", color: "#0081c9", fontWeight: 600 }}>
                All Makes & Models &rarr;
              </Link>

              <div style={{ padding: "16px 20px 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999" }}>
                Resources
              </div>
              <Link href="/guides" className="topbar__menu-item" onClick={() => setMobileMenuOpen(false)} style={{ padding: "10px 20px", display: "block" }}>
                Guides & Cross-Reference
              </Link>

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
              <a href="tel:+14077681488" style={{ color: "inherit", textDecoration: "none" }}>
                Call Us: <strong>(407) 768-1488</strong>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
