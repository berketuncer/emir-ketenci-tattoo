"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FileDrop, { type ReferenceFile } from "./FileDrop";
import { CheckboxField, RadioCards, SelectField, TextAreaField, TextField } from "./Fields";
import { ArrowLeft, ArrowRight, Check } from "@/components/ui/Icons";
import {
  bookingSteps,
  budgets,
  contactMethods,
  experienceOptions,
  palettes,
  placements,
  projectTypes,
  sizes,
  timePreferences,
} from "@/data/booking";
import { site, whatsappLink } from "@/data/site";
import { styles } from "@/data/styles";
import { cn, formatPhone, isEmail, isPhone, minBookingDate } from "@/lib/utils";

type Values = {
  projectType: string;
  style: string;
  idea: string;
  placement: string;
  size: string;
  palette: string;
  referenceNotes: string;
  preferredDate: string;
  timePreference: string;
  budget: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactMethod: string;
  experience: string;
  consent: boolean;
  updates: boolean;
};

const emptyValues: Values = {
  projectType: "",
  style: "",
  idea: "",
  placement: "",
  size: "",
  palette: "",
  referenceNotes: "",
  preferredDate: "",
  timePreference: "",
  budget: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  contactMethod: "",
  experience: "",
  consent: false,
  updates: false,
};

const DRAFT_KEY = "iz-atolye-randevu-taslak";

type Errors = Partial<Record<keyof Values, string>>;

