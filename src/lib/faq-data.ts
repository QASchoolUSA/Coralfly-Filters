export type FaqItem = {
  q: string;
  a: string;
};

export type FaqSection = {
  category: string;
  items: FaqItem[];
};

export const FAQ_SECTIONS: FaqSection[] = [
  {
    category: "Shipping & Fulfillment",
    items: [
      {
        q: "What is your shipping cutoff for same-day dispatch?",
        a: "All in-stock orders placed Monday through Friday before 2:00 PM EST are picked, packed, and handed over to freight or parcel carriers (UPS, FedEx) the very same day.",
      },
      {
        q: "How is delivery and shipping calculated?",
        a: "Shipping is calculated per item based on filtration category: Air Filters ($10/pc), Oil Filters & Fuel Separators ($5/pc), and Cabin Air Filters ($3/pc). Free shipping or custom contracted delivery terms are offered exclusively to recurring commercial fleet clients upon arrangement with our logistics team.",
      },
      {
        q: "Do you ship bulk pallet quantities to commercial fleet terminals?",
        a: "Yes. For volume fleet orders and case pallet loads, our logistics team arranges LTL freight delivery with liftgate service directly to your terminal or repair shop dock.",
      },
    ],
  },
  {
    category: "Compatibility & Cross-Reference",
    items: [
      {
        q: "How can I verify a filter will fit my specific truck engine?",
        a: "Use our vehicle selector at the top of the page to select your rig's Year, Make, Model, and Engine. Compatible products will display a green 'Verified Fit' badge. You can also search by OEM part numbers.",
      },
      {
        q: "Can I cross-reference aftermarket filter part numbers like Baldwin, Fleetguard, or Wix?",
        a: "Yes! Enter any recognized cross-reference number (e.g. LF16015, B7299, 57746XD) into the top search bar, and our catalog will locate the equivalent CORALFLY specification.",
      },
      {
        q: "Do CORALFLY filters meet or exceed OEM warranty requirements?",
        a: "Yes. All CORALFLY filters are engineered and manufactured under ISO 9001 and IATF 16949 certified quality management systems, fully preserving engine warranties under the Magnuson-Moss Warranty Act.",
      },
    ],
  },
  {
    category: "Fleet Billing & Orders",
    items: [
      {
        q: "Do you offer Net 30 corporate purchase order terms?",
        a: "Yes. Fleets operating 5 or more commercial power units can establish credit terms with Net 30 billing. Contact support@coralflyfilters.com or select 'Fleet Purchase Order' at checkout.",
      },
      {
        q: "Can I receive wholesale pricing on full carton quantities?",
        a: "Yes. When ordering case packs (typically 6 or 12 filters per master carton), volume discounts are automatically reflected in your cart totals.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy for unused filters?",
        a: "We offer a 30-day hassle-free return policy for unopened, uninstalled filters in their original packaging. Contact support to generate a prepaid return authorization slip.",
      },
    ],
  },
];
