import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { pricingIntro, pricingNotes } from "@/data/pricing";
import { site } from "@/data/site";

/** Sabit fiyat yok; bölüm neyin fiyatı belirlediğini ve değişmeyen kuralları anlatır. */
export default function PricingSummary() {
  return (
    <Section id="fiyat" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <SectionHeader eyebrow="Fiyatlandırma" title={pricingIntro.title} description={pricingIntro.description} />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingIntro.factors.map((factor, index) => (
            <li key={factor.title}>
              <Reveal delay={index * 60} className="border-t border-[var(--hairline-strong)] pt-5">
                <h3 className="text-sm font-medium text-bone">{factor.title}</h3>
                <p className="type-body mt-2 text-[0.875rem]">{factor.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-6 border-t border-[var(--hairline)] pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {pricingNotes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-ash">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                {note}
              </li>
            ))}
          </ul>
          <Button href={site.booking.href} variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            Fikrinizi yazın, rakamı söyleyeyim
          </Button>
        </div>
      </div>
    </Section>
  );
}
