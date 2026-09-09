import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Web app manifest. Siteyi ana ekrana ekleyen ziyaretçi, koyu zeminli bir
 * açılış ve marka mührüyle karşılaşır.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${site.name} — Dövme ve Tasarım Stüdyosu · İstanbul`,
    short_name: site.name,
    description: site.shortDescription,
    lang: "tr",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#08080a",
    theme_color: "#08080a",
    categories: ["lifestyle", "art", "design"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
