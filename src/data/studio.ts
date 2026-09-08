import type { Media, StudioValue } from "./types";

export const studioStory = {
  eyebrow: "Stüdyo",
  title: "Karaköy'de, üçüncü katta, tek bir çizim masası.",
  paragraphs: [
    "Stüdyoyu 2019'da, kendi çizim masamı bir mekâna taşıyarak açtım. O gün bugündür burada tek başıma çalışıyorum.",
    "Günde tek randevu alıyorum. Az iş almak, her çalışmaya tasarım süresi ayırabilmek demek — sıraya alınmış bir üretim bandı değil, bir randevu.",
    "Bekleme salonu yok. Siz gelmeden önce mekân hazırlanır, siz çıktıktan sonra toplanır. Gün içinde araya başka kimse girmez.",
  ],
  gallery: [
    { src: "/img/studio/studio-01.svg", alt: "Stüdyonun çalışma masası ve doğal ışık alan pencere", ratio: "landscape" },
    { src: "/img/studio/studio-02.svg", alt: "Sterilizasyon alanı ve tek kullanımlık malzeme rafları", ratio: "portrait" },
    { src: "/img/studio/studio-03.svg", alt: "Eskiz defterleri ve çizim masası detayı", ratio: "portrait" },
    { src: "/img/studio/studio-04.svg", alt: "Stüdyonun giriş koridoru ve duvardaki çerçeveli çizimler", ratio: "landscape" },
    { src: "/img/studio/studio-05.svg", alt: "Uygulama koltuğu ve ayarlanabilir aydınlatma", ratio: "portrait" },
    { src: "/img/studio/studio-06.svg", alt: "Karaköy'e bakan stüdyo penceresi", ratio: "landscape" },
  ] satisfies Media[],
};

export const studioStats = [
  { value: "2014", label: "İğne tuttuğum yıl" },
  { value: "2019", label: "Stüdyonun açılışı" },
  { value: "1", label: "Günlük randevu" },
  { value: "10", label: "Çalıştığım tarz" },
];

/** "Neden burası" bölümü. */
export const studioValues: StudioValue[] = [
  {
    id: "v-01",
    title: "Tek kullanımlık, önünüzde açılan malzeme",
    description:
      "İğne, kartuş, eldiven ve bariyerlerin tamamı tek kullanımlıktır ve paketleri seans başında sizin önünüzde açılır. Tekrar kullanılan ekipman yok.",
  },
  {
    id: "v-02",
    title: "Sterilizasyon ve yüzey protokolü",
    description:
      "Çalışma yüzeyleri her seans öncesi ve sonrası dezenfekte edilir, mürekkepler tek seferlik kaplara alınır ve seans sonunda atılır. Atık ayrıştırması tıbbi atık prosedürüne göre yapılır.",
  },
  {
    id: "v-03",
    title: "Onaysız iğne açılmaz",
    description:
      "Tasarımı randevudan önce görürsünüz, iki revizyon hakkınız vardır. Uygulama günü şablon birlikte denenir; yer ve ölçü onaylanmadan başlanmaz.",
  },
  {
    id: "v-04",
    title: "Katalog değil, kişiye özel tasarım",
    description:
      "Duvara asılı hazır desen listem yok. Her çalışma o kişi için çizilir, yalnızca bir kez uygulanır ve çizim size aittir.",
  },
  {
    id: "v-05",
    title: "Günde tek randevu",
    description:
      "Araya başka iş girmez. Seans acele ettirilmez, istediğiniz an mola verebilirsiniz ve gün sonunda kimse kapıda beklemez.",
  },
  {
    id: "v-06",
    title: "İlk yıl bir kez ücretsiz rötuş",
    description:
      "İlk 12 ay içinde gereken rötuşu ücretsiz yapıyorum. İyileşme sonrası nasıl oturduğunu görmek benim için de sürecin parçası.",
  },
];

/** Hijyen bölümünde kısa liste olarak gösterilir. */
export const hygieneChecklist = [
  "Tek kullanımlık iğne ve kartuş",
  "Paketler misafirin önünde açılır",
  "Her seans öncesi ve sonrası yüzey dezenfeksiyonu",
  "Tek seferlik mürekkep kapları",
  "Tıbbi atık ayrıştırması",
  "Vegan mürekkep seçeneği",
];
