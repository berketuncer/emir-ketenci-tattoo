import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import StylesShowcase from "@/components/sections/StylesShowcase";
import AboutIntro from "@/components/sections/AboutIntro";
import StudioIntro from "@/components/sections/StudioIntro";
import ValuesGrid from "@/components/sections/ValuesGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import LatestWorks from "@/components/sections/LatestWorks";
import Testimonials from "@/components/sections/Testimonials";
import PricingSummary from "@/components/sections/PricingSummary";
import FaqPreview from "@/components/sections/FaqPreview";
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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <FeaturedWorks />
      <StylesShowcase />
      <AboutIntro />
      <StudioIntro />
      <ValuesGrid />
      <ProcessSteps />
      <LatestWorks />
      <Testimonials />
      <PricingSummary />
      <FaqPreview />
      <BookingCta />
      <LocationContact />
    </>
  );
}
