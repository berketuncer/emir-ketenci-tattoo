import Section, { SectionHeader } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Quote, Star } from "@/components/ui/Icons";
import { styleName } from "@/data/styles";
import { averageRating, reviewCount, testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full break-inside-avoid flex-col border border-[var(--hairline)] p-7 transition-colors duration-500 hover:border-[var(--hairline-strong)]">
      <Quote aria-hidden className="h-6 w-6 text-ash-deep" />
      <blockquote className="mt-5 flex-1">
        <p className="text-[0.9375rem] leading-relaxed text-bone/90">{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-7 border-t border-[var(--hairline)] pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-bone">{testimonial.name}</span>
          <span className="flex items-center gap-0.5" aria-label={`${testimonial.rating} / 5 puan`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                aria-hidden
                className={index < testimonial.rating ? "h-3 w-3 text-ember" : "h-3 w-3 text-ink-500"}
              />
            ))}
          </span>
        </div>
        <p className="type-eyebrow mt-2.5 text-[0.625rem]">
          {styleName(testimonial.style)} · {testimonial.date}
        </p>
        {testimonial.firstTattoo ? (
          <p className="mt-2 text-[0.6875rem] text-ember-bright">İlk dövmesiydi</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ limit = 6 }: { limit?: number }) {
  return (
    <Section id="yorumlar" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Misafirlerimiz"
          title="Bizden çıkarken ne söylediler"
          description={
            <span className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 text-ember" />
                ))}
              </span>
              <span className="text-bone">{averageRating.toFixed(1)} / 5</span>
              <span className="text-ash-dim">· {reviewCount} değerlendirme</span>
            </span>
          }
        />

        <ul className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3 [&>li]:mb-5">
          {testimonials.slice(0, limit).map((testimonial, index) => (
            <li key={testimonial.id} className="break-inside-avoid">
              <Reveal delay={(index % 3) * 80}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-ash-deep">
          Yorumlar demo içeriktir. Yayına geçtiğimizde Google değerlendirmeleri bu alanda gösterilecek.
        </p>
      </div>
    </Section>
  );
}
