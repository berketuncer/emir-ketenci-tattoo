"use client";

import { useMemo, useState } from "react";
import Lightbox from "./Lightbox";
import Reveal from "@/components/ui/Reveal";
import Media from "@/components/ui/Media";
import { ArrowUpRight } from "@/components/ui/Icons";
import { styleName, styles } from "@/data/styles";
import type { StyleSlug, Work } from "@/data/types";
import { cn } from "@/lib/utils";

interface WorkGalleryProps {
  works: Work[];
  /** Stil filtresi çubuğunu göster. */
  filterable?: boolean;
  /** Bir seferde gösterilecek çalışma sayısı; kalanı "daha fazla" ile gelir. */
  pageSize?: number;
  columns?: "two" | "three" | "four";
  className?: string;
}

const columnClasses = {
  two: "columns-1 sm:columns-2",
  three: "columns-2 lg:columns-3",
  four: "columns-2 lg:columns-3 xl:columns-4",
};

export default function WorkGallery({
  works,
  filterable = false,
  pageSize,
  columns = "three",
  className,
}: WorkGalleryProps) {
  const [active, setActive] = useState<StyleSlug | "all">("all");
  const [visible, setVisible] = useState(pageSize ?? works.length);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const availableStyles = useMemo(() => {
    const present = new Set(works.map((work) => work.style));
    return styles
      .filter((style) => present.has(style.slug))
      .map((style) => ({
        slug: style.slug,
        name: style.name,
        count: works.filter((work) => work.style === style.slug).length,
      }));
  }, [works]);

  const filtered = useMemo(
    () => (active === "all" ? works : works.filter((work) => work.style === active)),
    [works, active],
  );

  const shown = filtered.slice(0, visible);
  const hasMore = shown.length < filtered.length;

  const selectStyle = (slug: StyleSlug | "all") => {
    setActive(slug);
    setVisible(pageSize ?? works.length);
  };

  return (
    <div className={className}>
      {filterable ? (
        <div className="mb-10 border-y border-[var(--hairline)] py-4">
          <div
            role="group"
            aria-label="Tarza göre filtrele"
            className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1"
          >
            <FilterChip
              active={active === "all"}
              onClick={() => selectStyle("all")}
              label="Tümü"
              count={works.length}
            />
            {availableStyles.map((style) => (
              <FilterChip
                key={style.slug}
                active={active === style.slug}
                onClick={() => selectStyle(style.slug)}
                label={style.name}
                count={style.count}
              />
            ))}
          </div>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="border border-dashed border-[var(--hairline-strong)] px-6 py-20 text-center">
          <p className="type-h3 text-bone">Bu tarzda henüz paylaşılmış iş yok.</p>
          <p className="type-body mx-auto mt-3 max-w-md">
            Arşivimde var ama sayfaya henüz eklemedim. Aklınızdaki fikri yazın, benzer çalışmalarımı
            doğrudan göndereyim.
          </p>
          <button
            type="button"
            onClick={() => selectStyle("all")}
            className="mt-6 text-sm text-ember-bright underline underline-offset-4"
          >
            Tüm çalışmalara dön
          </button>
        </div>
      ) : (
        <>
          <ul className={cn(columnClasses[columns], "gap-4 [&>li]:mb-4")}>
            {shown.map((work, index) => (
              <li key={work.id} className="break-inside-avoid">
                <Reveal delay={(index % 6) * 60}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(filtered.indexOf(work))}
                    className="group relative block w-full overflow-hidden text-left"
                    aria-label={`${work.title} çalışmasını büyüt`}
                  >
                    <Media
                      src={work.media.src}
                      alt={work.media.alt}
                      ratio={work.media.ratio}
                      priority={index < 3}
                      imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-bone">{work.title}</span>
                        <span className="mt-1 block truncate font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ash">
                          {styleName(work.style)} · {work.placement}
                        </span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-bone" />
                    </span>
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>

          {hasMore ? (
            <div className="mt-12 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setVisible((value) => value + (pageSize ?? 12))}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--hairline-strong)] px-8 text-sm text-bone transition-colors hover:bg-bone/[0.06]"
              >
                Daha fazla göster
              </button>
              <p className="type-eyebrow">
                {shown.length} / {filtered.length} çalışma
              </p>
            </div>
          ) : null}
        </>
      )}

      {lightboxIndex !== null ? (
        <Lightbox
          works={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[0.8125rem] transition-all duration-300",
        active
          ? "border-bone bg-bone text-ink"
          : "border-[var(--hairline)] text-ash hover:border-[var(--hairline-strong)] hover:text-bone",
      )}
    >
      {label}
      <span className={cn("font-mono text-[0.625rem]", active ? "text-ink/65" : "text-ash-deep")}>
        {count}
      </span>
    </button>
  );
}
