import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, WhatsApp } from "@/components/ui/Icons";
import { whatsappLink } from "@/data/site";
import { styleName } from "@/data/styles";
import { isWannadoActive, wannado } from "@/data/wannado";

/** "31 Ekim" gibi — ek almadığı için ünlü uyumu derdi yok. */
const lastDay = (iso: string) =>
  new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long" }).format(
    new Date(`${iso}T12:00:00+03:00`),
  );

/**
 * "Şu aralar" — Emir'in o dönem canının çektiği iş. Sunucuda render edilir;
 * son gün geçtiyse hiç çıkmaz, boş durum yok. Anasayfa günde bir yeniden
 * üretildiği için tarih geçince push'a gerek kalmadan kaybolur.
 */
export default function Wannado() {
  if (!isWannadoActive(new Date())) return null;

  const message = `Merhaba, sitede "şu aralar" dediğin iş için yazıyorum: ${wannado.title}`;
  const withImage = Boolean(wannado.image);

  return (
    <Section spacing="sm" className="border-t border-[var(--hairline)]">
      <div className="container-page">
        <div className="grid gap-10 border border-ember/30 bg-ember/[0.04] p-7 sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className={withImage ? "lg:col-span-7" : "lg:col-span-9"}>
            <Reveal>
              <p className="type-eyebrow flex flex-wrap items-center gap-3 text-ember">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                Şu aralar
                <span className="text-ash-deep">· son gün {lastDay(wannado.until)}</span>
              </p>
              <h2 className="type-h2 mt-6 text-bone">{wannado.title}</h2>
              <p className="type-lead mt-5 max-w-xl">{wannado.body}</p>

              {wannado.perk ? (
                <p className="mt-6 max-w-xl border-l-2 border-ember pl-4 text-[0.9375rem] leading-relaxed text-bone">
                  {wannado.perk}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={whatsappLink(message)} external icon={<WhatsApp className="h-4 w-4" />}>
                  Bunu ben istiyorum
                </Button>
                {wannado.style ? (
                  <Button
                    href={`/stiller/${wannado.style}`}
                    variant="secondary"
                    icon={<ArrowUpRight className="h-4 w-4" />}
                  >
                    {styleName(wannado.style)} işlerime bak
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </div>

          {wannado.image ? (
            <div className="lg:col-span-5">
              <Reveal delay={90}>
                <Media
                  src={wannado.image.src}
                  alt={wannado.image.alt}
                  ratio={wannado.image.ratio}
                  sizes="(max-width: 1024px) 92vw, 36vw"
                />
              </Reveal>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
