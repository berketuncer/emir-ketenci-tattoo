/**
 * Fiyatlandırma mantığı. Sabit liste fiyatı yok: rakamı Emir, fikri, ölçüyü
 * ve bölgeyi görünce söyler. Burada yalnızca neyin fiyatı belirlediği ve
 * sürecin değişmeyen kuralları anlatılır.
 */
export const pricingIntro = {
  title: "Fiyat neye göre belirleniyor?",
  description:
    "Sabit bir liste fiyatım yok; rakamı fikri, ölçüyü ve bölgeyi görünce söylüyorum. Tahmin yürütüp sonra düzeltmektense bir kez doğru söylemeyi tercih ediyorum. Fiyatı belirleyen dört şey:",
  factors: [
    { title: "Süre", description: "Uygulamanın kaç saat süreceği, ana belirleyici." },
    { title: "Detay", description: "Ton sayısı, dolgu yoğunluğu ve çizgi hassasiyeti." },
    { title: "Bölge", description: "Kaburga, boyun, el gibi zor bölgeler daha çok zaman ister." },
    { title: "Tasarım", description: "Sıfırdan çizilen özel tasarımlar ayrı bir emek kalemi." },
  ],
};

/** Değişmeyen kurallar — fiyat bölümünde ve SSS'de gösterilir. */
export const pricingNotes = [
  "Danışma görüşmesi ücretsiz.",
  "Kapora toplam ücretten düşülür.",
  "İlk 12 ay içinde bir kez rötuş ücretsiz.",
  "Rakam, talebiniz geldikten sonra yazılır; sürprizli ek ücret yok.",
];
