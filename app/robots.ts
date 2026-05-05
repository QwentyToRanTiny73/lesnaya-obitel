import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://lesnaya-obitel.ru";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/bron/success"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
