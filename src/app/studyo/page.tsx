import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import ProcessSteps from "@/components/sections/ProcessSteps";
import { ArrowRight, ArrowUpRight, Check, Clock, MapPin } from "@/components/ui/Icons";
import { artist, availabilityTone } from "@/data/artist";
import { hygieneChecklist, studioStats, studioStory, studioValues } from "@/data/studio";
import { mapsLink, site } from "@/data/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Stüdyo",
  description:
    "Karaköy'deki stüdyo: hijyen protokolü, çalışma süreci ve ziyaret bilgileri. Günde tek randevu alan, tek kişilik bir dövme stüdyosu.",
  path: "/studyo",
});

/** Başlığın son cümleciğini ayırıp italik gösteriyoruz — h1 metni veriden gelir. */
const commaIndex = studioStory.title.lastIndexOf(",");
const titleLead = commaIndex > 0 ? studioStory.title.slice(0, commaIndex + 1) : studioStory.title;
const titleTail = commaIndex > 0 ? studioStory.title.slice(commaIndex + 1).trim() : "";

const [coverImage, ...galleryImages] = studioStory.gallery;
const storyParagraphs = studioStory.paragraphs.slice(1);

export default function StudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Statik schema.org verisi; kullanıcı girdisi içermez.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Ana Sayfa", path: "/" },
              { name: "Stüdyo", path: "/studyo" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow={studioStory.eyebrow}
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Stüdyo" }]}
        title={
          <>
            {titleLead}{" "}
            {titleTail ? <span className="block italic text-ash">{titleTail}</span> : null}
          </>
        }
        description={studioStory.paragraphs[0]}
        actions={
          <>
            <Button href={site.booking.href} icon={<ArrowRight className="h-4 w-4" />}>
              {site.booking.label}
            </Button>
            <Button href="#hijyen" variant="secondary">
              Hijyen protokolü
            </Button>
          </>
        }
      />

      {/* Hikâye */}
      <Section spacing="lg">
        <div className="container-page">
          <Reveal>
            <Media
              src={coverImage.src}
              alt={coverImage.alt}
              ratio={coverImage.ratio}
              priority
              sizes="(max-width: 1280px) 92vw, 1200px"
            />
          </Reveal>

          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="type-eyebrow flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                  Hikâye
                </p>
                <h2 className="type-h2 mt-6 text-bone">Az sayıda iş, uzun tasarım süresi</h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={80} className="flex flex-col gap-6">
                {storyParagraphs.map((paragraph) => (
                  <p key={paragraph} className="type-body text-[1.0625rem]">
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={140}>
                <blockquote className="mt-12 border-l border-ember pl-6 font-[family-name:var(--font-display)] text-[1.625rem] leading-snug text-bone sm:text-[2rem]">
                  {site.tagline}
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Rakamlar */}
      <Section spacing="sm" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <Reveal>
            <p className="type-eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
              Rakamlarla
            </p>
          </Reveal>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
            {studioStats.map((stat, index) => (
              <Reveal
                key={stat.label}
                as="div"
                delay={index * 70}
                className="flex flex-col border-t border-[var(--hairline-strong)] pt-5"
              >
                <dt className="type-eyebrow order-2 mt-4 max-w-[14ch]">{stat.label}</dt>
                <dd className="order-1 font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,4.75rem)] leading-[0.85] text-bone">
                  {stat.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Section>

      {/* Hijyen ve güvenlik */}
      <Section id="hijyen" className="border-t border-[var(--hairline)]">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="type-eyebrow flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                  Hijyen ve güvenlik
                </p>
                <h2 className="type-h2 mt-6 text-bone">Tartışmaya kapalı olan kısım</h2>
                <p className="type-body mt-5 max-w-sm">
                  Dövme geri alınamaz; hijyen de sonradan telafi edilemez. Aşağıdaki maddeler
                  istisnasız her randevuda uygulanır.
                </p>

                <ul className="mt-9 flex flex-col gap-3.5 border-t border-[var(--hairline)] pt-8">
                  {hygieneChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-bone">
                      <Check className="mt-[0.2em] h-4 w-4 shrink-0 text-ember" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <ol className="border-t border-[var(--hairline)] lg:col-span-8">
            {studioValues.map((value, index) => (
              <li key={value.id} className="border-b border-[var(--hairline)]">
                <Reveal
                  delay={(index % 3) * 70}
                  className="grid gap-x-6 gap-y-3 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] lg:py-9"
                >
                  <span
                    aria-hidden
                    className="font-[family-name:var(--font-display)] text-3xl leading-none text-ash-deep"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] font-medium leading-snug text-bone">
                      {value.title}
                    </h3>
                    <p className="type-body mt-2.5 max-w-xl text-[0.9375rem]">{value.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Süreç */}
      <ProcessSteps detailed />

      {/* Galeri */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Galeri"
            title="Stüdyonun içi"
            description="Randevu günü göreceğiniz yer: çizim masaları, sterilizasyon alanı ve Karaköy'e bakan pencereler."
          />

          <ul className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
            {galleryImages.map((image, index) => (
              <li key={image.src} className="mb-4 break-inside-avoid lg:mb-5">
                <Reveal delay={(index % 3) * 80}>
                  <Media
                    src={image.src}
                    alt={image.alt}
                    ratio={image.ratio}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Stüdyoda kim var */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="type-eyebrow flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                  Stüdyoda
                </p>
                <h2 className="type-h2 mt-6 text-bone">Masada tek kişi var.</h2>
                <p className="type-body mt-5 max-w-md">
                  Tasarımı da uygulamayı da ben yapıyorum. Karşılayan, çizen, iğneyi tutan ve
                  iyileşme sürecinde yazan aynı kişi.
                </p>
                <div className="mt-8">
                  <Button href="/hakkimda" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                    Hakkımda
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:pl-6">
              <Reveal delay={90}>
                <Link
                  href="/hakkimda"
                  className="group flex flex-col gap-6 border border-[var(--hairline)] p-6 transition-colors hover:border-[var(--hairline-strong)] sm:flex-row sm:items-center sm:gap-8 sm:p-8"
                >
                  <Media
                    src={artist.portrait.src}
                    alt={artist.portrait.alt}
                    ratio="square"
                    sizes="(max-width: 640px) 90vw, 160px"
                    className="w-full shrink-0 sm:w-40"
                  />
                  <div className="min-w-0">
                    <p className="type-h3 text-bone transition-colors group-hover:text-white">
                      {artist.name}
                    </p>
                    <p className="type-eyebrow mt-3">{artist.role}</p>
                    <p className="type-body mt-4 text-[0.9375rem]">{artist.tagline}</p>
                    <p
                      className={cn(
                        "type-eyebrow mt-5 flex items-center gap-2",
                        availabilityTone[artist.availability.status] === "signal"
                          ? "text-signal"
                          : availabilityTone[artist.availability.status] === "warn"
                            ? "text-warn"
                            : "text-ash-dim",
                      )}
                    >
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
                      {artist.availability.label}
                    </p>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-ash-deep transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone sm:block" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Kapanış — ziyaret */}
      <Section spacing="lg" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <div className="grid gap-12 border border-[var(--hairline)] bg-ink-900 p-7 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <Reveal>
              <p className="type-eyebrow">Ziyaret</p>
              <h2 className="type-h2 mt-6 text-bone">Kapı üçüncü katta</h2>
              <p className="type-body mt-5 max-w-md">
                Danışmak için randevu şart değil; çalışma saatleri içinde uğrayıp konuşabilirsiniz.
                Uygulama içinse önce tasarım süresi ayırıyoruz.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={site.booking.href} icon={<ArrowRight className="h-4 w-4" />}>
                  {site.booking.label}
                </Button>
                <Button href={mapsLink} variant="secondary" external>
                  Haritada aç
                </Button>
              </div>
            </Reveal>

            <Reveal delay={90} className="lg:pl-6">
              <address className="not-italic">
                <p className="type-eyebrow flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-ash-deep" />
                  Adres
                </p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-bone">
                  {site.address.street}
                  <br />
                  {site.address.district}
                  <br />
                  {site.address.postalCode} {site.address.city} / {site.address.region}
                </p>
              </address>

              <p className="type-body mt-6 max-w-sm text-[0.9375rem]">{site.address.directions}</p>

              <div className="mt-8 border-t border-[var(--hairline)] pt-6">
                <p className="type-eyebrow flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-ash-deep" />
                  Çalışma saatleri
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ash">{site.hoursSummary}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
