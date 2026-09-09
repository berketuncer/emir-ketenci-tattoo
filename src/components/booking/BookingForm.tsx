"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { RadioCards, SelectField, TextAreaField, TextField } from "./Fields";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import {
  experienceOptions,
  palettes,
  placements,
  projectTypes,
  sizes,
  timePreferences,
} from "@/data/booking";
import { site, whatsappLink } from "@/data/site";
import { styles } from "@/data/styles";

type Values = {
  projectType: string;
  idea: string;
  style: string;
  referenceNotes: string;
  placement: string;
  size: string;
  palette: string;
  name: string;
  experience: string;
  timePreference: string;
};

const emptyValues: Values = {
  projectType: "",
  idea: "",
  style: "",
  referenceNotes: "",
  placement: "",
  size: "",
  palette: "",
  name: "",
  experience: "",
  timePreference: "",
};

type Errors = Partial<Record<keyof Values, string>>;

const styleOptions = styles.map((item) => ({ value: item.slug, label: item.name }));

const labelOf = (options: ReadonlyArray<{ value: string; label: string }>, value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.projectType) errors.projectType = "Ne yaptırmak istediğinizi seçin.";
  if (values.idea.trim().length < 20) errors.idea = "Fikri biraz daha anlatın — en az 20 karakter.";
  if (!values.placement) errors.placement = "Bölge seçin.";
  if (!values.size) errors.size = "Yaklaşık ölçü seçin.";
  if (!values.palette) errors.palette = "Siyah-gri mi, renkli mi?";
  if (!values.name.trim()) errors.name = "İsminizi yazın.";
  return errors;
}

/**
 * Alanları okunabilir bir WhatsApp mesajına çevirir. Form bir sunucuya
 * gitmediği için talep, ziyaretçinin kendi WhatsApp'ından gönderdiği bu
 * mesajla doğrudan stüdyonun telefonuna düşer.
 *
 * Fiyat sorulmaz: kesin rakam ancak fikir, ölçü ve bölge görüldükten sonra
 * çıkar; baştan aralık sormak yanlış bir çapa atar.
 */
function buildMessage(values: Values): string {
  const lines = [
    "Merhaba Emir, siteden randevu talebi gönderiyorum.",
    "",
    `Ad: ${values.name.trim()}`,
    `Konu: ${labelOf(projectTypes, values.projectType)}`,
  ];

  const style = styles.find((item) => item.slug === values.style);
  if (style) lines.push(`Tarz: ${style.name}`);

  lines.push(`Bölge: ${labelOf(placements, values.placement)}`);
  lines.push(`Ölçü: ${labelOf(sizes, values.size)}`);
  lines.push(`Palet: ${labelOf(palettes, values.palette)}`);

  if (values.experience) lines.push(`Deneyim: ${labelOf(experienceOptions, values.experience)}`);
  if (values.timePreference) lines.push(`Ne zaman: ${labelOf(timePreferences, values.timePreference)}`);

  lines.push("", `Fikir: ${values.idea.trim()}`);
  if (values.referenceNotes.trim()) lines.push("", `İlham / referans: ${values.referenceNotes.trim()}`);

  return lines.join("\n");
}

