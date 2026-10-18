import type { MetadataRoute } from "next";
import { getProducts } from "@/sanity/products";
import { guides } from "@/lib/guides";
import { getCatalogCategories, getCatalogMakes, isFilterCategory } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.coralflyfilters.com";
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/trucks`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Dynamic products
  const products = await getProducts();
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic filter categories
  const categories = getCatalogCategories(products);
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/filters/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic truck makes
  const makes = getCatalogMakes(products.filter((p) => isFilterCategory(p.category)));
  const makeRoutes: MetadataRoute.Sitemap = makes.map((m) => ({
    url: `${baseUrl}/trucks/${m.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic guides
  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...makeRoutes,
    ...guideRoutes,
  ];
}
