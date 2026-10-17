import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { getCatalogFilterCategories, getCatalogMakes, isFilterCategory } from "@/lib/catalog";
import { getProducts } from "@/sanity/products";

type Props = { params: Promise<{ brand: string; category: string }> };

async function getCollection(brandSlug: string, categorySlug: string) {
  const products = (await getProducts()).filter((product) => isFilterCategory(product.category));
  const make = getCatalogMakes(products).find((item) => item.slug === brandSlug)?.name;
  const category = getCatalogFilterCategories(products).find((item) => item.slug === categorySlug)?.name;
  const matching = products.filter(
    (product) =>
      product.category === category &&
      product.compatibleMakes?.some((value) => value.toLocaleLowerCase() === make?.toLocaleLowerCase())
  );
  return { make, category, products: matching };
}

export async function generateStaticParams() {
  const products = (await getProducts()).filter((product) => isFilterCategory(product.category));
  const collections = getCatalogMakes(products).flatMap(({ slug, name }) => {
    const tagged = products.filter((product) =>
      product.compatibleMakes?.some((value) => value.toLocaleLowerCase() === name.toLocaleLowerCase())
    );
    return getCatalogFilterCategories(tagged).map(({ slug: category }) => ({ brand: slug, category }));
  });
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
                  <Link href="/trucks" className="breadcrumb__item-link">Trucks</Link>
                </li>
                <li className="breadcrumb__item">
                  <span className="breadcrumb__item-arrow">/</span>
                  <Link href={`/trucks/${brand}`} className="breadcrumb__item-link">{make}</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-arrow">/</span>
                  <span className="breadcrumb__item-link">{category}</span>
                </li>
              </ol>
            </nav>
            <h1 className="block-header__title">{make} {category}</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 32 }}>
          Showing {products.length} {category.toLowerCase()} verified for {make} rigs.
        </p>

        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <div className="card text-center" style={{ padding: 48, border: "1px solid #ebebeb", borderRadius: 4 }}>
            <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 16 }}>
              No {category.toLowerCase()} are currently tagged for {make}.
            </p>
            <div>
              <Link href={`/trucks/${brand}`} className="btn btn-primary" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
                Browse All {make} Filters
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
