import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductGrid";
import { getCatalogCategories } from "@/lib/catalog";
import { getProducts } from "@/sanity/products";

type Props = { params: Promise<{ category: string }> };

async function getCategory(slug: string) {
  const products = await getProducts();
  const category = getCatalogCategories(products).find((item) => item.slug === slug);
  return { category, products: products.filter((product) => product.category === category?.name) };
}

export async function generateStaticParams() {
  return getCatalogCategories(await getProducts()).map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const { category } = await getCategory(slug);
  return category ? { title: category.name, description: `Browse CORALFLY ${category.name.toLocaleLowerCase()} in the current catalog.` } : { title: "Filter Category Not Found" };
}

export default async function FilterCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const { category, products } = await getCategory(slug);
  if (!category) notFound();
  return <section className="section"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }, { name: category.name }]} /><header className="landing-header"><h1 className="landing-header__title">{category.name}</h1><p className="landing-header__intro">Browse CORALFLY catalog products in this filter category.</p><p className="landing-header__meta">{products.length} products</p></header><ProductGrid products={products} /></div></section>;
}
