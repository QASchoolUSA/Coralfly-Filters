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
  const { category, products } = await getCategory(slug);
  if (!category) return { title: "Filter Category Not Found" };

  const title = `${category.name} | Heavy Duty Truck Filters`;
  const description = `Shop ${products.length} CORALFLY ${category.name.toLowerCase()} for commercial semi trucks. Factory-direct engineering, fast USA shipping, verified OEM fitment.`;
  const canonicalUrl = `https://coralflyfilters.com/filters/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${category.name} | CORALFLY Filters`,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "https://coralflyfilters.com/images/og-business-card.png",
          alt: `${category.name} CORALFLY`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | CORALFLY`,
      description,
      images: ["https://coralflyfilters.com/images/og-business-card.png"],
    },
  };
}

export default async function FilterCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const { category, products } = await getCategory(slug);
  if (!category) notFound();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} | CORALFLY Filters`,
    url: `https://coralflyfilters.com/filters/${slug}`,
    description: `Shop CORALFLY ${category.name.toLowerCase()} for commercial semi trucks.`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, idx) => ({
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
                  <Link href="/shop" className="breadcrumb__item-link">Shop</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-link">{category.name}</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
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
