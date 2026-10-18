"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Force manual scroll restoration so browsers do not preserve previous scroll offset
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const site = document.querySelector(".site");
      if (site) site.scrollTop = 0;
      const siteBody = document.querySelector(".site__body");
      if (siteBody) siteBody.scrollTop = 0;
    };

    // 1. Immediate sync execution
    resetScroll();

    // 2. Next animation frame (after React commit and layout paint)
    const frameId = requestAnimationFrame(resetScroll);

    // 3. Backup timeout for mobile Safari / Chrome dynamic URL bar and layout recalculation
    const timeoutId = setTimeout(resetScroll, 60);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]);

  return null;
}
