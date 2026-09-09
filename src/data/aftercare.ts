import type { AftercarePhase } from "./types";

/**
 * Bakım rehberi. Tıbbi tavsiye değildir; kişiye özel verilen talimat önceliklidir.
 */
export const aftercarePhases: AftercarePhase[] = [
  {
    id: "ilk-gun",
    window: "0 – 24 saat",
    title: "İlk gün",
    items: [
      "Kapatma bandını sana söylediğim süre boyunca çıkarma. Genellikle 2–4 saat, şeffaf film bandında 24 saate kadar.",
      "Bandı çıkarmadan önce ellerini yıka. Ilık su ve kokusuz sıvı sabunla nazikçe temizle.",
      "Kurulamak için kâğıt havlu kullan; sürtme, hafifçe bastır.",
      "İnce bir tabaka bakım kremi sür. Fazlası cildin nefes almasını engeller.",
    ],
  },
  {
    id: "ilk-hafta",
    window: "1 – 7 gün",
    title: "İlk hafta",
    items: [
      "Günde iki kez temizle ve ince bir tabaka krem sür.",
      "Kaşınma normaldir. Kaşıma, kabuğu kaldırma — çizgi kaybının en yaygın sebebi budur.",
      "Havuz, deniz, sauna ve küvet yok. Duş serbest ama uzun süre sıcak suyun altında kalma.",
      "Bölgeyi sıkan kıyafet giyme; pamuklu ve bol olanı tercih et.",
      "Spora ve terleten aktivitelere birkaç gün ara ver.",
    ],
  },
  {
    id: "ikinci-hafta",
    window: "2 – 4 hafta",
    title: "Soyulma ve oturma",
    items: [
      "Cilt pul pul dökülür, renk geçici olarak mat görünür. Bu normaldir.",
      "Nemlendirmeye devam et; artık günde bir kez yeterli.",
      "Doğrudan güneşe çıkarma. Kapalı tutamıyorsan yüksek faktörlü koruyucu kullan.",
      "Dördüncü haftadan sonra dövme oturur; gerçek rengini o zaman görürsün.",
    ],
  },
  {
    id: "uzun-vade",
    window: "Sonrası",
    title: "Uzun vadede",
    items: [
      "Güneş, dövmenin en büyük düşmanıdır. Yaz aylarında düzenli koruyucu kullan.",
      "Cildini nemli tut; kuru cilt çizgileri daha çabuk soldurur.",
      "İnce çizgi ve mikro realizm çalışmalarında zamanla tazeleme gerekebilir.",
      "İlk 12 ay içinde gereken rötuş için bana yaz — bir kez ücretsizdir.",
    ],
  },
];

export const aftercareWarnings = [
  "Kızarıklık 3 günden uzun sürer, şişlik artar ya da akıntı olursa bana yaz ve bir hekime başvur.",
  "Ateş, yayılan kızarıklık veya artan ağrı normal iyileşmenin parçası değildir.",
  "Bilinen bir cilt rahatsızlığın, alerjin ya da düzenli kullandığın bir ilaç varsa randevudan önce bildir.",
];

export const aftercareDisclaimer =
  "Bu sayfa genel bir bakım rehberidir, tıbbi tavsiye yerine geçmez. Sana özel verdiğim talimatlar her zaman önceliklidir. Şüphede kaldığın her durumda bir sağlık kuruluşuna başvur.";
