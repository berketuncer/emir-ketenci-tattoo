import Section, { SectionHeader } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, Instagram, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/data/site";

const channels = [
  { label: "WhatsApp", value: site.contact.whatsappDisplay, href: whatsappLink(), Icon: WhatsApp },
  { label: "Instagram", value: site.social[0].handle, href: site.social[0].href, Icon: Instagram },
];

const flow = [
  "WhatsApp'tan yazıyorsun; fikri, ölçüyü ve bölgeyi konuşuyoruz.",
  "Tasarım onaylanınca kapora ile gün kesinleşiyor.",
  "Konumu ve gelmeden önce bilmen gerekenleri o zaman yazıyorum.",
];

/**
 * Konum ve iletişim. Adres, harita ve çalışma saati bilinçli olarak yok:
 * sadece randevuyla çalışılıyor, konum randevu kesinleşince yazılıyor.
 */
export default function LocationContact() {
  return (
    <Section id="iletisim" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Konum ve iletişim"
          title="Sadece randevuyla, İstanbul'da."
          description={site.location.note}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="border border-[var(--hairline)] p-7 sm:p-9">
                <p className="type-eyebrow">Nasıl ilerliyor</p>
                <ol className="mt-6 flex flex-col gap-4">
                  {flow.map((line, index) => (
                    <li key={line} className="flex gap-4 text-[0.9375rem] leading-relaxed text-ash">
                      <span className="font-mono text-xs text-ash-deep">{String(index + 1).padStart(2, "0")}</span>
                      {line}
                    </li>
                  ))}
                </ol>
                <p className="type-body mt-7 text-[0.875rem]">
                  Telefonla değil, yazarak ilerliyoruz — böylece hiçbir şey unutulmuyor, sen de
                  istediğin saatte yazabiliyorsun. {site.booking.responseNote}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <ul className="flex flex-col divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
                {channels.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-center gap-3.5">
                        <Icon className="h-5 w-5 text-ash-deep transition-colors group-hover:text-ember" />
                        <span>
                          <span className="type-eyebrow block text-[0.5625rem]">{label}</span>
                          <span className="mt-1 block text-sm text-bone">{value}</span>
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-ash-deep transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ash-dim">{site.location.short}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
