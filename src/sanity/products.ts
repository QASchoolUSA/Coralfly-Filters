import { cacheLife, cacheTag } from "next/cache";
import { sanityClient, isSanityConfigured } from "./client";
import { fixtureProducts } from "./fixtures";
import { resolveSanityImageUrl } from "./image";
import {
  categoriesQuery,
  productBySlugQuery,
  productsQuery,
} from "./queries";
import type { Product, ProductImage, ProductSpec } from "./types";

type RawProduct = Record<string, unknown>;

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return undefined;
}

function pushImage(
  images: ProductImage[],
  seen: Set<string>,
  source: unknown,
  altFallback?: string,
) {
  const url = resolveSanityImageUrl(source);
  if (!url || seen.has(url)) return;

  let alt = altFallback;
  if (source && typeof source === "object") {
    const row = source as Record<string, unknown>;
    alt =
      asString(row.alt) ||
      asString(row.caption) ||
      asString(row.title) ||
      altFallback;
  }

  seen.add(url);
  images.push({ url, alt });
}

/**
 * Merge every known image field — do not stop at the first match.
 * Prefer GROQ `resolvedImages` (asset->url expanded), then fall back to raw fields.
 */
function normalizeImages(raw: RawProduct): ProductImage[] {
  const images: ProductImage[] = [];
  const seen = new Set<string>();
  const nameFallback = asString(raw.name) || asString(raw.title);

  const resolved = raw.resolvedImages;
  if (Array.isArray(resolved)) {
    for (const item of resolved) {
      if (!item || typeof item !== "object") {
        pushImage(images, seen, item, nameFallback);
        continue;
      }
      const row = item as Record<string, unknown>;
      if (typeof row.url === "string" && row.url.startsWith("http")) {
        if (!seen.has(row.url)) {
          seen.add(row.url);
          images.push({
            url: row.url,
            alt: asString(row.alt) || nameFallback,
          });
        }
      } else {
        pushImage(images, seen, item, nameFallback);
      }
    }
  }

  const groups: unknown[] = [
    raw.images,
    raw.gallery,
    raw.photos,
    raw.media,
    raw.image,
    raw.mainImage,
    raw.photo,
    raw.thumbnail,
    raw.coverImage,
    raw.productImage,
  ];

  const store = raw.store;
  if (store && typeof store === "object") {
    const preview = (store as Record<string, unknown>).previewImageUrl;
    if (typeof preview === "string") {
      pushImage(images, seen, preview, nameFallback);
    }
  }

  const variant = raw.defaultProductVariant;
  if (variant && typeof variant === "object") {
    const variantImages = (variant as Record<string, unknown>).images;
    if (Array.isArray(variantImages)) {
      groups.push(variantImages);
    }
  }

  for (const group of groups) {
    if (!group) continue;
    if (Array.isArray(group)) {
      for (const item of group) {
        pushImage(images, seen, item, nameFallback);
      }
    } else {
      pushImage(images, seen, group, nameFallback);
    }
  }

  return images;
}

function normalizeSpecs(raw: RawProduct): ProductSpec[] | undefined {
  const source = raw.specs ?? raw.specifications;
  if (!Array.isArray(source)) return undefined;

  const specs = source
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const label = asString(row.label) || asString(row.name) || asString(row.key);
      const value = asString(row.value) || asString(row.content);
      if (!label || !value) return null;
      return { label, value };
    })
    .filter(Boolean) as ProductSpec[];

  return specs.length ? specs : undefined;
}

function normalizePrice(raw: RawProduct): number {
  const price = asNumber(raw.priceValue) ?? asNumber(raw.price) ?? 0;
  if (price >= 1000 && Number.isInteger(price)) {
    return price / 100;
  }
  return price;
}

export function normalizeProduct(raw: RawProduct): Product | null {
  const id = asString(raw._id);
  const name = asString(raw.name) || asString(raw.title);
  const slug = asString(raw.slug);
  if (!id || !name || !slug) return null;

  return {
    _id: id,
    name,
    slug,
    description: asString(raw.blurb) || asString(raw.description),
    price: normalizePrice(raw),
    currency: (asString(raw.currency) || "usd").toLowerCase(),
    sku: asString(raw.skuValue) || asString(raw.sku),
    category: asString(raw.categoryTitle) || asString(raw.category),
    featured: Boolean(raw.featured),
    images: normalizeImages(raw),
    specs: normalizeSpecs(raw),
  };
}

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, string | number | boolean> = {},
): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error("Sanity fetch failed, falling back to fixtures:", error);
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  if (!isSanityConfigured) return fixtureProducts;

  const raw = await fetchFromSanity<RawProduct[]>(productsQuery);
  if (!raw?.length) return fixtureProducts;

  const products = raw.map(normalizeProduct).filter(Boolean) as Product[];
  return products.length ? products : fixtureProducts;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  "use cache";
  cacheTag("products", "featured-products");
  cacheLife("hours");

  const products = await getProducts();
  const featured = products.filter((p) => p.featured);
  return (featured.length ? featured : products).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheTag("products", `product-${slug}`);
  cacheLife("hours");

  if (!isSanityConfigured) {
    return fixtureProducts.find((p) => p.slug === slug) ?? null;
  }

  const raw = await fetchFromSanity<RawProduct | null>(productBySlugQuery, {
    slug,
  });
  if (raw) {
    const product = normalizeProduct(raw);
    if (product) return product;
  }

  return fixtureProducts.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<string[]> {
  "use cache";
  cacheTag("products", "categories");
  cacheLife("hours");

  if (!isSanityConfigured) {
    return [
      ...new Set(fixtureProducts.map((p) => p.category).filter(Boolean)),
    ] as string[];
  }

  const raw = await fetchFromSanity<(string | null | undefined)[]>(
    categoriesQuery,
  );
  if (!raw?.length) {
    const products = await getProducts();
    return [
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ] as string[];
  }

  return [...new Set(raw.filter((c): c is string => Boolean(c)))].sort();
}
