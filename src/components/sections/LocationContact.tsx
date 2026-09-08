import Section, { SectionHeader } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import MapBlock from "@/components/ui/MapBlock";
import { ArrowUpRight, Instagram, Mail, Phone, WhatsApp } from "@/components/ui/Icons";
import { mailLink, phoneLink, site, whatsappLink } from "@/data/site";

const channels = [
  { label: "WhatsApp", value: site.contact.whatsappDisplay, href: whatsappLink(), Icon: WhatsApp, external: true },
  { label: "Telefon", value: site.contact.phoneDisplay, href: phoneLink, Icon: Phone, external: false },
  { label: "E-posta", value: site.contact.email, href: mailLink, Icon: Mail, external: false },
  { label: "Instagram", value: site.social[0].handle, href: site.social[0].href, Icon: Instagram, external: true },
];

export default function LocationContact() {
  return (
    <Section id="iletisim" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <SectionHeader
          eyebrow="Konum"
          title="Karaköy'de, üçüncü katta"
          description={site.address.directions}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <MapBlock />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <address className="not-italic">
                <p className="type-eyebrow">Adres</p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-bone">
                  {site.address.street}
                  <br />
                  {site.address.district}
                  <br />
                  {site.address.postalCode} {site.address.city} / {site.address.region}
                </p>
              </address>

              <ul className="mt-9 flex flex-col divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
                {channels.map(({ label, value, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

              <div className="mt-9">
                <p className="type-eyebrow">Çalışma saatleri</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {site.hours.map((slot) => (
                    <li key={slot.day} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-ash">{slot.day}</span>
                      <span aria-hidden className="h-px flex-1 translate-y-[-3px] bg-[var(--hairline)]" />
                      <span className={"closed" in slot && slot.closed ? "text-ash-deep" : "text-bone"}>
                        {slot.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
