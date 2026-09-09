import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { processSteps } from "@/data/process";
import { site } from "@/data/site";

export default function ProcessSteps({ detailed = false }: { detailed?: boolean }) {
  return (
    <Section id="surec" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Süreç"
          title="Fikirden iyileşmeye, altı adım"
          description="İlk dövmesini yaptıracak biri için bile sürpriz yok. Her adımda ne olacağını önceden biliyorsun."
          action={
            <Button href={site.booking.href} icon={<ArrowRight className="h-4 w-4" />}>
              İlk adımı at
            </Button>
          }
        />

        <ol className="mt-14 grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step.step} className="bg-ink">
              <Reveal delay={(index % 3) * 80} className="flex h-full flex-col p-7 lg:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-[family-name:var(--font-display)] text-5xl leading-none text-ash-deep">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <span className="type-eyebrow text-right">{step.duration}</span>
                </div>
                <h3 className="mt-7 text-[1.0625rem] font-medium text-bone">{step.title}</h3>
                <p className="type-body mt-2.5 text-[0.9375rem]">{step.summary}</p>
                {detailed ? <p className="type-body mt-4 text-[0.875rem] text-ash-dim">{step.detail}</p> : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
