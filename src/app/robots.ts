import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl =
    rawUrl && !rawUrl.includes("localhost")
      ? rawUrl.replace(/\/$/, "")
      : "https://coralflyfilters.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/cart",
          "/checkout/",
          "/order-success",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
