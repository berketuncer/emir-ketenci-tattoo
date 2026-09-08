import type { StyleSlug, TattooStyle } from "./types";

/**
 * Dövme stilleri. Ne istediğini tam bilmeyen ziyaretçinin karar vermesini
 * kolaylaştırmak için her stilde "kimler için uygun" ve "bilinmesi gerekenler"
 * alanları bulunur.
 */
export const styles: TattooStyle[] = [
  {
    slug: "fine-line",
    focus: true,
    name: "Fine Line",
    tagline: "Tek iğneyle çizilen ince, nefes alan çizgiler.",
    description: [
      "Fine line, adından da anlaşılacağı gibi çok ince çizgilerle çalışılan bir yaklaşımdır. Tek iğne ya da üçlü iğne gruplarıyla, gölgeyi minimumda tutarak çizginin kendisini ön plana çıkarır.",
      "Botanik formlar, ince portreler, el yazısı ve sembolik küçük çalışmalar için en çok tercih edilen tarz. Uzaktan sakin görünür, yakından detay verir.",
      "İnce çizgi zamanla bir miktar yayılır; bu yüzden tasarımın boşluk dengesi ilk günden buna göre kurulur. Fazla sıkışık bir kompozisyon beş yıl sonra okunmaz hale gelir; bu yüzden baştan aralık bırakırım.",
    ],
    suitedFor: [
      "İlk dövmesini yaptıracak, temkinli başlamak isteyenler",
      "Zarif ve dikkat çekmeyen bir sonuç arayanlar",
      "Botanik, sembol, el yazısı gibi zarif konular",
    ],
    notes: [
      "Çok küçük ölçekte detay sınırı vardır; 4 cm altındaki yazılar önerilmez.",
      "Kol içi ve bilek gibi bölgelerde zamanla tazeleme gerekebilir.",
    ],
    cover: { src: "/img/styles/fine-line.svg", alt: "Fine line tarzında ince çizgili botanik dövme çalışması", ratio: "portrait" },
    typicalDuration: "1 – 3 saat",
    popular: true,
    order: 1,
  },
  {
    slug: "minimal",
    name: "Minimal",
    tagline: "Gerekli olan kadar çizgi, fazlası yok.",
    description: [
      "Minimal çalışmalar, bir fikri en az işaretle anlatma denemesidir. Genellikle küçük ölçekli, tek renk ve sade formlardan oluşur.",
      "İyi bir minimal dövmenin sırrı boyutta değil oranda saklıdır. Aynı sembol yanlış yerde ve yanlış ölçekte sıradanlaşır; doğru yerleştirildiğinde vücudun hattını takip eder.",
      "Bu tarzda tasarım süresi uygulamadan uzun sürer. Ölçü ve yer denemesini birlikte yapmadan iğneye başlamıyorum.",
    ],
    suitedFor: [
      "Küçük, kişisel ve gizli kalabilecek bir işaret isteyenler",
      "Dar bütçeyle başlamak isteyenler",
      "İleride büyütülebilecek bir başlangıç arayanlar",
    ],
    notes: [
      "Minimum ücret uygulanır; küçük olması ucuz olması anlamına gelmez.",
      "Parmak ve ayak gibi bölgelerde iyileşme sonrası tazeleme normaldir.",
    ],
    cover: { src: "/img/styles/minimal.svg", alt: "Minimal tarzda sade geometrik dövme çalışması", ratio: "portrait" },
    typicalDuration: "45 dk – 1,5 saat",
    popular: true,
    order: 2,
  },
  {
    slug: "blackwork",
    focus: true,
    name: "Blackwork",
    tagline: "Yoğun siyah dolgular, güçlü siluetler.",
    description: [
      "Blackwork, siyahın hacim olarak kullanıldığı geniş bir alan. Ornamental desenlerden soyut lekelere, kalın kontürlerden tamamen dolu formlara kadar uzanır.",
      "Uzaktan okunur, zamana en dayanıklı tarzlardan biridir. Doğru uygulandığında yıllar sonra bile keskinliğini korur.",
      "Geniş dolgular cilde daha çok yüklenir; bu yüzden büyük parçaları birden fazla seansa bölüyorum. Rahat bir iyileşme, hızlı bitirmekten daha önemli.",
    ],
    suitedFor: [
      "Güçlü ve iddialı bir görünüm isteyenler",
      "Kapatma (cover-up) çalışmaları",
      "Kol, sırt, bacak gibi büyük yüzeyler",
    ],
    notes: [
      "Geniş dolgu alanlarında iyileşme birkaç gün daha uzun sürer.",
      "Tek seansta çalıştığım azami alanın bir sınırı var; cilt sağlığı önceliklidir.",
    ],
    cover: { src: "/img/styles/blackwork.svg", alt: "Blackwork tarzında yoğun siyah dolgulu ornamental dövme", ratio: "portrait" },
    typicalDuration: "3 – 6 saat / seans",
    popular: true,
    order: 3,
  },
  {
    slug: "realism",
    name: "Realizm",
    tagline: "Fotoğrafın cilde çevrilmiş hali.",
    description: [
      "Realizm, ışık ve gölgeyi kontür olmadan kurma disiplinidir. Portre, hayvan, obje ya da doku — hepsi ton geçişleriyle inşa edilir.",
      "En çok referans isteyen tarz budur. Net, yüksek çözünürlüklü ve iyi ışıklandırılmış bir görsel olmadan iyi bir realizm çalışması çıkmaz.",
      "Büyük ölçek ister. 15 cm altındaki bir portrede ton sayısı yetmez ve zamanla detaylar birbirine karışır; bu yüzden ölçüyü birlikte belirleriz.",
    ],
    suitedFor: [
      "Portre, hayvan veya anlamı olan bir objeyi taşımak isteyenler",
      "Uzun soluklu, çok seanslı bir projeye hazır olanlar",
      "Kol, sırt, göğüs, bacak gibi geniş alanlar",
    ],
    notes: [
      "En az 15 cm ölçü önerilir; küçük ölçekte mikro realizme yönlendiriyorum.",
      "Çoğu iş 2–4 seans sürer ve seanslar arasında 3 hafta iyileşme payı bırakılır.",
    ],
    cover: { src: "/img/styles/realism.svg", alt: "Realizm tarzında ton geçişleriyle çalışılmış dövme", ratio: "portrait" },
    typicalDuration: "4 – 6 saat / seans",
    order: 4,
  },
  {
    slug: "micro-realism",
    focus: true,
    name: "Mikro Realizm",
    tagline: "Avuç içi kadar alanda tam detay.",
    description: [
      "Mikro realizm, realizmin küçük ölçekli ve daha yumuşak kontrastlı hali. Genellikle 5–12 cm arasında, tek iğneye yakın gruplarla çalışılır.",
      "Portre, evcil hayvan, film karesi ya da bir obje — hepsi olabilir. Sınır, detayın kaç milimetreye kadar okunabildiğidir.",
      "Bu tarzda tazeleme ihtimali diğerlerine göre daha yüksektir. İlk yılın sonunda birlikte bakar, gerekirse ücretsiz rötuş yaparım.",
    ],
    suitedFor: [
      "Küçük ama detaylı bir anı taşımak isteyenler",
      "Kol içi, önkol, baldır gibi orta boy alanlar",
      "Renk yerine yumuşak siyah-gri sevenler",
    ],
    notes: [
      "Referans görselin çözünürlüğü sonucu doğrudan etkiler.",
      "İlk 12 ay içinde bir kez ücretsiz rötuş hakkı tanımlıyorum.",
    ],
    cover: { src: "/img/styles/micro-realism.svg", alt: "Mikro realizm tarzında küçük ölçekli detaylı dövme", ratio: "portrait" },
    typicalDuration: "2 – 4 saat",
    popular: true,
    order: 5,
  },
  {
    slug: "geometric",
    focus: true,
    name: "Geometrik",
    tagline: "Ölçüyle kurulmuş simetri ve tekrar.",
    description: [
      "Geometrik çalışmalar pergel ve cetvel mantığıyla kurulur. Simetri, tekrar ve oran; süsleme değil yapının kendisidir.",
      "Vücudun eğrisi düz bir kâğıt değildir. Bu yüzden desen önce bölgeye göre şablonlanır, gerekirse yerinde elle yeniden çizilir.",
      "Mandala, ornamental kol bantları, dotwork gölgeler ve kutsal geometri bu başlığın altında toplanır.",
    ],
    suitedFor: [
      "Düzen ve simetriden hoşlananlar",
      "Kol bandı, omuz, sırt gibi simetriye uygun bölgeler",
      "Mevcut bir dövmeyi bir kompozisyona bağlamak isteyenler",
    ],
    notes: [
      "Simetrinin doğru oturması için ölçü seansı ayrı planlanır.",
      "Dotwork gölgeler uygulama süresini uzatır.",
    ],
    cover: { src: "/img/styles/geometric.svg", alt: "Geometrik tarzda simetrik mandala dövme çalışması", ratio: "portrait" },
    typicalDuration: "3 – 5 saat",
    order: 6,
  },
  {
    slug: "abstract",
    name: "Soyut",
    tagline: "Fırça, leke ve hareketin izi.",
    description: [
      "Soyut çalışmalar tanımlı bir figüre bağlı değildir. Bir hareketin, bir dokunun ya da bir duygunun cilde bırakılmış izidir.",
      "Fırça darbesi etkisi, kontrolsüz görünen ama aslında planlanmış lekeler, tek nefeste çizilmiş hatlar. Bu tarzda tasarım her zaman kişiye özeldir; katalogdan seçilmez.",
      "En çok özgürlük tanıyan alan burasıdır — ama en çok güven de burada gerekir. Bana alan bırakan çalışmalardan en iyi sonuçlar çıkıyor.",
    ],
    suitedFor: [
      "Figüratif olmayan, yoruma açık bir şey isteyenler",
      "Yoruma alan bırakmaktan keyif alanlar",
      "Mevcut çalışmalar arasındaki boşlukları bağlamak",
    ],
    notes: [
      "Tasarım genellikle uygulama gününde bölgeye göre son halini alır.",
      "Aynı çalışma bir daha tekrarlanmaz; her parça tektir.",
    ],
    cover: { src: "/img/styles/abstract.svg", alt: "Soyut tarzda fırça etkili dövme çalışması", ratio: "portrait" },
    typicalDuration: "2 – 4 saat",
    order: 7,
  },
  {
    slug: "traditional",
    name: "Traditional",
    tagline: "Kalın kontür, net renk, yüz yıllık dil.",
    description: [
      "Traditional (old school) dövme, kalın kontürler, sınırlı renk paleti ve net formlarla tanımlanır. Denizcilik geçmişinden gelen bu dil, bugün hâlâ en okunaklı tarzdır.",
      "Kalın çizgi ve dolu renk, zamana en iyi dayanan kombinasyondur. Yirmi yıl sonra hâlâ ne olduğu anlaşılan dövmeler genellikle bu tarzdadır.",
      "Neo-traditional yorumlarla daha zengin paletler ve daha detaylı gölgeler de çalışıyorum.",
    ],
    suitedFor: [
      "Zamana dayanıklı, net bir sonuç isteyenler",
      "Renk kullanmaktan çekinmeyenler",
      "Klasik semboller: yılan, hançer, gül, panter, çapa",
    ],
    notes: [
      "Renkli çalışmalarda güneş koruması uzun vadede belirleyicidir.",
      "Koyu ten tonlarında paleti birlikte revize ederiz.",
    ],
    cover: { src: "/img/styles/traditional.svg", alt: "Traditional tarzda kalın kontürlü renkli dövme", ratio: "portrait" },
    typicalDuration: "2 – 5 saat",
    order: 8,
  },
  {
    slug: "lettering",
    name: "Lettering",
    tagline: "Bir cümlenin doğru harfle yazılması.",
    description: [
      "Lettering, yazının kendisinin tasarım olduğu alandır. El yazısı, serif, gotik ya da tamamen özel çizilmiş harfler.",
      "Yazı dövmelerinde en sık yapılan hata, hazır bir bilgisayar fontunu doğrudan cilde taşımaktır. Her cümleyi elle çizip harflerin arasını bölgeye göre yeniden dengeliyorum.",
      "Yabancı dilde ya da farklı alfabede bir yazı istiyorsanız, uygulamadan önce anlamını birlikte doğruluyoruz. Yanlış yazılmış bir kelime en pahalı hatadır.",
    ],
    suitedFor: [
      "Bir isim, tarih ya da cümle taşımak isteyenler",
      "El yazısı ve tipografiye ilgi duyanlar",
      "Kaburga, önkol, köprücük gibi çizgisel bölgeler",
    ],
    notes: [
      "Metin uzunluğu ile ölçü doğru orantılıdır; çok küçük yazı önerilmez.",
      "İmla ve anlam kontrolü uygulama öncesi yazılı onaya bağlanır.",
    ],
    cover: { src: "/img/styles/lettering.svg", alt: "Lettering tarzında el yazısı dövme çalışması", ratio: "portrait" },
    typicalDuration: "1 – 3 saat",
    order: 9,
  },
  {
    slug: "custom-design",
    name: "Kişiye Özel Tasarım",
    tagline: "Sıfırdan, yalnızca sizin için çizilen parça.",
    description: [
      "Aklınızdaki fikir tek bir stile sığmıyorsa, sıfırdan çizerim. Fine line bir botanik forma blackwork bir gölge, geometrik bir çerçeveye realist bir detay eklenebilir.",
      "Süreç bir görüşmeyle başlar: neyi neden istediğinizi, nereye yaptırmak istediğinizi ve nasıl yaşadığınızı konuşuruz. Tasarım bundan sonra çıkar.",
      "Özel tasarımlar yalnızca bir kez uygulanır. Çizim size aittir ve başka kimseye çalışmam.",
    ],
    suitedFor: [
      "Katalogda karşılığını bulamayan fikirler",
      "Birden fazla stili birleştirmek isteyenler",
      "Mevcut dövmeleri tek kompozisyona bağlayan projeler",
    ],
    notes: [
      "Tasarım süreci ortalama 2–3 hafta sürer ve kapora ile başlar.",
      "İki revizyon hakkı standarttır; sonrası birlikte değerlendirilir.",
    ],
    cover: { src: "/img/styles/custom-design.svg", alt: "Kişiye özel tasarlanmış karma tarzda dövme çalışması", ratio: "portrait" },
    typicalDuration: "Projeye göre",
    order: 10,
  },
];

export const styleBySlug = (slug: string): TattooStyle | undefined =>
  styles.find((style) => style.slug === slug);

export const styleName = (slug: StyleSlug): string =>
  styles.find((style) => style.slug === slug)?.name ?? slug;

export const popularStyles = styles.filter((style) => style.popular);

export const styleSlugs = styles.map((style) => style.slug);

/** Ağırlıklı çalışılan tarzlar. */
export const focusStyles = styles.filter((style) => style.focus);
