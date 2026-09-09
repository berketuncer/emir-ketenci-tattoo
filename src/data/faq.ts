import type { FaqCategory, FaqItem } from "./types";

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "fiyat", label: "Fiyat ve ödeme" },
  { id: "randevu", label: "Randevu" },
  { id: "tasarim", label: "Tasarım" },
  { id: "uygulama", label: "Uygulama günü" },
  { id: "bakim", label: "Bakım" },
];

export const faqItems: FaqItem[] = [
  {
    id: "f-01",
    category: "fiyat",
    question: "Dövme fiyatları nasıl belirleniyor?",
    answer:
      "Fiyat üç şeye bağlı: harcanan süre, tasarımın karmaşıklığı ve bölgenin zorluğu. Küçük işler parça bazlı, büyük projeler saatlik fiyatlanır. Talebini gönderdiğinde genelde birkaç gün içinde net bir aralık paylaşıyorum — sürprizli ek ücret çıkarmıyorum.",
  },
  {
    id: "f-02",
    category: "fiyat",
    question: "Minimum ücret var mı?",
    answer:
      "Sabit bir liste fiyatım yok; her işi fikri, ölçüyü ve bölgeyi görünce fiyatlandırıyorum. Şunu baştan söyleyeyim: en küçük işte bile tek kullanımlık malzeme, sterilizasyon ve hazırlık süresi var — yani 'iki dakikalık iş' diye bir şey yok. Rakamı yazışırken net söylerim, sürpriz olmaz.",
  },
  {
    id: "f-03",
    category: "fiyat",
    question: "Kapora gerekiyor mu?",
    answer:
      "Tasarım onaylandıktan sonra randevuyu kesinleştirmek için kapora alıyorum. Kapora toplam ücretten düşülür. 72 saat öncesine kadar yapılan tarih değişikliklerinde kapora bir kez devredilir.",
  },
  {
    id: "f-04",
    category: "fiyat",
    question: "Hangi ödeme yöntemlerini kabul ediyorsun?",
    answer:
      "Nakit, banka kartı ve kredi kartı geçerlidir. Çok seanslı projelerde ödeme seans başına yapılır; peşin ödeme zorunluluğu yoktur.",
  },
  {
    id: "f-05",
    category: "randevu",
    question: "Randevu almadan gelebilir miyim?",
    answer:
      "Hayır, sadece randevuyla çalışıyorum; sabit bir vitrin ya da açık kapı saatim yok. Danışmak için bile önce WhatsApp'tan yazman gerekiyor — buluşmayı ve konumu oradan ayarlıyoruz. Uygulama için de aynı gün iğne açmıyorum: her işe önce tasarım süresi ayırıyorum.",
  },
  {
    id: "f-06",
    category: "randevu",
    question: "Randevuyu değiştirebilir miyim?",
    answer:
      "Evet. Randevudan en az 72 saat önce haber verirsen kaporan yeni tarihe aktarılır. Daha geç bildirimlerde ya da gelinmeyen randevularda kapora iade edilmez — o saat başka birine kapatılmış oluyor.",
  },
  {
    id: "f-07",
    category: "randevu",
    question: "18 yaş sınırı var mı?",
    answer:
      "Evet, 18 yaşından küçüklere veli onayıyla dahi uygulama yapmıyorum. Randevu günü geçerli bir kimlik getirmeni rica ediyorum.",
  },
  {
    id: "f-08",
    category: "randevu",
    question: "Ne kadar önceden randevu almalıyım?",
    answer:
      "Günde tek randevu aldığım için takvim çabuk doluyor. Küçük çalışmalarda 2–3 hafta, orta ölçekli işlerde 4–6 hafta, çok seanslı projelerde daha uzun bir plan gerekebiliyor. Güncel durumu ana sayfadaki müsaitlik satırında görebilirsin.",
  },
  {
    id: "f-09",
    category: "tasarim",
    question: "Tasarım önceden gösteriliyor mu?",
    answer:
      "Evet. Tasarımı randevudan önce görürsün ve iki revizyon hakkın vardır. Onaylamadığın hiçbir şey uygulanmaz. Gün içinde bölgeye göre yapılan küçük ayarları da birlikte onaylıyoruz.",
  },
  {
    id: "f-10",
    category: "tasarim",
    question: "Kendi tasarımımı getirebilir miyim?",
    answer:
      "Getirebilirsin. Kendi çizimini ya da referanslarını değerlendirir, dövme olarak çalışacak hale getiririm. Başka bir sanatçının özgün çalışmasını birebir kopyalamıyorum; ondan ilham alarak sana özel bir yorum çıkarıyorum.",
  },
  {
    id: "f-11",
    category: "tasarim",
    question: "Cover-up (kapatma) yapıyor musun?",
    answer:
      "Evet, kapatma çalışmaları düzenli işlerimden biri. Mevcut dövmenin net bir fotoğrafını gönder; boyut, koyuluk ve yaş kapatmanın ne kadar mümkün olduğunu belirliyor. Bazı durumlarda önce birkaç seans lazer öneriyorum — bunu dürüstçe söylüyorum.",
  },
  {
    id: "f-12",
    category: "tasarim",
    question: "Ne istediğimi bilmiyorum, yine de gelebilir miyim?",
    answer:
      "Elbette. Gelen taleplerin çoğu net bir fikirle başlamıyor. Konuşarak, referanslara bakarak ve bölgeyi görerek fikir çıkarmak sürecin normal parçası. Bunun için ekstra ücret almıyorum.",
  },
  {
    id: "f-13",
    category: "uygulama",
    question: "Dövme ne kadar sürer?",
    answer:
      "Küçük bir minimal çalışma 45 dakika, orta ölçekli fine line bir iş 2–3 saat, büyük blackwork panelleri birden fazla 4–6 saatlik seans sürebilir. Talebini gönderdiğinde tahmini süreyi de paylaşıyorum.",
  },
  {
    id: "f-14",
    category: "uygulama",
    question: "Acı seviyesi nasıl?",
    answer:
      "Dürüst cevap: bölgeye ve kişiye göre değişiyor. Önkol dış ve baldır en rahat bölgeler; kaburga, ayak bileği ve iç kol daha zorlayıcı. Çoğu kişi \"beklediğimden kolaydı\" diyor. İstediğin an mola verebilirsin, bu seansı bozmaz.",
  },
  {
    id: "f-15",
    category: "uygulama",
    question: "Dövme öncesinde nelere dikkat etmeliyim?",
    answer:
      "İyi uyu, aç gelme ve seanstan 24 saat önce alkol alma. Bol, rahat ve bölgeye erişimi kolay kıyafet giy. Kan sulandırıcı kullanıyorsan ya da kronik bir rahatsızlığın varsa önceden bildir. Yanına atıştırmalık ve su almanı öneririm.",
  },
  {
    id: "f-16",
    category: "uygulama",
    question: "Yanımda birini getirebilir miyim?",
    answer:
      "Yanında bir kişi getirebilirsin. Çalıştığım yer küçük ve sakin; kalabalık hem benim konsantrasyonumu hem seansın akışını etkiliyor.",
  },
  {
    id: "f-17",
    category: "uygulama",
    question: "Hijyen konusunda ne yapıyorsun?",
    answer:
      "Tüm iğne, kartuş, eldiven ve bariyerler tek kullanımlıktır ve paketleri senin önünde açılır. Tekrar kullanılan hiçbir ekipman yok. Çalışma yüzeyleri her seans arasında dezenfekte edilir, mürekkepler tek seferlik kaplara alınır ve seans sonunda atılır.",
  },
  {
    id: "f-18",
    category: "bakim",
    question: "Dövme sonrasında nelere dikkat etmeliyim?",
    answer:
      "İlk 2–4 hafta belirleyici. Temiz tut, ince tabaka nemlendir, kabuğu kaldırma, havuz ve denizden uzak dur, güneşten koru. Ayrıntılı adımlar için bakım rehberi sayfasına bakabilirsin — çıkarken yazılı olarak da veriyorum.",
  },
  {
    id: "f-19",
    category: "bakim",
    question: "İyileşme ne kadar sürer?",
    answer:
      "Yüzey iyileşmesi 2–3 hafta, cildin tam olarak oturması 4–6 hafta sürer. Dövmenin gerçek rengini birinci ayın sonunda görürsün.",
  },
  {
    id: "f-20",
    category: "bakim",
    question: "Rötuş ücretli mi?",
    answer:
      "İlk 12 ay içinde gereken bir rötuş ücretsizdir. Bakım talimatlarına uyulmamasından kaynaklanan kayıplarda ve el, parmak, ayak gibi doğal olarak daha çok yıpranan bölgelerde durumu birlikte değerlendiriyoruz.",
  },
];

export const faqByCategory = (category: FaqCategory) => faqItems.filter((item) => item.category === category);

/** Ana sayfada gösterilen kısa set. */
export const homeFaqIds = ["f-01", "f-03", "f-09", "f-11", "f-14", "f-07"];
export const homeFaqItems = homeFaqIds
  .map((id) => faqItems.find((item) => item.id === id))
  .filter((item): item is FaqItem => Boolean(item));
