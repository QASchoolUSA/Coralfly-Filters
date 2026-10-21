import Link from "next/link";

export function PromoBar() {
  return <div className="announcement-bar"><div className="announcement-bar__inner"><p className="announcement-bar__offer">Direct commercial delivery</p><span aria-hidden="true">·</span><p>Same-day processing before 2pm <Link href="/shop">Shop now</Link></p></div></div>;
}
