"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { Check } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-none border bg-transparent px-4 py-3.5 text-[0.9375rem] text-bone placeholder:text-ash-deep transition-colors duration-300 focus:outline-none";

function FieldShell({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  className,
  counter,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
  className?: string;
  counter?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={htmlFor} className="type-eyebrow mb-3 flex items-center gap-2 text-[0.625rem]">
        {label}
        {required ? (
          <span className="text-ember" aria-hidden>
            *
          </span>
        ) : (
          <span className="text-ash-deep normal-case tracking-normal">(opsiyonel)</span>
        )}
      </label>
      {children}
      <div className="mt-2 flex items-start justify-between gap-3">
        <p
          id={`${htmlFor}-yardim`}
          className={cn("text-xs leading-relaxed", error ? "text-danger" : "text-ash-deep")}
          role={error ? "alert" : undefined}
        >
          {error ?? hint ?? ""}
        </p>
        {counter ? <span className="shrink-0 font-mono text-[0.625rem] text-ash-deep">{counter}</span> : null}
      </div>
    </div>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

export function TextField({ label, hint, error, className, required, id, ...props }: TextFieldProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} htmlFor={fieldId} className={className}>
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${fieldId}-yardim`}
        className={cn(
          controlClass,
          error
            ? "border-danger focus:border-danger"
            : "border-[var(--hairline-strong)] hover:border-bone/40 focus:border-bone",
        )}
        {...props}
      />
    </FieldShell>
  );
}

interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  maxLength?: number;
}

export function TextAreaField({
  label,
  hint,
  error,
  className,
  required,
  id,
  value,
  maxLength,
  ...props
}: TextAreaFieldProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  const length = typeof value === "string" ? value.length : 0;
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={fieldId}
      className={className}
      counter={maxLength ? `${length}/${maxLength}` : undefined}
    >
      <textarea
        id={fieldId}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${fieldId}-yardim`}
        className={cn(
          controlClass,
          "min-h-36 resize-y leading-relaxed",
          error
            ? "border-danger focus:border-danger"
            : "border-[var(--hairline-strong)] hover:border-bone/40 focus:border-bone",
        )}
        {...props}
      />
    </FieldShell>
  );
}

interface Option {
  value: string;
  label: string;
  hint?: string;
}

export function SelectField({
  label,
  hint,
  error,
  options,
  placeholder = "Seçiniz",
  required,
  id,
  className,
  ...props
}: {
  label: string;
  hint?: string;
  error?: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  id?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLSelectElement>, "className" | "required" | "id">) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} htmlFor={fieldId} className={className}>
      <div className="relative">
        <select
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${fieldId}-yardim`}
          className={cn(
            controlClass,
            "appearance-none pr-10",
            error
              ? "border-danger focus:border-danger"
              : "border-[var(--hairline-strong)] hover:border-bone/40 focus:border-bone",
          )}
          {...props}
        >
          <option value="" className="bg-ink-800">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-ink-800">
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ash">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </FieldShell>
  );
}

export function RadioCards({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  columns = 2,
  required,
}: {
  legend: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  columns?: 1 | 2 | 3;
  required?: boolean;
}) {
  const groupId = useId();
  return (
    <fieldset aria-describedby={`${groupId}-yardim`}>
      <legend className="type-eyebrow mb-3 flex items-center gap-2 text-[0.625rem]">
        {legend}
        {required ? (
          <span className="text-ember" aria-hidden>
            *
          </span>
        ) : null}
      </legend>
      <div
        className={cn(
          "grid gap-2.5",
          columns === 1 ? "grid-cols-1" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "group relative flex cursor-pointer items-start gap-3 border px-4 py-3.5 transition-colors duration-300",
                checked
                  ? "border-bone bg-bone/[0.06]"
                  : "border-[var(--hairline)] hover:border-[var(--hairline-strong)]",
                error && !value ? "border-danger/60" : "",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  checked ? "border-bone bg-bone text-ink" : "border-[var(--hairline-strong)]",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-ember-bright peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink",
                )}
              >
                {checked ? <Check className="h-3 w-3" /> : null}
              </span>
              <span className="min-w-0">
                <span className={cn("block text-[0.9375rem]", checked ? "text-bone" : "text-ash")}>
                  {option.label}
                </span>
                {option.hint ? <span className="mt-1 block text-xs text-ash-deep">{option.hint}</span> : null}
              </span>
            </label>
          );
        })}
      </div>
      <p
        id={`${groupId}-yardim`}
        className={cn("mt-2 text-xs", error ? "text-danger" : "text-ash-deep")}
        role={error ? "alert" : undefined}
      >
        {error ?? hint ?? ""}
      </p>
    </fieldset>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
  error,
  id,
  children,
}: {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  id?: string;
  children?: ReactNode;
}) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <div>
      <label htmlFor={fieldId} className="flex cursor-pointer items-start gap-3.5">
        <input
          id={fieldId}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${fieldId}-yardim`}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors",
            checked ? "border-bone bg-bone text-ink" : "border-[var(--hairline-strong)]",
            error && !checked ? "border-danger" : "",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ember-bright peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink",
          )}
        >
          {checked ? <Check className="h-3.5 w-3.5" /> : null}
        </span>
        <span className="text-[0.875rem] leading-relaxed text-ash">{children ?? label}</span>
      </label>
      <p
        id={`${fieldId}-yardim`}
        className="mt-2 pl-8.5 text-xs text-danger"
        role={error ? "alert" : undefined}
      >
        {error ?? ""}
      </p>
    </div>
  );
}
