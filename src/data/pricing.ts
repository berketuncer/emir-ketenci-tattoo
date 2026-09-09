import type { PricingTier } from "./types";

/**
 * Fiyatlandırma mantığı. Kesin fiyat vermek yerine aralık ve neyin fiyatı
 * belirlediği anlatılır; gerçek teklif randevu talebi sonrası verilir.
 */
export const pricingIntro = {
  title: "Fiyat neye göre belirleniyor?",
  description:
    "Kesin fiyatı ancak fikri, ölçüyü ve bölgeyi gördükten sonra söyleyebilirim. Aşağıdaki aralıklar yön vermesi için; talebinizi gönderdiğinizde genelde birkaç gün içinde size özel net bir aralık yazıyorum.",
  factors: [
    { title: "Süre", description: "Uygulamanın kaç saat süreceği, ana belirleyici." },
    { title: "Detay", description: "Ton sayısı, dolgu yoğunluğu ve çizgi hassasiyeti." },
    { title: "Bölge", description: "Kaburga, boyun, el gibi zor bölgeler daha çok zaman ister." },
    { title: "Tasarım", description: "Sıfırdan çizilen özel tasarımlar ayrı bir emek kalemi." },
  ],
};

export const pricingTiers: PricingTier[] = [
  {
    id: "p-01",
    name: "Küçük çalışma",
    range: "2.500 – 5.000 TL",
    description: "Minimal işaretler, küçük fine line formlar, kısa yazılar.",
    includes: ["45 dk – 1,5 saat uygulama", "Tek seans", "3 – 8 cm ölçü", "Tasarım dahil"],
    note: "2.500 TL minimum ücretimdir; ölçüden bağımsız olarak hazırlık ve malzeme maliyetini karşılar.",
  },
  {
    id: "p-02",
    name: "Orta ölçek",
    range: "6.000 – 15.000 TL",
    description: "Fine line botanik, mikro realizm, geometrik desen, orta boy lettering.",
    includes: ["2 – 4 saat uygulama", "Tek seans", "8 – 18 cm ölçü", "Tasarım ve iki revizyon"],
    highlighted: true,
  },
  {
    id: "p-03",
    name: "Büyük proje",
    range: "Saatlik 3.500 TL",
    description: "Kol, sırt, göğüs projeleri; çok seanslı realizm ve blackwork panelleri.",
    includes: ["4 – 6 saat / seans", "Çok seanslı planlama", "Seans başına ödeme", "Kompozisyon tasarımı"],
    note: "Uzun projelerde toplam bütçe ilk görüşmede birlikte planlanır.",
  },
];

export const pricingNotes = [
  "Danışma görüşmeleri ücretsizdir.",
  "Kapora toplam ücretten düşülür.",
  "İlk 12 ay içinde bir kez rötuş ücretsizdir.",
  "Fiyatlar demo amaçlıdır; güncel aralık için yazmanız yeterli.",
];
