import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  return guide
    ? { title: guide.title, description: guide.excerpt }
    : { title: "Guide Not Found" };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return (
    <div className="block">
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
                  <Link href="/guides" className="breadcrumb__item-link">Guides & Tech</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last" aria-current="page">
                  <span className="breadcrumb__item-link">{guide.title}</span>
                </li>
                <li className="breadcrumb__title-safe-area" role="presentation" />
              </ol>
            </nav>
            <h1 className="block-header__title">{guide.title}</h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card cf-article-detail-card">
              {/* Meta */}
              <div className="cf-article-detail-meta">
                <span>Published by <strong>CORALFLY Technical Engineering</strong></span>
                <span>•</span>
                <span>Category: <strong>Heavy Duty Filtration Guide</strong></span>
              </div>

              {/* Lead Intro */}
              <div className="cf-article-detail-excerpt">
                {guide.excerpt}
              </div>

              {/* Guide Sections */}
              <div className="cf-article-detail-body">
                {guide.sections.map((section) => (
                  <div key={section.heading} style={{ marginBottom: 36 }}>
                    <h2 className="cf-article-detail-h2">
                      {section.heading}
                    </h2>
                    {section.intro && <p style={{ marginBottom: 12 }}>{section.intro}</p>}
                    {section.paragraphs?.map((p, idx) => (
                      <p key={idx} style={{ marginBottom: 12 }}>{p}</p>
                    ))}
                    {section.items && (
                      <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
                        {section.items.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: 6 }}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Guide FAQs */}
              {guide.faqs && guide.faqs.length > 0 && (
                <div className="cf-article-detail-faqs-wrap">
                  <h3 className="cf-article-detail-h3">Frequently Asked Questions</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {guide.faqs.map((faq) => (
                      <div key={faq.question} className="cf-article-detail-faq-box">
                        <strong className="cf-article-detail-faq-q">
                          {faq.question}
                        </strong>
                        <p className="cf-article-detail-faq-a">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Makes Strip */}
              <div className="cf-article-detail-footer">
                <div className="cf-article-detail-makes">
                  Related Truck Makes:{" "}
                  {guide.relatedTruckBrands.map((b, idx) => (
                    <span key={b}>
                      {idx > 0 && ", "}
                      <Link href={`/shop?make=${encodeURIComponent(b)}`} className="cf-article-detail-link">
                        {b}
                      </Link>
                    </span>
                  ))}
                </div>
                <Link href="/guides" className="btn btn-sm btn-secondary">
                  ← Back to All Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
