import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Check, Sparkle, WhatsApp } from "@/components/ui/Icons";
import { giftCard } from "@/data/giftcard";
import { site, whatsappLink } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Hediye Kartı",
  description: giftCard.description,
  path: "/hediye-karti",
});

const askOnWhatsApp = whatsappLink("Hediye kartı hakkında bilgi almak istiyorum.");

/** Kart varyantları — üç tutar, üç ayrı baskı. Tamamı CSS ve SVG. */
const cardTones = [
  {
    frame: "border-[var(--hairline-strong)] bg-ink-900",
    glow: "bg-[radial-gradient(75%_70%_at_88%_12%,rgba(243,240,234,0.06),transparent_70%)]",
    label: "text-ash-deep",
    brand: "text-bone",
    amount: "text-bone",
    seal: "text-bone/20",
    rule: "border-[var(--hairline)]",
    meta: "text-ash-deep",
  },
  {
    frame: "border-ember/35 bg-ink-800",
    glow: "bg-[radial-gradient(75%_70%_at_88%_12%,rgba(194,96,58,0.16),transparent_70%)]",
    label: "text-ember-bright",
    brand: "text-bone",
    amount: "text-bone",
    seal: "text-ember/35",
    rule: "border-ember/20",
    meta: "text-ash-deep",
  },
  {
    frame: "border-bone bg-bone",
    glow: "bg-[radial-gradient(75%_70%_at_88%_12%,rgba(8,8,10,0.08),transparent_70%)]",
    label: "text-ink/65",
    brand: "text-ink",
    amount: "text-ink",
    seal: "text-ink/15",
    rule: "border-ink/15",
    meta: "text-ink/65",
  },
];

function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("h-16 w-16", className)}>
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="32"
        cy="32"
        r="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="1.5 4"
      />
      <path d="M32 6v52" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="32" cy="32" r="5" fill="currentColor" />
    </svg>
  );
}

function GiftCardVisual({ amount, toneIndex }: { amount: string; toneIndex: number }) {
  const tone = cardTones[toneIndex % cardTones.length];

  return (
    <div
      className={cn(
        "relative flex aspect-[8/5] flex-col justify-between overflow-hidden border p-6 sm:p-7",
        tone.frame,
      )}
    >
      <div aria-hidden className={cn("pointer-events-none absolute inset-0", tone.glow)} />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              "font-[family-name:var(--font-display)] text-[1.375rem] leading-none tracking-[0.02em]",
              tone.brand,
            )}
          >
            İZ
          </p>
          <p
            className={cn(
              "mt-2 font-mono text-[0.5625rem] uppercase leading-none tracking-[0.36em]",
              tone.label,
            )}
          >
            Stüdyo
          </p>
        </div>
        <p
          className={cn(
            "font-mono text-[0.625rem] uppercase leading-none tracking-[0.2em]",
            tone.label,
          )}
        >
          Hediye Kartı
        </p>
      </div>

      <Seal className={cn("pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2", tone.seal)} />

      <div className="relative">
        <h3
          className={cn(
            "font-[family-name:var(--font-display)] text-4xl leading-none sm:text-[2.75rem]",
            tone.amount,
          )}
        >
          {amount}
        </h3>
        <div className={cn("mt-5 flex items-center justify-between gap-4 border-t pt-4", tone.rule)}>
          <span
            aria-hidden
            className={cn("font-mono text-[0.625rem] tracking-[0.3em]", tone.meta)}
          >
            EK •••• ••••
          </span>
          <span className={cn("font-mono text-[0.625rem] uppercase tracking-[0.16em]", tone.meta)}>
            12 ay geçerli
          </span>
        </div>
      </div>
    </div>
  );
}

const heroFacts = [
  { label: "Geçerlilik", value: "Satın alma tarihinden itibaren 12 ay" },
  { label: "Kapsam", value: "Tüm tarzlar ve tüm ölçüler" },
  { label: "Teslim", value: "Baskılı zarf ya da dijital kart" },
];

