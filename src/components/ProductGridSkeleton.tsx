export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return <div className="product-grid">{Array.from({ length: count }).map((_, index) => <div key={index} className="product-skeleton" aria-hidden="true"><div className="product-skeleton__image" /><div className="product-skeleton__line product-skeleton__line--short" /><div className="product-skeleton__line" /><div className="product-skeleton__line product-skeleton__line--medium" /></div>)}</div>;
}
