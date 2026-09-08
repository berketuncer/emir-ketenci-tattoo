import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Uzun metin blokları için tutarlı tipografi. */
export default function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        "[&_h2]:type-h3 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-bone",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[1.0625rem] [&_h3]:font-medium [&_h3]:text-bone",
        "[&_p]:type-body [&_p]:mb-4",
        "[&_ul]:mb-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5",
        "[&_li]:type-body [&_li]:relative [&_li]:pl-5",
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:rounded-full [&_li]:before:bg-ember",
        "[&_a]:text-bone [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-ash-deep hover:[&_a]:decoration-bone",
        "[&_strong]:text-bone [&_strong]:font-medium",
        className,
      )}
    >
      {children}
    </div>
  );
}
