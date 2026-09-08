import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import WorkGallery from "@/components/work/WorkGallery";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/data/site";
import { studioValues } from "@/data/studio";
import { styles } from "@/data/styles";
import { coverUpWorks, works } from "@/data/works";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

const years = works.map((work) => work.year);
const yearRange = `${Math.min(...years)} – ${Math.max(...years)}`;

const stats = [
  { value: works.length, label: "Çalışma" },
  { value: styles.length, label: "Tarz" },
  { value: coverUpWorks.length, label: "Kapatma" },
  { value: Math.max(...works.map((work) => work.sessions)), label: "En uzun proje (seans)" },
];

/** Bilgi şeridinde uzun açıklamaların yalnızca ilk cümlesi gösterilir. */
const firstSentence = (text: string) => {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
};

const stripValueIds = ["v-04", "v-05", "v-06"];
const stripValues = stripValueIds
  .map((id) => studioValues.find((value) => value.id === id))
  .filter((value): value is (typeof studioValues)[number] => Boolean(value));

const coverUpExample = coverUpWorks[0];

export const metadata: Metadata = pageMeta({
  title: "Çalışmalar",
  description: `Emir Ketenci arşivi: ${styles.length} tarzda ${works.length} çalışma. Fine line, mikro realizm, blackwork ve geometrik işleri tarza göre filtreleyip detayına bakın.`,
  path: "/calismalar",
});

const breadcrumb = breadcrumbSchema([
  { name: "Ana Sayfa", path: "/" },
  { name: "Çalışmalar", path: "/calismalar" },
]);

export default function WorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Statik şema verisi; kullanıcı girdisi içermez.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHero
        size="lg"
        eyebrow="Portfolyo"
        title="Arşiv"
        description={
          <>
            Arşivde {works.length} çalışma var, {styles.length} ayrı tarzda. Hepsini ben çizdim; her biri
            tek bir kişi için hazırlandı ve yalnızca bir kez uygulandı.
          </>
        }
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Çalışmalar" }]}
        aside={
          <Reveal delay={140}>
            <dl className="grid grid-cols-2 border-l border-t border-[var(--hairline)]">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-b border-r border-[var(--hairline)] px-5 py-6 sm:px-6 sm:py-7"
                >
                  <dt className="type-eyebrow">{stat.label}</dt>
                  <dd className="mt-3 font-display text-[2.25rem] leading-none text-bone sm:text-[2.75rem]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="type-eyebrow mt-5 text-ash-deep">Kayıtlar {yearRange}</p>
          </Reveal>
        }
      />

      <Section spacing="md">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 className="type-h3 text-bone">Tüm çalışmalar</h2>
            <p className="type-eyebrow">Büyütmek için bir çalışmaya dokunun</p>
          </Reveal>

          <WorkGallery works={works} filterable pageSize={15} columns="four" className="mt-10" />
        </div>
      </Section>

      <Section spacing="md" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Sonraki adım"
            title="Aradığınızı bulamadınız mı?"
            description="Arşiv yalnızca tamamlanmış işleri gösteriyor. Buradan iki yol çıkıyor: eski bir dövmenin üzerine çalışmak ya da sıfırdan kendi fikrinizi anlatmak."
          />

          <div className="mt-12 grid border border-[var(--hairline)] lg:grid-cols-2">
            <div className="border-b border-[var(--hairline)] p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <Reveal>
                <p className="type-eyebrow">Kapatma</p>
                <h3 className="type-h3 mt-5 text-bone">Eski bir dövmenin üzerine</h3>
                <p className="type-body mt-4 max-w-md">
                  Kapatma işlerinde eski hattı silmeye çalışmak yerine, onu yeni kompozisyonun
                  parçası yapıyoruz. Fotoğrafı gönderin; boyut, koyuluk ve yaş neyin mümkün
                  olduğunu birlikte belirlesin.
                </p>

                {coverUpExample ? (
                  <figure className="mt-8 flex items-center gap-5">
                    <Media
                      src={coverUpExample.media.src}
                      alt={coverUpExample.media.alt}
                      ratio={coverUpExample.media.ratio}
                      className="w-28 shrink-0 sm:w-32"
                      sizes="128px"
                    />
                    <figcaption className="min-w-0">
                      <span className="block text-[0.9375rem] font-medium text-bone">
                        {coverUpExample.title}
                      </span>
                      <span className="type-eyebrow mt-2 block">
                        {coverUpExample.placement} · {coverUpExample.sessions} seans
                      </span>
                      {coverUpExample.note ? (
                        <span className="type-body mt-3 block text-[0.875rem]">
                          {coverUpExample.note}
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                ) : null}

                <div className="mt-8">
                  <Button
                    href={`${site.booking.href}?konu=cover-up`}
                    variant="secondary"
                    icon={<ArrowUpRight className="h-4 w-4" />}
                  >
                    Kapatma için talep gönderin
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="p-7 sm:p-10 lg:p-12">
              <Reveal delay={120}>
                <p className="type-eyebrow">Randevu</p>
                <h3 className="type-h3 mt-5 text-bone">Aklınızdaki fikir burada yoksa</h3>
                <p className="type-body mt-4 max-w-md">
                  Doğrusu da bu: her çalışma sıfırdan çiziliyor, arşivdeki hiçbir tasarım ikinci
                  kez uygulanmıyor. Fikrinizi yazın, {site.booking.responseTime} size özel bir
                  değerlendirmeyle dönelim.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={site.booking.href} icon={<ArrowRight className="h-4 w-4" />}>
                    {site.booking.label}
                  </Button>
                  <Button
                    href={whatsappLink("Merhaba, arşivdeki işlere baktım. Bir fikrim var.")}
                    variant="secondary"
                    external
                  >
                    Önce konuşalım
                  </Button>
                </div>

                <p className="type-body mt-8 max-w-md text-[0.875rem]">
                  Hangi tarzın size uyduğundan emin değilseniz{" "}
                  <Link
                    href="/stiller"
                    className="link-underline text-bone decoration-ash-deep underline-offset-4"
                  >
                    tarzlar sayfası
                  </Link>{" "}
                  iyi bir başlangıç.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="sm" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <h2 className="type-eyebrow">Arşivin arkasındaki üç kural</h2>

          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-3">
            {stripValues.map((value, index) => (
              <li key={value.id} className="border-t border-[var(--hairline)] pt-5">
                <Reveal delay={index * 90}>
                  <span className="type-eyebrow text-ash-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[0.9375rem] font-medium leading-snug text-bone">
                    {value.title}
                  </p>
                  <p className="type-body mt-2 text-[0.875rem]">{firstSentence(value.description)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
