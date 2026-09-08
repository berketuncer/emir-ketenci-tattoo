import type { StyleSlug, Work } from "./types";

/**
 * Portfolyo. Filtreleme, tarz sayfaları ve ana sayfa vitrini bu listeden
 * beslenir. Tüm çalışmalar Emir Ketenci'ye aittir; ayrıca sanatçı alanı tutulmaz.
 */
export const works: Work[] = [
  { id: "w-01", title: "Zeytin Dalı", style: "fine-line", media: { src: "/img/works/w-01.svg", alt: "Önkolda ince çizgili zeytin dalı dövmesi", ratio: "portrait" }, placement: "Önkol iç", size: "14 cm", palette: "siyah-gri", sessions: 1, year: 2026, featured: true, note: "Tek seansta, tek iğneyle çalışıldı. Yaprak aralıkları zamanla yayılmayı hesaba katarak açık bırakıldı." },
  { id: "w-02", title: "Sekizgen", style: "geometric", media: { src: "/img/works/w-02.svg", alt: "Omuzda simetrik sekizgen geometrik dövme", ratio: "square" }, placement: "Omuz", size: "18 cm", palette: "siyah-gri", sessions: 2, year: 2026, featured: true, note: "Şablon ölçüsü omuz eğrisine göre üç kez yeniden çizildi." },
  { id: "w-06", title: "Hilal", style: "minimal", media: { src: "/img/works/w-06.svg", alt: "Köprücük kemiğinde minimal hilal dövmesi", ratio: "landscape" }, placement: "Köprücük", size: "5 cm", palette: "siyah-gri", sessions: 1, year: 2025 },
  { id: "w-03", title: "Kol Bandı No.4", style: "blackwork", media: { src: "/img/works/w-03.svg", alt: "Pazıda yoğun siyah ornamental kol bandı dövmesi", ratio: "tall" }, placement: "Pazı", size: "22 cm bant", palette: "siyah-gri", sessions: 2, year: 2025, featured: true, note: "İki seansa bölündü; ilk seansta kontür, ikincide dolgu." },
  { id: "w-04", title: "Arma", style: "traditional", media: { src: "/img/works/w-04.svg", alt: "Baldırdaki kalın kontürlü traditional arma çalışmasının yakın plan detayı", ratio: "portrait" }, placement: "Baldır", size: "20 cm", palette: "renkli", sessions: 1, year: 2026, featured: true, note: "Klasik palet: kırmızı, hardal ve siyah. Ten tonuna göre kırmızı bir ton kırıldı." },
  { id: "w-08", title: "Kesişme", style: "abstract", media: { src: "/img/works/w-08.svg", alt: "Sırtta soyut fırça etkili dövme", ratio: "portrait" }, placement: "Sırt üst", size: "24 cm", palette: "siyah-gri", sessions: 1, year: 2026, note: "Tasarım uygulama sabahı, bölgeye göre yerinde çizildi." },
  { id: "w-07", title: "Ay Yüzeyi", style: "realism", media: { src: "/img/works/w-07.svg", alt: "Kol içindeki realist ay yüzeyi çalışmasının ton geçişlerini gösteren detay", ratio: "landscape" }, placement: "Kol içi", size: "16 cm", palette: "siyah-gri", sessions: 2, year: 2025, featured: true, note: "Kontür yok; tüm form ton geçişleriyle kuruldu." },
  { id: "w-09", title: "Tüy", style: "micro-realism", media: { src: "/img/works/w-09.svg", alt: "Önkoldaki mikro realist tüy çalışmasının doku detayı", ratio: "portrait" }, placement: "Önkol dış", size: "11 cm", palette: "siyah-gri", sessions: 1, year: 2026, featured: true, note: "Tüy dokusu tek iğneye yakın gruplarla, üç ton üzerinden çalışıldı." },
  { id: "w-16", title: "Tek Satır", style: "lettering", media: { src: "/img/works/w-16.svg", alt: "Kaburgada el yazısı tek satır lettering dövmesi", ratio: "landscape" }, placement: "Kaburga", size: "17 cm", palette: "siyah-gri", sessions: 1, year: 2026, note: "Harfler elle çizildi; kelime araları kaburga hattına göre yeniden dengelendi." },
  { id: "w-25", title: "Kompozisyon No.7", style: "custom-design", media: { src: "/img/works/w-25.svg", alt: "Kol boyunca kişiye özel karma tarz dövme kompozisyonu", ratio: "tall" }, placement: "Kol boyu", size: "38 cm", palette: "siyah-gri", sessions: 4, year: 2025, featured: true, note: "Fine line botanik, blackwork gölge ve mikro realist bir detay aynı kompozisyonda birleşti." },
  { id: "w-05", title: "Kır Çiçekleri", style: "fine-line", media: { src: "/img/works/w-05.svg", alt: "Bilekte ince çizgili kır çiçekleri dövmesi", ratio: "portrait" }, placement: "Bilek", size: "9 cm", palette: "siyah-gri", sessions: 1, year: 2026, note: "Referans, müşterinin kendi bahçesinden gelen bir fotoğraftı." },
  { id: "w-12", title: "Dotwork Mandala", style: "geometric", media: { src: "/img/works/w-12.svg", alt: "Sırt ortasında dotwork gölgeli mandala dövmesi", ratio: "square" }, placement: "Sırt orta", size: "26 cm", palette: "siyah-gri", sessions: 2, year: 2026, featured: true },
  { id: "w-10", title: "Sıradağlar", style: "minimal", media: { src: "/img/works/w-10.svg", alt: "Kaburgada minimal sıradağ silüeti dövmesi", ratio: "landscape" }, placement: "Kaburga", size: "12 cm", palette: "siyah-gri", sessions: 1, year: 2025 },
  { id: "w-11", title: "Gölge Panel", style: "blackwork", media: { src: "/img/works/w-11.svg", alt: "Uylukta geniş siyah dolgulu blackwork panel dövmesi", ratio: "tall" }, placement: "Uyluk", size: "30 cm", palette: "siyah-gri", sessions: 3, year: 2025, coverUp: true, note: "Sekiz yıllık bir çalışmanın üzerine kuruldu; eski hatlar yeni kompozisyona dahil edildi." },
  { id: "w-14", title: "Pusula", style: "traditional", media: { src: "/img/works/w-14.svg", alt: "Önkoldaki traditional pusula çalışmasının yakın plan detayı", ratio: "portrait" }, placement: "Önkol", size: "13 cm", palette: "renkli", sessions: 1, year: 2025 },
  { id: "w-19", title: "Katman", style: "abstract", media: { src: "/img/works/w-19.svg", alt: "Omuz ve kolda soyut katmanlı siyah dövme", ratio: "tall" }, placement: "Omuz – kol", size: "32 cm", palette: "siyah-gri", sessions: 2, year: 2026, featured: true },
  { id: "w-22", title: "Kanat Detayı", style: "realism", media: { src: "/img/works/w-22.svg", alt: "Sırtta realist kanat detayı dövmesi", ratio: "portrait" }, placement: "Sırt", size: "25 cm", palette: "siyah-gri", sessions: 3, year: 2025 },
  { id: "w-15", title: "Deniz Taşı", style: "micro-realism", media: { src: "/img/works/w-15.svg", alt: "Kol içindeki mikro realist deniz taşı çalışmasının ton detayı", ratio: "portrait" }, placement: "Kol içi", size: "10 cm", palette: "siyah-gri", sessions: 1, year: 2026, featured: true, note: "Bir yaz sonundan kalan taş; referans, sahibinin cebindeki fotoğraftı." },
  { id: "w-28", title: "Kaligrafi", style: "lettering", media: { src: "/img/works/w-28.svg", alt: "Önkolda kaligrafik lettering dövmesi", ratio: "portrait" }, placement: "Önkol iç", size: "16 cm", palette: "siyah-gri", sessions: 1, year: 2025, featured: true },
  { id: "w-13", title: "Okaliptüs", style: "fine-line", media: { src: "/img/works/w-13.svg", alt: "Omurga boyunca ince çizgili okaliptüs dalı dövmesi", ratio: "tall" }, placement: "Omurga", size: "28 cm", palette: "siyah-gri", sessions: 1, year: 2026, note: "Dal, omurga hattını takip edecek şekilde yerinde eğrildi." },
  { id: "w-24", title: "Çember Bandı", style: "geometric", media: { src: "/img/works/w-24.svg", alt: "Kolda geometrik çember bandı dövmesi", ratio: "tall" }, placement: "Kol", size: "19 cm bant", palette: "siyah-gri", sessions: 1, year: 2025 },
  { id: "w-18", title: "Üç Nokta", style: "minimal", media: { src: "/img/works/w-18.svg", alt: "Bilek içinde üç noktadan oluşan minimal dövme", ratio: "square" }, placement: "Bilek içi", size: "3 cm", palette: "siyah-gri", sessions: 1, year: 2026 },
  { id: "w-26", title: "Kırık Çizgi", style: "blackwork", media: { src: "/img/works/w-26.svg", alt: "Kaburgada kırık çizgili blackwork dövme", ratio: "landscape" }, placement: "Kaburga", size: "21 cm", palette: "siyah-gri", sessions: 1, year: 2026, coverUp: true, note: "Solmuş bir yazının üzerine kuruldu; eski harfler yeni kompozisyonun gölgesine dönüştü." },
  { id: "w-30", title: "Denizci Düğümü", style: "traditional", media: { src: "/img/works/w-30.svg", alt: "Uyluktaki traditional denizci düğümü çalışmasının detayı", ratio: "portrait" }, placement: "Uyluk", size: "23 cm", palette: "renkli", sessions: 2, year: 2025 },
  { id: "w-20", title: "Dalga", style: "abstract", media: { src: "/img/works/w-20.svg", alt: "Önkolda soyut dalga çizgileri dövmesi", ratio: "landscape" }, placement: "Önkol", size: "14 cm", palette: "siyah-gri", sessions: 1, year: 2025 },
  { id: "w-33", title: "Küre", style: "realism", media: { src: "/img/works/w-33.svg", alt: "Pazıdaki realist küre çalışmasının ışık geçişini gösteren detay", ratio: "portrait" }, placement: "Pazı", size: "18 cm", palette: "siyah-gri", sessions: 2, year: 2026, featured: true, note: "Yüzey yansımaları için yedi ton siyah-gri kullanıldı." },
  { id: "w-23", title: "Kabuk", style: "micro-realism", media: { src: "/img/works/w-23.svg", alt: "Baldırdaki mikro realist kabuk çalışmasının yakın plan detayı", ratio: "portrait" }, placement: "Baldır", size: "9 cm", palette: "siyah-gri", sessions: 1, year: 2026, featured: true, note: "Yüzeydeki mat–parlak geçişi için altı ayrı gri tonu kullanıldı." },
  { id: "w-17", title: "Karanfil", style: "fine-line", media: { src: "/img/works/w-17.svg", alt: "Omuzda ince çizgili karanfil dövmesi", ratio: "portrait" }, placement: "Omuz", size: "15 cm", palette: "siyah-gri", sessions: 1, year: 2025, featured: true },
  { id: "w-27", title: "Simetri Çalışması", style: "geometric", media: { src: "/img/works/w-27.svg", alt: "Göğüste simetrik geometrik dövme çalışması", ratio: "landscape" }, placement: "Göğüs", size: "27 cm", palette: "siyah-gri", sessions: 2, year: 2026, featured: true },
  { id: "w-21", title: "Tohum", style: "minimal", media: { src: "/img/works/w-21.svg", alt: "Ense altında minimal tohum formu dövmesi", ratio: "square" }, placement: "Ense", size: "4 cm", palette: "siyah-gri", sessions: 1, year: 2026, featured: true },
  { id: "w-31", title: "Negatif Alan", style: "blackwork", media: { src: "/img/works/w-31.svg", alt: "Sırtta negatif alan kullanılan blackwork dövme", ratio: "square" }, placement: "Sırt", size: "29 cm", palette: "siyah-gri", sessions: 2, year: 2026, featured: true, coverUp: true, note: "Siyah değil, boş bırakılan alan taşıyor kompozisyonu. Altında on yıllık bir çalışma var." },
  { id: "w-36", title: "Mühür", style: "traditional", media: { src: "/img/works/w-36.svg", alt: "Baldırdaki traditional mühür çalışmasının kalın kontür detayı", ratio: "portrait" }, placement: "Baldır", size: "21 cm", palette: "renkli", sessions: 1, year: 2026, featured: true },
  { id: "w-34", title: "İpli Düğüm", style: "abstract", media: { src: "/img/works/w-34.svg", alt: "Bilekte soyut ipli düğüm dövmesi", ratio: "square" }, placement: "Bilek", size: "8 cm", palette: "siyah-gri", sessions: 1, year: 2026 },
  { id: "w-29", title: "Yabani Ot", style: "fine-line", media: { src: "/img/works/w-29.svg", alt: "Ayak bileğinde ince çizgili yabani ot dövmesi", ratio: "tall" }, placement: "Ayak bileği", size: "11 cm", palette: "siyah-gri", sessions: 1, year: 2026, featured: true },
  { id: "w-35", title: "Ağ", style: "geometric", media: { src: "/img/works/w-35.svg", alt: "Dirsek üstünde geometrik ağ deseni dövmesi", ratio: "portrait" }, placement: "Dirsek üstü", size: "17 cm", palette: "siyah-gri", sessions: 1, year: 2025, featured: true },
  { id: "w-32", title: "Ay Evreleri", style: "minimal", media: { src: "/img/works/w-32.svg", alt: "Önkolda minimal ay evreleri dövmesi", ratio: "landscape" }, placement: "Önkol", size: "15 cm", palette: "siyah-gri", sessions: 1, year: 2025 },
];

