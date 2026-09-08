"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Close, Upload } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export interface ReferenceFile {
  id: string;
  file: File;
  url: string;
}

const MAX_FILES = 5;
const MAX_SIZE = 8 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "image/avif"];

const readableSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

export default function FileDrop({
  files,
  onChange,
}: {
  files: ReferenceFile[];
  onChange: (files: ReferenceFile[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fieldId = useId();

  // Bellek sızıntısını önlemek için önizleme adresleri serbest bırakılır
  useEffect(() => {
    return () => {
      files.forEach((item) => URL.revokeObjectURL(item.url));
    };
    // Yalnızca bileşen kaldırılırken çalışması yeterli
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming?.length) return;
      const next: ReferenceFile[] = [];
      const problems: string[] = [];

      Array.from(incoming).forEach((file) => {
        if (files.length + next.length >= MAX_FILES) {
          problems.push(`En fazla ${MAX_FILES} görsel ekleyebilirsiniz.`);
          return;
        }
        if (!ACCEPTED.includes(file.type)) {
          problems.push(`${file.name}: yalnızca görsel dosyaları yükleyebilirsiniz.`);
          return;
        }
        if (file.size > MAX_SIZE) {
          problems.push(`${file.name}: dosya 8 MB'tan büyük.`);
          return;
        }
        next.push({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          url: URL.createObjectURL(file),
        });
      });

      setError(problems.length ? problems[0] : null);
      if (next.length) onChange([...files, ...next]);
    },
    [files, onChange],
  );

  const remove = (id: string) => {
    const target = files.find((item) => item.id === id);
    if (target) URL.revokeObjectURL(target.url);
    onChange(files.filter((item) => item.id !== id));
    setError(null);
  };

  return (
    <div>
      <p className="type-eyebrow mb-3 text-[0.625rem]">
        Referans görseller <span className="text-ash-deep normal-case tracking-normal">(opsiyonel)</span>
      </p>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center border border-dashed px-6 py-10 text-center transition-colors duration-300",
          dragging ? "border-bone bg-bone/[0.05]" : "border-[var(--hairline-strong)]",
        )}
      >
        <Upload className="h-6 w-6 text-ash" />
        <p className="mt-4 text-sm text-bone">Görselleri buraya sürükleyin</p>
        <p className="mt-1.5 text-xs text-ash-deep">JPG, PNG veya WEBP · en fazla {MAX_FILES} dosya · dosya başına 8 MB</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 inline-flex h-11 items-center rounded-full border border-[var(--hairline-strong)] px-5 text-sm text-bone transition-colors hover:bg-bone/[0.06]"
        >
          Dosya seç
        </button>
        <input
          ref={inputRef}
          id={fieldId}
          type="file"
          multiple
          accept={ACCEPTED.join(",")}
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
          className="sr-only"
          aria-label="Referans görsel yükle"
        />
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-xs text-danger">
          {error}
        </p>
      ) : null}

      {files.length ? (
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {files.map((item) => (
            <li key={item.id} className="group relative overflow-hidden border border-[var(--hairline)]">
              <div className="aspect-square bg-ink-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.file.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                <span className="min-w-0 flex-1 truncate text-[0.6875rem] text-ash">{item.file.name}</span>
                <span className="shrink-0 font-mono text-[0.625rem] text-ash-deep">
                  {readableSize(item.file.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink/85 text-bone opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                <Close className="h-4 w-4" />
                <span className="sr-only">{item.file.name} dosyasını kaldır</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-ash-deep">
        Görseller yalnızca tarayıcınızda önizlenir; bu demo sürümde hiçbir yere yüklenmez.
      </p>
    </div>
  );
}
