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
      "Kapatma bandını size söylediğim süre boyunca çıkarmayın. Genellikle 2–4 saat, şeffaf film bandında 24 saate kadar.",
      "Bandı çıkarmadan önce ellerinizi yıkayın. Ilık su ve kokusuz sıvı sabunla nazikçe temizleyin.",
      "Kurulamak için kâğıt havlu kullanın; sürtmeyin, hafifçe bastırın.",
      "İnce bir tabaka bakım kremi sürün. Fazlası cildin nefes almasını engeller.",
    ],
  },
  {
    id: "ilk-hafta",
    window: "1 – 7 gün",
    title: "İlk hafta",
    items: [
      "Günde iki kez temizleyin ve ince bir tabaka krem sürün.",
      "Kaşınma normaldir. Kaşımayın, kabuğu kaldırmayın — çizgi kaybının en yaygın sebebi budur.",
      "Havuz, deniz, sauna ve küvet yok. Duş serbest ama uzun süre sıcak suyun altında kalmayın.",
      "Bölgeyi sıkan kıyafet giymeyin; pamuklu ve bol olanı tercih edin.",
      "Spora ve terleten aktivitelere birkaç gün ara verin.",
    ],
  },
  {
    id: "ikinci-hafta",
    window: "2 – 4 hafta",
    title: "Soyulma ve oturma",
    items: [
      "Cilt pul pul dökülür, renk geçici olarak mat görünür. Bu normaldir.",
      "Nemlendirmeye devam edin; artık günde bir kez yeterli.",
      "Doğrudan güneşe çıkarmayın. Kapalı tutamıyorsanız yüksek faktörlü koruyucu kullanın.",
      "Dördüncü haftadan sonra dövme oturur; gerçek rengini o zaman görürsünüz.",
    ],
  },
  {
    id: "uzun-vade",
    window: "Sonrası",
    title: "Uzun vadede",
    items: [
      "Güneş, dövmenin en büyük düşmanıdır. Yaz aylarında düzenli koruyucu kullanın.",
      "Cildinizi nemli tutun; kuru cilt çizgileri daha çabuk soldurur.",
      "İnce çizgi ve mikro realizm çalışmalarında zamanla tazeleme gerekebilir.",
      "İlk 12 ay içinde gereken rötuş için bana yazın — bir kez ücretsizdir.",
    ],
  },
];

export const aftercareWarnings = [
  "Kızarıklık 3 günden uzun sürer, şişlik artar ya da akıntı olursa bana yazın ve bir hekime başvurun.",
  "Ateş, yayılan kızarıklık veya artan ağrı normal iyileşmenin parçası değildir.",
  "Bilinen bir cilt rahatsızlığınız, alerjiniz ya da düzenli kullandığınız bir ilaç varsa randevudan önce bildirin.",
];

export const aftercareDisclaimer =
  "Bu sayfa genel bir bakım rehberidir, tıbbi tavsiye yerine geçmez. Size özel verdiğim talimatlar her zaman önceliklidir. Şüphede kaldığınız her durumda bir sağlık kuruluşuna başvurun.";
