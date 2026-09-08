export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Basit e-posta doğrulaması — form tarafında anında geri bildirim için. */
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Türkiye telefon numarası için esnek doğrulama. */
export const isPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
};

/** 0555 555 55 55 biçiminde maskeler. */
export const formatPhone = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 4) return d;
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
  if (d.length <= 9) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
};

export const slugify = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Bugünden itibaren en erken seçilebilecek randevu tarihi (ISO). */
export const minBookingDate = (from: Date, daysAhead = 10) => {
  const d = new Date(from.getTime());
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
};
