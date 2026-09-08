import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { styles } from "@/data/styles";

/**
 * Site haritası.
 *
 * İçerik `src/data` altından gelir; yeni bir tarz eklendiğinde bu dosyaya
 * dokunmaya gerek kalmaz.
 */

/** Demo içerik sabit olduğu için tek bir yayın tarihi kullanılır. */
const lastModified = new Date("2026-09-01");

const abs = (path: string) => new URL(path, site.url).toString();

type Entry = MetadataRoute.Sitemap[number];

const entry = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"],
): Entry => ({
  url: abs(path),
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    entry("/", 1, "weekly"),
    entry("/calismalar", 0.9, "weekly"),
    entry("/randevu", 0.9, "monthly"),
    entry("/hakkimda", 0.8, "monthly"),
    entry("/stiller", 0.8, "monthly"),
    entry("/studyo", 0.7, "monthly"),
    entry("/iletisim", 0.7, "monthly"),
    entry("/sss", 0.6, "monthly"),
    entry("/bakim", 0.6, "yearly"),
    entry("/hediye-karti", 0.5, "yearly"),
  ];

  const stylePages: MetadataRoute.Sitemap = styles.map((style) =>
    entry(`/stiller/${style.slug}`, 0.6, "monthly"),
  );

  const legalPages: MetadataRoute.Sitemap = site.legalNav.map((item) =>
    entry(item.href, 0.2, "yearly"),
  );

  return [...core, ...stylePages, ...legalPages];
}