export const featuredWorks = works.filter((work) => work.featured);

/**
 * Ana sayfa vitrini. Aynı tarzdan yalnızca bir iş alınır; böylece dokuz kareye
 * bakan biri çalışılan alanın genişliğini tek bakışta görür.
 */
export const homeFeaturedWorks = (() => {
  const seenStyles = new Set<string>();
  const picked: Work[] = [];

  for (const work of featuredWorks) {
    if (seenStyles.has(work.style)) continue;
    seenStyles.add(work.style);
    picked.push(work);
    if (picked.length === 9) return picked;
  }
  for (const work of featuredWorks) {
    if (picked.includes(work)) continue;
    picked.push(work);
    if (picked.length === 9) break;
  }
  return picked;
})();

export const latestWorks = [...works].sort((a, b) => b.year - a.year || b.id.localeCompare(a.id)).slice(0, 12);

export const coverUpWorks = works.filter((work) => work.coverUp);

export const workById = (id: string): Work | undefined => works.find((work) => work.id === id);

export const worksByStyle = (slug: StyleSlug): Work[] => works.filter((work) => work.style === slug);

/** Filtre çubuğunda gösterilecek stil sayıları. */
export const workCountByStyle = works.reduce<Record<string, number>>((acc, work) => {
  acc[work.style] = (acc[work.style] ?? 0) + 1;
  return acc;
}, {});
