import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "signal" | "warn" | "muted" | "ember";
  dot?: boolean;
}

const tones = {
  default: "text-bone border-[var(--hairline-strong)]",
  signal: "text-signal border-signal/30 bg-signal/[0.07]",
  warn: "text-warn border-warn/30 bg-warn/[0.07]",
  muted: "text-ash-dim border-[var(--hairline)]",
  ember: "text-ember-bright border-ember/35 bg-ember/[0.09]",
};

const dotTones = {
  default: "bg-bone",
  signal: "bg-signal",
  warn: "bg-warn",
  muted: "bg-ash-dim",
  ember: "bg-ember-bright",
};

export default function Badge({ children, className, tone = "default", dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] leading-none",
        tones[tone],
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full animate-pulse-dot", dotTones[tone])}
        />
      ) : null}
      {children}
    </span>
  );
}
