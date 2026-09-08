import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import WorkGallery from "@/components/work/WorkGallery";
import { ArrowRight, ArrowUpRight, Check, Instagram } from "@/components/ui/Icons";
import { artist, availabilityTone, yearsActive } from "@/data/artist";
import { site, whatsappLink } from "@/data/site";
import { styleName, styles } from "@/data/styles";
import { works } from "@/data/works";
import { breadcrumbSchema, pageMeta, personSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Hakkımda",
  description:
    "Emir Ketenci — Karaköy'de tek kişilik dövme stüdyosu. Fine line, mikro realizm, blackwork ve geometrik çalışmalar; 2014'ten beri iğne tutuyor, günde tek randevu alıyor.",
  path: "/hakkimda",
  image: artist.portrait.src,
  type: "profile",
});

const signatureWorks = artist.featuredWorks
  .map((id) => works.find((work) => work.id === id))
  .filter((work): work is NonNullable<typeof work> => Boolean(work));

export default function AboutPage() {
  const years = yearsActive(site.currentYear);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Ana Sayfa", path: "/" },
              { name: "Hakkımda", path: "/hakkimda" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow={artist.role}
        title={artist.name}
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Hakkımda" }]}
        description={
          <>
            <span className="block">{artist.tagline}</span>
            <span className="mt-6 flex flex-wrap items-center gap-3">
              <Badge tone={availabilityTone[artist.availability.status]} dot>
                {artist.availability.label}
              </Badge>
              <span className="text-sm text-ash-dim">{artist.availability.detail}</span>
            </span>
          </>
        }
        actions={
          <>
            <Button href={site.booking.href} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Randevu talebi oluştur
            </Button>
            <Button
              href={artist.instagram}
              variant="secondary"
              size="lg"
              external
              icon={<Instagram className="h-4 w-4" />}
            >
              Instagram
            </Button>
          </>
        }
        aside={
          <Media
            src={artist.portrait.src}
            alt={artist.portrait.alt}
            ratio="portrait"
            priority
            sizes="(max-width: 1024px) 88vw, 34vw"
            className="mx-auto max-w-sm"
          />
        }
      />

      {/* Nasıl çalışıyorum */}
      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="type-eyebrow flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                  Nasıl çalışıyorum
                </p>
                <div className="mt-7 flex flex-col gap-5">
                  {artist.bio.map((paragraph, index) => (
                    <p key={paragraph} className={index === 0 ? "type-lead" : "type-body"}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={90}>
                <div className="border border-[var(--hairline)] bg-ink-800 p-7 lg:p-8">
                  <h2 className="type-eyebrow">Çalışma prensiplerim</h2>
                  <ul className="mt-6 flex flex-col gap-4">
                    {artist.principles.map((principle) => (
                      <li key={principle} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ash">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-ember" />
                        {principle}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Kilometre taşları */}
      <Section spacing="sm" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="type-h3 text-bone">Kısa künye</h2>
                <p className="type-body mt-4 max-w-xs text-[0.9375rem]">
                  {years} yıldır iğne tutuyorum; {site.currentYear - site.founded} yıldır kendi stüdyomdayım.
                </p>
              </Reveal>
            </div>
            <ol className="lg:col-span-8">
              {artist.milestones.map((milestone, index) => (
                <li key={milestone.year}>
                  <Reveal
                    delay={index * 70}
                    className="flex gap-6 border-t border-[var(--hairline)] py-6 last:border-b sm:gap-10"
                  >
                    <span className="w-16 shrink-0 font-[family-name:var(--font-display)] text-2xl leading-none text-ash-dim">
                      {milestone.year}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ash">{milestone.text}</span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Tarzlar */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Uzmanlık"
            title="Ağırlıklı çalıştığım alanlar"
            description="Bu dört alanda hem daha hızlı hem daha rahatım. Diğer tarzları da yapıyorum; fikir uygun değilse bunu baştan söylerim."
            action={
              <Button href="/stiller" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                Tüm tarzlar
              </Button>
            }
          />

          <ul className="mt-12 grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {artist.focusStyles.map((slug, index) => {
              const style = styles.find((item) => item.slug === slug);
              if (!style) return null;
              return (
                <li key={slug} className="bg-ink">
                  <Reveal delay={index * 70}>
                    <Link href={`/stiller/${slug}`} className="group flex h-full flex-col p-7">
                      <span className="type-eyebrow text-ash-deep">{String(index + 1).padStart(2, "0")}</span>
                      <span className="type-h3 mt-6 text-bone transition-colors group-hover:text-white">
                        {style.name}
                      </span>
                      <span className="type-body mt-3 text-[0.9375rem]">{style.tagline}</span>
                      <span className="type-eyebrow mt-6 flex items-center gap-2 text-ash-dim">
                        İncele
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="type-eyebrow">Ayrıca</span>
            {artist.otherStyles.map((slug) => (
              <Link
                key={slug}
                href={`/stiller/${slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--hairline)] px-4 text-[0.8125rem] text-ash transition-colors hover:border-[var(--hairline-strong)] hover:text-bone"
              >
                {styleName(slug)}
              </Link>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* İmza işler */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Seçki"
            title="İmza işlerim"
            description="Arşivde 36 çalışma var; bu dördü nasıl çalıştığımı en iyi anlatanlar."
            action={
              <Button href="/calismalar" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                Tüm portfolyo
              </Button>
            }
          />
          <WorkGallery works={signatureWorks} columns="four" className="mt-12" />
        </div>
      </Section>

      {/* Kapanış */}
      <Section spacing="lg" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="type-h2 text-bone">Bir fikriniz mi var?</h2>
            <p className="type-lead mx-auto mt-5 max-w-lg">
              Ne istediğinizi tam bilmiyor olmanız sorun değil. Anlatın, birlikte çıkaralım —
              {" "}{site.booking.responseTime} dönüyorum.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={site.booking.href} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Randevu talebi oluştur
              </Button>
              <Button href={whatsappLink()} variant="secondary" size="lg" external>
                Önce konuşalım
              </Button>
            </div>
            <p className="type-eyebrow mt-8 justify-center text-ash-deep">{site.booking.depositNote}</p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
