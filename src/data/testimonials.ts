import type { Testimonial } from "./types";

/**
 * Müşteri yorumları. İleride Google Yorumları API'sine ya da bir moderasyon
 * paneline bağlanacak; bileşen tarafı aynı alanları bekler.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t-01",
    name: "Ece D.",
    quote:
      "İlk dövmemdi ve açıkçası korkuyordum. Emir tasarımı üç kez baştan çizdi, ölçüyü kolumda deneye deneye bulduk. Seans boyunca ne yaptığını anlatması en çok işime yaradı.",
    style: "fine-line",
    date: "Mayıs 2026",
    rating: 5,
    firstTattoo: true,
  },
  {
    id: "t-02",
    name: "Barış K.",
    quote:
      "Sekiz yıllık kötü bir dövmeyi kapatmak için gittim. Silmeye çalışmak yerine eski hatları yeni tasarıma dahil etti. Şimdi eskiden ne olduğunu ben bile zor hatırlıyorum.",
    style: "blackwork",
    date: "Mart 2026",
    rating: 5,
  },
  {
    id: "t-03",
    name: "Selin A.",
    quote:
      "Küçük ama çok detaylı bir çalışma istedim. Referansım pek iyi değildi, saatlerce üzerinde çalışıp ışığı yakalamış. İnandırıcılığı beni şaşırttı.",
    style: "micro-realism",
    date: "Şubat 2026",
    rating: 5,
  },
  {
    id: "t-04",
    name: "Onur T.",
    quote:
      "Randevudan iki hafta önce tasarım geldi, iki küçük revizyon yaptık, gün geldiğinde sürpriz yoktu. Tek kişilik bir yerden bu kadar planlı bir süreç beklemiyordum.",
    style: "custom-design",
    date: "Ocak 2026",
    rating: 5,
  },
  {
    id: "t-05",
    name: "Melis Y.",
    quote:
      "Omuzdaki desenin simetrisi için ölçüyü üç defa yeniden aldı. Kolumu kaldırdığımda desenin bozulmaması için uğraştığını görmek güven verdi.",
    style: "geometric",
    date: "Aralık 2025",
    rating: 5,
  },
  {
    id: "t-06",
    name: "Kerem B.",
    quote:
      "Stüdyoya girer girmez temizlik hissediliyor. Paketler önümde açıldı, eldiven değişimi hiç aksamadı. Bunu ayrıca söylemek istedim çünkü her yerde böyle değil.",
    style: "traditional",
    date: "Kasım 2025",
    rating: 5,
  },
  {
    id: "t-07",
    name: "Zeynep R.",
    quote:
      "Kaburgaya yazı yaptırdım, acıyacağını biliyordum. Ara vermemi kendisi önerdi, hiç acele ettirmedi. İyileşme sürecinde de mesajlarıma cevap verdi.",
    style: "lettering",
    date: "Ekim 2025",
    rating: 5,
    firstTattoo: true,
  },
  {
    id: "t-08",
    name: "Deniz M.",
    quote:
      "Ne istediğimi tam bilmeden gittim. Konuşa konuşa fikir çıktı. Katalogdan bir şey seçtirmemesi, aslında en beğendiğim tarafı oldu.",
    style: "fine-line",
    date: "Eylül 2025",
    rating: 5,
  },
  {
    id: "t-09",
    name: "Arda Ş.",
    quote:
      "Dört seanslık bir kol projesiydi. Her seans sonunda bir sonraki adımı gösterdi, bakım talimatları yazılı verildi. Süreç boyunca kaybolmuş hissetmedim.",
    style: "blackwork",
    date: "Ağustos 2025",
    rating: 5,
  },
  {
    id: "t-10",
    name: "Nil G.",
    quote:
      "Bir yıl sonra ince çizgilerde hafif bir açılma oldu, yazdım, ücretsiz rötuş yaptı. Satış bittikten sonra da ilgilenmesi fark yaratıyor.",
    style: "minimal",
    date: "Temmuz 2025",
    rating: 4,
  },
];

/** Ortalama puan — sosyal kanıt bloklarında gösterilir. */
export const averageRating =
  Math.round((testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length) * 10) / 10;

export const reviewCount = testimonials.length;
