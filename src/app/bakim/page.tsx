import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import { ArrowUpRight, Shield, WhatsApp } from "@/components/ui/Icons";
import { aftercareDisclaimer, aftercarePhases, aftercareWarnings } from "@/data/aftercare";
import { faqByCategory } from "@/data/faq";
import { site, whatsappLink } from "@/data/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Dövme Bakım Rehberi",
  description:
    "Dövme sonrası bakım: ilk 24 saatten dördüncü haftaya kadar adım adım ne yapmalı, nelerden kaçınmalı ve hangi durumda hekime başvurmalı.",
  path: "/bakim",
});

/** Sayfaya özel hızlı hatırlatma — ayrıntılar zaman çizelgesinde. */
const quickSummary = [
  {
    window: "İlk 24 saat",
    title: "Kapalı tut, nazikçe yıka",
    points: [
      "Bandı sana söylediğim süreden önce çıkarma.",
      "Ilık su ve kokusuz sabunla temizle, kâğıt havluyla bastırarak kurula.",
      "Çok ince bir tabaka krem yeterli.",
    ],
  },
  {
    window: "İlk hafta",
    title: "Kaşıma, ıslatma, sabret",
    points: [
      "Günde iki kez temizle ve nemlendir.",
      "Kabuğu kaldırma — çizgi kaybının bir numaralı sebebi.",
      "Havuz, deniz, sauna ve terleten spor yok.",
    ],
  },
  {
    window: "Sonrası",
    title: "Güneşten koru, nemli tut",
    points: [
      "Dördüncü haftadan sonra dövme oturur, gerçek rengini gösterir.",
      "Yaz boyunca yüksek faktörlü koruyucu kullan.",
      "İlk 12 ay içinde gereken rötuş bir kez ücretsiz.",
    ],
  },
];

const careFaq = faqByCategory("bakim");

