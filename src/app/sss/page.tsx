import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { faqByCategory, faqCategories, faqItems } from "@/data/faq";
import { pricingNotes } from "@/data/pricing";
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
            topladım. Cevaplar kısa ve dürüst; aradığını bulamazsan bir mesaj uzağındayım.
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
                          <h3 className="text-[0.9375rem] font-medium text-bone">Sabit fiyat yok</h3>
                          <p className="type-eyebrow">Değişmeyen kurallar</p>
                        </div>
                        <p className="type-body px-5 py-5 text-[0.9375rem] sm:px-7">
                          Rakamı fikri, ölçüyü ve bölgeyi görünce söylüyorum; bir kez, net. Değişmeyenler
                          şunlar:
                        </p>
                        <ul className="flex flex-col gap-2.5 border-t border-[var(--hairline)] px-5 py-5 sm:px-7">
                          {pricingNotes.map((note) => (
                            <li key={note} className="flex items-start gap-2.5 text-sm text-ash">
                              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
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
              Listede olmayan her soru benim için değerli — çoğu zaman yeni bir başlık olarak buraya
              ekleniyor. Kısa bir mesaj yaz, sırası gelince cevaplıyorum.
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
              Randevu taleplerine {site.booking.responseTime} dönüyorum. {site.booking.responseNote}
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
