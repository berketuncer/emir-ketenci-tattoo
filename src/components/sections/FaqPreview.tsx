import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import { ArrowUpRight } from "@/components/ui/Icons";
import { homeFaqItems } from "@/data/faq";
import { whatsappLink } from "@/data/site";

export default function FaqPreview() {
  return (
    <Section id="sss" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="type-eyebrow flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                Sık sorulanlar
              </p>
              <h2 className="type-h2 mt-6 text-bone">Merak edilenler</h2>
              <p className="type-body mt-5 max-w-sm">
                Aradığınız cevabı bulamazsanız yazın; aynı gün içinde dönüyoruz.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/sss" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                  Tüm sorular
                </Button>
                <Button href={whatsappLink("Merhaba, bir sorum var.")} variant="ghost" external>
                  WhatsApp&apos;tan sor
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Accordion
              items={homeFaqItems.map((item) => ({
                id: item.id,
                question: item.question,
                answer: item.answer,
              }))}
              defaultOpen={homeFaqItems[0]?.id}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
