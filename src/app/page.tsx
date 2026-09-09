import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Wannado from "@/components/sections/Wannado";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import AboutIntro from "@/components/sections/AboutIntro";
import ProcessSteps from "@/components/sections/ProcessSteps";
import PricingSummary from "@/components/sections/PricingSummary";
import BookingCta from "@/components/sections/BookingCta";
import LocationContact from "@/components/sections/LocationContact";
import { pageMeta } from "@/lib/seo";

/**
 * Günde bir yeniden üret: "Şu aralar" bölümünün son günü geçince push'a
 * gerek kalmadan kaybolması için. Değer statik olmalı (sabit sayı).
 */
export const revalidate = 86400;

export const metadata: Metadata = pageMeta({
  // Kök sayfaya layout başlık şablonu uygulanmadığı için marka adı burada yazılır.
  title: "Emir Ketenci — İstanbul Dövme Stüdyosu",
  description:
    "Emir Ketenci — İstanbul'da sadece randevuyla çalışan tek kişilik dövme stüdyosu. Fine line, mikro realizm, blackwork ve geometrik çalışmalar; randevu talebi oluşturun.",
  path: "/",
});

/**
 * Ana sayfa tek bir soruyu sırayla cevaplar: ne yapıyor → şu aralar ne
 * çizmek istiyor → kim yapıyor → nasıl işliyor → ne kadar → nasıl randevu
 * alınır → nerede.
 * Derinleşmek isteyen ziyaretçi için ayrıntı, menüdeki sayfalarda durur.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Wannado />
      <FeaturedWorks />
      <AboutIntro />
      <ProcessSteps />
      <PricingSummary />
      <BookingCta />
      <LocationContact />
    </>
  );
}
