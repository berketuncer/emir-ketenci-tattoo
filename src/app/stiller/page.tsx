import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { styleName, styles } from "@/data/styles";
import { workCountByStyle } from "@/data/works";
import { site } from "@/data/site";
import type { StyleSlug } from "@/data/types";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dövme Tarzları",
  description:
    "Fine line, blackwork, realizm, geometrik ve daha fazlası. Her tarzın kimlere uyduğunu, tipik seans süresini ve arşivimizdeki çalışma sayısını tek listede karşılaştırın.",
  path: "/stiller",
});

/** Ne istediğini bilmeyen ziyaretçiyi doğru tarza yönlendiren kısayollar. */
const guides: { question: string; answer: string; slug: StyleSlug }[] = [
  {
    question: "İlk dövmeniz mi?",
    answer: "İnce çizgiyle küçük başlayın. Kısa seans, kolay iyileşme, sonradan büyütülebilir bir başlangıç.",
    slug: "fine-line",
  },
  {
    question: "Eski bir dövmeyi mi kapatacaksınız?",
    answer: "Yoğun siyah, altındaki hattı yeni bir kompozisyonun parçası haline getirir.",
    slug: "blackwork",
  },
  {
    question: "Elinizde bir fotoğraf mı var?",
    answer: "Referans netse, ışık ve gölge ton geçişleriyle birebir kurulur.",
    slug: "realism",
  },
];

const ordered = [...styles].sort((a, b) => a.order - b.order);

export default function StylesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tarzlar"
        title="Hangi tarz size uyar?"
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "Tarzlar" }]}
        description="Tarz seçimi, dövmenin yıllar sonra nasıl görüneceğini belirleyen ilk karar. Aşağıdaki listede her tarzın kime uygun olduğunu, ne kadar sürdüğünü ve arşivimizde kaç çalışması bulunduğunu yan yana görebilirsiniz."
        actions={
          <>
            <Button href={site.booking.href} icon={<ArrowRight className="h-4 w-4" />}>
              Randevu talebi
            </Button>
            <Button href="/calismalar" variant="secondary">
              Önce çalışmalara bakayım
            </Button>
          </>
        }
      />

      {/* Kısayol bloğu — karar vermeyi hızlandırır. */}
      <Section spacing="sm">
        <div className="container-page">
          <Reveal>
            <h2 id="baslangic" className="type-h3 max-w-md text-bone">
              Ne istediğinizi bilmiyorsanız
            </h2>
            <p className="type-body mt-3 max-w-lg text-[0.9375rem]">
              Çoğu görüşme şu üç sorudan biriyle başlıyor. Size en yakın olanı seçin, oradan devam edelim.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-3">
            {guides.map((guide, index) => (
              <li key={guide.slug} className="bg-ink">
                <Reveal delay={index * 80} className="h-full">
                  <Link
                    href={`/stiller/${guide.slug}`}
                    className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors duration-500 hover:bg-ink-900 sm:p-8"
                  >
                    <div>
                      <h3 className="text-[1.0625rem] font-medium leading-snug text-bone">
                        {guide.question}
                      </h3>
                      <p className="type-body mt-2.5 text-[0.875rem]">{guide.answer}</p>
                    </div>
                    <p className="flex items-center gap-2 text-sm text-ember-bright">
                      {styleName(guide.slug)}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Tüm tarzlar — liste görünümü. */}
      <Section spacing="sm" className="pb-24 sm:pb-28">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--hairline-strong)] pb-5">
            <h2 id="tum-tarzlar" className="type-h3 text-bone">
              Tüm tarzlar
            </h2>
            <p className="type-eyebrow">{ordered.length} tarz</p>
          </Reveal>

          <ol>
            {ordered.map((style, index) => {
              const count = workCountByStyle[style.slug] ?? 0;
              return (
                <li key={style.slug} className="border-b border-[var(--hairline)]">
                  <Reveal delay={(index % 4) * 60} amount={0.05}>
                    <Link
                      href={`/stiller/${style.slug}`}
                      className="group -mx-3 grid grid-cols-[4.5rem_1fr] items-start gap-x-5 gap-y-4 px-3 py-6 transition-colors duration-500 hover:bg-ink-900 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-x-8 sm:py-8"
                    >
                      <div className="col-start-1 row-span-2 row-start-1 overflow-hidden sm:row-span-1">
                        <Media
                          src={style.cover.src}
                          alt={style.cover.alt}
                          ratio="square"
                          sizes="(max-width: 640px) 72px, 112px"
                          imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
                        />
                      </div>

                      <div className="col-start-2 row-start-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span className="type-eyebrow">{String(index + 1).padStart(2, "0")}</span>
                          {style.popular ? <Badge tone="ember">Sık tercih edilen</Badge> : null}
                        </div>

                        <h3 className="type-h3 mt-3 text-bone transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                          {style.name}
                        </h3>
                        <p className="type-body mt-2 max-w-xl text-[0.9375rem]">{style.tagline}</p>

                        <p className="sr-only">Kimler için uygun:</p>
                        <ul className="mt-4 flex flex-col gap-1.5">
                          {style.suitedFor.slice(0, 2).map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-ash-dim"
                            >
                              <span
                                aria-hidden
                                className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-ember"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="col-start-2 row-start-2 flex items-center justify-between gap-6 sm:col-start-3 sm:row-start-1 sm:flex-col sm:items-end sm:gap-3">
                        <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2 sm:text-right">
                          <span className="type-eyebrow text-ash">{style.typicalDuration}</span>
                          <span aria-hidden className="h-px w-5 bg-[var(--hairline-strong)] sm:hidden" />
                          <span className="type-eyebrow">{count} çalışma</span>
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-ash-deep transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-body max-w-lg text-[0.9375rem]">
              Listede karşılığını bulamadıysanız sorun değil. Fikrinizi anlatın, hangi tarzın taşıyacağını
              birlikte bulalım.
            </p>
            <Button
              href={site.booking.href}
              variant="secondary"
              className="shrink-0"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Fikrinizi anlatın
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
