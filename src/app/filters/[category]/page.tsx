import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  return category
    ? { title: category.name, description: `Browse CORALFLY ${category.name.toLocaleLowerCase()} in the current catalog.` }
    : { title: "Filter Category Not Found" };
}

export default async function FilterCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const { category, products } = await getCategory(slug);
  if (!category) notFound();

  return (
    <div className="block">
      {/* Header Breadcrumbs */}
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__item breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">Home</Link>
                </li>
                <li className="breadcrumb__item">
                  <span className="breadcrumb__item-arrow">/</span>
                  <Link href="/shop" className="breadcrumb__item-link">Shop</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-arrow">/</span>
                  <span className="breadcrumb__item-link">{category.name}</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">{category.name}</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 32 }}>
          Showing {products.length} heavy duty {category.name.toLowerCase()} available for same-day dispatch.
        </p>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
