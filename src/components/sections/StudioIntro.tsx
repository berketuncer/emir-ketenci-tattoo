import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import { ArrowUpRight } from "@/components/ui/Icons";
import { studioStats, studioStory } from "@/data/studio";

export default function StudioIntro() {
  return (
    <Section id="studyo" className="border-t border-[var(--hairline)]" spacing="lg">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:order-2 lg:col-span-5">
            <Parallax speed={0.04}>
              <Media
                src={studioStory.gallery[1].src}
                alt={studioStory.gallery[1].alt}
                ratio="portrait"
                sizes="(max-width: 1024px) 92vw, 38vw"
              />
            </Parallax>
          </div>

          <div className="lg:order-1 lg:col-span-7 lg:pr-6">
            <Reveal>
              <p className="type-eyebrow flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
                {studioStory.eyebrow}
              </p>
              <h2 className="type-h2 mt-6 text-bone">{studioStory.title}</h2>
              <div className="mt-7 flex flex-col gap-5">
                {studioStory.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="type-body max-w-xl">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-9">
                <Button href="/studyo" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                  Stüdyoyu tanıyın
                </Button>
              </div>
            </Reveal>

            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[var(--hairline)] pt-10 sm:grid-cols-4">
              {studioStats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 70} as="div">
                  <dt className="type-eyebrow order-2 mt-2 block">{stat.label}</dt>
                  <dd className="font-[family-name:var(--font-display)] text-4xl leading-none text-bone">
                    {stat.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
