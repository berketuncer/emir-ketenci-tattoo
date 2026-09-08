"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import Media from "@/components/ui/Media";
import { ArrowLeft, ArrowRight, Close } from "@/components/ui/Icons";
import { styleName } from "@/data/styles";
import type { Work } from "@/data/types";

interface LightboxProps {
  works: Work[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ works, index, onClose, onNavigate }: LightboxProps) {
  const work = works[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (delta: number) => onNavigate((index + delta + works.length) % works.length),
    [index, works.length, onNavigate],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => dialogRef.current?.querySelector("button")?.focus(), 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      previouslyFocused?.focus?.();
    };
  }, [go, onClose]);

  if (!work) return null;

  const meta = [
    { label: "Tarz", value: styleName(work.style), href: `/stiller/${work.style}` },
    { label: "Bölge", value: work.placement },
    { label: "Ölçü", value: work.size },
    { label: "Palet", value: work.palette === "renkli" ? "Renkli" : "Siyah – gri" },
    { label: "Seans", value: `${work.sessions} seans` },
    { label: "Yıl", value: String(work.year) },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} — çalışma detayı`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/[0.97] backdrop-blur-xl animate-fade-in"
      onTouchStart={(event) => {
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <button
        type="button"
        aria-label="Kapat"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
        tabIndex={-1}
      />

      <div
        ref={dialogRef}
        className="relative z-10 flex h-dvh w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:h-auto lg:max-h-[92dvh]"
      >
        <div className="flex items-center justify-between pb-4">
          <p className="type-eyebrow">
            {String(index + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] text-bone transition-colors hover:bg-bone/10"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Önceki çalışma</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] text-bone transition-colors hover:bg-bone/10"
            >
              <ArrowRight className="h-5 w-5" />
              <span className="sr-only">Sonraki çalışma</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-1 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] text-bone transition-colors hover:bg-bone/10"
            >
              <Close className="h-5 w-5" />
              <span className="sr-only">Kapat</span>
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:overflow-visible">
          <Media
            key={work.id}
            src={work.media.src}
            alt={work.media.alt}
            ratio={work.media.ratio}
            priority
            className="mx-auto max-h-[60dvh] w-auto max-w-full rounded-sm lg:max-h-[76dvh]"
            imgClassName="object-contain"
          />

          <div className="flex flex-col pb-6">
            <h2 className="type-h3 text-bone">{work.title}</h2>
            {work.coverUp ? (
              <p className="type-eyebrow mt-3 text-ember-bright">Kapatma çalışması</p>
            ) : null}
            {work.note ? <p className="type-body mt-4 text-[0.9375rem]">{work.note}</p> : null}

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--hairline)] pt-6">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="type-eyebrow text-[0.625rem]">{item.label}</dt>
                  <dd className="mt-1.5 text-sm text-bone">
                    {item.href ? (
                      <Link href={item.href} className="link-underline" onClick={onClose}>
                        {item.value}
                      </Link>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/randevu?stil=${work.style}`}
              onClick={onClose}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              Benzer bir çalışma için randevu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
