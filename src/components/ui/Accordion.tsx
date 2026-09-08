"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Başlangıçta açık olan öğe. */
  defaultOpen?: string;
  className?: string;
}

export default function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <div className={cn("border-t border-[var(--hairline)]", className)}>
      {items.map((item) => {
        const expanded = open === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className="border-b border-[var(--hairline)]">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors"
              >
                <span
                  className={cn(
                    "text-[1.0625rem] leading-snug transition-colors sm:text-[1.125rem]",
                    expanded ? "text-bone" : "text-ash group-hover:text-bone",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                    expanded
                      ? "border-bone bg-bone text-ink"
                      : "border-[var(--hairline-strong)] text-ash group-hover:text-bone",
                  )}
                >
                  {expanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="pb-7 pr-12"
            >
              <p className="type-body max-w-2xl">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
