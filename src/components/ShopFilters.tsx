"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { getCategoryIcon } from "@/components/CategoryIcons";
import type { Product } from "@/sanity/types";

type Props = { products: Product[]; categories: string[] };

function slugify(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function uniqueValues(values: (string | undefined)[]) {
  const names = new Map<string, string>();
  for (const value of values) {
    const normalized = value?.trim();
    if (normalized && !names.has(normalized.toLocaleLowerCase())) {
      names.set(normalized.toLocaleLowerCase(), normalized);
    }
  }
  return [...names.values()].sort((a, b) => a.localeCompare(b));
}

function getMakes(products: Product[]) {
  return uniqueValues(products.flatMap((product) => product.compatibleMakes ?? []));
}

function getModels(products: Product[], make: string) {
  if (make === "all") return [];
  return uniqueValues(products.flatMap((product) =>
    (product.fitmentDetails ?? [])
      .filter((fitment) => fitment.brand.toLocaleLowerCase() === make.toLocaleLowerCase())
      .flatMap((fitment) => fitment.models ?? []),
  ));
}

function getEngines(products: Product[], make: string, model: string) {
  if (make === "all") return [];
  return uniqueValues(products.flatMap((product) =>
    (product.fitmentDetails ?? [])
      .filter((fitment) => fitment.brand.toLocaleLowerCase() === make.toLocaleLowerCase())
      .filter((fitment) => model === "all" || fitment.models?.some((value) => value.toLocaleLowerCase() === model.toLocaleLowerCase()))
      .flatMap((fitment) => fitment.engines ?? []),
  ));
}

function findOption(options: string[], requested?: string | null) {
  const value = requested?.trim();
  if (!value) return "all";
  return options.find((option) => option.toLocaleLowerCase() === value.toLocaleLowerCase()) ?? "all";
}

export function ShopFilters({ products, categories }: Props) {
  const layoutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const searchParamsKey = params.toString();
  const requestedCategory = params.get("category") ?? "";
  const category = categories.includes(requestedCategory) ? requestedCategory : "all";
  const makes = useMemo(() => getMakes(products), [products]);
  const requestedMake = params.get("make")?.trim();
  const matchingMake = findOption(makes, requestedMake);
  const make = matchingMake !== "all"
    ? matchingMake
    : requestedMake || "all";
  const models = useMemo(() => getModels(products, make), [products, make]);
  const model = findOption(models, params.get("model"));
  const engines = useMemo(() => getEngines(products, make, model), [products, make, model]);
  const engine = findOption(engines, params.get("engine"));
  const sort = params.get("sort") ?? "default";
  const [query, setQuery] = useState(params.get("search") ?? params.get("q") ?? "");
  const [stockOnly, setStockOnly] = useState(params.get("inStock") === "1");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParamsKey);
    setQuery(currentParams.get("search") ?? currentParams.get("q") ?? "");
  }, [searchParamsKey]);

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && !layoutRef.current?.contains(event.target)) {
        layoutRef.current?.querySelectorAll("details[open]").forEach((details) => details.removeAttribute("open"));
      }
    };
    document.addEventListener("mousedown", closeOutside);
    return () => document.removeEventListener("mousedown", closeOutside);
  }, []);

  const categoryCounts = useMemo(
    () => Object.fromEntries(categories.map((name) => [name, products.filter((product) => product.category === name).length])),
    [categories, products],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    let result = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const makeFitments = (product.fitmentDetails ?? []).filter(
        (fitment) => fitment.brand.toLocaleLowerCase() === make.toLocaleLowerCase(),
      );
      const matchesMake = make === "all" || product.compatibleMakes?.some(
        (value) => value.toLocaleLowerCase() === make.toLocaleLowerCase(),
      ) === true;
      const modelFitments = model === "all"
        ? makeFitments
        : makeFitments.filter((fitment) => fitment.models?.some(
          (value) => value.toLocaleLowerCase() === model.toLocaleLowerCase(),
        ));
      const matchesModel = model === "all" || modelFitments.length > 0;
      const matchesEngine = engine === "all" || modelFitments.some((fitment) => fitment.engines?.some(
        (value) => value.toLocaleLowerCase() === engine.toLocaleLowerCase(),
      ));
      const fitmentSearchTerms = (product.fitmentDetails ?? []).flatMap((fitment) => [
        fitment.brand,
        ...(fitment.models ?? []),
        ...(fitment.engines ?? []),
        fitment.notes,
      ]);
      const searchable = [
        product.name,
        product.sku,
        product.category,
        product.description,
        product.details,
        product.brand,
        ...(product.compatibleMakes ?? []),
        ...fitmentSearchTerms,
        ...(product.crossReferences ?? []),
      ].filter(Boolean).join(" ").toLocaleLowerCase();
      const matchesSearch = !term || searchable.includes(term);
      const matchesStock = !stockOnly || product.inStock === true;
      const matchesMin = minPrice === "" || product.price >= Number(minPrice);
      const matchesMax = maxPrice === "" || product.price <= Number(maxPrice);
      return matchesCategory && matchesMake && matchesModel && matchesEngine && matchesSearch && matchesStock && matchesMin && matchesMax;
    });
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    else result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
    return result;
  }, [products, query, category, make, model, engine, stockOnly, minPrice, maxPrice, sort]);

  function setUrlFilters(
    nextCategory = category,
    nextMake = make,
    nextModel = model,
    nextEngine = engine,
    nextSort = sort,
  ) {
    const next = new URLSearchParams(params.toString());
    if (nextCategory === "all") next.delete("category"); else next.set("category", nextCategory);
    if (nextMake === "all") next.delete("make"); else next.set("make", nextMake);
    if (nextModel === "all") next.delete("model"); else next.set("model", nextModel);
    if (nextEngine === "all") next.delete("engine"); else next.set("engine", nextEngine);
    if (nextSort === "default") next.delete("sort"); else next.set("sort", nextSort);
    const search = query.trim();
    if (search) next.set("search", search); else next.delete("search");
    const suffix = next.toString();
    router.replace(suffix ? `${pathname}?${suffix}` : pathname, { scroll: false });
  }

  const hasFilters = category !== "all" || make !== "all" || model !== "all" || engine !== "all" || query || sort !== "default" || stockOnly || minPrice || maxPrice;
  const clear = () => {
    setQuery("");
    setStockOnly(false);
    setMinPrice("");
    setMaxPrice("");
    router.replace(pathname, { scroll: false });
  };

  const selectedTruck = [make, model, engine].filter((value) => value !== "all").join(" ");
  const emptyMessage = selectedTruck
    ? `No products match ${selectedTruck} and these filters.`
    : "No products match your filters.";

  return <div className="shop-layout" ref={layoutRef}>
    <div className="shop-chips" role="group" aria-label="Filter by category">
      <button type="button" className={`shop-chip${category === "all" ? " shop-chip--active" : ""}`} onClick={() => { setUrlFilters("all"); }}>
        <span className="shop-chip__icon"><GridIcon /></span><span className="shop-chip__label">All</span><span className="shop-chip__count">{products.length}</span>
      </button>
      {categories.map((name) => <button type="button" key={name} className={`shop-chip${category === name ? " shop-chip--active" : ""}`} onClick={() => { setUrlFilters(name); }}>
        <span className="shop-chip__icon">{getCategoryIcon(slugify(name), 20)}</span><span className="shop-chip__label">{name}</span><span className="shop-chip__count">{categoryCounts[name] ?? 0}</span>
      </button>)}
    </div>

    <div className="shop-toolbar">
      <div className="shop-toolbar__left">
        <p className="shop-toolbar__count"><strong>{filtered.length}</strong> product{filtered.length === 1 ? "" : "s"}</p>
        {hasFilters ? <button className="shop-toolbar__clear" type="button" onClick={clear}>Clear all</button> : null}
      </div>
      <div className="shop-toolbar__right">
        <label className="shop-toggle"><input type="checkbox" checked={stockOnly} onChange={(event) => setStockOnly(event.target.checked)} /><span className="shop-toggle__track"><span className="shop-toggle__thumb" /></span><span className="shop-toggle__text">In Stock</span></label>
        <div className="shop-fitment-filters" aria-label="Filter by truck fitment">
          <label className="shop-fitment-field"><span>Make</span><span className="shop-select-control">
            <select aria-label="Truck make" value={make} onChange={(event) => {
              const value = event.target.value;
              setUrlFilters(category, value, "all", "all");
            }}>
              <option value="all">All Makes</option>
              {make !== "all" && !makes.some((value) => value.toLocaleLowerCase() === make.toLocaleLowerCase()) ? <option value={make}>{make} (no tagged products)</option> : null}
              {makes.map((value) => <option value={value} key={value}>{value}</option>)}
            </select>
          </span></label>
          <label className="shop-fitment-field"><span>Model</span><span className="shop-select-control">
            <select aria-label="Truck model" value={model} disabled={make === "all" || models.length === 0} onChange={(event) => {
              const value = event.target.value;
              setUrlFilters(category, make, value, "all");
            }}>
              <option value="all">All Models</option>
              {models.map((value) => <option value={value} key={value}>{value}</option>)}
            </select>
          </span></label>
          <label className="shop-fitment-field"><span>Engine</span><span className="shop-select-control">
            <select aria-label="Truck engine" value={engine} disabled={make === "all" || engines.length === 0} onChange={(event) => {
              const value = event.target.value;
              setUrlFilters(category, make, model, value);
            }}>
              <option value="all">All Engines</option>
              {engines.map((value) => <option value={value} key={value}>{value}</option>)}
            </select>
          </span></label>
        </div>
        <details className="shop-sort shop-price-control">
          <summary className={`shop-sort__trigger${minPrice || maxPrice ? " shop-sort__trigger--filtered" : ""}`} aria-label="Filter by price"><CurrencyIcon /><span className="shop-sort__label">{minPrice || maxPrice ? `$${minPrice || "0"} – $${maxPrice || "∞"}` : "Price"}</span><ChevronIcon /></summary>
          <div className="shop-sort__menu shop-price-menu">
            <div className="shop-price__header">Price Range</div>
            <div className="shop-price__inputs"><div className="shop-price__field"><div className="shop-price__input-wrap"><span className="shop-price__currency">$</span><input className="shop-price__input" type="number" min="0" step="any" placeholder="Min" aria-label="Minimum price" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} /></div><label className="shop-price__label">Min</label></div><span className="shop-price__separator">–</span><div className="shop-price__field"><div className="shop-price__input-wrap"><span className="shop-price__currency">$</span><input className="shop-price__input" type="number" min="0" step="any" placeholder="Max" aria-label="Maximum price" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} /></div><label className="shop-price__label">Max</label></div></div>
            <div className="shop-price__actions"><button type="button" className="shop-price__clear" onClick={(event) => { setMinPrice(""); setMaxPrice(""); event.currentTarget.closest("details")?.removeAttribute("open"); }}>Clear</button><button type="button" className="shop-price__apply" onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>Apply</button></div>
          </div>
        </details>
        <details className="shop-sort shop-filter-dropdown">
          <summary className="shop-sort__trigger" aria-label="Sort products"><SortIcon /><span className="shop-sort__label">{sort === "price-asc" ? "Price: Low → High" : sort === "price-desc" ? "Price: High → Low" : sort === "name" ? "Name: A → Z" : "Default"}</span><ChevronIcon /></summary>
          <div className="shop-sort__menu" role="listbox" aria-label="Sort order">{[["default", "Default"], ["price-asc", "Price: Low → High"], ["price-desc", "Price: High → Low"], ["name", "Name: A → Z"]].map(([value, label]) => <button type="button" key={value} className={`shop-sort__option${sort === value ? " shop-sort__option--active" : ""}`} role="option" aria-selected={sort === value} onClick={(event) => { setUrlFilters(category, make, model, engine, value); event.currentTarget.closest("details")?.removeAttribute("open"); }}><CheckMark active={sort === value} /><span>{label}</span></button>)}</div>
        </details>
      </div>
    </div>
    <label className="shop-search">
      <SearchGlyph />
      <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by part number, product name, make, model, or engine..." aria-label="Search by part number, product name, truck make, model, or engine" />
      {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button> : null}
    </label>
    <ProductGrid products={filtered} emptyMessage={emptyMessage} />
  </div>;
}

function GridIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
}

function SearchGlyph() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
}

function CheckMark({ active }: { active: boolean }) { return <svg className="shop-sort__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ opacity: active ? 1 : 0 }}><path d="m5 12 4 4L19 6" /></svg>; }
function ChevronIcon() { return <svg className="shop-sort__chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>; }
function CurrencyIcon() { return <svg className="shop-sort__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>; }
function SortIcon() { return <svg className="shop-sort__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M3 6h18M6 12h12M9 18h6" /></svg>; }
