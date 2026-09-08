"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Mobilde sayfanın altına sabitlenen randevu çubuğu.
 * Randevu sayfasının kendisinde gizlenir.
 */
export default function MobileBookingBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith(site.booking.href)) return null;

  return (
    <div
      className={cn(
        "no-print fixed inset-x-0 bottom-0 z-40 border-t border-[var(--hairline)] bg-ink/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-out-expo)] sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-3">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-sm text-bone"
        >
          WhatsApp
        </a>
        <Link
          href={site.booking.href}
          className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-bone text-sm font-medium text-ink"
        >
          {site.booking.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
