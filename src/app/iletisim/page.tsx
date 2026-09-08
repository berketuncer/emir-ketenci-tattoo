import type { Metadata } from "next";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import PageHero from "@/components/ui/PageHero";
import LocationContact from "@/components/sections/LocationContact";
import { ArrowRight, ArrowUpRight, Clock, Mail, WhatsApp } from "@/components/ui/Icons";
import { faqByCategory } from "@/data/faq";
import { site, whatsappLink } from "@/data/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "İletişim",
  description:
    "Karaköy'deki stüdyoya nasıl ulaşırsınız, hangi kanaldan ne için yazmalısınız ve ne kadar sürede dönüş alırsınız — adres, saatler ve ulaşım.",
  path: "/iletisim",
});

const channels = [
  {
    id: "whatsapp",
    eyebrow: "Hızlı soru",
    title: "WhatsApp",
    description:
      "Fiyat aralığı, uygunluk ya da aklınıza takılan küçük bir tereddüt için en hızlı yol. Çalışma saatleri içinde genelde birkaç saat içinde dönüyoruz.",
    meta: site.contact.whatsappDisplay,
    href: whatsappLink("Merhaba, kısa bir sorum olacak."),
    external: true,
    Icon: WhatsApp,
  },
  {
    id: "randevu",
    eyebrow: "Randevu talebi",
    title: "Randevu formu",
    description:
      "Fikri, ölçüyü ve bölgeyi anlatan beş kısa adım; referans görseli de ekleyebilirsiniz. 48 saat içinde değerlendirip dönüyorum.",
    meta: `Ortalama 3 dakika · ${site.booking.responseTime} yanıt`,
    href: site.booking.href,
    external: false,
    Icon: Clock,
  },
  {
    id: "basin",
    eyebrow: "Basın ve iş birliği",
    title: "E-posta",
    description:
      "Röportaj, konuk sanatçı programı, marka iş birliği ve etkinlik talepleri için ayrı bir adresimiz var; buradan yazarsanız kaybolmaz.",
    meta: site.contact.pressEmail,
    href: `mailto:${site.contact.pressEmail}`,
    external: false,
    Icon: Mail,
  },
];

const routes = [
  {
    title: "Tramvayla",
    body: "T1 hattında Tophane durağında in. Sahil yönüne döndüğünde Mumhane Caddesi dört dakikalık düz bir yürüyüş.",
  },
  {
    title: "Vapurla",
    body: "Karaköy iskelesinden çıkıp sahili takip et; Tophane yönüne doğru altı dakika sonra binanın önündesin.",
  },
  {
    title: "Araçla",
    body: "Mumhane Caddesi dar ve sokak parkı çok sınırlı. Hafta sonu geliyorsan çevredeki otoparklardan birini önceden planlamanı öneririz.",
  },
  {
    title: "Binaya varınca",
    body: "Girişte zil paneli var, stüdyo üçüncü katta. Randevunuzdan beş dakika önce gelmeniz yeterli; erken gelirseniz kahvenizi içerken bekleyebilirsiniz.",
  },
];

const contactFaq = faqByCategory("randevu").slice(0, 4);

const breadcrumbs = breadcrumbSchema([
  { name: "Ana sayfa", path: "/" },
  { name: "İletişim", path: "/iletisim" },
]);

export default function IletisimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Statik içerik; kullanıcı girdisi içermez.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <PageHero
        eyebrow="İletişim"
        title="Bize ulaşın"
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "İletişim" }]}
        description={
          <>
            Kısa sorular için WhatsApp, dövme fikri için randevu formu, basın ve iş birliği için
            e-posta. Randevu taleplerine {site.booking.responseTime}, mesajlara aynı gün içinde
            dönüyoruz.
          </>
        }
        actions={
          <>
            <Button href={site.booking.href} icon={<ArrowRight className="h-4 w-4" />}>
              Randevu talebi oluştur
            </Button>
            <Button href={whatsappLink()} variant="secondary" external>
              WhatsApp&apos;tan yaz
            </Button>
          </>
        }
      />

      <Section id="kanallar">
        <div className="container-page">
          <SectionHeader
            eyebrow="Kanallar"
            title="Hangi kanaldan yazmalıyım?"
            description="Üç ayrı yol, üç ayrı hız. Doğru kapıyı çalmak dönüş süresini kısaltıyor."
          />

          <ul className="mt-14 grid gap-5 lg:grid-cols-3">
            {channels.map(({ id, eyebrow, title, description, meta, href, external, Icon }, index) => (
              <li key={id}>
                <Reveal delay={index * 90} className="h-full">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full flex-col border border-[var(--hairline)] p-7 transition-colors duration-500 hover:border-[var(--hairline-strong)] hover:bg-bone/[0.02] sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="h-6 w-6 text-ash-deep transition-colors duration-500 group-hover:text-ember" />
                      <ArrowUpRight className="h-5 w-5 text-ash-deep transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
                    </div>

                    <p className="type-eyebrow mt-10">{eyebrow}</p>
                    <h3 className="type-h3 mt-3 text-bone">{title}</h3>
                    <p className="type-body mt-4 text-[0.9375rem]">{description}</p>

                    <p className="mt-auto pt-7 text-[0.8125rem] text-ash-dim">{meta}</p>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <LocationContact />

      <Section id="ulasim" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Ulaşım"
            title="Nasıl gelinir"
            description="Stüdyo, Karaköy'ün sahil hattına paralel sakin bir caddede. Toplu taşımayla gelmek hem daha hızlı hem daha kolay."
          />

          <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((route, index) => (
              <li key={route.title}>
                <Reveal delay={index * 70}>
                  <span
                    aria-hidden
                    className="block font-[family-name:var(--font-display)] text-4xl leading-none text-ash-deep"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-medium text-bone">{route.title}</h3>
                  <p className="type-body mt-3 text-[0.9375rem]">{route.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-14 border-t border-[var(--hairline)] pt-8">
            <p className="type-body max-w-2xl text-[0.9375rem]">
              Engelli erişimi, bebek arabası ya da özel bir ihtiyacın varsa gelmeden önce yaz;
              seansı buna göre planlayıp sizi kapıda karşılayalım.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="sorular" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Sık sorulanlar"
            title="Yazmadan önce"
            description="Randevu tarafında en çok sorulan dört soru. Gerisi SSS sayfasında."
            action={
              <Button href="/sss" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                Tüm sorular
              </Button>
            }
          />

          <div className="mt-12 max-w-4xl">
            <Accordion
              items={contactFaq.map((item) => ({
                id: item.id,
                question: item.question,
                answer: item.answer,
              }))}
              defaultOpen={contactFaq[0]?.id}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
