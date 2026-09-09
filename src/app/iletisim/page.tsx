import type { Metadata } from "next";
import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import PageHero from "@/components/ui/PageHero";
import LocationContact from "@/components/sections/LocationContact";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { faqByCategory } from "@/data/faq";
import { site, whatsappLink } from "@/data/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "İletişim",
  description:
    "Tek kanal: WhatsApp. Sadece randevuyla çalışıyorum; konumu randevu kesinleşince yazıyorum. Randevu taleplerine genelde birkaç gün içinde dönüyorum.",
  path: "/iletisim",
});

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
        title="Yazın, sırayla dönüyorum."
        crumbs={[{ label: "Ana sayfa", href: "/" }, { label: "İletişim" }]}
        description={
          <>
            Tek kanal var: WhatsApp. Kısa soru da, dövme fikri de oraya. {site.booking.responseNote}
          </>
        }
        actions={
          <>
            <Button href={whatsappLink()} external icon={<ArrowRight className="h-4 w-4" />}>
              WhatsApp&apos;tan yaz
            </Button>
            <Button href={site.booking.href} variant="secondary">
              Randevu formu
            </Button>
          </>
        }
      />

      <LocationContact />

      <Section id="sorular" className="border-t border-[var(--hairline)]">
        <div className="container-page">
          <SectionHeader
            eyebrow="Sık sorulanlar"
            title="Yazmadan önce"
            description="Randevu tarafında en çok sorulan dört soru. Gerisi SSS sayfasında — çoğu sorunun cevabı oradadır, yazmadan bir bakın."
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
