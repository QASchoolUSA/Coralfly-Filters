import { sanityClient, isSanityConfigured } from "./client";
import { fixtureProducts } from "./fixtures";
import { urlForImage } from "./image";
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

function resolveImageUrl(source: unknown): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  if (typeof source === "object" && source !== null) {
    const obj = source as Record<string, unknown>;
    if (typeof obj.url === "string") return obj.url;
    if (obj.asset || obj._type === "image") {
      try {
        return urlForImage(source as Parameters<typeof urlForImage>[0])?.width(1200).url() ?? null;
      } catch {
        return null;
      }
    }
  }
  return null;
}

function normalizeImages(raw: RawProduct): ProductImage[] {
  const images: ProductImage[] = [];
  const candidates = [
    raw.gallery,
    raw.images,
    raw.image ? [raw.image] : null,
    raw.mainImage ? [raw.mainImage] : null,
  ];

  for (const group of candidates) {
    if (!Array.isArray(group)) continue;
    for (const item of group) {
      const url = resolveImageUrl(item);
      if (!url) continue;
      const alt =
        typeof item === "object" && item !== null
          ? asString((item as Record<string, unknown>).alt) ||
            asString((item as Record<string, unknown>).caption)
          : undefined;
      images.push({ url, alt });
    }
    if (images.length) break;
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
  // If Sanity stores cents (common for Stripe-oriented schemas), convert when huge
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
  if (!isSanityConfigured) return fixtureProducts;

  const raw = await fetchFromSanity<RawProduct[]>(productsQuery);
  if (!raw?.length) return fixtureProducts;

  const products = raw.map(normalizeProduct).filter(Boolean) as Product[];
  return products.length ? products : fixtureProducts;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);
  return (featured.length ? featured : products).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return fixtureProducts.find((p) => p.slug === slug) ?? null;
  }

  const raw = await fetchFromSanity<RawProduct | null>(productBySlugQuery, { slug });
  if (raw) {
    const product = normalizeProduct(raw);
    if (product) return product;
  }

  return fixtureProducts.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<string[]> {
  if (!isSanityConfigured) {
    return [...new Set(fixtureProducts.map((p) => p.category).filter(Boolean))] as string[];
  }

  const raw = await fetchFromSanity<(string | null | undefined)[]>(categoriesQuery);
  if (!raw?.length) {
    const products = await getProducts();
    return [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];
  }

  return [...new Set(raw.filter((c): c is string => Boolean(c)))].sort();
}
