import type { Artist } from "./types";

/**
 * Tek kişi. Sitedeki "ben" dilinin kaynağı burasıdır.
 *
 * NOT: Biyografi, yıllar ve kilometre taşları hâlâ örnek metin; Emir'in
 * gerçek hikâyesi geldiğinde yalnızca bu dosya güncellenir.
 */
export const artist: Artist = {
  name: "Emir Ketenci",
  role: "Dövme Sanatçısı",
  tagline: "İnce çizgi, yumuşak siyah-gri geçişler ve ölçüyle kurulmuş kompozisyonlar.",
  bio: [
    "Grafik tasarım okudum, altı yıl illüstrasyon ve kitap kapağı çizdim. 2014'te bir arkadaşımın stüdyosunda çırak olarak başladım; ilk yıl sadece izledim, temizledim ve kâğıt üzerinde çizdim.",
    "2019'dan beri kendi başıma çalışıyorum ve günde tek randevu alıyorum — çünkü bir işi hem tasarlayıp hem uygulamak, arada başka bir işe geçmeden yapılınca daha iyi çıkıyor.",
    "Her çalışmaya kâğıtla başlarım. Tablet sonra devreye girer. Duvarda hazır desen listem yok; aklındaki fikri konuşarak çıkarır, senin için sıfırdan çizerim.",
  ],
  focusStyles: ["fine-line", "micro-realism", "blackwork", "geometric"],
  otherStyles: ["minimal", "realism", "abstract", "traditional", "lettering", "custom-design"],
  portrait: {
    src: "/img/emir-ketenci.svg",
    alt: "Emir Ketenci, gün ışığında portresi",
    ratio: "portrait",
  },
  featuredWorks: ["w-01", "w-09", "w-19", "w-25"],
  since: 2014,
  city: "İstanbul",
  instagram: "https://instagram.com/emirketenci.tattoo",
  principles: [
    "Her iş kâğıt üzerinde eskizle başlar, tablet sonra devreye girer.",
    "Tasarım onaylanmadan iğne açılmaz.",
    "Kişiye özel çizilen bir tasarım ikinci bir kişiye uygulanmaz.",
    "Günde tek randevu; seans acele ettirilmez, istediğin an mola verilir.",
    "Kapatma işlerinde mümkün olanı ve olmayanı baştan açıkça söylerim.",
  ],
  milestones: [
    { year: "2014", text: "Kadıköy'de çıraklık; ilk yıl iğneye dokunmadan geçti." },
    { year: "2016", text: "İlk kişiye özel projeler; fine line ve siyah-gri üzerine yoğunlaşma." },
    { year: "2019", text: "Kendi başına çalışmaya başlaması; günde tek randevu düzenine geçiş." },
    { year: "2023", text: "Mikro realizm ve geometrik kompozisyonların ağırlık kazanması." },
  ],
};

/**
 * Kaç yıldır iğne tuttuğu. Sunucu ve istemcide aynı sonucu vermesi için
 * `site.currentYear` üzerinden hesaplanır, `new Date()` kullanılmaz.
 */
export const yearsActive = (currentYear: number) => currentYear - artist.since;
