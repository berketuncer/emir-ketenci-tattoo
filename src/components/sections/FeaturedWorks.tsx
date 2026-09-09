import Section, { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import WorkGallery from "@/components/work/WorkGallery";
import { ArrowUpRight } from "@/components/ui/Icons";
import { homeFeaturedWorks } from "@/data/works";

export default function FeaturedWorks() {
  return (
    <Section id="calismalar" spacing="lg">
      <div className="container-page">
        <SectionHeader
          eyebrow="Öne çıkan çalışmalar"
          title="Son dönemde bitirdiklerim"
          description="Her parça tek bir kişi için çizildi. Detayına bakmak için üzerine dokun."
          action={
            <Button href="/calismalar" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
              Tüm portfolyo
            </Button>
          }
        />
        <WorkGallery works={homeFeaturedWorks} columns="three" className="mt-14" />
      </div>
    </Section>
  );
}
