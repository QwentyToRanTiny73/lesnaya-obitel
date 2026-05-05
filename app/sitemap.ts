import type { MetadataRoute } from "next";
import domiki from "@/lib/data/domiki.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://lesnaya-obitel.ru";
  const now = new Date();

  const staticPages = [
    "/",
    "/domiki",
    "/aktivnosti",
    "/degustacii",
    "/akvazona",
    "/pitanie",
    "/kontakty",
    "/bron",
    "/prays",
  ];

  return [
    ...staticPages.map((url) => ({
      url: `${base}${url}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: url === "/" ? 1 : 0.8,
    })),
    ...domiki.map((d) => ({
      url: `${base}/domiki/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
