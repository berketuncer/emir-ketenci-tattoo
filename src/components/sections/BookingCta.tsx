import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Media from "@/components/ui/Media";
import { ArrowRight } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/data/site";
import { workById } from "@/data/works";

export default function BookingCta() {
  const backdrop = workById("w-19");

  return (
    <Section spacing="lg" className="relative isolate overflow-hidden border-t border-[var(--hairline)]">
      {backdrop ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Media
            src={backdrop.media.src}
            alt=""
            ratio="landscape"
            className="h-full w-full opacity-[0.18]"
            imgClassName="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        </div>
      ) : null}

      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="type-eyebrow justify-center">Randevu</p>
          <h2 className="type-h1 mt-6 text-bone">
            Aklınızdaki fikri <span className="italic text-ash">bugün</span> anlatın.
          </h2>
          <p className="type-lead mx-auto mt-6 max-w-xl">
            Üç kısa bölüm, birkaç dakika. Net bir fikriniz olması gerekmiyor —
            {" "}{site.booking.responseTime} size özel bir değerlendirmeyle dönüyorum.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={site.booking.href} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Randevu Talebi Oluştur
            </Button>
            <Button href={whatsappLink()} variant="secondary" size="lg" external>
              Önce konuşalım
            </Button>
          </div>

          <p className="type-eyebrow mt-8 justify-center text-ash-deep">
            {site.booking.depositNote}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
