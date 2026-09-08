import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import AboutIntro from "@/components/sections/AboutIntro";
import ProcessSteps from "@/components/sections/ProcessSteps";
import PricingSummary from "@/components/sections/PricingSummary";
import BookingCta from "@/components/sections/BookingCta";
import LocationContact from "@/components/sections/LocationContact";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  // Kök sayfaya layout başlık şablonu uygulanmadığı için marka adı burada yazılır.
  title: "Emir Ketenci — Karaköy Dövme Stüdyosu",
  description:
    "Emir Ketenci — Karaköy'de randevuyla çalışan tek kişilik dövme stüdyosu. Fine line, mikro realizm, blackwork ve geometrik çalışmalar; randevu talebi oluşturun.",
  path: "/",
});

/**
 * Ana sayfa tek bir soruyu sırayla cevaplar: ne yapıyor → kim yapıyor →
 * nasıl işliyor → ne kadar → nasıl randevu alınır → nerede.
 * Derinleşmek isteyen ziyaretçi için ayrıntı, menüdeki sayfalarda durur.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <AboutIntro />
      <ProcessSteps />
      <PricingSummary />
      <BookingCta />
      <LocationContact />
    </>
  );
}
