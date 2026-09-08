import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import Parallax from "@/components/ui/Parallax";
import { ArrowUpRight } from "@/components/ui/Icons";
import { artist, availabilityTone, yearsActive } from "@/data/artist";
import { site } from "@/data/site";
import { styleName } from "@/data/styles";

/**
 * Ana sayfadaki tanışma bölümü. Stüdyo tek kişilik olduğu için ekip listesi
 * yerine doğrudan kişiyi tanıtır.
 */
export default function AboutIntro() {
  const years = yearsActive(site.currentYear);

  return (
    <Section id="hakkimda" className="border-t border-[var(--hairline)]" spacing="lg">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Parallax speed={0.04}>
              <Media
                src={artist.portrait.src}
                alt={artist.portrait.alt}
                ratio="portrait"
                sizes="(max-width: 1024px) 92vw, 38vw"
              />
            </Parallax>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <p className="type-eyebrow flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                Tanışalım
              </p>
              <h2 className="type-h2 mt-6 text-bone">
                Merhaba, ben {artist.name}.
              </h2>
              <p className="type-lead mt-6 max-w-xl">{artist.tagline}</p>
              <p className="type-body mt-5 max-w-xl">
                {years} yıldır dövme yapıyorum, {site.currentYear - site.founded} yıldır Karaköy&apos;deki kendi
                stüdyomdayım. Günde tek randevu alıyorum — gün sizin, araya başka bir iş girmiyor.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Badge tone={availabilityTone[artist.availability.status]} dot>
                  {artist.availability.label}
                </Badge>
                <span className="text-sm text-ash-dim">{artist.availability.detail}</span>
              </div>

              <ul className="mt-9 flex flex-wrap gap-2">
                {artist.focusStyles.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/stiller/${slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-[var(--hairline)] px-4 text-[0.8125rem] text-ash transition-colors hover:border-[var(--hairline-strong)] hover:text-bone"
                    >
                      {styleName(slug)}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/hakkimda" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                  Hakkımda
                </Button>
                <Button href={artist.instagram} variant="ghost" external>
                  Instagram&apos;da gör
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
