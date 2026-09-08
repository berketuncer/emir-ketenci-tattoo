import Link from "next/link";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { ArrowUpRight } from "@/components/ui/Icons";
import { site } from "@/data/site";
import { latestWorks } from "@/data/works";

/**
 * Instagram akışına benzer bir şerit — ileride gerçek bir Instagram beslemesine
 * bağlanabilmesi için sabit oranlı kareler kullanılır.
 */
export default function LatestWorks() {
  return (
    <Section spacing="sm" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="type-eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" />
              Stüdyodan
            </p>
            <h2 className="type-h3 mt-4 text-bone">Son eklenenler</h2>
          </div>
          <a
            href={site.social[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
          >
            {site.social[0].handle}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <Reveal className="mt-10">
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:px-8 xl:px-14">
          {latestWorks.map((work) => (
            <li
              key={work.id}
              className="w-[46vw] shrink-0 snap-start sm:w-[30vw] lg:w-[22vw] xl:w-[15vw]"
            >
              <Link href="/calismalar" className="group block overflow-hidden" aria-label={`${work.title} — portfolyoyu aç`}>
                <Media
                  src={work.media.src}
                  alt={work.media.alt}
                  ratio="square"
                  sizes="(max-width: 640px) 46vw, (max-width: 1280px) 22vw, 15vw"
                  imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
