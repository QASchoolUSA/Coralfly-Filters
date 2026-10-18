import type { Product } from "@/sanity/types";

export interface EnhancedGalleryItem {
  url: string;
  alt: string;
  tag: string;
  title: string;
  subtitle: string;
}

export const PRODUCT_PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";

/**
 * Returns gallery images exclusively synchronized from Sanity CMS.
 * No demo, stock, or synthesized fallback photos are injected.
 * If a product has genuine multi-angle photos in Sanity (1 up to 13+), all are returned.
 * If no image is present in Sanity yet, returns a clean branded placeholder.
 */
export function getEnhancedGalleryImages(product: Product): EnhancedGalleryItem[] {
  const name = product.name || "Commercial Heavy Duty Filter";
  const sku = product.sku || `CF-${product.slug?.toUpperCase() || "HD"}`;

  const validImages = (product.images || []).filter(
    (img): img is { url: string; alt?: string } =>
      Boolean(img?.url && typeof img.url === "string" && img.url.trim().length > 0)
  );

  if (validImages.length > 0) {
    return validImages.map((img, index) => {
      const viewNum = index + 1;
      const tag = index === 0 ? "Main View" : `View ${viewNum}`;
      return {
        url: img.url,
        alt: img.alt || `${name} — View ${viewNum}`,
        tag,
        title: `${name} — View ${viewNum}`,
        subtitle: `${name} (${sku})`,
      };
    });
  }

  return [
    {
      url: PRODUCT_PLACEHOLDER_IMAGE,
      alt: `${name} — Photo Coming Soon`,
      tag: "Coming Soon",
      title: `${name} — Photo Coming Soon`,
      subtitle: `${name} (${sku})`,
    },
  ];
}
