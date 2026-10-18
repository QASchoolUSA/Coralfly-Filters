"use client";

import React from "react";
import { PortableText } from "next-sanity";
import type { PortableTextComponents, PortableTextBlock } from "@portabletext/react";
import type { Product } from "@/sanity/types";

type Props = {
  product: Product;
  mode?: "excerpt" | "full";
  onSeeFull?: () => void;
};

interface BlockChild {
  text?: string;
  _type?: string;
}

interface CustomBlock {
  style?: string;
  children?: BlockChild[];
  listItem?: string;
  [key: string]: unknown;
}

const excerptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="product-excerpt__p">{children}</p>,
    h3: ({ children }) => <h4 className="product-excerpt__h4">{children}</h4>,
    h4: ({ children }) => <h5 className="product-excerpt__h4">{children}</h5>,
  },
  list: {
    bullet: ({ children }) => <ul className="product-excerpt__ul">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="product-excerpt__li">
        <span className="product-excerpt__bullet">✓</span>
        <span className="product-excerpt__li-text">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="product-excerpt__strong">{children}</strong>
    ),
  },
};

const fullComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="product-full-desc__p">{children}</p>,
    h3: ({ children }) => <h3 className="product-full-desc__h3">{children}</h3>,
    h4: ({ children }) => <h4 className="product-full-desc__h4">{children}</h4>,
  },
  list: {
    bullet: ({ children }) => <ul className="product-full-desc__ul">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="product-full-desc__li">
        <span className="product-full-desc__bullet">✓</span>
        <span className="product-full-desc__li-text">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="product-full-desc__strong">{children}</strong>
    ),
  },
};

function filterRedundantLeadingTitle(blocks: CustomBlock[], productName: string): CustomBlock[] {
  if (!blocks || !blocks.length) return [];
  const first = blocks[0];
  if (first && (first.style === "h3" || first.style === "h2" || first.style === "h1")) {
    const text = (first.children || [])
      .map((c) => c.text || "")
      .join("")
      .trim()
      .toLowerCase();
    const cleanName = productName.trim().toLowerCase();
    if (text === cleanName || text.includes(cleanName) || cleanName.includes(text)) {
      return blocks.slice(1);
    }
  }
  return blocks;
}

function splitExcerptBlocks(blocks: CustomBlock[], productName: string) {
  const cleaned = filterRedundantLeadingTitle(blocks, productName);
  if (cleaned.length <= 6) {
    return { excerptBlocks: cleaned, hasMore: false };
  }
  let cutIndex = -1;
  for (let i = 1; i < cleaned.length; i++) {
    if (cleaned[i].style === "h3" && i >= 4) {
      cutIndex = i;
      break;
    }
  }
  if (cutIndex === -1) cutIndex = 6;
  return {
    excerptBlocks: cleaned.slice(0, cutIndex),
    hasMore: cleaned.length > cutIndex,
  };
}

export function ProductDescription({ product, mode = "excerpt", onSeeFull }: Props) {
  const rawBlocks = Array.isArray(product.descriptionRaw) && product.descriptionRaw.length
    ? (product.descriptionRaw as CustomBlock[])
    : null;

  // Case 1: Rich PortableText blocks from Sanity
  if (rawBlocks) {
    if (mode === "excerpt") {
      const { excerptBlocks, hasMore } = splitExcerptBlocks(rawBlocks, product.name);
      return (
        <div className="product-excerpt-flow">
          <PortableText value={excerptBlocks as unknown as PortableTextBlock[]} components={excerptComponents} />
          {hasMore && onSeeFull && (
            <div className="product-excerpt__more-wrap">
              <button
                type="button"
                className="product-excerpt__more-btn"
                onClick={onSeeFull}
              >
                <span>Read Full Specifications & Fitment Notes</span>
                <span className="product-excerpt__more-arrow">↓</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    // Full mode for Description tab
    const fullBlocks = filterRedundantLeadingTitle(rawBlocks, product.name);
    return (
      <div className="product-full-desc-flow">
        <PortableText value={fullBlocks as unknown as PortableTextBlock[]} components={fullComponents} />
      </div>
    );
  }

  // Case 2: Fallback for string description or empty
  const text = (product.description || "").trim();
  if (!text) {
    return (
      <p className="product-excerpt__p">
        Heavy-duty commercial grade filtration engineered with high-dirt-holding synthetic media.
        Guaranteed fitment, maximum service life, and optimal fluid flow under rigorous hauling conditions.
      </p>
    );
  }

  // Split plain text by double newlines or single newlines
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (mode === "excerpt") {
    const displayed = paragraphs.length > 2 ? paragraphs.slice(0, 2) : paragraphs;
    const hasMore = paragraphs.length > 2;
    return (
      <div className="product-excerpt-flow">
        {displayed.map((para, i) => (
          <p key={i} className="product-excerpt__p">
            {para}
          </p>
        ))}
        {hasMore && onSeeFull && (
          <div className="product-excerpt__more-wrap">
            <button
              type="button"
              className="product-excerpt__more-btn"
              onClick={onSeeFull}
            >
              <span>Read Full Specifications & Fitment Notes</span>
              <span className="product-excerpt__more-arrow">↓</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="product-full-desc-flow">
      {paragraphs.map((para, i) => (
        <p key={i} className="product-full-desc__p">
          {para}
        </p>
      ))}
    </div>
  );
}