/** Form içindeki başlıklı bölüm — sorular üç grupta toplanır. */
function Group({ title, step, children }: { title: string; step: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-[var(--hairline)] pt-8">
      <legend className="sr-only">{title}</legend>
      <p aria-hidden className="type-eyebrow flex items-center gap-3">
        <span className="font-mono text-[0.625rem] text-ash-deep">{step}</span>
        <span className="h-px w-6 bg-[var(--hairline-strong)]" />
        {title}
      </p>
      <div className="mt-8 flex flex-col gap-9">{children}</div>
    </fieldset>
  );
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [handedOff, setHandedOff] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  // Tarz ve konu sayfalarından gelen ön seçimler (/randevu?stil=fine-line)
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;

    const styleParam = searchParams.get("stil") ?? "";
    const topicParam = searchParams.get("konu") ?? "";

    setValues((current) => ({
      ...current,
      ...(styles.some((item) => item.slug === styleParam) ? { style: styleParam } : {}),
      ...(projectTypes.some((item) => item.value === topicParam) ? { projectType: topicParam } : {}),
    }));
  }, [searchParams]);

  const set = useCallback(<K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  const handoffLink = whatsappLink(buildMessage(values));

  const submit = () => {
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const firstKey = Object.keys(found)[0];
      document.querySelector<HTMLElement>(`[name="${firstKey}"], #${firstKey}`)?.focus();
      return;
    }

    // Kullanıcı hareketiyle açıldığı için genelde engellenmez; engellenirse
    // aşağıdaki panelde yer alan bağlantı yedek olarak kalır.
    window.open(handoffLink, "_blank", "noopener,noreferrer");
    setHandedOff(true);
    window.requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  if (handedOff) {
    return (
      <div ref={formRef} className="scroll-mt-28 border border-[var(--hairline)] p-8 sm:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-signal/40 bg-signal/10">
          <WhatsApp className="h-7 w-7 text-signal" />
        </div>
        <h2 className="type-h2 mt-8 text-bone">WhatsApp&apos;ı açtım.</h2>
        <p className="type-lead mt-5 max-w-lg">
          {values.name.trim() ? `${values.name.trim()}, ` : ""}talebiniz hazır bir mesaj olarak
          dolduruldu — <strong className="font-medium text-bone">göndermeyi unutmayın</strong>.
          Mesaj bana ulaştığında {site.booking.responseTime} dönüyorum.
        </p>

        <p className="type-body mt-6 text-[0.875rem]">
          Aklınızdaki referans görselleri de aynı sohbete ekleyebilirsiniz; tasarımı konuşurken en
          çok işime yarayan şey onlar.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={handoffLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            <WhatsApp className="h-4 w-4" />
            WhatsApp açılmadıysa buradan
          </a>
          <button
            type="button"
            onClick={() => setHandedOff(false)}
            className="inline-flex h-12 items-center rounded-full border border-[var(--hairline-strong)] px-6 text-sm text-bone transition-colors hover:bg-bone/[0.06]"
          >
            Formu düzenle
          </button>
          <Link
            href="/calismalar"
            className="inline-flex h-12 items-center rounded-full px-6 text-sm text-ash transition-colors hover:text-bone"
          >
            Çalışmalara göz at
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={formRef} className="scroll-mt-28">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        noValidate
      >
        <div className="flex flex-col gap-12">
          <Group title="Fikir" step="01">
            <RadioCards
              legend="Ne yaptırmak istiyorsunuz?"
              name="projectType"
              options={projectTypes}
              value={values.projectType}
              onChange={(value) => set("projectType", value)}
              error={errors.projectType}
              required
            />

            <TextAreaField
              id="idea"
              name="idea"
              label="Fikriniz"
              hint="Net bir fikir gerekmiyor; ne istemediğinizi yazmak bile başlamak için yeterli."
              required
              maxLength={800}
              placeholder="Bileğime küçük bir kır çiçeği düşünüyorum; annemin bahçesinden bir fotoğraf var elimde…"
              value={values.idea}
              error={errors.idea}
              onChange={(event) => set("idea", event.target.value)}
            />

            <SelectField
              id="style"
              name="style"
              label="Tarz"
              hint="İsteğe bağlı — emin değilseniz boş bırakın, birlikte karar veririz."
              placeholder="Henüz karar vermedim"
              options={styleOptions}
              value={values.style}
              onChange={(event) => set("style", (event.target as HTMLSelectElement).value)}
            />

            <TextField
              id="referenceNotes"
              name="referenceNotes"
              label="İlham / referans notu"
              hint="İsteğe bağlı — Instagram ya da Pinterest bağlantısı da olur."
              placeholder="instagram.com/p/… ya da 'annemin el yazısı'"
              value={values.referenceNotes}
              onChange={(event) => set("referenceNotes", event.target.value)}
            />
          </Group>

          <Group title="Ölçü ve bölge" step="02">
            <div className="grid gap-9 sm:grid-cols-2">
              <SelectField
                id="placement"
                name="placement"
                label="Bölge"
                required
                options={placements}
                value={values.placement}
                error={errors.placement}
                onChange={(event) => set("placement", (event.target as HTMLSelectElement).value)}
              />
              <SelectField
                id="size"
                name="size"
                label="Yaklaşık ölçü"
                required
                options={sizes}
                value={values.size}
                error={errors.size}
                onChange={(event) => set("size", (event.target as HTMLSelectElement).value)}
              />
            </div>

            <RadioCards
              legend="Palet"
              name="palette"
              options={palettes}
              value={values.palette}
              onChange={(value) => set("palette", value)}
              error={errors.palette}
              columns={3}
              required
            />
          </Group>

          <Group title="Siz ve zamanlama" step="03">
            <TextField
              id="name"
              name="name"
              label="Adınız"
              required
              autoComplete="given-name"
              placeholder="Zeynep"
              value={values.name}
              error={errors.name}
              onChange={(event) => set("name", event.target.value)}
            />

            <RadioCards
              legend="Daha önce dövme yaptırdınız mı?"
              name="experience"
              hint="İsteğe bağlı — ilk dövmeyse seansı buna göre planlıyorum."
              options={experienceOptions}
              value={values.experience}
              onChange={(value) => set("experience", value)}
              columns={3}
            />

            <SelectField
              id="timePreference"
              name="timePreference"
              label="Ne zaman uygunsunuz?"
              hint="İsteğe bağlı — kesin günü konuşurken belirleriz."
              placeholder="Fark etmez"
              options={timePreferences}
              value={values.timePreference}
              onChange={(event) => set("timePreference", (event.target as HTMLSelectElement).value)}
            />
          </Group>
        </div>

        <div className="mt-12 border-t border-[var(--hairline)] pt-8">
          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-bone px-8 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white"
          >
            WhatsApp&apos;tan gönder
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="type-body mt-5 max-w-md text-[0.875rem]">
            Form, yazdıklarınızı hazır bir WhatsApp mesajına çevirir; mesajı siz gönderirsiniz.
            Sitede hiçbir bilgi saklanmaz.
          </p>
        </div>
      </form>
    </div>
  );
}
