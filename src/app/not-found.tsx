import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  description:
    "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Buradan çalışmalara, hakkımda sayfasına ve randevu adımına geçebilirsin.",
  robots: { index: false, follow: true },
};

const popularHrefs = ["/calismalar", "/stiller", "/hakkimda", "/sss"];

export default function NotFound() {
  const popular = site.nav.filter((item) => popularHrefs.includes(item.href));

  return (
    <section className="relative isolate grain flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-32 pt-32 sm:pb-28 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_75%_20%,rgba(194,96,58,0.10),transparent_65%),radial-gradient(55%_45%_at_5%_0%,rgba(243,240,234,0.06),transparent_70%)]"
      />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="type-eyebrow flex items-center gap-3 animate-fade-up">
              <span aria-hidden className="h-px w-10 bg-[var(--hairline-strong)]" />
              404 · Sayfa bulunamadı
            </p>

            <h1 className="type-h1 mt-7 animate-fade-up [animation-delay:80ms]">
              Bu iz{" "}
              <span className="block italic text-ash">burada değil.</span>
            </h1>

            <p className="type-lead mt-8 max-w-lg animate-fade-up [animation-delay:160ms]">
              Aradığın sayfa taşınmış, adı değişmiş ya da hiç var olmamış olabilir. İz sürmeye
              devam etmek istersen iyi bir başlangıç noktası aşağıda.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:240ms]">
              <Button href="/" size="lg">
                Ana sayfaya dön
              </Button>
              <Button href="/calismalar" variant="secondary" size="lg">
                Portfolyoyu gör
              </Button>
              <Button
                href={site.booking.href}
                variant="ghost"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {site.booking.label}
              </Button>
            </div>
          </div>

          {/* Kesilen iz — logo işaretinin bozulmuş hâli */}
          <div className="hidden lg:col-span-5 lg:block">
            <svg
              viewBox="0 0 320 320"
              aria-hidden
              className="mx-auto h-auto w-full max-w-[340px] animate-fade-in text-bone"
            >
              <circle cx="160" cy="160" r="146" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.16" />
              <circle
                cx="160"
                cy="160"
                r="104"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 10"
                opacity="0.3"
              />
              <path d="M160 22v92" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
              <path d="M160 206v92" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
              <circle cx="160" cy="160" r="7" fill="currentColor" opacity="0.22" />
              <path
                d="M118 160h84"
                stroke="var(--color-ember)"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>

        {/* Sık kullanılan sayfalar */}
        <div className="mt-20 border-t border-[var(--hairline)] pt-10 animate-fade-up [animation-delay:320ms]">
          <h2 className="type-eyebrow">Sık ziyaret edilenler</h2>
          <ul className="mt-8 grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((item) => (
              <li key={item.href} className="bg-ink">
                <Link
                  href={item.href}
                  className="group flex h-full min-h-11 flex-col justify-between gap-8 p-6 lg:p-7"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-[1.0625rem] font-medium text-bone">{item.label}</span>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ash-deep transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                  </span>
                  <span className="type-body text-[0.875rem]">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
