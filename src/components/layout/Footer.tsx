import Link from "next/link";
import Logo from "./Logo";
import Button from "@/components/ui/Button";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "@/components/ui/Icons";
import { artist } from "@/data/artist";
import { fullAddress, mailLink, phoneLink, site, whatsappLink } from "@/data/site";
import { styles } from "@/data/styles";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative border-t border-[var(--hairline)] bg-ink-900">
      <div className="container-page">
        {/* Kapanış çağrısı */}
        <div className="grid gap-10 border-b border-[var(--hairline)] py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="type-eyebrow mb-6">Bir sonraki adım</p>
            <h2 className="type-h2 max-w-xl text-bone">
              Bir fikriniz mi var? Gerisini birlikte çizelim.
            </h2>
            <p className="type-body mt-5 max-w-md">
              Net bir fikriniz olması gerekmiyor. Talebinizi gönderin, {site.booking.responseTime} size özel bir
              değerlendirmeyle döneyim.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={site.booking.href} size="lg" icon={<ArrowUpRight className="h-4 w-4" />}>
              {site.booking.label}
            </Button>
            <Button href={whatsappLink()} variant="secondary" size="lg" external>
              WhatsApp&apos;tan yaz
            </Button>
          </div>
        </div>

        {/* Bağlantı sütunları */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="type-body mt-6 max-w-xs text-[0.9375rem]">{site.shortDescription}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              {site.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-ash transition-colors hover:text-bone"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Alt menü">
            <h3 className="type-eyebrow mb-6">Keşfet</h3>
            <ul className="flex flex-col gap-3.5">
              {[...site.nav, ...site.secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ash transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Dövme tarzları">
            <h3 className="type-eyebrow mb-6">Stiller</h3>
            <ul className="flex flex-col gap-3.5">
              {styles.slice(0, 6).map((style) => (
                <li key={style.slug}>
                  <Link href={`/stiller/${style.slug}`} className="text-sm text-ash transition-colors hover:text-bone">
                    {style.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/stiller" className="text-sm text-ash-dim transition-colors hover:text-bone">
                  Tüm stiller →
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="type-eyebrow mb-6">İletişim</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a href={mailLink} className="group flex items-start gap-3 text-ash transition-colors hover:text-bone">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ash-deep transition-colors group-hover:text-ember" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={phoneLink} className="group flex items-start gap-3 text-ash transition-colors hover:text-bone">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ash-deep transition-colors group-hover:text-ember" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href="/iletisim"
                  className="group flex items-start gap-3 text-ash transition-colors hover:text-bone"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ash-deep transition-colors group-hover:text-ember" />
                  <span>{fullAddress}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-ash">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ash-deep" />
                <span>{site.hoursSummary}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Kim çalışıyor */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--hairline)] py-8">
          <span className="type-eyebrow">Stüdyoda</span>
          <Link href="/hakkimda" className="text-sm text-ash transition-colors hover:text-bone">
            {artist.name} — {artist.role}
          </Link>
          <span className="text-sm text-ash-deep">Günde tek randevu</span>
        </div>

        {/* Yasal satır */}
        <div className="flex flex-col gap-4 border-t border-[var(--hairline)] py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ash-deep">
            © {year} {site.legalName}. Tüm hakları saklıdır.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {site.legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-xs text-ash-deep transition-colors hover:text-ash">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="pb-10 text-xs leading-relaxed text-ash-deep">
          Bu site bir tanıtım demosudur. Çalışmalar, yorumlar ve iletişim bilgileri örnek
          içeriktir.
        </p>
      </div>
    </footer>
  );
}
