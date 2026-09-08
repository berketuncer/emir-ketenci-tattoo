import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * robots.txt — sitenin tamamı taranabilir. Yasal sayfalar kendi metadata'ları
 * üzerinden `noindex` işaretlidir.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
