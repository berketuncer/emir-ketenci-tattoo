import Marquee from "@/components/ui/Marquee";

const claims = [
  "Tek kullanımlık iğne ve kartuş",
  "Paketler misafirin önünde açılır",
  "Kişiye özel tasarım",
  "Günde tek randevu",
  "İlk yıl bir kez ücretsiz rötuş",
  "Vegan mürekkep seçeneği",
  "Onaysız iğne açılmaz",
  "Tıbbi atık ayrıştırması",
];

export default function TrustMarquee() {
  return (
    <div className="border-y border-[var(--hairline)] py-5">
      <Marquee items={claims} duration={52} />
    </div>
  );
}
