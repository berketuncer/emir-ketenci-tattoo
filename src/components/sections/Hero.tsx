import Link from "next/link";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Parallax from "@/components/ui/Parallax";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { artist } from "@/data/artist";
import { site } from "@/data/site";
import { workById } from "@/data/works";

const trustPoints = [
  "Tek kullanımlık malzeme",
  "Kişiye özel tasarım",
  `Yanıt: ${site.booking.responseTime}`,
  "İlk yıl bir kez ücretsiz rötuş",
];

export default function Hero() {
  const primary = workById("w-25");
  const secondary = workById("w-09");

  return (
    <section className="relative isolate grain pb-24 pt-32 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-48">
      {/* Zemin ışığı */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_65%_18%,rgba(194,96,58,0.10),transparent_62%),radial-gradient(60%_50%_at_10%_0%,rgba(243,240,234,0.07),transparent_70%)]"
      />

      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pt-6">
            <p className="type-eyebrow flex items-center gap-3 animate-fade-up">
              <span aria-hidden className="h-px w-10 bg-[var(--hairline-strong)]" />
              İstanbul · Sadece randevuyla · {artist.since}&apos;ten beri
            </p>

            <h1 className="type-display mt-7 animate-fade-up [animation-delay:80ms]">
              Kalıcı olanı
              <span className="block italic text-ash">acele etmeden</span>
              çiziyorum.
            </h1>

            <p className="type-lead mt-8 max-w-lg animate-fade-up [animation-delay:160ms]">
              Tek kişilik, sadece randevuyla çalışan bir stüdyo. Günde tek randevu, duvarda hazır
              desen listesi yok — her çalışma konuşarak çıkan bir fikirden sıfırdan çizilir.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:240ms]">
              <Button href={site.booking.href} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Randevu Talebi Oluştur
              </Button>
              <Button href="/calismalar" variant="secondary" size="lg">
                Çalışmaları İncele
              </Button>
            </div>

            <ul className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--hairline)] pt-8 animate-fade-up [animation-delay:320ms]">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-ash">
                  <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ember" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Görsel kompozisyonu */}
          <div className="relative lg:col-span-5">
            <Parallax speed={0.05}>
              {primary ? (
                <Media
                  src={primary.media.src}
                  alt={primary.media.alt}
                  ratio="tall"
                  priority
                  sizes="(max-width: 1024px) 88vw, 34vw"
                  className="animate-fade-in"
                />
              ) : null}
            </Parallax>

            <Parallax
              speed={-0.06}
              className="absolute -bottom-8 left-4 w-[38%] max-w-[150px] sm:left-6 sm:max-w-[170px] lg:-bottom-12 lg:-left-14 lg:max-w-[200px]"
            >
              {secondary ? (
                <div className="border border-[var(--hairline-strong)] bg-ink p-1.5 shadow-2xl">
                  <Media
                    src={secondary.media.src}
                    alt={secondary.media.alt}
                    ratio="square"
                    sizes="(max-width: 640px) 40vw, 190px"
                  />
                </div>
              ) : null}
            </Parallax>

            <Link
              href="/calismalar"
              className="group absolute right-0 top-full mt-6 hidden items-center gap-2 text-sm text-ash transition-colors hover:text-bone lg:inline-flex"
            >
              Tüm portfolyo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
