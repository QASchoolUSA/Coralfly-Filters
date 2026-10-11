import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductGrid";
import { getCatalogFilterCategories, getCatalogMakes, isFilterCategory } from "@/lib/catalog";
import { getProducts } from "@/sanity/products";

type Props = { params: Promise<{ brand: string }> };

async function resolveMake(slug: string) {
  const products = await getProducts();
  const filterProducts = products.filter((product) => isFilterCategory(product.category));
  return { products: filterProducts, make: getCatalogMakes(filterProducts).find((item) => item.slug === slug)?.name };
}

export async function generateStaticParams() {
  const products = (await getProducts()).filter((product) => isFilterCategory(product.category));
  const makes = getCatalogMakes(products).map(({ slug }) => ({ brand: slug }));
  // Cache Components requires at least one build-time param. This placeholder
  // resolves to notFound() and does not claim a make or catalog fitment exists.
  return makes.length ? makes : [{ brand: "__no-tagged-makes__" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const { make } = await resolveMake(slug);
  if (!make) return { title: "Truck Make Not Found" };
  return { title: `${make} Truck Filters`, description: `Browse CORALFLY products explicitly tagged as compatible with ${make}.` };
}

export default async function TruckLandingPage({ params }: Props) {
  const { brand: slug } = await params;
  const { products, make } = await resolveMake(slug);
  if (!make) notFound();
  const matching = products.filter((product) => isFilterCategory(product.category) && product.compatibleMakes?.some((value) => value.toLocaleLowerCase() === make.toLocaleLowerCase()));
  const categories = getCatalogFilterCategories(matching);
  return <section className="section"><div className="container">
    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }, { name: `${make} Filters` }]} />
    <header className="landing-header"><h1 className="landing-header__title">{make} Truck Filters</h1><p className="landing-header__intro">Browse catalog products explicitly tagged as compatible with {make}. Check each product's part number and specifications before ordering.</p><p className="landing-header__meta">{matching.length} products</p></header>
    {categories.length ? <nav className="truck-category-links" aria-label={`${make} filter categories`}>{categories.map(({ slug: categorySlug, name: category }) => <Link key={category} className="shop-chip" href={`/trucks/${slug}/${categorySlug}`}>{category}</Link>)}</nav> : null}
    {matching.length ? <ProductGrid products={matching} /> : <p className="shop-empty-state">No products are currently tagged as compatible with {make}. <Link href="/shop">Browse all filters</Link> or <Link href="/contact">ask us about a match</Link>.</p>}
  </div></section>;
}
