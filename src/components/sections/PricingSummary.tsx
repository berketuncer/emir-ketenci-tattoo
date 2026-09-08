import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { pricingIntro, pricingNotes, pricingTiers } from "@/data/pricing";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

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

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <li key={tier.id}>
              <Reveal delay={index * 90} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col border p-8",
                    tier.highlighted
                      ? "border-bone/35 bg-ink-800"
                      : "border-[var(--hairline)] hover:border-[var(--hairline-strong)]",
                    "transition-colors duration-500",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[1.0625rem] font-medium text-bone">{tier.name}</h3>
                    {tier.highlighted ? (
                      <span className="type-eyebrow rounded-full border border-ember/35 bg-ember/10 px-2.5 py-1 text-[0.5625rem] text-ember-bright">
                        En sık
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-none text-bone">
                    {tier.range}
                  </p>
                  <p className="type-body mt-4 text-[0.9375rem]">{tier.description}</p>
                  <ul className="mt-6 flex flex-col gap-3 border-t border-[var(--hairline)] pt-6">
                    {tier.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-[0.875rem] text-ash">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  {tier.note ? <p className="mt-6 text-xs leading-relaxed text-ash-deep">{tier.note}</p> : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-6 border-t border-[var(--hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {pricingNotes.map((note) => (
              <li key={note} className="text-xs text-ash-deep">
                {note}
              </li>
            ))}
          </ul>
          <Button href={site.booking.href} variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            Size özel fiyat alın
          </Button>
        </div>
      </div>
    </Section>
  );
}
