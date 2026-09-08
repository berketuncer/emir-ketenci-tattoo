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
      "Fiyat üç şeye bağlı: harcanan süre, tasarımın karmaşıklığı ve bölgenin zorluğu. Küçük işler parça bazlı, büyük projeler saatlik fiyatlanır. Talebinizi gönderdiğinizde 48 saat içinde net bir aralık paylaşıyorum — sürprizli ek ücret çıkarmıyorum.",
  },
  {
    id: "f-02",
    category: "fiyat",
    question: "Minimum ücret var mı?",
    answer:
      "Evet. En küçük çalışma için minimum ücretim 2.500 TL'dir. Bu, tek kullanımlık malzeme, sterilizasyon ve hazırlık süresinin karşılığıdır; dövmenin fiziksel boyutundan bağımsızdır.",
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
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "Nakit, banka kartı ve kredi kartı geçerlidir. Çok seanslı projelerde ödeme seans başına yapılır; peşin ödeme zorunluluğu yoktur.",
  },
  {
    id: "f-05",
    category: "randevu",
    question: "Randevu almadan gelebilir miyim?",
    answer:
      "Danışmak için gelebilirsiniz, çalışma saatleri içinde kapım açık. Ama uygulama için mutlaka randevu gerekiyor: her işe önce tasarım süresi ayırıyorum, aynı gün iğne açmıyorum.",
  },
  {
    id: "f-06",
    category: "randevu",
    question: "Randevuyu değiştirebilir miyim?",
    answer:
      "Evet. Randevudan en az 72 saat önce haber verirseniz kaporanız yeni tarihe aktarılır. Daha geç bildirimlerde ya da gelinmeyen randevularda kapora iade edilmez — o saat başka birine kapatılmış oluyor.",
  },
  {
    id: "f-07",
    category: "randevu",
    question: "18 yaş sınırı var mı?",
    answer:
      "Evet, 18 yaşından küçüklere veli onayıyla dahi uygulama yapmıyorum. Randevu günü geçerli bir kimlik getirmenizi rica ediyorum.",
  },
  {
    id: "f-08",
    category: "randevu",
    question: "Ne kadar önceden randevu almalıyım?",
    answer:
      "Günde tek randevu aldığım için takvim çabuk doluyor. Küçük çalışmalarda 2–3 hafta, orta ölçekli işlerde 4–6 hafta, çok seanslı projelerde daha uzun bir plan gerekebiliyor. Güncel durumu ana sayfadaki müsaitlik satırında görebilirsiniz.",
  },
  {
    id: "f-09",
    category: "tasarim",
    question: "Tasarım önceden gösteriliyor mu?",
    answer:
      "Evet. Tasarımı randevudan önce görürsünüz ve iki revizyon hakkınız vardır. Onaylamadığınız hiçbir şey uygulanmaz. Gün içinde bölgeye göre yapılan küçük ayarları da birlikte onaylıyoruz.",
  },
  {
    id: "f-10",
    category: "tasarim",
    question: "Kendi tasarımımı getirebilir miyim?",
    answer:
      "Getirebilirsiniz. Kendi çiziminizi ya da referanslarınızı değerlendirir, dövme olarak çalışacak hale getiririm. Başka bir sanatçının özgün çalışmasını birebir kopyalamıyorum; ondan ilham alarak size özel bir yorum çıkarıyorum.",
  },
  {
    id: "f-11",
    category: "tasarim",
    question: "Cover-up (kapatma) yapıyor musunuz?",
    answer:
      "Evet, kapatma çalışmaları düzenli işlerimden biri. Mevcut dövmenin net bir fotoğrafını gönderin; boyut, koyuluk ve yaş kapatmanın ne kadar mümkün olduğunu belirliyor. Bazı durumlarda önce birkaç seans lazer öneriyorum — bunu dürüstçe söylüyorum.",
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
      "Küçük bir minimal çalışma 45 dakika, orta ölçekli fine line bir iş 2–3 saat, büyük blackwork panelleri birden fazla 4–6 saatlik seans sürebilir. Talebinizi gönderdiğinizde tahmini süreyi de paylaşıyorum.",
  },
  {
    id: "f-14",
    category: "uygulama",
    question: "Acı seviyesi nasıl?",
    answer:
      "Dürüst cevap: bölgeye ve kişiye göre değişiyor. Önkol dış ve baldır en rahat bölgeler; kaburga, ayak bileği ve iç kol daha zorlayıcı. Çoğu kişi \"beklediğimden kolaydı\" diyor. İstediğiniz an mola verebilirsiniz, bu seansı bozmaz.",
  },
  {
    id: "f-15",
    category: "uygulama",
    question: "Dövme öncesinde nelere dikkat etmeliyim?",
    answer:
      "İyi uyuyun, aç gelmeyin ve seanstan 24 saat önce alkol almayın. Bol, rahat ve bölgeye erişimi kolay kıyafet giyin. Kan sulandırıcı kullanıyorsanız ya da kronik bir rahatsızlığınız varsa önceden bildirin. Yanınıza atıştırmalık ve su almanızı öneriyoruz.",
  },
  {
    id: "f-16",
    category: "uygulama",
    question: "Yanımda birini getirebilir miyim?",
    answer:
      "Yanınızda bir kişi getirebilirsiniz. Stüdyo küçük ve sakin bir yer; kalabalık hem benim konsantrasyonumu hem seansın akışını etkiliyor.",
  },
  {
    id: "f-17",
    category: "uygulama",
    question: "Hijyen konusunda ne yapıyorsunuz?",
    answer:
      "Tüm iğne, kartuş, eldiven ve bariyerler tek kullanımlıktır ve paketleri sizin önünüzde açılır. Tekrar kullanılan hiçbir ekipman yok. Çalışma yüzeyleri her seans arasında dezenfekte edilir, mürekkepler tek seferlik kaplara alınır ve seans sonunda atılır.",
  },
  {
    id: "f-18",
    category: "bakim",
    question: "Dövme sonrasında nelere dikkat etmeliyim?",
    answer:
      "İlk 2–4 hafta belirleyici. Temiz tutun, ince tabaka nemlendirin, kabuğu kaldırmayın, havuz ve denizden uzak durun, güneşten koruyun. Ayrıntılı adımlar için bakım rehberi sayfasına bakabilirsiniz — çıkarken yazılı olarak da veriyorum.",
  },
  {
    id: "f-19",
    category: "bakim",
    question: "İyileşme ne kadar sürer?",
    answer:
      "Yüzey iyileşmesi 2–3 hafta, cildin tam olarak oturması 4–6 hafta sürer. Dövmenin gerçek rengini birinci ayın sonunda görürsünüz.",
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
