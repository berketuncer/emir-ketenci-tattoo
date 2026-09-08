import Link from "next/link";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import { ArrowUpRight } from "@/components/ui/Icons";
import { styles } from "@/data/styles";
import { workCountByStyle } from "@/data/works";

export default function StylesShowcase() {
  const shown = styles.slice(0, 6);

  return (
    <Section id="stiller" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Tarzlar"
          title="Ne istediğinizi bilmiyorsanız buradan başlayın"
          description="Her tarzın kendi dili, kendi ömrü ve kendi bakım gerekliliği var. Hangisinin size uyduğuna birlikte karar verelim."
          action={
            <Button href="/stiller" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
              Tüm tarzlar
            </Button>
          }
        />

        <ul className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((style, index) => (
            <li key={style.slug}>
              <Reveal delay={(index % 3) * 90}>
                <Link href={`/stiller/${style.slug}`} className="group block">
                  <div className="relative overflow-hidden">
                    <Media
                      src={style.cover.src}
                      alt={style.cover.alt}
                      ratio="portrait"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                      imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                    {style.popular ? (
                      <Badge tone="ember" className="absolute left-3 top-3 bg-ink/70 backdrop-blur">
                        Sık tercih edilen
                      </Badge>
                    ) : null}
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="type-h3 text-bone transition-colors group-hover:text-white">
                        {style.name}
                      </h3>
                      <p className="type-body mt-2 max-w-xs text-[0.9375rem]">{style.tagline}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ash-deep transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                  </div>

                  <p className="type-eyebrow mt-4 flex items-center gap-3">
                    <span>{workCountByStyle[style.slug] ?? 0} çalışma</span>
                    <span aria-hidden className="h-px w-6 bg-[var(--hairline-strong)]" />
                    <span>{style.typicalDuration}</span>
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
