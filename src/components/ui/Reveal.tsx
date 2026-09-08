"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** ms cinsinden gecikme — sıralı belirme için. */
  delay?: number;
  as?: ElementType;
  /** Görünürlük eşiği. */
  amount?: number;
}

/**
 * Kaydırma ile belirme. IntersectionObserver desteklenmiyorsa ya da kullanıcı
 * azaltılmış hareket tercih ediyorsa içerik doğrudan görünür kalır.
 */
export default function Reveal({ children, className, delay = 0, as, amount = 0.15 }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Gözlemci desteklenmiyorsa içerik hemen görünür olur.
    if (typeof IntersectionObserver === "undefined") {
      const immediate = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(immediate);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    // Güvenlik ağı: gözlemci herhangi bir nedenle tetiklenmezse (sekme arka planda,
    // programatik kaydırma, eski tarayıcı) içerik gizli kalmasın.
    const fallback = window.setTimeout(() => setRevealed(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [amount]);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      data-revealed={revealed ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