export default function AftercarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Statik schema.org verisi; kullanıcı girdisi içermez.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Ana Sayfa", path: "/" },
              { name: "Bakım Rehberi", path: "/bakim" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Bakım"
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Bakım Rehberi" }]}
        title="Dövme bakım rehberi"
        description="İyileşmenin nasıl ilerlediğini, hangi hafta neye dikkat etmen gerektiğini ve neyin normal olmadığını tek sayfada topladım."
        aside={
          <Reveal delay={120}>
            <div className="border border-[var(--hairline-strong)] bg-ink-900 p-6 sm:p-7">
              <p className="type-eyebrow flex items-center gap-2.5 text-warn">
                <Shield className="h-4 w-4" />
                Tıbbi tavsiye değildir
              </p>
              <p className="type-body mt-4 text-[0.9375rem]">{aftercareDisclaimer}</p>
            </div>
          </Reveal>
        }
      />

      {/* Kısa özet */}
      <Section spacing="sm">
        <div className="container-page">
          <SectionHeader
            eyebrow="Kısa özet"
            title="Otuz saniyede bakım"
            description="Ayrıntıya inmeden önce aklında kalması gerekenler."
          />

          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {quickSummary.map((block, index) => (
              <li key={block.window} className="border-t border-[var(--hairline-strong)] pt-6">
                <Reveal delay={index * 80}>
                  <p className="type-eyebrow">{block.window}</p>
                  <h3 className="type-h3 mt-4 text-bone">{block.title}</h3>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {block.points.map((point) => (
                      <li key={point} className="type-body relative pl-5 text-[0.9375rem]">
                        <span
                          aria-hidden
                          className="absolute left-0 top-[0.72em] h-1 w-1 rounded-full bg-ember"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Zaman çizelgesi */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Zaman çizelgesi"
            title="İlk günden dördüncü haftaya"
            description="Her dönemin kendi kuralı var. Sanatçının sana özel verdiği talimat farklıysa her zaman onu uygula."
          />

          <ol className="mt-14">
            {aftercarePhases.map((phase, index) => {
              const isLast = index === aftercarePhases.length - 1;
              return (
                <li
                  key={phase.id}
                  className="grid gap-x-6 border-t border-[var(--hairline)] pt-8 sm:grid-cols-[8.5rem_2.75rem_minmax(0,1fr)] lg:grid-cols-[13rem_3.5rem_minmax(0,1fr)] lg:pt-10"
                >
                  <Reveal as="div" className="pb-5 sm:pb-14">
                    <p className="type-eyebrow">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-3 font-[family-name:var(--font-display)] text-[1.5rem] leading-tight text-bone lg:text-[1.75rem]">
                      {phase.window}
                    </p>
                  </Reveal>

                  <div aria-hidden className="relative hidden sm:block">
                    {!isLast ? (
                      <span className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 bg-[var(--hairline)]" />
                    ) : null}
                    <span className="relative mx-auto mt-1 block h-2.5 w-2.5 rounded-full border border-ember bg-ink" />
                  </div>

                  <div className="pb-12 sm:pb-14 lg:pb-16">
                    <Reveal delay={60}>
                      <h3 className="type-h3 text-bone">{phase.title}</h3>
                      <ul className="mt-5 flex max-w-2xl flex-col gap-3.5">
                        {phase.items.map((item) => (
                          <li key={item} className="type-body relative pl-7">
                            <span
                              aria-hidden
                              className="absolute left-0 top-[0.8em] h-px w-4 bg-ash-deep"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* Uyarılar */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <Reveal className="border border-warn/25 bg-warn/[0.045] p-7 sm:p-10 lg:p-14">
            <div className="grid gap-9 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p className="type-eyebrow flex items-center gap-2.5 text-warn">
                  <Shield className="h-4 w-4" />
                  Dikkat
                </p>
                <h2 className="type-h2 mt-5 text-bone">Ne zaman doktora başvurmalı</h2>
                <p className="type-body mt-5 max-w-sm">
                  İyileşme çoğu zaman sorunsuz ilerler. Aşağıdakilerden biri olursa bekleme —
                  hem bana yaz hem bir sağlık kuruluşuna başvur.
                </p>
              </div>

              <ul className="flex flex-col divide-y divide-warn/15 border-y border-warn/15 lg:col-span-7">
                {aftercareWarnings.map((warning) => (
                  <li key={warning} className="flex gap-4 py-5">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-warn" />
                    <p className="text-[1rem] leading-relaxed text-bone">{warning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SSS */}
      {careFaq.length ? (
        <Section id="sss" className="border-t border-[var(--hairline)]">
          <div className="container-page">
            <SectionHeader
              eyebrow="Sık sorulanlar"
              title="Bakım hakkında merak edilenler"
              action={
                <Button href="/sss" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                  Tüm sorular
                </Button>
              }
            />
            <div className="mt-12 max-w-3xl">
              <Accordion
                items={careFaq.map((item) => ({
                  id: item.id,
                  question: item.question,
                  answer: item.answer,
                }))}
                defaultOpen={careFaq[0]?.id}
              />
            </div>
          </div>
        </Section>
      ) : null}

      {/* Kapanış */}
      <Section spacing="lg" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="type-eyebrow">Yardım</p>
            <h2 className="type-h2 mt-6 text-bone">Bir sorun mu var?</h2>
            <p className="type-lead mt-6">
              İyileşme sırasında aklına takılan her şeyi sorabilirsin. Bölgenin net bir fotoğrafını
              gönder, aynı gün içinde bakalım.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button
                href={whatsappLink("Merhaba, dövmemin iyileşmesiyle ilgili bir sorum var.")}
                size="lg"
                external
                icon={<WhatsApp className="h-4 w-4" />}
              >
                WhatsApp&apos;tan yaz
              </Button>
              <Button href="/iletisim" variant="secondary" size="lg">
                İletişim bilgileri
              </Button>
            </div>

            <p className="mt-9 flex flex-wrap items-center justify-center gap-2.5 text-sm text-ash">
              <WhatsApp className="h-4 w-4 text-ash-deep" />
              <a
                href={whatsappLink("Merhaba, dövmemin iyileşmesiyle ilgili bir sorum var.")}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-bone"
              >
                {site.contact.whatsappDisplay}
              </a>
              <span aria-hidden className="text-ash-deep">
                ·
              </span>
              <span>Yaz, sırayla dönüyorum.</span>
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
