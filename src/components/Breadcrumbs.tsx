import Link from "next/link";

export type BreadcrumbItem = { name: string; href?: string };

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return <nav className={`breadcrumbs${className ? ` ${className}` : ""}`} aria-label="Breadcrumb"><ol className="breadcrumbs__list">{items.map((item, index) => <li key={`${item.name}-${index}`} className="breadcrumbs__item">{item.href ? <Link href={item.href} className="breadcrumbs__link">{item.name}</Link> : <span className="breadcrumbs__current" aria-current={index === items.length - 1 ? "page" : undefined}>{item.name}</span>}{index < items.length - 1 ? <span className="breadcrumbs__sep" aria-hidden="true">/</span> : null}</li>)}</ol></nav>;
}
