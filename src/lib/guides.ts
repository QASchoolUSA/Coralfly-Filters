export type GuideSection = { heading: string; intro?: string; items?: string[]; paragraphs?: string[] };

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  relatedTruckBrands: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
};

// Editorial content adapted from the Semi Filters guide collection. These
// articles are reference material; CORALFLY fitment is shown only when a
// product is explicitly tagged in the catalog.
export const guides: Guide[] = [
  {
    slug: "oem-filter-cross-reference-guide",
    title: "How to Cross-Reference OEM Semi Truck Filter Part Numbers",
    excerpt: "Learn how to match OEM filter numbers to Baldwin, Fleetguard, Donaldson, WIX, and other interchanges without guessing fitment.",
    relatedTruckBrands: ["Volvo", "Freightliner", "Kenworth", "Peterbilt", "Mack"],
    sections: [
      { heading: "Start with the number on the truck", paragraphs: ["Buying the wrong filter costs downtime. Use this process every time you cross an OEM oil, air, or fuel filter number."] , items: ["Read the part number on the filter you are removing", "Check the OEM maintenance chart or dealer parts lookup for your VIN and engine", "Note the housing model for fuel processors, such as DAVCO Fuel Pro 485"] },
      { heading: "Compare interchange lists carefully", paragraphs: ["Baldwin, Fleetguard, Donaldson, WIX, and Paccar, Volvo, and Mack numbers often interchange, but media type, micron rating, and element length can differ. Prefer listings that also match the housing and engine family."] },
      { heading: "Verify before install", items: ["Match gasket outer and inner diameter and thread on spin-on filters", "Match cartridge length and seal kit on Detroit and Volvo cartridge systems", "When unsure, share your VIN, engine, and current filter number with CORALFLY support"], paragraphs: ["Browse the current oil, air, and fuel filter catalog, or filter products by a truck make when fitment is listed."] },
    ],
    faqs: [
      { question: "Is a cross-reference always a perfect fit?", answer: "No. Cross-references are a starting point. Confirm element length, thread, gasket, and housing model, especially on fuel processors." },
      { question: "What should I trust most — OEM or aftermarket number?", answer: "Start with the number stamped on the filter currently installed or listed in the OEM maintenance chart for your VIN and engine." },
    ],
  },
  {
    slug: "freightliner-cascadia-filter-guide",
    title: "Freightliner Cascadia Oil, Fuel & Air Filter Basics",
    excerpt: "A practical overview of Cascadia filtration — air elements, Detroit fuel/water separators, and oil service kits.",
    relatedTruckBrands: ["Freightliner", "Western Star"],
    sections: [
      { heading: "Cascadia filtration depends on the build", paragraphs: ["Freightliner Cascadia filtration packages vary by engine (Detroit DD13, DD15, DD16, or Cummins ISX/X15) and fuel-processor housing."] },
      { heading: "Air filtration", paragraphs: ["Common Cascadia air elements include 03-42776-010 (2018+) and AF27879 on earlier or alternate airboxes. Match the OEM air filter chart for your model year."] },
      { heading: "Fuel and water separation", paragraphs: ["Detroit-powered Cascadias may use cartridge separators (R61709), spin-on style elements (FS19915), DAVCO Fuel Pro elements (FS20083), or Detroit service kits (A4700903151 / A4720921705). Confirm the fuel processor housing before ordering."] },
      { heading: "Oil service", paragraphs: ["Gen 5 Detroit engines often use cartridge kits such as A4711800209. Confirm the engine vintage before ordering.", "Browse the current CORALFLY catalog by product category or truck make when fitment is listed."] },
    ],
    faqs: [
      { question: "Do all Cascadias use the same air filter?", answer: "No. Model year and airbox design matter. Confirm OEM numbers such as 03-42776-010 or AF27879 against your truck." },
      { question: "Which fuel filter does a DD15 Cascadia use?", answer: "It depends on the fuel processor. Common elements include FS19915, R61709, FS20083, and Detroit kits like A4720921705. Match the housing identification." },
    ],
  },
  {
    slug: "volvo-vnl-d13-filtration-overview",
    title: "Volvo VNL / D13 Filtration Overview",
    excerpt: "How Volvo VNL D11/D12/D13 oil, fuel, and air filtration stacks work — including bypass oil filters and FS20313 separators.",
    relatedTruckBrands: ["Volvo", "Mack"],
    sections: [
      { heading: "How the systems work together", paragraphs: ["Volvo VNL trucks with D11, D12, or D13 engines can use multiple filtration stages across oil, fuel, and air systems. Exact components vary with engine, build year, and installed fuel processor; use this as a reference when checking a part number."] },
      { heading: "Oil system", items: ["Full-flow: 23151592 or long-life 23658092, depending on application", "Bypass: 21707132 on many D11–D13 builds"] },
      { heading: "Fuel system", items: ["Secondary fuel: 23920469; late-model 24137737 is listed for some 2024+ D13 / Mack MP8 applications", "Water separator: FS20313 or FS19764 depending on processor"] },
      { heading: "Air system", items: ["Common primary elements: 21715813 and AF26163M; AF26163M replaces 20411815 on many trucks"] },
      { heading: "Confirm before ordering", paragraphs: ["These reference numbers do not by themselves confirm that a CORALFLY product fits a particular truck. Check the OEM number, engine, model year, and fuel processor. CORALFLY product pages display make compatibility only when that fitment is present in the catalog."] },
    ],
    faqs: [
      { question: "Why does my Volvo use two oil filters?", answer: "Many Volvo diesels use a full-flow filter plus a bypass filter for finer polishing. Kits often pair 23151592 or 23658092 with bypass 21707132." },
      { question: "Does Mack share Volvo filter numbers?", answer: "Often yes on shared platforms (MP7/MP8 and D11/D13). Still verify the Mack OEM number before substituting." },
    ],
  },
  {
    slug: "kenworth-t680-peterbilt-579-filters",
    title: "Kenworth T680 & Peterbilt 579 Shared Platform Filters",
    excerpt: "Paccar T680 and 579 trucks share many air and fuel filtration designs. Here is how to match the right element.",
    relatedTruckBrands: ["Kenworth", "Peterbilt"],
    sections: [
      { heading: "Check the OEM number and housing", paragraphs: ["Kenworth T680 and Peterbilt 579 share Paccar engineering. Many air and fuel filters can interchange across brands, but only when the OEM number and housing match."] },
      { heading: "Air filters", items: ["D371061 — common on 2022+ T680 / 579", "P621725 — PowerCore G2 panel on select T680/T880 and 567/579 builds", "P611696 — older or alternate Kenworth airboxes (T680/T800/T880/W900)"] },
      { heading: "Fuel filtration", paragraphs: ["Confirm whether you have a Fuel Pro FH230, Diesel Pro FH234, or other processor before ordering FS19765 or related elements."] },
    ],
    faqs: [
      { question: "Do T680 and 579 use the same air filter?", answer: "Many 2022+ trucks share Paccar D371061. Earlier PowerCore applications may list P621725. Confirm the airbox and OEM chart." },
      { question: "What fuel separator do Paccar trucks use?", answer: "Fuel Pro and Diesel Pro housings are common. FS19765 is a frequent element; match the element length and housing model first." },
    ],
  },
  {
    slug: "davco-fuel-pro-filter-guide",
    title: "Fuel Pro / Diesel Pro Filter & Water-Separator Guide",
    excerpt: "How to identify DAVCO Fuel Pro and Diesel Pro housings and pick the correct fuel/water separator element.",
    relatedTruckBrands: ["Freightliner", "Volvo", "Kenworth", "Peterbilt", "Western Star"],
    sections: [
      { heading: "Identify the housing", paragraphs: ["DAVCO Fuel Pro and Diesel Pro systems combine particulate filtration with water separation. The wrong element length or seal can cause a no-start or leak."] , items: ["Look for the model tag on the Fuel Pro / Diesel Pro unit", "Note the bowl style and whether the unit takes a standard or long element", "Photograph the current cartridge part number before removal"] },
      { heading: "Common elements", items: ["FS20083 — Fuel Pro 485/487/488 standard-length EleMax element", "FS19764 — Volvo/Mack Fuel Pro style applications", "FS19765 — Kenworth/Peterbilt Fuel Pro / Diesel Pro applications", "FS20313 — Volvo/Mack EleMax separator on listed D11/D13 and MP7/MP8 applications"] },
      { heading: "Confirm the application", paragraphs: ["When in doubt, share a photo of the housing tag and current element with CORALFLY support. Verify the exact part before ordering."] },
    ],
    faqs: [
      { question: "How do I know which Fuel Pro element I need?", answer: "Read the housing model label (e.g. 485/487/488) and the element number stamped on the current cartridge. Length and seal design must match." },
      { question: "Can I swap FS19764 and FS19765?", answer: "Not by default. They target different processor applications. Match the OEM and housing identification." },
    ],
  },
  {
    slug: "bypass-vs-full-flow-oil-filters",
    title: "Bypass vs Full-Flow Oil Filters on Heavy-Duty Diesels",
    excerpt: "Understand why many Volvo and Mack diesels use both a full-flow and a bypass oil filter — and when each is due for service.",
    relatedTruckBrands: ["Volvo", "Mack"],
    sections: [
      { heading: "Two filtration stages", paragraphs: ["Full-flow oil filters clean nearly all oil leaving the pump. Bypass filters sample a smaller flow and polish finer particles — a configuration used on some Volvo D11–D13 and related Mack platforms."] },
      { heading: "Full-flow", paragraphs: ["Examples: 23151592 (standard) and 23658092 (long-life). This is the primary engine protection filter."] },
      { heading: "Bypass", paragraphs: ["Example: 21707132. It is not a substitute for the full-flow filter; it works with it."] },
      { heading: "Service tip", paragraphs: ["Replace both when the OEM interval calls for a full oil service. Verify the required parts for your engine before ordering."] },
    ],
    faqs: [
      { question: "Can I skip the bypass filter?", answer: "If your engine is designed for two-stage filtration, skipping bypass filtration can increase soot and fine-particle load over long drains. Follow the OEM service design." },
      { question: "Are long-life and standard full-flow filters the same?", answer: "Not always. Long-life elements such as 23658092 are built for extended drains. Use the media type your oil drain interval requires." },
    ],
  },
  {
    slug: "semi-truck-cabin-air-filter-replacement",
    title: "Cabin Air Filters for Semi Trucks — When to Replace",
    excerpt: "Cabin/HVAC filters protect driver air quality. Here is when to replace them and what to watch for on long-haul trucks.",
    relatedTruckBrands: ["Volvo", "Freightliner", "Kenworth", "Peterbilt", "Mack"],
    sections: [
      { heading: "Why cabin filters matter", paragraphs: ["Cabin air filters are easy to overlook, but they matter for driver comfort and HVAC performance — especially on sleeper trucks."] },
      { heading: "Replace sooner if you notice", items: ["Reduced dash airflow on high blower", "Dust film on the dash shortly after cleaning", "Musty odor when the A/C first engages"] },
      { heading: "Fitment tip", paragraphs: ["Cabin elements are model-specific. Use your truck make and HVAC housing number, not just the engine filter chart. Check the catalog for products with explicitly listed fitment."] },
    ],
    faqs: [
      { question: "How often should I change a cabin filter?", answer: "Many fleets inspect every PM and replace at least annually — sooner in dusty, agricultural, or wildfire-smoke regions." },
      { question: "What are symptoms of a clogged cabin filter?", answer: "Weak vent airflow, musty odor, fogging, and HVAC blower strain are common signs." },
    ],
  },
  {
    slug: "fleet-filter-stocking-guide",
    title: "Fleet Buying Guide: Stocking Oil, Air & Fuel Filters",
    excerpt: "A simple stocking model for fleets: prioritize high-turn oil/fuel elements, keep air filters by airbox family, and standardize cross-refs.",
    relatedTruckBrands: ["Volvo", "Freightliner", "Kenworth", "Peterbilt", "Mack", "Western Star"],
    sections: [
      { heading: "Balance stock and downtime", paragraphs: ["Overstocking rare cabin or specialty filters ties up cash. Understocking oil and fuel elements causes downtime. Use turns and engine-family coverage to plan inventory."] },
      { heading: "Stocking tiers", items: ["Tier 1 (always on hand): full-flow oil and primary fuel/water separators for top engines", "Tier 2: bypass oil filters, secondary fuel filters, and common air elements", "Tier 3: lamps, specialty kits, and low-turn cabin filters"] },
      { heading: "Standardize part numbers", paragraphs: ["Pick one preferred interchange family per OEM number in your maintenance system. Compare listed cross-references and verify before ordering.", "For volume or fleet inquiries, contact CORALFLY with your equipment mix and quantities."] },
    ],
    faqs: [
      { question: "What should a mixed fleet stock first?", answer: "Prioritize the highest-turn oil and fuel/water separators for your top two engine families, plus air elements for your top two airboxes." },
      { question: "Do you offer fleet pricing?", answer: "For volume or fleet inquiries, contact CORALFLY with the products and quantities you need." },
    ],
  },
];
