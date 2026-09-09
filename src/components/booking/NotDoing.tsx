import { Close } from "@/components/ui/Icons";
import { notDoing } from "@/data/limits";

/**
 * "Yapmadıklarım" — uyumsuz talebi form doldurulmadan eler. Liste boşken
 * hiç render edilmez; boş durum yok.
 */
export default function NotDoing() {
  if (notDoing.length === 0) return null;

  return (
    <div className="mb-10 border border-[var(--hairline)] p-6 sm:p-7">
      <p className="type-eyebrow">Yapmadıklarım</p>
      <p className="type-body mt-3 text-[0.9375rem]">Boşuna yazışmayalım diye baştan söylüyorum:</p>
      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {notDoing.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ash">
            <Close className="mt-0.5 h-4 w-4 shrink-0 text-ash-deep" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
