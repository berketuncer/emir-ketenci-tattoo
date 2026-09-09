import type { ProcessStep } from "./types";

/**
 * Randevu süreci. Ana sayfada özet olarak gösterilir.
 */
export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Fikrinizi gönderin",
    summary: "Formdan aklınızdaki fikri, ölçüyü ve bölgeyi paylaşın.",
    detail:
      "Net bir fikrinizin olması şart değil. Bir referans, bir cümle ya da sadece \"şuraya bir şey istiyorum\" da yeterli. Ne kadar çok bağlam verirseniz, ilk dönüşümüz o kadar isabetli olur.",
    duration: "5 dakika",
  },
  {
    step: 2,
    title: "Ön değerlendirme",
    summary: "Talebinizi okuyup fiyat aralığını paylaşıyorum.",
    detail:
      "Talebinizi okur, fikrin nasıl çalışacağını değerlendiririm. Tahmini seans sayısını ve fiyat aralığını genelde birkaç gün içinde yazıyorum; mesajlara toplu baktığım için hemen dönemezsem unutmuş değilim. Bu aşamada hiçbir ödeme yok.",
    duration: "Birkaç gün",
  },
  {
    step: 3,
    title: "Tasarım görüşmesi",
    summary: "Yüz yüze ya da görüntülü olarak detayları netleştiriyoruz.",
    detail:
      "Ölçü, yerleşim ve tarz burada kesinleşir. Bölgeyi görmek çoğu zaman tasarımı değiştirir; bu yüzden mümkünse yüz yüze buluşmayı öneriyorum, yerini birlikte ayarlarız. Görüşme ücretsizdir.",
    duration: "30 – 45 dakika",
  },
  {
    step: 4,
    title: "Tasarım ve onay",
    summary: "Çizim size özel hazırlanır, iki revizyon hakkınız vardır.",
    detail:
      "Tasarımı randevudan önce görürsünüz. İki revizyon standarttır. Onayladıktan sonra kapora alınır ve gün kesinleşir. Kapora toplam ücretten düşülür.",
    duration: "1 – 3 hafta",
  },
  {
    step: 5,
    title: "Uygulama",
    summary: "Şablon denenir, mola verilir, acele edilmez.",
    detail:
      "Gün başında şablonu birlikte deneriz; yer ve ölçü onaylanmadan iğne açılmaz. Tüm malzemeler önünüzde açılır. Uzun seanslarda mola vermek normaldir, istediğiniz an durabilirsiniz.",
    duration: "Seansa göre",
  },
  {
    step: 6,
    title: "Bakım ve iyileşme",
    summary: "Yazılı bakım talimatı; aklınıza takılan olursa yazarsınız.",
    detail:
      "Çıkarken yazılı bakım talimatı veriyorum; sitedeki bakım rehberi de aynı şeyi anlatır. Aklınıza takılan bir şey olursa WhatsApp'tan yazın. İlk 12 ay içinde gereken rötuş bir kez ücretsizdir.",
    duration: "2 – 4 hafta",
  },
];
