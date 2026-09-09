"use client";

import { useEffect, useRef, useState } from "react";
import { Close, Instagram, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

/** Tek kanal WhatsApp; Instagram portfolyo için. Arama ve e-posta bilinçli olarak yok. */
const channels = [
  { label: "WhatsApp", href: whatsappLink(), Icon: WhatsApp },
  { label: "Instagram", href: site.social[0].href, Icon: Instagram },
];

/** Sağ altta duran hızlı iletişim düğmesi. */
export default function QuickContact() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="no-print fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      <ul
        id="hizli-iletisim-liste"
        className={cn(
          "flex flex-col items-end gap-2.5 transition-all duration-500 ease-[var(--ease-out-expo)]",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
        aria-hidden={!open}
      >
        {channels.map(({ label, href, Icon }, index) => (
          <li key={label} style={{ transitionDelay: `${index * 40}ms` }}>
            <a
              href={href}
              tabIndex={open ? 0 : -1}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-[var(--hairline-strong)] bg-ink-800/95 py-2.5 pl-4 pr-3 text-sm text-bone shadow-lg backdrop-blur transition-colors hover:border-bone/40 hover:bg-ink-700"
            >
              {label}
              <Icon className="h-4.5 w-4.5 text-ember-bright" />
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="hizli-iletisim-liste"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border shadow-xl transition-all duration-400 ease-[var(--ease-out-expo)]",
          open
            ? "border-[var(--hairline-strong)] bg-ink-700 text-bone"
            : "border-transparent bg-bone text-ink hover:scale-105",
        )}
      >
        {open ? <Close className="h-6 w-6" /> : <WhatsApp className="h-6 w-6" />}
        <span className="sr-only">{open ? "Hızlı iletişimi kapat" : "Hızlı iletişim seçeneklerini aç"}</span>
      </button>
    </div>
  );
}
