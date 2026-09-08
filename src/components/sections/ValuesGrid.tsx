import Section, { SectionHeader } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { studioValues } from "@/data/studio";

export default function ValuesGrid() {
  return (
    <Section id="neden-biz" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Neden burası"
          title="Güven, tasarımdan önce gelir"
          description="Dövme geri alınamaz. Bu yüzden süreci baştan sona açık, yavaş ve kontrol edilebilir tutuyoruz."
        />

        <ul className="mt-14 grid gap-px overflow-hidden border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {studioValues.map((value, index) => (
            <li key={value.id} className="bg-ink">
              <Reveal delay={(index % 3) * 80} className="flex h-full flex-col p-7 lg:p-9">
                <span className="type-eyebrow text-ash-deep">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[1.0625rem] font-medium leading-snug text-bone">{value.title}</h3>
                <p className="type-body mt-3 text-[0.9375rem]">{value.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
