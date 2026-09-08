import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BookingForm from "@/components/booking/BookingForm";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, Clock, Shield, WhatsApp } from "@/components/ui/Icons";
import Badge from "@/components/ui/Badge";
import { artist, availabilityTone } from "@/data/artist";
import { site, whatsappLink } from "@/data/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Randevu Talebi",
  description:
    "Beş kısa adımda dövme fikrinizi anlatın. Talebinizi 48 saat içinde değerlendirip size özel bir öneri ve fiyat aralığıyla dönüyorum.",
  path: "/randevu",
});

const assurances = [
  {
    Icon: Clock,
    title: `Yanıt: ${site.booking.responseTime}`,
    text: "Talebinizi okuyup tahmini seans sayısı ve fiyat aralığıyla dönüyorum.",
  },
  {
    Icon: Shield,
    title: "Bu adımda ödeme yok",
    text: site.booking.depositNote,
  },
  {
    Icon: WhatsApp,
    title: "Formu doldurmak istemiyorsanız",
    text: "WhatsApp'tan tek cümleyle de yazabilirsiniz; süreci oradan da yürütebiliriz.",
  },
];

export default function BookingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Ana Sayfa", path: "/" },
              { name: "Randevu Talebi", path: "/randevu" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Randevu"
        title={
          <>
            Fikrinizi anlatın,
            <span className="block italic text-ash">gerisini birlikte çizelim.</span>
          </>
        }
        description="Beş kısa adım, ortalama üç dakika. Net bir fikriniz olması gerekmiyor — ne istemediğinizi bilmek bile başlamak için yeterli."
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Randevu Talebi" }]}
      />

      <Section spacing="md">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-8">
              <Suspense
                fallback={
                  <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
                    <span className="sr-only">Form yükleniyor</span>
                    <div className="h-1 w-full animate-pulse bg-ink-700" />
                    <div className="mt-8 h-4 w-40 animate-pulse bg-ink-700" />
                    <div className="mt-6 h-14 w-full animate-pulse bg-ink-800" />
                    <div className="h-14 w-full animate-pulse bg-ink-800" />
                    <div className="h-36 w-full animate-pulse bg-ink-800" />
                  </div>
                }
              >
                <BookingForm />
              </Suspense>
            </div>

            <aside className="lg:col-span-5 xl:col-span-4">
              <Reveal className="lg:sticky lg:top-28">
                <ul className="flex flex-col divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
                  {assurances.map(({ Icon, title, text }) => (
                    <li key={title} className="flex gap-4 py-6">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                      <div>
                        <p className="text-sm text-bone">{title}</p>
                        <p className="type-body mt-1.5 text-[0.875rem]">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <p className="type-eyebrow">Güncel durum</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Badge tone={availabilityTone[artist.availability.status]} dot>
                      {artist.availability.label}
                    </Badge>
                    <p className="type-body text-[0.875rem]">{artist.availability.detail}</p>
                    <Link
                      href="/hakkimda"
                      className="group inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
                    >
                      {artist.name} hakkında
                      <ArrowUpRight className="h-4 w-4 text-ash-deep transition-colors group-hover:text-bone" />
                    </Link>
                  </div>
                </div>

                <div className="mt-9 border-t border-[var(--hairline)] pt-7">
                  <p className="type-eyebrow">Doğrudan iletişim</p>
                  <div className="mt-4 flex flex-col gap-2.5 text-sm">
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ash transition-colors hover:text-bone"
                    >
                      WhatsApp · {site.contact.whatsappDisplay}
                    </a>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-ash transition-colors hover:text-bone"
                    >
                      {site.contact.email}
                    </a>
                    <Link href="/sss" className="text-ash transition-colors hover:text-bone">
                      Önce sık sorulanlara bakın →
                    </Link>
                  </div>
                </div>

                <p className="mt-8 text-xs leading-relaxed text-ash-deep">
                  Bu bir demo sitedir; form gönderimi kaydedilmez ve yüklenen görseller
                  tarayıcınızdan çıkmaz.
                </p>
              </Reveal>
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
