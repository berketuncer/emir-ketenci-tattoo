import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { faqByCategory, faqCategories, faqItems } from "@/data/faq";
import { pricingNotes, pricingTiers } from "@/data/pricing";
import { site, whatsappLink } from "@/data/site";
import type { FaqCategory } from "@/data/types";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sık Sorulan Sorular",
  description:
    "Fiyat, randevu, tasarım, uygulama günü ve bakım hakkında en çok sorulan sorular ve Emir Ketenci'nin net cevapları.",
  path: "/sss",
});

/** Kategori başlıklarının altına giren kısa yön tarifleri. */
const categoryBlurb: Record<FaqCategory, string> = {
  fiyat: "Neyin ne kadar tuttuğu, kapora ve ödeme koşulları.",
  randevu: "Tarih almak, ertelemek ve gelmeden önce bilinmesi gerekenler.",
  tasarim: "Fikirden çizime giden yol; revizyon, referans ve kapatma.",
  uygulama: "Seans günü ne oluyor: süre, acı, hazırlık ve hijyen.",
  bakim: "İlk haftalar, iyileşme takvimi ve rötuş politikası.",
};

const breadcrumbs = breadcrumbSchema([
  { name: "Ana sayfa", path: "/" },
  { name: "Sık sorulan sorular", path: "/sss" },
]);

export default function SssPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Statik içerik; kullanıcı girdisi içermez.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <PageHero
        eyebrow="Yardım"
        title="Sık sorulan sorular"
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "SSS" }]}
        description={
          <>
            Fiyattan iyileşme sürecine kadar en çok sorulan {faqItems.length} soruyu beş başlıkta
            topladık. Cevaplar kısa ve dürüst; aradığınızı bulamazsanız bir mesaj uzağındayız.
          </>
        }
      />

      {/* Kategori kısayolları — mobilde yatay kaydırılır */}
      <nav aria-label="Soru başlıkları" className="border-b border-[var(--hairline)]">
        <div className="container-page">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto py-4">
            {faqCategories.map((category, index) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex h-11 items-center gap-2.5 whitespace-nowrap rounded-full border border-[var(--hairline)] px-4 text-sm text-ash transition-colors duration-300 hover:border-[var(--hairline-strong)] hover:text-bone"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-ash-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {category.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {faqCategories.map((category, index) => {
        const items = faqByCategory(category.id);
        return (
          <Section
            key={category.id}
            id={category.id}
            className={index > 0 ? "border-t border-[var(--hairline)]" : undefined}
          >
            <div className="container-page">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <Reveal>
                      <p className="type-eyebrow flex items-center gap-3">
                        <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="type-h2 mt-6 text-bone">{category.label}</h2>
                      <p className="type-body mt-5 max-w-xs text-[0.9375rem]">
                        {categoryBlurb[category.id]}
                      </p>
                      <p className="type-eyebrow mt-7">{items.length} soru</p>
                    </Reveal>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <Accordion
                    items={items.map((item) => ({
                      id: item.id,
                      question: item.question,
                      answer: item.answer,
                    }))}
                    defaultOpen={index === 0 ? items[0]?.id : undefined}
                  />

                  {category.id === "fiyat" ? (
                    <Reveal className="mt-14">
                      <div className="border border-[var(--hairline)]">
                        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--hairline)] px-5 py-4 sm:px-7">
                          <h3 className="text-[0.9375rem] font-medium text-bone">Fiyat aralıkları</h3>
                          <p className="type-eyebrow">Yön vermesi için</p>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[36rem] border-collapse text-left">
                            <caption className="sr-only">
                              Emir Ketenci çalışma ölçeklerine göre fiyat aralıkları
                            </caption>
                            <thead>
                              <tr className="border-b border-[var(--hairline)]">
                                <th scope="col" className="type-eyebrow px-5 py-3 font-normal sm:px-7">
                                  Ölçek
                                </th>
                                <th scope="col" className="type-eyebrow px-5 py-3 font-normal sm:px-7">
                                  Kapsam
                                </th>
                                <th
                                  scope="col"
                                  className="type-eyebrow px-5 py-3 text-right font-normal sm:px-7"
                                >
                                  Aralık
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {pricingTiers.map((tier) => (
                                <tr
                                  key={tier.id}
                                  className="border-b border-[var(--hairline)] align-top last:border-b-0"
                                >
                                  <th
                                    scope="row"
                                    className="px-5 py-6 text-sm font-medium text-bone sm:px-7"
                                  >
                                    {tier.name}
                                  </th>
                                  <td className="max-w-sm px-5 py-6 text-[0.875rem] leading-relaxed text-ash sm:px-7">
                                    {tier.description}
                                  </td>
                                  <td className="whitespace-nowrap px-5 py-6 text-right font-[family-name:var(--font-display)] text-xl leading-none text-bone sm:px-7">
                                    {tier.range}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--hairline)] px-5 py-4 sm:px-7">
                          {pricingNotes.map((note) => (
                            <li key={note} className="text-xs text-ash-deep">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  ) : null}
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <Section spacing="lg" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="type-eyebrow">Hâlâ aklında bir şey var</p>
            <h2 className="type-h2 mt-6 text-bone">Cevabını bulamadın mı?</h2>
            <p className="type-lead mx-auto mt-5 max-w-xl">
              Listede olmayan her soru bizim için değerli — çoğu zaman yeni bir başlık olarak buraya
              ekleniyor. Kısa bir mesaj yazın, sizi oyalamadan cevaplayalım.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button
                href={whatsappLink("Merhaba, SSS'de bulamadığım bir soru var:")}
                size="lg"
                external
              >
                WhatsApp&apos;tan sor
              </Button>
              <Button
                href={site.booking.href}
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Randevu talebi oluştur
              </Button>
            </div>

            <p className="mt-8 text-xs text-ash-deep">
              Randevu taleplerine {site.booking.responseTime} dönüyoruz · {site.hoursSummary}
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
