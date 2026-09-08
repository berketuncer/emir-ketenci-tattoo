import type { Metadata } from "next";
import { artist } from "@/data/artist";
import { faqItems } from "@/data/faq";
import { fullAddress, site } from "@/data/site";

const OG_IMAGE = "/og.png";

interface PageMetaInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
}

/** Sayfa bazlı metadata üretir; başlık şablonu layout tarafından uygulanır. */
export function pageMeta({ title, description, path = "/", image = OG_IMAGE, type = "website" }: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  // Başlık zaten marka adını içeriyorsa tekrar eklenmez.
  const socialTitle = title.includes(site.name) ? title : `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

/** Stüdyo için schema.org TattooParlor verisi. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "@id": `${site.url}#studio`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    description: site.description,
    image: new URL(OG_IMAGE, site.url).toString(),
    priceRange: "₺₺",
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.district}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    openingHoursSpecification: site.hours
      .filter((h) => !("closed" in h && h.closed))
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.value.split("–")[0]?.trim(),
        closes: h.value.split("–")[1]?.trim(),
      })),
    sameAs: site.social.map((s) => s.href),
    founder: {
      "@type": "Person",
      name: artist.name,
      jobTitle: artist.role,
      url: new URL("/hakkimda", site.url).toString(),
    },
    employee: {
      "@type": "Person",
      name: artist.name,
      jobTitle: artist.role,
      url: new URL("/hakkimda", site.url).toString(),
    },
    areaServed: { "@type": "City", name: "İstanbul" },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    jobTitle: artist.role,
    description: artist.tagline,
    url: new URL("/hakkimda", site.url).toString(),
    image: new URL(artist.portrait.src, site.url).toString(),
    worksFor: { "@type": "TattooParlor", name: site.legalName, "@id": `${site.url}#studio` },
    sameAs: [artist.instagram, ...site.social.map((s) => s.href)],
    knowsAbout: [...artist.focusStyles, ...artist.otherStyles],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export const addressText = fullAddress;
