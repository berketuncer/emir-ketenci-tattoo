/**
 * Randevu formunun seçenek listeleri. Form, seçilen değerleri okunabilir
 * etiketlere çevirip hazır bir WhatsApp mesajı kurar.
 */

export const placements = [
  { value: "onkol", label: "Önkol" },
  { value: "pazi", label: "Pazı / üst kol" },
  { value: "kol-ici", label: "Kol içi" },
  { value: "omuz", label: "Omuz" },
  { value: "sirt", label: "Sırt" },
  { value: "gogus", label: "Göğüs" },
  { value: "kaburga", label: "Kaburga" },
  { value: "bacak-uyluk", label: "Uyluk" },
  { value: "baldir", label: "Baldır" },
  { value: "bilek", label: "Bilek" },
  { value: "ayak-bilegi", label: "Ayak bileği" },
  { value: "ense-boyun", label: "Ense / boyun" },
  { value: "el-parmak", label: "El / parmak" },
  { value: "karar-vermedim", label: "Henüz karar vermedim" },
];

export const sizes = [
  { value: "0-5", label: "5 cm'e kadar", hint: "Minimal işaret" },
  { value: "5-10", label: "5 – 10 cm", hint: "Küçük çalışma" },
  { value: "10-20", label: "10 – 20 cm", hint: "Orta ölçek" },
  { value: "20-30", label: "20 – 30 cm", hint: "Büyük parça" },
  { value: "30+", label: "30 cm ve üzeri", hint: "Kol / sırt projesi" },
  { value: "bilmiyorum", label: "Emin değilim", hint: "Birlikte belirleyelim" },
];

export const projectTypes = [
  { value: "yeni", label: "Yeni dövme", hint: "Sıfırdan bir çalışma" },
  { value: "cover-up", label: "Kapatma (cover-up)", hint: "Mevcut bir dövmenin üzerine" },
  { value: "tamamlama", label: "Devam / tamamlama", hint: "Var olan bir işi büyütmek" },
  { value: "hediye-karti", label: "Hediye kartı", hint: "Başkası için hediye" },
];

export const palettes = [
  { value: "siyah-gri", label: "Siyah – gri" },
  { value: "renkli", label: "Renkli" },
  { value: "karar-vermedim", label: "Kararsızım" },
];

export const experienceOptions = [
  { value: "ilk", label: "Bu ilk dövmem olacak" },
  { value: "birkac", label: "Birkaç dövmem var" },
  { value: "cok", label: "Çok sayıda dövmem var" },
];

export const timePreferences = [
  { value: "hafta-ici-gunduz", label: "Hafta içi gündüz" },
  { value: "hafta-ici-aksam", label: "Hafta içi akşamüstü" },
  { value: "hafta-sonu", label: "Hafta sonu" },
  { value: "fark-etmez", label: "Fark etmez" },
];
