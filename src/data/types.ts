/**
 * Veri modelleri.
 *
 * Stüdyo tek kişilik: tüm çalışmalar Emir Ketenci'ye aittir, bu yüzden
 * hiçbir kayıtta ayrıca "sanatçı" alanı tutulmaz.
 *
 * Tüm içerik `src/data` altındaki dosyalardan gelir. İleride bir CMS ya da API
 * bağlanacağı zaman yalnızca bu dosyaların döndüğü değerlerin kaynağı değişir;
 * bileşenler aynı sözleşmeyle çalışmaya devam eder.
 */

export type StyleSlug =
  | "fine-line"
  | "minimal"
  | "blackwork"
  | "realism"
  | "micro-realism"
  | "geometric"
  | "abstract"
  | "traditional"
  | "lettering"
  | "custom-design";

/** Görsel oranları — grid ve lightbox layout'u bu değere göre yer ayırır. */
export type AspectRatio = "portrait" | "square" | "landscape" | "tall";

export interface Media {
  src: string;
  alt: string;
  ratio: AspectRatio;
}

export interface TattooStyle {
  slug: StyleSlug;
  name: string;
  /** Kart ve liste görünümünde kullanılan tek cümlelik özet. */
  tagline: string;
  /** Stil sayfasındaki uzun açıklama (2–3 paragraf). */
  description: string[];
  /** "Kimler için uygun" maddeleri. */
  suitedFor: string[];
  /** Bilinmesi gereken pratik notlar. */
  notes: string[];
  cover: Media;
  /** Ortalama seans süresi aralığı, insan okuması için. */
  typicalDuration: string;
  /** Ana sayfada "sık tercih edilen" rozetini alan stiller. */
  popular?: boolean;
  /** Ağırlıklı çalışılan alanlardan biri mi? */
  focus?: boolean;
  /** Sıralama ağırlığı — küçük olan önce gelir. */
  order: number;
}

export interface Artist {
  name: string;
  role: string;
  /** Kısa tanım — başlık altında görünür. */
  tagline: string;
  bio: string[];
  /** Ağırlıklı çalışılan tarzlar. */
  focusStyles: StyleSlug[];
  /** Talep üzerine çalışılan diğer tarzlar. */
  otherStyles: StyleSlug[];
  portrait: Media;
  /** İmza işler — works.ts içindeki id'ler. */
  featuredWorks: string[];
  /** İğne tutmaya başladığı yıl. */
  since: number;
  city: string;
  instagram: string;
  /** Çalışma prensipleri. */
  principles: string[];
  /** Kısa kilometre taşları: yıl + ne oldu. */
  milestones: { year: string; text: string }[];
}

export interface Work {
  id: string;
  title: string;
  style: StyleSlug;
  media: Media;
  /** Vücut bölgesi. */
  placement: string;
  /** Yaklaşık boyut. */
  size: string;
  palette: "siyah-gri" | "renkli";
  /** Kaç seansta tamamlandı. */
  sessions: number;
  year: number;
  featured?: boolean;
  /** Kapatma (cover-up) çalışması mı? */
  coverUp?: boolean;
  /** Kısa hikâye — lightbox'ta gösterilir. */
  note?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

export type FaqCategory = "fiyat" | "randevu" | "tasarim" | "uygulama" | "bakim";

export interface ProcessStep {
  step: number;
  title: string;
  summary: string;
  detail: string;
  duration: string;
}

export interface AftercarePhase {
  id: string;
  window: string;
  title: string;
  items: string[];
}

/**
 * "Şu aralar" — Emir'in o dönem canının çektiği iş. Anasayfada tek bir
 * bölüm olarak çıkar; `until` geçince kendiliğinden kaybolur.
 */
export interface Wannado {
  /** Büyük başlık — birinci tekil, samimi. */
  title: string;
  /** Bir-iki cümle: ne, nereye, neden şimdi. */
  body: string;
  /** İlgili tarz — "işlerime bak" bağlantısı için. */
  style?: StyleSlug;
  /** Fiyat/koşul notu. Rakam yazmak zorunlu değil. */
  perk?: string;
  /** Son gün (YYYY-AA-GG). Bu günden sonra bölüm hiç render edilmez. */
  until: string;
  /** İsteğe bağlı görsel — eskiz, referans ya da benzer bir iş. */
  image?: Media;
}

export interface StudioValue {
  id: string;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  range: string;
  description: string;
  includes: string[];
  note?: string;
  highlighted?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}
