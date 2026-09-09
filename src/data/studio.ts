import type { StudioValue } from "./types";

/**
 * Çalışma kuralları ve hijyen. Mekân anlatımı yok — sadece randevuyla
 * çalışılıyor ve konum randevu kesinleşince paylaşılıyor; kurallar ise
 * nerede çalışılırsa çalışılsın aynı.
 */
export const studioValues: StudioValue[] = [
  {
    id: "v-01",
    title: "Tek kullanımlık, önünde açılan malzeme",
    description:
      "İğne, kartuş, eldiven ve bariyerlerin tamamı tek kullanımlıktır ve paketleri seans başında senin önünde açılır. Tekrar kullanılan ekipman yok.",
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
      "Tasarımı randevudan önce görürsün, iki revizyon hakkın vardır. Uygulama günü şablon birlikte denenir; yer ve ölçü onaylanmadan başlanmaz.",
  },
  {
    id: "v-04",
    title: "Katalog değil, kişiye özel tasarım",
    description:
      "Duvara asılı hazır desen listem yok. Her çalışma o kişi için çizilir, yalnızca bir kez uygulanır ve çizim sana aittir.",
  },
  {
    id: "v-05",
    title: "Günde tek randevu",
    description:
      "Araya başka iş girmez. Seans acele ettirilmez, istediğin an mola verebilirsin ve gün sonunda kimse kapıda beklemez.",
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