/** Adım bazlı doğrulama — her adım yalnızca kendi alanlarını kontrol eder. */
function validateStep(step: number, values: Values): Errors {
  const errors: Errors = {};
  if (step === 0) {
    if (!values.projectType) errors.projectType = "Ne yaptırmak istediğinizi seçin.";
    if (values.idea.trim().length < 20) {
      errors.idea = "Fikri biraz daha anlatın — en az 20 karakter yazın.";
    }
  }
  if (step === 1) {
    if (!values.placement) errors.placement = "Bölge seçin.";
    if (!values.size) errors.size = "Yaklaşık ölçü seçin.";
    if (!values.palette) errors.palette = "Siyah-gri mi, renkli mi?";
  }
  if (step === 3) {
    if (!values.budget) errors.budget = "Bir bütçe aralığı seçin.";
  }
  if (step === 4) {
    if (!values.firstName.trim()) errors.firstName = "İsminizi yazın.";
    if (!values.lastName.trim()) errors.lastName = "Soyisminizi yazın.";
    if (!values.phone.trim()) errors.phone = "Telefon numaranızı yazın.";
    else if (!isPhone(values.phone)) errors.phone = "Numara eksik görünüyor.";
    if (!values.email.trim()) errors.email = "E-posta adresinizi yazın.";
    else if (!isEmail(values.email)) errors.email = "Bu adres geçerli görünmüyor.";
    if (!values.contactMethod) errors.contactMethod = "Size nasıl ulaşalım?";
    if (!values.consent) errors.consent = "Devam etmek için onay vermeniz gerekiyor.";
  }
  return errors;
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<ReferenceFile[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [reference, setReference] = useState("");
  const headingRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  const minDate = useMemo(() => minBookingDate(new Date(), 10), []);

  // Taslak geri yükleme + adres çubuğundaki ön seçimler
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;

    let draft: Partial<Values> = {};
    try {
      const stored = window.localStorage.getItem(DRAFT_KEY);
      if (stored) draft = JSON.parse(stored) as Partial<Values>;
    } catch {
      draft = {};
    }

    const styleParam = searchParams.get("stil") ?? "";
    const topicParam = searchParams.get("konu") ?? "";

    setValues((current) => ({
      ...current,
      ...draft,
      ...(styles.some((s) => s.slug === styleParam) ? { style: styleParam } : {}),
      ...(projectTypes.some((p) => p.value === topicParam) ? { projectType: topicParam } : {}),
    }));
  }, [searchParams]);

  // Taslağı sakla (dosyalar hariç)
  useEffect(() => {
    if (!restored.current || status === "success") return;
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...values, consent: false }));
      } catch {
        /* depolama kapalıysa sessizce geç */
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [values, status]);

  const set = useCallback(<K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  const focusStep = () => {
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      headingRef.current?.focus();
    });
  };

  const goNext = () => {
    const stepErrors = validateStep(step, values);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) {
      const firstKey = Object.keys(stepErrors)[0];
      document.querySelector<HTMLElement>(`[name="${firstKey}"], #${firstKey}`)?.focus();
      return;
    }
    if (step < bookingSteps.length - 1) {
      setStep(step + 1);
      focusStep();
    }
  };

  const goBack = () => {
    if (step === 0) return;
    setStep(step - 1);
    setErrors({});
    focusStep();
  };

  const submit = async () => {
    const stepErrors = validateStep(4, values);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) return;

    setStatus("sending");
    try {
      // Bu demoda sunucu yok; gerçek kurulumda burada API çağrısı yapılacak.
      await new Promise((resolve) => setTimeout(resolve, 1400));
      const code = `IZ-${Date.now().toString(36).slice(-5).toUpperCase()}`;
      setReference(code);
      setStatus("success");
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* yoksay */
      }
      window.requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div ref={formRef} className="border border-[var(--hairline)] p-8 sm:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-signal/40 bg-signal/10">
          <Check className="h-7 w-7 text-signal" />
        </div>
        <h2 className="type-h2 mt-8 text-bone">Talebiniz bize ulaştı.</h2>
        <p className="type-lead mt-5 max-w-lg">
          {values.firstName ? `${values.firstName}, ` : ""}talebinizi okuyup {site.booking.responseTime} size
          dönüyorum. Bu aşamada hiçbir ödeme yok.
        </p>

        <dl className="mt-9 grid gap-6 border-y border-[var(--hairline)] py-7 sm:grid-cols-3">
          <div>
            <dt className="type-eyebrow text-[0.625rem]">Talep numarası</dt>
            <dd className="mt-2 font-mono text-sm text-bone">{reference}</dd>
          </div>
          <div>
            <dt className="type-eyebrow text-[0.625rem]">Dönüş kanalı</dt>
            <dd className="mt-2 text-sm text-bone">
              {contactMethods.find((c) => c.value === values.contactMethod)?.label ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="type-eyebrow text-[0.625rem]">Tahmini yanıt</dt>
            <dd className="mt-2 text-sm text-bone">{site.booking.responseTime}</dd>
          </div>
        </dl>

        <div className="mt-9">
          <p className="type-eyebrow">Sırada ne var?</p>
          <ol className="mt-4 flex flex-col gap-3">
            {[
              "Talebinizi okuyup fikrin nasıl çalışacağını değerlendiriyorum.",
              "Tahmini seans sayısı ve fiyat aralığını yazıyorum.",
              "Uygun bulursanız tasarım görüşmesi için gün belirliyoruz.",
            ].map((line, index) => (
              <li key={line} className="flex gap-3.5 text-sm text-ash">
                <span className="font-mono text-xs text-ash-deep">{String(index + 1).padStart(2, "0")}</span>
                {line}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/calismalar"
            className="inline-flex h-12 items-center rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            Çalışmalara göz at
          </Link>
          <a
            href={whatsappLink(`Merhaba, ${reference} numaralı talebi gönderdim.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center rounded-full border border-[var(--hairline-strong)] px-6 text-sm text-bone transition-colors hover:bg-bone/[0.06]"
          >
            WhatsApp&apos;tan yaz
          </a>
        </div>
      </div>
    );
  }

  const current = bookingSteps[step];
  const isLast = step === bookingSteps.length - 1;

  return (
    <div ref={formRef} className="scroll-mt-28">
      {/* İlerleme */}
      <div className="mb-10">
        <ol className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
          {bookingSteps.map((item, index) => {
            const state = index < step ? "done" : index === step ? "current" : "todo";
            return (
              <li key={item.id} className="min-w-[5.5rem] flex-1">
                <button
                  type="button"
                  onClick={() => {
                    if (index < step) {
                      setStep(index);
                      setErrors({});
                      focusStep();
                    }
                  }}
                  disabled={index > step}
                  aria-current={state === "current" ? "step" : undefined}
                  className={cn(
                    "w-full text-left transition-opacity",
                    index < step ? "cursor-pointer hover:opacity-80" : "cursor-default",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "block h-0.5 w-full transition-colors duration-500",
                      state === "todo" ? "bg-ink-600" : state === "current" ? "bg-bone" : "bg-ember",
                    )}
                  />
                  <span
                    className={cn(
                      "mt-3 block font-mono text-[0.625rem] uppercase tracking-[0.12em]",
                      state === "todo" ? "text-ash-deep" : "text-ash",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-[0.8125rem] leading-tight",
                      state === "current" ? "text-bone" : "text-ash-dim",
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <p
        ref={headingRef}
        tabIndex={-1}
        aria-live="polite"
        className="type-eyebrow outline-none"
      >
        Adım {step + 1} / {bookingSteps.length} — {current.description}
      </p>

      <div className="mt-8 flex flex-col gap-9">
        {step === 0 ? (
          <>
            <RadioCards
              legend="Ne yaptırmak istiyorsunuz?"
              name="projectType"
              required
              options={projectTypes}
              value={values.projectType}
              onChange={(value) => set("projectType", value)}
              error={errors.projectType}
            />
            <SelectField
              label="Aklınızdaki tarz"
              hint="Emin değilseniz boş bırakın, birlikte belirleyelim."
              options={styles.map((style) => ({ value: style.slug, label: style.name }))}
              value={values.style}
              onChange={(event) => set("style", (event.target as HTMLSelectElement).value)}
              placeholder="Henüz karar vermedim"
            />
            <TextAreaField
              label="Fikrinizi anlatın"
              required
              id="idea"
              name="idea"
              maxLength={1200}
              placeholder="Ne yaptırmak istediğinizi, sizin için ne anlama geldiğini ve varsa aklınızdaki detayları yazın. Net bir fikriniz yoksa bunu da yazabilirsiniz."
              hint="Ne kadar çok bağlam verirseniz, ilk dönüşümüz o kadar isabetli olur."
              error={errors.idea}
              value={values.idea}
              onChange={(event) => set("idea", event.target.value)}
            />
          </>
        ) : null}

        {step === 1 ? (
          <>
            <SelectField
              label="Vücutta yapılacağı bölge"
              required
              id="placement"
              options={placements}
              value={values.placement}
              onChange={(event) => set("placement", (event.target as HTMLSelectElement).value)}
              error={errors.placement}
            />
            <RadioCards
              legend="Tahmini boyut"
              name="size"
              required
              columns={3}
              options={sizes}
              value={values.size}
              onChange={(value) => set("size", value)}
              error={errors.size}
              hint="Uzun kenarı düşünün. Kesin ölçüyü görüşmede birlikte belirliyoruz."
            />
            <RadioCards
              legend="Siyah – gri mi, renkli mi?"
              name="palette"
              required
              columns={3}
              options={palettes}
              value={values.palette}
              onChange={(value) => set("palette", value)}
              error={errors.palette}
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <FileDrop files={files} onChange={setFiles} />
            <TextAreaField
              label="Referans notları"
              maxLength={600}
              placeholder="Beğendiğiniz bir çalışmanın bağlantısı, Instagram gönderisi ya da tarif etmek istediğiniz bir detay."
              hint="Başka bir sanatçının işini birebir kopyalamıyorum; ondan ilham alarak size özel bir yorum çıkarıyorum."
              value={values.referenceNotes}
              onChange={(event) => set("referenceNotes", event.target.value)}
            />
          </>
        ) : null}

        {step === 3 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Tercih edilen tarih"
                type="date"
                min={minDate}
                hint={`En erken ${new Date(minDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })} — tasarım için zaman gerekiyor.`}
                value={values.preferredDate}
                onChange={(event) => set("preferredDate", event.target.value)}
              />
              <SelectField
                label="Günün hangi bölümü"
                options={timePreferences}
                value={values.timePreference}
                onChange={(event) => set("timePreference", (event.target as HTMLSelectElement).value)}
                placeholder="Fark etmez"
              />
            </div>
            <RadioCards
              legend="Bütçe aralığı"
              name="budget"
              required
              options={budgets}
              value={values.budget}
              onChange={(value) => set("budget", value)}
              error={errors.budget}
              hint="Bu bilgi, size gerçekçi bir öneri götürebilmemiz için."
            />
          </>
        ) : null}

        {step === 4 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="İsim"
                required
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                value={values.firstName}
                error={errors.firstName}
                onChange={(event) => set("firstName", event.target.value)}
              />
              <TextField
                label="Soyisim"
                required
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                value={values.lastName}
                error={errors.lastName}
                onChange={(event) => set("lastName", event.target.value)}
              />
              <TextField
                label="Telefon"
                required
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="0532 000 00 00"
                value={values.phone}
                error={errors.phone}
                onChange={(event) => set("phone", formatPhone(event.target.value))}
              />
              <TextField
                label="E-posta"
                required
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="ad@ornek.com"
                value={values.email}
                error={errors.email}
                onChange={(event) => set("email", event.target.value)}
              />
            </div>

            <RadioCards
              legend="Size nasıl dönelim?"
              name="contactMethod"
              required
              columns={3}
              options={contactMethods}
              value={values.contactMethod}
              onChange={(value) => set("contactMethod", value)}
              error={errors.contactMethod}
            />

            <RadioCards
              legend="Daha önce dövme yaptırdınız mı?"
              name="experience"
              columns={3}
              options={experienceOptions}
              value={values.experience}
              onChange={(value) => set("experience", value)}
              hint="İlk dövmenizse seansı ona göre planlıyoruz."
            />

            {/* Özet */}
            <div className="border border-[var(--hairline)] p-6">
              <p className="type-eyebrow">Özet</p>
              <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                <SummaryRow
                  label="Proje"
                  value={projectTypes.find((p) => p.value === values.projectType)?.label}
                  onEdit={() => {
                    setStep(0);
                    focusStep();
                  }}
                />
                <SummaryRow
                  label="Tarz"
                  value={styles.find((s) => s.slug === values.style)?.name ?? "Birlikte belirlenecek"}
                  onEdit={() => {
                    setStep(0);
                    focusStep();
                  }}
                />
                <SummaryRow
                  label="Bölge · ölçü"
                  value={[
                    placements.find((p) => p.value === values.placement)?.label,
                    sizes.find((s) => s.value === values.size)?.label,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  onEdit={() => {
                    setStep(1);
                    focusStep();
                  }}
                />
                <SummaryRow
                  label="Referans"
                  value={files.length ? `${files.length} görsel` : "Eklenmedi"}
                  onEdit={() => {
                    setStep(2);
                    focusStep();
                  }}
                />
                <SummaryRow
                  label="Tarih"
                  value={
                    values.preferredDate
                      ? new Date(values.preferredDate).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Esnek"
                  }
                  onEdit={() => {
                    setStep(3);
                    focusStep();
                  }}
                />
                <SummaryRow
                  label="Bütçe"
                  value={budgets.find((b) => b.value === values.budget)?.label}
                  onEdit={() => {
                    setStep(3);
                    focusStep();
                  }}
                />
              </dl>
            </div>

            <div className="flex flex-col gap-4 border-t border-[var(--hairline)] pt-7">
              <CheckboxField
                id="consent"
                checked={values.consent}
                onChange={(checked) => set("consent", checked)}
                error={errors.consent}
              >
                Talebimin değerlendirilmesi için paylaştığım bilgilerin işlenmesini kabul ediyorum ve{" "}
                <Link href="/kvkk" className="text-bone underline underline-offset-4">
                  KVKK aydınlatma metnini
                </Link>{" "}
                okudum. {site.minimumAge} yaşından büyüğüm.
              </CheckboxField>
              <CheckboxField
                id="updates"
                checked={values.updates}
                onChange={(checked) => set("updates", checked)}
              >
                Yeni çalışmalardan ve açılan randevu tarihlerinden haberdar olmak istiyorum.
              </CheckboxField>
            </div>

            {status === "error" ? (
              <div role="alert" className="border border-danger/40 bg-danger/[0.07] p-5">
                <p className="text-sm text-bone">Talep gönderilemedi.</p>
                <p className="mt-1.5 text-sm text-ash">
                  Bağlantınızı kontrol edip tekrar deneyin. Sorun sürerse{" "}
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone underline underline-offset-4"
                  >
                    WhatsApp&apos;tan
                  </a>{" "}
                  yazabilirsiniz.
                </p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {/* Gezinme */}
      <div className="mt-12 flex flex-col-reverse gap-3 border-t border-[var(--hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm transition-colors",
            step === 0 ? "pointer-events-none opacity-0" : "text-ash hover:text-bone",
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending"}
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-bone px-8 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                <span
                  aria-hidden
                  className="h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink"
                />
                Gönderiliyor
              </>
            ) : (
              <>
                Talebi Gönder
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-bone px-8 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white"
          >
            Devam
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value?: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--hairline)] pb-3">
      <div className="min-w-0">
        <dt className="type-eyebrow text-[0.5625rem]">{label}</dt>
        <dd className="mt-1.5 truncate text-sm text-bone">{value || "—"}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-xs text-ash-dim underline underline-offset-4 transition-colors hover:text-bone"
      >
        Düzenle
      </button>
    </div>
  );
}
