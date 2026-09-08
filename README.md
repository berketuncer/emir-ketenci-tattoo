# Emir Ketenci — Dövme Stüdyosu Web Sitesi

Karaköy'de **tek kişilik** bir dövme stüdyosu için hazırlanmış, üretime hazır yapıda bir tanıtım
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
│   ├── studyo/ bakim/ sss/ iletisim/ hediye-karti/
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
| `src/data/site.ts` | Marka adı, adres, telefon, saatler, menü, sosyal hesaplar |
| `src/data/artist.ts` | Emir Ketenci: biyografi, prensipler, müsaitlik, kilometre taşları |
| `src/data/works.ts` | Portfolyo |
| `src/data/styles.ts` | Dövme tarzları |
| `src/data/testimonials.ts` | Müşteri yorumları |
| `src/data/faq.ts` | Sık sorulan sorular |
| `src/data/pricing.ts` | Fiyat aralıkları |
| `src/data/process.ts`, `aftercare.ts`, `studio.ts`, `giftcard.ts` | Süreç, bakım, atölye, hediye kartı |
| `src/data/booking.ts` | Randevu formundaki seçenek listeleri |

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

`src/components/booking/BookingForm.tsx` beş adımlı bir akış yürütür: fikir → ölçü ve bölge →
referanslar → tarih ve bütçe → iletişim. Adım bazlı doğrulama, taslak saklama (localStorage),
sürükle-bırak görsel yükleme, özet ve başarı/hata durumları hazırdır.

Şu an sunucu yoktur; `submit()` içindeki bekleme simülasyonunun yerine kendi API çağrınızı
koyduğunuzda akış olduğu gibi çalışır. Yüklenen görseller tarayıcıdan çıkmaz.

## SEO ve erişilebilirlik

- Sayfa bazlı `metadata`, Open Graph ve Twitter kartları (`src/lib/seo.ts`)
- `TattooParlor`, `Person`, `FAQPage` ve `BreadcrumbList` schema.org verileri
- `sitemap.ts`, `robots.ts`, `manifest.ts`, üretilen `opengraph-image`
- Klavye ile tam gezinme, odak halkaları, `prefers-reduced-motion` desteği,
  anlamlı `alt` metinleri, form etiketleri ve hata duyuruları

## Notlar

- İletişim bilgileri, yorumlar ve fiyatlar demo içeriktir.
- Yasal sayfalar taslaktır; yayına geçmeden önce hukuk danışmanı metinleriyle değiştirilmelidir.
- Harita, kullanıcı istemeden yüklenmez (OpenStreetMap gömülü çerçevesi, anahtar gerektirmez).
