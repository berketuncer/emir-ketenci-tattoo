"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "@/components/ui/Icons";
import { fullAddress, mapsLink, site } from "@/data/site";

const { lat, lng } = site.address.geo;
const delta = 0.004;
const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lng}`;

/**
 * Harita, kullanıcı istemeden yüklenmez: varsayılan durumda hiçbir dış istek
 * yapılmaz, "Haritayı yükle" denince OpenStreetMap gömülür (ücretsiz, anahtarsız).
 */
export default function MapBlock() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--hairline)] bg-ink-800 sm:aspect-[16/10]">
      {loaded ? (
        <iframe
          src={embedSrc}
          title={`${site.name} konumu — OpenStreetMap`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 [filter:invert(1)_hue-rotate(180deg)_grayscale(0.55)_contrast(0.92)_brightness(0.88)]"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--hairline)_1px,transparent_1px),linear-gradient(90deg,var(--hairline)_1px,transparent_1px)] [background-size:44px_44px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(60%_50%_at_50%_45%,rgba(194,96,58,0.14),transparent_70%)]"
          />
          <MapPin className="relative h-8 w-8 text-ember" />
          <p className="relative max-w-xs text-sm text-ash">{fullAddress}</p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex h-11 items-center rounded-full border border-[var(--hairline-strong)] px-5 text-sm text-bone transition-colors hover:bg-bone/[0.06]"
            >
              Haritayı yükle
            </button>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm text-ash transition-colors hover:text-bone"
            >
              Yeni sekmede aç
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="relative text-[0.6875rem] text-ash-deep">
            Harita yalnızca siz isteyince yüklenir.
          </p>
        </div>
      )}
    </div>
  );
}
