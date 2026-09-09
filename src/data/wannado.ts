import type { Wannado } from "./types";

/**
 * "Şu aralar" — Emir'in o dönem çok çalışmak istediği iş.
 *
 * Güncellemek için üç şey yeter: `title` ve `body`'yi yaz, `until`'ı
 * ileri al, push'la. Son gün geçince bölüm anasayfadan kendiliğinden
 * kalkar (sayfa günde bir yeniden üretilir); elle silmek gerekmez.
 * Hiçbir şey göstermek istemiyorsan `until`'ı geçmişte bırak.
 *
 * Aşağıdaki içerik ÖRNEK. Tarihi geçmişte olduğu için yayında görünmez;
 * Emir gerçekten ne istediğini söyleyince metni yazıp tarihi ileri al.
 */
export const wannado: Wannado = {
  title: "Şu aralar canım büyük bir blackwork panel çizmek istiyor.",
  body: "Uyluk ya da sırt; koyu, geometrik, nefes alan bir şey. Aklında böyle bir iş varsa tam zamanı — bu tarza kafamın en açık olduğu dönemdeyim.",
  style: "blackwork",
  perk: "Bu dönem bu iş için fiyatta esneğim; ne kadar, konuşurken söylerim.",
  until: "2026-09-01",
};

/** Bölüm gösterilsin mi — `until` günü dahil, Türkiye saatiyle. */
export const isWannadoActive = (now: Date) => {
  const end = new Date(`${wannado.until}T23:59:59+03:00`);
  return !Number.isNaN(end.getTime()) && now <= end;
};
