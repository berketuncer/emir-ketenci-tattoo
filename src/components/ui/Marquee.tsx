import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: ReactNode[];
  duration?: number;
  className?: string;
}

/** Yatay akan şerit. İçerik iki kez basılır; ikinci kopya erişilebilirlikten gizlenir. */
export default function Marquee({ items, duration = 46, className }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
    >
      {items.map((item, index) => (
        <li key={index} className="flex shrink-0 items-center gap-10 sm:gap-16">
          <span className="type-eyebrow whitespace-nowrap text-ash">{item}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-ash-deep" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div className="flex w-max animate-marquee" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
