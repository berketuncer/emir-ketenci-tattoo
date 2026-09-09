import type { NavItem } from "./types";

/**
 * Stüdyoya ait tüm sabitler. Gerçek bilgiler geldiğinde yalnızca bu dosya
 * güncellenir; başlıklar, footer, schema.org verisi ve iletişim bağlantıları
 * buradan beslenir.
 *
 * Tek iletişim kanalı WhatsApp; adres, çalışma saati ve e-posta bilinçli
 * olarak yok. Konum, randevu kesinleşince ziyaretçiye birebir yazılır.
 */
export const site = {
  name: "Emir Ketenci",
  legalName: "Emir Ketenci Dövme Stüdyosu",
  shortName: "EK",
  descriptor: "Dövme ve Tasarım",
  /**
   * Yayındaki adres. Gerçek alan adı bağlandığında burayı değiştirmek yeterli;
   * canonical, sitemap, robots ve Open Graph adresleri buradan türetilir.
   * Ortam değişkeniyle de geçersiz kılınabilir: NEXT_PUBLIC_SITE_URL
   */
  domain: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://emir-ketenci-tattoo.vercel.app").replace(
    /^https?:\/\//,
    "",
  ),
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emir-ketenci-tattoo.vercel.app",
  locale: "tr_TR",
  /** Stüdyonun açıldığı yıl. */
  founded: 2019,
  /** Sabit "bugün" — tarih hesapları sunucu ve istemcide aynı sonucu versin diye. */
  currentYear: 2026,

  tagline: "Kalıcı olanı acele etmeden çiziyorum.",
  description:
    "İstanbul'da, sadece randevuyla çalışan tek kişilik bir dövme stüdyosu. Fine line, mikro realizm, blackwork ve geometrik çalışmalar; günde tek randevu, kişiye özel tasarım.",
  shortDescription:
    "İstanbul'da tek kişilik, sadece randevuyla çalışan stüdyo. Fine line, mikro realizm, blackwork ve geometrik çalışmalar.",

  /** Tek kanal. Arama ve e-posta yok: WhatsApp asenkron, ne zaman bakılacağı Emir'e kalmış. */
  contact: {
    whatsapp: "+90 533 431 53 48",
    whatsappDisplay: "+90 533 431 53 48",
  },

  /**
   * Adres, harita ve çalışma saati yok — bilinçli. Sadece randevuyla
   * çalışılıyor; konum, randevu kesinleşince ziyaretçiye yazılıyor.
   */
  location: {
    city: "İstanbul",
    country: "TR",
    countryName: "Türkiye",
    short: "Sadece randevuyla · İstanbul",
    note: "Sessiz bir yerde, sadece randevuyla çalışıyorum. Konumu randevu kesinleşince yazıyorum; gelmeden önce zaten her şeyi konuşmuş oluyoruz.",
  },

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
    { label: "SSS", href: "/sss", description: "Sık sorulan sorular" },
    { label: "İletişim", href: "/iletisim", description: "WhatsApp ve Instagram" },
  ] satisfies NavItem[],

  /** Menüde ikinci sıra — mobil menüde ve footer'da gösterilir. */
  secondaryNav: [
    { label: "Bakım Rehberi", href: "/bakim" },
    { label: "Fiyatlandırma", href: "/sss#fiyat" },
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
    /** Dönüş süresi — az vaat edilir, tutulur. Formda ve CTA'larda kullanılır. */
    responseTime: "genelde birkaç gün içinde",
    /** Beklentiyi samimi kuran tek cümle. */
    responseNote: "Mesajlara toplu bakıyorum; hemen dönemezsem unutmuş değilim, sıradasınız.",
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
