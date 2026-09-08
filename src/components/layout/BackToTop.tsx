"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "no-print fixed bottom-24 right-5 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-ink-800/85 text-bone backdrop-blur transition-all duration-500 ease-[var(--ease-out-expo)] hover:bg-ink-700 lg:flex",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" />
      <span className="sr-only">Sayfa başına dön</span>
    </button>
  );
}
