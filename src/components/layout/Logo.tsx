import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Marka işareti. Soldaki mühür, iğnenin bıraktığı izi soyutlar;
 * yanındaki isim stüdyonun tek kişilik olduğunu doğrudan söyler.
 */
export default function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} ana sayfa`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 shrink-0 text-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[24deg]"
        aria-hidden
      >
        <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <path d="M20 6.5v27" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3.6" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-display)] text-[1.0625rem] leading-none tracking-[0.01em] transition-opacity duration-300 group-hover:opacity-85 sm:text-[1.1875rem]">
          {site.name}
        </span>
        {!compact ? (
          <span className="type-eyebrow mt-1.5 text-[0.5rem] tracking-[0.28em] text-ash">
            DÖVME · İSTANBUL
          </span>
        ) : null}
      </span>
    </Link>
  );
}