export default function HediyeKartiPage() {
  const presets = giftCard.amounts.filter((amount) => amount.value !== "custom");
  const custom = giftCard.amounts.find((amount) => amount.value === "custom");
  const conditions = giftCard.notes.slice(0, -1);
  const demoNote = giftCard.notes[giftCard.notes.length - 1];

  return (
    <>
      <PageHero
        eyebrow={giftCard.eyebrow}
        title={giftCard.title}
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "Hediye Kartı" }]}
        description={giftCard.description}
        actions={
          <>
            <Button href={askOnWhatsApp} size="lg" external icon={<WhatsApp className="h-4 w-4" />}>
              WhatsApp&apos;tan sorun
            </Button>
            <Button href={site.booking.href} variant="secondary" size="lg">
              Önce randevuya bakın
            </Button>
          </>
        }
        aside={
          <dl className="border-t border-[var(--hairline-strong)]">
            {heroFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 border-b border-[var(--hairline)] py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="type-eyebrow">{fact.label}</dt>
                <dd className="text-[0.9375rem] leading-snug text-bone sm:text-right">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Tutarlar */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Tutarlar"
            title="Üç hazır tutar, bir de size kalmış olan"
            description="Tutar bir üst sınır değil, bir başlangıçtır. Çalışma daha büyük çıkarsa aradaki fark seans günü tamamlanır."
          />

          <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {presets.map((amount, index) => (
              <li key={amount.value}>
                <Reveal delay={(index % 3) * 90}>
                  <GiftCardVisual amount={amount.label} toneIndex={index} />
                  <p className="type-body mt-5 flex items-center gap-3 text-[0.9375rem]">
                    <span aria-hidden className="h-px w-6 shrink-0 bg-[var(--hairline-strong)]" />
                    {amount.hint}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          {custom ? (
            <Reveal delay={120}>
              <div className="mt-10 flex flex-col gap-6 border border-dashed border-[var(--hairline-strong)] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
                <div className="flex items-start gap-5">
                  <Sparkle className="mt-1 hidden h-6 w-6 shrink-0 text-ember sm:block" />
                  <div>
                    <h3 className="type-h3 text-bone">{custom.label}</h3>
                    <p className="type-body mt-2 max-w-md text-[0.9375rem]">
                      {custom.hint} — hediye ettiğiniz kişinin aklındaki çalışmayı biliyorsanız,
                      uygun tutarı birlikte belirleyelim.
                    </p>
                  </div>
                </div>
                <p className="type-eyebrow shrink-0 sm:text-right">Tutarı birlikte belirleriz</p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Section>

      {/* Adımlar */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Nasıl işliyor"
            title="Üç adım, tek yazışma"
            description="Kartı hazırlamak birkaç saat sürer. Gerisi, kartın sahibiyle bizim aramızda."
          />

          <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {giftCard.steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 90} className="border-t border-[var(--hairline-strong)] pt-6">
                  <span className="font-[family-name:var(--font-display)] text-5xl leading-none text-ash-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-7 text-[1.0625rem] font-medium text-bone">{step.title}</h3>
                  <p className="type-body mt-3 text-[0.9375rem]">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Koşullar */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <p className="type-eyebrow mb-5 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                Koşullar
              </p>
              <h2 className="type-h2 text-bone">Sürprizsiz, dipnotsuz</h2>
              <p className="type-lead mt-5 max-w-md">
                Hediye kartı bir kampanya değil; kimseyi acele ettirmeyen, tarihi kart sahibinin
                seçtiği bir davet.
              </p>
            </Reveal>

            <div>
              <ul className="flex flex-col">
                {conditions.map((note, index) => (
                  <li key={note} className="border-b border-[var(--hairline)] first:border-t">
                    <Reveal delay={index * 70} className="flex items-start gap-4 py-5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                      <span className="text-[0.9375rem] leading-relaxed text-ash">{note}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>

              <Reveal delay={140}>
                <div className="mt-10 border border-[var(--hairline-strong)] bg-ink-800 p-7 sm:p-9">
                  <h3 className="type-h3 text-bone">Satın alma akışı henüz aktif değil</h3>
                  <p className="type-body mt-4">
                    {demoNote} Kartı bugün almak isterseniz süreç yine yürüyor: bize yazın, tutarı
                    birlikte belirleyelim, kartı stüdyodan teslim alın ya da dijital olarak
                    gönderelim.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={askOnWhatsApp} external icon={<WhatsApp className="h-4 w-4" />}>
                      WhatsApp&apos;tan yazın
                    </Button>
                    <Button
                      href={site.booking.href}
                      variant="secondary"
                      icon={<ArrowRight className="h-4 w-4" />}
                    >
                      Randevu talebi oluşturun
                    </Button>
                  </div>
                  <p className="type-eyebrow mt-7 text-ash-deep">
                    Yanıt süresi {site.booking.responseTime}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
