import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  /** Sağ tarafta gösterilecek görsel ya da bilgi bloğu. */
  aside?: ReactNode;
  className?: string;
  size?: "md" | "lg";
}

/**
 * İç sayfaların ortak başlık bloğu. Ana sayfadaki hero ile aynı dili konuşur
 * ama daha sakin bir yükseklikte durur.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  aside,
  className,
  size = "md",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-[var(--hairline)]",
        size === "lg" ? "pb-16 pt-32 sm:pb-20 sm:pt-40" : "pb-12 pt-28 sm:pb-16 sm:pt-36",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(243,240,234,0.055),transparent_65%)]"
      />
      <div className="container-page">
        <div className={cn("grid gap-10", aside ? "lg:grid-cols-12 lg:items-end" : "")}>
          <div className={cn(aside ? "lg:col-span-7" : "max-w-3xl")}>
            {crumbs?.length ? (
              <nav aria-label="Konum" className="-mt-2 mb-5">
                <ol className="flex flex-wrap items-center gap-x-2">
                  {crumbs.map((crumb, index) => (
                    <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                      {index > 0 ? (
                        <span aria-hidden className="text-ash-deep">
                          /
                        </span>
                      ) : null}
                      {crumb.href ? (
                        <Link
                          href={crumb.href}
                          className="type-eyebrow inline-flex min-h-11 items-center transition-colors hover:text-bone"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="type-eyebrow inline-flex min-h-11 items-center text-ash">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <Reveal>
              {eyebrow ? (
                <p className="type-eyebrow mb-6 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                  {eyebrow}
                </p>
              ) : null}
              <h1 className={size === "lg" ? "type-display" : "type-h1"}>{title}</h1>
              {description ? <div className="type-lead mt-6 max-w-2xl">{description}</div> : null}
              {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
            </Reveal>
          </div>

          {aside ? <div className="lg:col-span-5 lg:pl-6">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
