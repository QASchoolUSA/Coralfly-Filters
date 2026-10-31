import type { MetadataRoute } from "next";
import { getProducts } from "@/sanity/products";
import { guides } from "@/lib/guides";
import {
  getCatalogCategories,
  getCatalogFilterCategories,
  getCatalogMakes,
  isFilterCategory,
} from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "https://coralflyfilters.com"
  ).replace(/\/$/, "");

  // Stable release baseline timestamp instead of volatile new Date()
  const siteDeployDate = new Date("2026-10-21T00:00:00.000Z");

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: siteDeployDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: siteDeployDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/trucks`, lastModified: siteDeployDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: siteDeployDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: siteDeployDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: siteDeployDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/delivery`, lastModified: siteDeployDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/returns`, lastModified: siteDeployDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: siteDeployDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: siteDeployDate, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: siteDeployDate, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Dynamic products
  const products = await getProducts();
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: product._updatedAt ? new Date(product._updatedAt) : siteDeployDate,
    changeFrequency: "weekly",
    priority: 0.9,
    images: product.images?.length ? product.images.map((img) => img.url) : undefined,
  }));

  // Dynamic filter categories
  const categories = getCatalogCategories(products);
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/filters/${cat.slug}`,
    lastModified: siteDeployDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic truck makes
  const filterProducts = products.filter((p) => isFilterCategory(p.category));
  const makes = getCatalogMakes(filterProducts);
  const makeRoutes: MetadataRoute.Sitemap = makes.map((m) => ({
    url: `${baseUrl}/trucks/${m.slug}`,
    lastModified: siteDeployDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic truck makes + category landing pages
  const truckCategoryRoutes: MetadataRoute.Sitemap = makes.flatMap((make) => {
    const tagged = filterProducts.filter((product) =>
      product.compatibleMakes?.some((val) => val.toLowerCase() === make.name.toLowerCase())
    );
    const makeCategories = getCatalogFilterCategories(tagged);
    return makeCategories.map((cat) => ({
      url: `${baseUrl}/trucks/${make.slug}/${cat.slug}`,
      lastModified: siteDeployDate,
      changeFrequency: "weekly",
      priority: 0.75,
    }));
  });

  // Dynamic guides
  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: siteDeployDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...makeRoutes,
    ...truckCategoryRoutes,
    ...guideRoutes,
  ];
}
