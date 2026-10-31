import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  return makes.length ? makes : [{ brand: "__no-tagged-makes__" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const { make } = await resolveMake(slug);
  if (!make) return { title: "Truck Make Not Found" };

  const title = `${make} Truck Filters | Heavy Duty Replacements`;
  const description = `Browse CORALFLY oil, air, fuel, and cabin filters verified for compatibility with ${make} commercial rigs. Fast dispatch, factory specs.`;
  const canonicalUrl = `https://coralflyfilters.com/trucks/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${make} Truck Filters | CORALFLY`,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "https://coralflyfilters.com/images/og-business-card.png",
          alt: `${make} Truck Filters`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${make} Truck Filters | CORALFLY`,
      description,
      images: ["https://coralflyfilters.com/images/og-business-card.png"],
    },
  };
}

export default async function TruckLandingPage({ params }: Props) {
  const { brand: slug } = await params;
  const { products, make } = await resolveMake(slug);
  if (!make) notFound();

  const matching = products.filter((product) =>
    isFilterCategory(product.category) &&
    product.compatibleMakes?.some((value) => value.toLocaleLowerCase() === make.toLocaleLowerCase())
  );
  const categories = getCatalogFilterCategories(matching);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${make} Truck Filters - CORALFLY`,
    url: `https://coralflyfilters.com/trucks/${slug}`,
    description: `Heavy duty filtration products for ${make} commercial trucks.`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: matching.map((product, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://coralflyfilters.com/shop/${product.slug}`,
        name: product.name,
      })),
    },
  };

  return (
    <div className="block">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {/* Header Breadcrumbs */}
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <nav className="breadcrumb block-header__breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__spaceship-safe-area" role="presentation" />
                <li className="breadcrumb__item breadcrumb__item--parent breadcrumb__item--first">
                  <Link href="/" className="breadcrumb__item-link">Home</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--parent">
                  <Link href="/trucks" className="breadcrumb__item-link">Trucks</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-link">{make}</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">{make} Truck Filters</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 24 }}>
          Showing heavy duty filtration products verified for compatibility with {make} commercial rigs.
        </p>

        {categories.length > 0 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            {categories.map(({ slug: categorySlug, name: category }) => (
              <Link
                key={category}
                href={`/trucks/${slug}/${categorySlug}`}
                className="btn btn-sm btn-light"
                style={{ border: "1px solid #ebebeb", fontSize: 13 }}
              >
                {category}
              </Link>
            ))}
          </div>
        )}

        {matching.length ? (
          <ProductGrid products={matching} />
        ) : (
          <div className="card text-center" style={{ padding: 48, border: "1px solid #ebebeb", borderRadius: 4 }}>
            <p style={{ color: "#6c757d", fontSize: 15, marginBottom: 16 }}>
              No products are currently tagged as compatible with {make}.
            </p>
            <div>
              <Link href="/shop" className="btn btn-primary" style={{ backgroundColor: "#0081c9", borderColor: "#0081c9" }}>
                Browse All Filters
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
