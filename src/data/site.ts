import type { NavItem } from "./types";

/**
 * Stüdyoya ait tüm sabitler. Gerçek bilgiler geldiğinde yalnızca bu dosya
 * güncellenir; başlıklar, footer, schema.org verisi ve iletişim bağlantıları
 * buradan beslenir.
 *
 * NOT: Aşağıdaki iletişim bilgileri demo amaçlıdır.
 */
export const site = {
  name: "Emir Ketenci",
  legalName: "Emir Ketenci Dövme Stüdyosu",
  shortName: "EK",
  descriptor: "Dövme ve Tasarım",
  domain: "emirketenci.com",
  url: "https://www.emirketenci.com",
  locale: "tr_TR",
  /** Stüdyonun açıldığı yıl. */
  founded: 2019,
  /** Sabit "bugün" — tarih hesapları sunucu ve istemcide aynı sonucu versin diye. */
  currentYear: 2026,

  tagline: "Kalıcı olanı acele etmeden çiziyorum.",
  description:
    "Karaköy'de randevuyla çalışan tek kişilik bir dövme stüdyosu. Fine line, mikro realizm, blackwork ve geometrik çalışmalar; günde tek randevu, kişiye özel tasarım.",
  shortDescription:
    "Karaköy'de tek kişilik özel stüdyo. Fine line, mikro realizm, blackwork ve geometrik çalışmalar.",

  contact: {
    phone: "+90 212 555 04 18",
    phoneDisplay: "+90 212 555 04 18",
    whatsapp: "+90 532 555 04 18",
    whatsappDisplay: "+90 532 555 04 18",
    email: "merhaba@emirketenci.com",
    pressEmail: "basin@emirketenci.com",
  },

  address: {
    street: "Mumhane Caddesi No: 47, Kat 3",
    district: "Kemankeş Karamustafa Paşa Mah.",
    city: "Karaköy, Beyoğlu",
    region: "İstanbul",
    postalCode: "34425",
    country: "TR",
    countryName: "Türkiye",
    /** Karaköy merkez — harita ve schema.org için. */
    geo: { lat: 41.0246, lng: 28.9772 },
    directions:
      "Tophane tramvay durağına 4 dakika, Karaköy iskelesine 6 dakika yürüme mesafesinde. Bina girişinde zil paneli, stüdyo 3. katta.",
  },

  hours: [
    { day: "Pazartesi", value: "Kapalı", closed: true },
    { day: "Salı", value: "12:00 – 21:00" },
    { day: "Çarşamba", value: "12:00 – 21:00" },
    { day: "Perşembe", value: "12:00 – 21:00" },
    { day: "Cuma", value: "12:00 – 21:00" },
    { day: "Cumartesi", value: "11:00 – 20:00" },
    { day: "Pazar", value: "Kapalı", closed: true },
  ],

  hoursSummary: "Salı – Cuma 12:00–21:00 · Cumartesi 11:00–20:00 · Pazar ve Pazartesi kapalı",

  social: [
    { label: "Instagram", handle: "@emirketenci.tattoo", href: "https://instagram.com/emirketenci.tattoo" },
    { label: "Pinterest", handle: "emirketenci", href: "https://pinterest.com/emirketenci" },
    { label: "Behance", handle: "emirketenci", href: "https://behance.net/emirketenci" },
  ],

  /** Ana menü. */
  nav: [
    { label: "Çalışmalar", href: "/calismalar", description: "Portfolyo ve tarz filtreleri" },
    { label: "Stiller", href: "/stiller", description: "Hangi tarz size uygun?" },
    { label: "Hakkımda", href: "/hakkimda", description: "Kimim, nasıl çalışıyorum" },
    { label: "Stüdyo", href: "/studyo", description: "Mekân, hijyen ve süreç" },
    { label: "SSS", href: "/sss", description: "Sık sorulan sorular" },
    { label: "İletişim", href: "/iletisim", description: "Adres, saatler, ulaşım" },
  ] satisfies NavItem[],

  /** Menüde ikinci sıra — mobil menüde ve footer'da gösterilir. */
  secondaryNav: [
    { label: "Bakım Rehberi", href: "/bakim" },
    { label: "Fiyatlandırma", href: "/sss#fiyat" },
    { label: "Hediye Kartı", href: "/hediye-karti" },
  ] satisfies NavItem[],

  legalNav: [
    { label: "Gizlilik Politikası", href: "/gizlilik" },
    { label: "Çerez Politikası", href: "/cerez-politikasi" },
    { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
    { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
  ] satisfies NavItem[],

  booking: {
    href: "/randevu",
    label: "Randevu Al",
    /** Ortalama dönüş süresi — formda ve CTA'larda kullanılır. */
    responseTime: "48 saat içinde",
    depositNote: "Randevu, tasarım onayından sonra alınan kapora ile kesinleşir.",
  },

  /** Yaş sınırı — hem SSS hem form doğrulaması bu değeri kullanır. */
  minimumAge: 18,
} as const;

export const whatsappLink = (message?: string) => {
  const number = site.contact.whatsapp.replace(/[^0-9]/g, "");
  const text = message ?? "Merhaba, bir dövme fikrim var. Konuşabilir miyiz?";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export const phoneLink = `tel:${site.contact.phone.replace(/[^0-9+]/g, "")}`;
export const mailLink = `mailto:${site.contact.email}`;

export const mapsLink = `https://www.openstreetmap.org/?mlat=${site.address.geo.lat}&mlon=${site.address.geo.lng}#map=17/${site.address.geo.lat}/${site.address.geo.lng}`;

export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.region}`;
