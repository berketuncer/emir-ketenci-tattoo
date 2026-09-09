# Emir Ketenci — Dövme Stüdyosu Web Sitesi

İstanbul'da **tek kişilik**, sadece randevuyla çalışan bir dövme stüdyosu için hazırlanmış, üretime hazır yapıda bir tanıtım
sitesi. Stüdyoda yalnızca Emir Ketenci çalışır; site buna göre birinci tekil şahısla yazılmıştır.
Tüm içerik şu an demo verisidir; gerçek içerik geldiğinde yalnızca `src/data` altındaki dosyaların
değişmesi yeterlidir.

## Kurulum

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim derlemesi
npm start        # derlenmiş sürümü çalıştır
```

## Teknoloji

| Katman | Seçim |
| --- | --- |
| Çatı | Next.js 16 (App Router, Turbopack) |
| Dil | TypeScript (strict) |
| Stil | Tailwind CSS v4 — tasarım belirteçleri `src/app/globals.css` içinde `@theme` ile |
| Tipografi | Bodoni Moda (başlık), Inter (metin), Geist Mono (etiket) — `next/font` ile self-host |
| Görseller | Yerel olarak üretilen SVG (aşağıya bakın) |
| Bağımlılık | Sıfır ek paket — ücretli servis, API anahtarı veya abonelik yok |

## Dizin yapısı

```
src/
├── app/                      # rotalar, metadata, sitemap/robots/manifest
│   ├── calismalar/           # portfolyo (filtre + lightbox)
│   ├── hakkimda/             # kişisel tanıtım sayfası
│   ├── stiller/[slug]/       # tarz detay
│   ├── randevu/              # çok adımlı randevu talebi
│   ├── bakim/ sss/ iletisim/
│   └── gizlilik/ kvkk/ cerez-politikasi/ kullanim-kosullari/
├── components/
│   ├── ui/                   # Button, Media, Section, Reveal, Accordion, PageHero…
│   ├── layout/               # Header, Footer, ScrollProgress, QuickContact…
│   ├── sections/             # ana sayfa bölümleri
│   ├── work/                 # WorkGallery + Lightbox
│   └── booking/              # randevu formu ve alan bileşenleri
├── data/                     # TÜM İÇERİK BURADA
└── lib/                      # yardımcılar ve SEO/şema üreticileri
```

## İçeriği gerçek verilerle değiştirmek

Bileşenlerin hiçbirinde sabit içerik yoktur. Değiştirmeniz gereken dosyalar:

| Dosya | İçerik |
| --- | --- |
| `src/data/site.ts` | Marka adı, WhatsApp numarası, konum notu, menü, sosyal hesaplar, dönüş süresi |
| `src/data/artist.ts` | Emir Ketenci: biyografi, prensipler, kilometre taşları |
| `src/data/works.ts` | Portfolyo |
| `src/data/styles.ts` | Dövme tarzları |
| `src/data/faq.ts` | Sık sorulan sorular |
| `src/data/pricing.ts` | Fiyatı neyin belirlediği ve değişmeyen kurallar (rakam yok) |
| `src/data/process.ts`, `aftercare.ts`, `studio.ts` | Süreç, bakım, hijyen ve çalışma kuralları |
| `src/data/booking.ts` | Randevu formundaki seçenek listeleri |
| `src/data/wannado.ts` | "Şu aralar" — o dönem çizmek istediği iş; son günü geçince kendiliğinden kalkar |
| `src/data/limits.ts` | "Yapmadıklarım" — randevu formunun üstündeki liste; boşken görünmez |

Bilinçli olarak **olmayanlar:** adres, harita, çalışma saati, e-posta, telefonla arama, müşteri
yorumları, sabit fiyat. Sadece randevuyla çalışılıyor; konum randevu kesinleşince WhatsApp'tan
yazılıyor. Tek iletişim kanalı WhatsApp.

### Emir'den içerik gelince

| Gelen | Dosya | Yapılacak |
| --- | --- | --- |
| Yapmadıklarım listesi | `src/data/limits.ts` | Satırları `notDoing` dizisine yaz |
| Şu aralar çizmek istediği iş | `src/data/wannado.ts` | `title` ve `body`'yi yaz, `until`'ı ileri al |
| Biyografi, yıllar | `src/data/artist.ts` | `bio`, `since`, `milestones` |
| Instagram / Pinterest / Behance | `src/data/site.ts` → `social` | Kullanıcı adı ve bağlantı |
| Fotoğraflar | `src/data/works.ts` + `public/img/works/` | `media.src` alanlarını gerçek dosyalarla değiştir; footer'daki "görseller geçici" notunu sil |

Hepsi veri değişikliği; `main`'e push yeterli, kod dokunuşu gerekmez.

Tipler `src/data/types.ts` içinde. Bir CMS'e ya da API'ye geçildiğinde bu dosyaların yerine
aynı tipleri döndüren fonksiyonlar konması yeterlidir.

## Görseller

Sitedeki tüm görseller `scripts/` altındaki üreticiyle yerel olarak, deterministik biçimde
üretilir — hiçbir ücretli kaynak, stok fotoğraf servisi ya da dış istek yoktur.

```bash
node scripts/generate-images.mjs     # public/img/** içine SVG üretir
```

Çıktı vektörel olduğu için her ekran yoğunluğunda nettir ve toplam boyut ~1 MB'tır.

**Gerçek fotoğraflara geçiş:** `src/data/*.ts` içindeki `media.src` alanlarını `.jpg`/`.webp`
dosyalarıyla değiştirmeniz yeterli. `src/components/ui/Media.tsx` raster dosyaları otomatik
olarak `next/image` ile servis eder; oran bilgisi verildiği için yerleşim kayması (CLS) oluşmaz.

## Randevu formu

`src/components/booking/BookingForm.tsx` tek ekranda üç bölümdür: fikir → ölçü ve bölge →
sen ve zamanlama. Sunucu yoktur ve bilinçli olarak istenmez: form, alanları hazır bir WhatsApp
mesajına çevirip `wa.me` üzerinden ziyaretçinin kendi WhatsApp'ına aktarır; talep doğrudan
telefona düşer, sitede hiçbir şey saklanmaz. Bütçe sorulmaz (rakamı Emir fikri görünce söyler);
telefon ve e-posta sorulmaz (WhatsApp'la zaten gelir). Referans görselleri ziyaretçi sohbete
kendisi ekler — `wa.me` bağlantısı dosya taşıyamaz.

Tarz sayfalarından gelen `/randevu?stil=<slug>` ön seçimi korunur. Formun üstündeki
"Yapmadıklarım" bloğu `src/data/limits.ts` doluysa görünür.

## SEO ve erişilebilirlik

- Sayfa bazlı `metadata`, Open Graph ve Twitter kartları (`src/lib/seo.ts`)
- `TattooParlor`, `Person`, `FAQPage` ve `BreadcrumbList` schema.org verileri
- `sitemap.ts`, `robots.ts`, `manifest.ts`, üretilen `opengraph-image`
- Klavye ile tam gezinme, odak halkaları, `prefers-reduced-motion` desteği,
  anlamlı `alt` metinleri, form etiketleri ve hata duyuruları

## Notlar

- WhatsApp numarası gerçektir. Biyografi, kilometre taşları, sosyal hesap adları ve tüm
  çalışma görselleri hâlâ örnek içeriktir.
- Site "ben" ve "sen" diliyle konuşur; yeni metin yazarken bu tonu koru.
- Ana sayfa günde bir yeniden üretilir (`revalidate = 86400`); "Şu aralar" bölümünün son günü
  geçince push'a gerek kalmadan kaybolması bunun için.
- Yasal sayfalar taslaktır ve "siz" dilindedir; yayına geçmeden önce hukuk danışmanı
  metinleriyle değiştirilmelidir.
- `/studyo` ve `/hediye-karti` kaldırıldı; eski bağlantılar `next.config.ts` ile
  `/hakkimda` ve `/randevu`'ya kalıcı yönlenir.
