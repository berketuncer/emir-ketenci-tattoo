import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import WorkGallery from "@/components/work/WorkGallery";
import { ArrowRight, ArrowUpRight, Check } from "@/components/ui/Icons";
import { artist } from "@/data/artist";
import { styleBySlug, styles } from "@/data/styles";
import { worksByStyle } from "@/data/works";
import { site } from "@/data/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return styles.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stiller/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const style = styleBySlug(slug);

  if (!style) {
    return pageMeta({
      title: "Tarz bulunamadı",
      description: "Aradığınız tarz sayfası bulunamadı. Tüm dövme tarzlarını listeden inceleyebilirsiniz.",
      path: "/stiller",
    });
  }

  return pageMeta({
    title: `${style.name} Dövme`,
    description: `${style.tagline} Kimler için uygun, tipik seans süresi ve Emir Ketenci arşivinden ${style.name} örnekleri.`,
    path: `/stiller/${style.slug}`,
    image: style.cover.src,
    type: "article",
  });
}

export default async function StyleDetailPage({ params }: PageProps<"/stiller/[slug]">) {
  const { slug } = await params;
  const style = styleBySlug(slug);

  if (!style) notFound();

  const styleWorks = worksByStyle(style.slug);
  const isFocus = artist.focusStyles.includes(style.slug);

  // Kalan tarzları, listedeki sırayı takip ederek döndürüyoruz.
  const currentIndex = styles.findIndex((item) => item.slug === style.slug);
  const rest = styles.filter((item) => item.slug !== style.slug);
  const otherStyles = [...rest.slice(currentIndex), ...rest.slice(0, currentIndex)].slice(0, 4);

  const facts = [
    { label: "Tipik seans süresi", value: style.typicalDuration },
    { label: "Odak alanım mı", value: isFocus ? "Evet" : "Talep üzerine" },
    { label: "Portfolyodaki çalışma", value: `${styleWorks.length} iş` },
  ];

  const [lead, ...paragraphs] = style.description;

  return (
    <>
      <script
        type="application/ld+json"
        // schema.org verisi statik içerikten üretilir; kullanıcı girdisi içermez.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Ana sayfa", path: "/" },
              { name: "Tarzlar", path: "/stiller" },
              { name: style.name, path: `/stiller/${style.slug}` },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Tarz"
        title={style.name}
        description={style.tagline}
        crumbs={[
          { label: "Ana sayfa", href: "/" },
          { label: "Tarzlar", href: "/stiller" },
          { label: style.name },
        ]}
        actions={
          <>
            <Button href={`/randevu?stil=${style.slug}`} icon={<ArrowRight className="h-4 w-4" />}>
              Bu tarzda randevu
            </Button>
            <Button href="#ornek-isler" variant="secondary">
              Örnek işlere bak
            </Button>
          </>
        }
        aside={
          <div className="w-full max-w-[22rem] lg:ml-auto">
            <Media
              src={style.cover.src}
              alt={style.cover.alt}
              ratio="portrait"
              priority
              sizes="(max-width: 1024px) 88vw, 22rem"
            />
          </div>
        }
      />

      {/* Tarzın kendi anlatımı */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="type-eyebrow flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                  Tanım
                </p>
                <h2 className="type-h2 mt-6 text-bone">{style.name} nedir?</h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={80}>
                <p className="type-lead text-bone">{lead}</p>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="type-body mt-6 max-w-2xl">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Uygunluk ve pratik notlar — iki farklı görsel muamele */}
      <Section spacing="sm" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div className="h-full border border-[var(--hairline)] bg-ink-800 p-7 sm:p-9">
                <h2 className="type-h3 text-bone">Kimler için uygun</h2>
                <ul className="mt-7 flex flex-col gap-4">
                  {style.suitedFor.map((item) => (
                    <li key={item} className="flex items-start gap-3.5 text-[0.9375rem] leading-relaxed text-ash">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-ember" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="h-full">
                <h2 className="type-h3 text-bone">Bilinmesi gerekenler</h2>
                <ol className="mt-7">
                  {style.notes.map((note, index) => (
                    <li
                      key={note}
                      className="flex gap-5 border-t border-[var(--hairline)] py-5 last:border-b last:border-[var(--hairline)]"
                    >
                      <span className="type-eyebrow mt-1 shrink-0 text-warn">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[0.9375rem] leading-relaxed text-ash">{note}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-xs leading-relaxed text-ash-deep">
                  Bu notlar genel geçer kurallar değil, benim çalışma biçimim. Bölge ve cilt
                  tipine göre görüşmede birlikte gözden geçirilir.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Künye şeridi */}
      <Section spacing="sm" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <dl className="grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-3">
            {facts.map((fact, index) => (
              <div key={fact.label} className="bg-ink">
                <Reveal delay={index * 70} className="p-7 lg:p-9">
                  <dt className="type-eyebrow">{fact.label}</dt>
                  <dd className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-none text-bone sm:text-3xl">
                    {fact.value}
                  </dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Bu tarzda nasıl çalışıyorum */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="type-eyebrow flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                  Kim çiziyor
                </p>
                <h2 className="type-h2 mt-6 text-bone">
                  {style.name} işlerini ben çiziyorum.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:pl-6">
              <Reveal delay={90}>
                <p className="type-lead">
                  {isFocus
                    ? `${style.name}, ağırlıklı çalıştığım dört alandan biri. Tasarımdan uygulamaya kadar her adımı tek başıma yürütüyorum; araya kimse girmiyor.`
                    : `${style.name} işlerini de yapıyorum, ancak ağırlıklı alanlarım fine line, mikro realizm, blackwork ve geometrik. Fikriniz bu tarzda daha iyi çıkacaksa bunu size baştan söylerim.`}
                </p>
                <p className="type-body mt-5 max-w-xl">
                  Stüdyo tek kişilik ve günde tek randevu alıyorum. Bu yüzden takvim biraz yavaş
                  ilerliyor ama başladığımız gün tamamen size ayrılıyor.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/hakkimda" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                    {artist.name} hakkında
                  </Button>
                  <Button href={`${site.booking.href}?stil=${style.slug}`} variant="ghost">
                    Bu tarzda randevu
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Örnek işler */}
      <Section id="ornek-isler" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Portfolyo"
            title="Örnek işler"
            description="Arşivden seçilmiş çalışmalar. Görsele dokunduğunuzda bölge, ölçü ve seans bilgisi açılır."
            action={
              <Button href="/calismalar" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                Tüm portfolyo
              </Button>
            }
          />

          <WorkGallery works={styleWorks} columns="three" className="mt-14" />
        </div>
      </Section>

      {/* Diğer tarzlar */}
      <Section spacing="sm" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="type-h3 text-bone">Diğer tarzlar</h2>
            <Link
              href="/stiller"
              className="link-underline text-sm text-ash transition-colors hover:text-bone"
            >
              Tam listeye dön
            </Link>
          </Reveal>

          <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 xl:-mx-14 xl:px-14">
            {otherStyles.map((item) => (
              <Link
                key={item.slug}
                href={`/stiller/${item.slug}`}
                className="group w-[15rem] shrink-0 snap-start border border-[var(--hairline)] p-3 transition-colors duration-500 hover:border-[var(--hairline-strong)] hover:bg-ink-900 sm:w-[17rem]"
              >
                <div className="overflow-hidden">
                  <Media
                    src={item.cover.src}
                    alt={item.cover.alt}
                    ratio="landscape"
                    sizes="(max-width: 640px) 240px, 272px"
                    imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 px-1 pb-1 pt-4">
                  <div className="min-w-0">
                    <h3 className="text-[1.0625rem] font-medium text-bone">{item.name}</h3>
                    <p className="type-eyebrow mt-2.5">{item.typicalDuration}</p>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-ash-deep transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Randevu çağrısı */}
      <Section className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-9 border border-[var(--hairline)] bg-ink-900 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <h2 className="type-h2 text-bone">{style.name} için ilk adım</h2>
                <p className="type-lead mt-5 max-w-lg">
                  Formda tarz zaten seçili gelir. Fikrinizi, bölgeyi ve yaklaşık ölçüyü yazmanız yeterli;
                  dönüşümüz {site.booking.responseTime}.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button href={`/randevu?stil=${style.slug}`} icon={<ArrowRight className="h-4 w-4" />}>
                  Randevu talebi
                </Button>
                <Button href="/sss" variant="secondary">
                  Önce sorularım var
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
