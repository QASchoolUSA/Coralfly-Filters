"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  category?: string;
  price: number;
  currency: string;
  image?: { url: string; alt?: string };
  inStock?: boolean;
};

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const debounce = useRef<number | null>(null);

  const search = useCallback(async (term: string) => {
    const value = term.trim();
    if (value.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await response.json() as { results?: SearchResult[] };
      setResults(data.results ?? []);
      setSearched(true);
    } catch {
      setResults([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSearched(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => input.current?.focus(), 80);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => () => {
    if (debounce.current) window.clearTimeout(debounce.current);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (debounce.current) window.clearTimeout(debounce.current);
    debounce.current = window.setTimeout(() => void search(value), 250);
  }

  if (!isOpen) return null;
  const allResultsHref = `/shop?search=${encodeURIComponent(query.trim())}`;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search products">
      <button type="button" className="search-overlay__backdrop" onClick={onClose} aria-label="Close search" />
      <div className="search-overlay__panel">
        <div className="search-overlay__header">
          <div className="search-overlay__input-wrap">
            <SearchIcon />
            <input
              ref={input}
              className="search-overlay__input"
              type="search"
              value={query}
              onChange={(event) => handleChange(event.target.value)}
              placeholder="Search by part number, product name, or truck make..."
              autoComplete="off"
              spellCheck={false}
            />
            {query ? <button type="button" className="search-overlay__input-clear" onClick={() => handleChange("")} aria-label="Clear search">×</button> : null}
          </div>
          <button type="button" className="search-overlay__close" onClick={onClose} aria-label="Close search"><CloseIcon /></button>
        </div>
        <div className="search-overlay__body" aria-live="polite">
          {loading ? <div className="search-overlay__loading"><span className="search-overlay__spinner" />Searching...</div> : null}
          {!loading && query.trim().length < 2 ? <div className="search-overlay__hint"><SearchIcon /><p>Enter a part number, product name, or truck make to search</p></div> : null}
          {!loading && searched && results.length === 0 ? <div className="search-overlay__empty"><p>No results found for <strong>&ldquo;{query}&rdquo;</strong></p><span>Try a different part number, product name, or truck make.</span></div> : null}
          {!loading && results.length > 0 ? <>
            <p className="search-overlay__count">{results.length} matching products</p>
            <div className="search-overlay__results">
              {results.map((product) => <Link key={product.id} href={`/shop/${product.slug}`} className="search-result" onClick={onClose}>
                <div className="search-result__image">{product.image ? <Image src={product.image.url} alt={product.image.alt || product.name} width={72} height={72} /> : <SearchIcon />}</div>
                <div className="search-result__info">
                  <span className="search-result__name">{product.name}</span>
                  {product.sku ? <span className="search-result__part">SKU {product.sku}</span> : null}
                  <span className="search-result__category">{product.category ?? "Filter"}</span>
                </div>
                <div className="search-result__right"><span className="search-result__price">{formatPrice(product.price, product.currency)}</span><ArrowIcon /></div>
              </Link>)}
            </div>
            <Link href={allResultsHref} className="search-overlay__all-results" onClick={onClose}>View all results <ArrowIcon /></Link>
          </> : null}
        </div>
      </div>
    </div>
  );
}

export function SearchIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
}

function CloseIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12" /></svg>;
}

function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}
