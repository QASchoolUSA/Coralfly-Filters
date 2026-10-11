import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductGrid";
import { getCatalogCategories, getCatalogMakes } from "@/lib/catalog";
import { getProducts } from "@/sanity/products";

type Props = { params: Promise<{ brand: string; category: string }> };

async function getCollection(brandSlug: string, categorySlug: string) {
  const products = await getProducts();
  const make = getCatalogMakes(products).find((item) => item.slug === brandSlug)?.name;
  const category = getCatalogCategories(products).find((item) => item.slug === categorySlug)?.name;
  const matching = products.filter((product) => product.category === category && product.compatibleMakes?.some((value) => value.toLocaleLowerCase() === make?.toLocaleLowerCase()));
  return { make, category, products: matching };
}

export async function generateStaticParams() {
  const products = await getProducts();
  const collections = getCatalogMakes(products).flatMap(({ slug, name }) => {
    const tagged = products.filter((product) => product.compatibleMakes?.some((value) => value.toLocaleLowerCase() === name.toLocaleLowerCase()));
    return getCatalogCategories(tagged).map(({ slug: category }) => ({ brand: slug, category }));
  });
  // See the parent truck route: no tagged makes/categories is a valid catalog
  // state, but Cache Components still needs a param for build-time validation.
  return collections.length ? collections : [{ brand: "__no-tagged-makes__", category: "__no-tagged-category__" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, category: categorySlug } = await params;
  const { make, category } = await getCollection(brand, categorySlug);
  if (!make || !category) return { title: "Filter Category Not Found" };
  return { title: `${make} ${category}`, description: `Browse ${category} products explicitly tagged as compatible with ${make}.` };
}

export default async function TruckCategoryPage({ params }: Props) {
  const { brand, category: categorySlug } = await params;
  const { make, category, products } = await getCollection(brand, categorySlug);
  if (!make || !category) notFound();
  return <section className="section"><div className="container">
    <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }, { name: `${make} Filters`, href: `/trucks/${brand}` }, { name: category }]} />
    <header className="landing-header"><h1 className="landing-header__title">{make} {category}</h1><p className="landing-header__intro">Products in this collection are tagged as compatible with {make} in the catalog. Confirm the part number and application before ordering.</p><p className="landing-header__meta">{products.length} products</p></header>
    {products.length ? <ProductGrid products={products} /> : <p className="shop-empty-state">No {category.toLocaleLowerCase()} are currently tagged for {make}. <Link href={`/trucks/${brand}`}>Browse all {make} filters</Link>.</p>}
  </div></section>;
}
