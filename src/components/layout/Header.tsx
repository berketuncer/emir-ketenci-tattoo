"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Button from "@/components/ui/Button";
import { ArrowUpRight, Close, Menu } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /**
   * Menü, açıldığı rotayla birlikte saklanır. Rota değiştiğinde `open` kendiliğinden
   * false olur; bunun için ayrı bir efekt gerekmez.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn !== null && openedOn === pathname;
  const setOpen = useCallback(
    (value: boolean | ((current: boolean) => boolean)) => {
      setOpenedOn((current) => {
        const isOpen = current !== null && current === pathname;
        const nextValue = typeof value === "function" ? value(isOpen) : value;
        return nextValue ? pathname : null;
      });
    },
    [pathname],
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü açıkken arka planı kilitle, Escape ile kapat, odağı içeride tut
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open, setOpen]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-[var(--hairline)] bg-ink/85 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500 ease-[var(--ease-out-expo)]",
              scrolled ? "h-16 lg:h-[4.5rem]" : "h-18 lg:h-22",
            )}
          >
            <Logo />

            <nav aria-label="Ana menü" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "link-underline text-[0.8125rem] tracking-[0.04em] transition-colors duration-300",
                        isActive(item.href) ? "text-bone" : "text-ash hover:text-bone",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-[0.8125rem] text-ash transition-colors hover:text-bone md:inline-flex lg:hidden xl:inline-flex"
              >
                WhatsApp
              </a>
              <Button href={site.booking.href} size="sm" className="hidden sm:inline-flex">
                {site.booking.label}
              </Button>
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobil-menu"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-bone transition-colors hover:bg-bone/10 lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü aç</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobil tam ekran menü */}
      <div
        id="mobil-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menüsü"
        hidden={!open}
        className="fixed inset-0 z-[60] lg:hidden"
      >
        <div
          className="absolute inset-0 bg-ink/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          ref={panelRef}
          className="relative flex h-dvh flex-col overflow-y-auto overscroll-contain px-5 pb-10 pt-5 sm:px-8"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-bone transition-colors hover:bg-bone/10"
            >
              <Close className="h-6 w-6" />
              <span className="sr-only">Menüyü kapat</span>
            </button>
          </div>

          <nav aria-label="Mobil ana menü" className="mt-10">
            <ul className="flex flex-col">
              {site.nav.map((item, index) => (
                <li key={item.href} className="border-b border-[var(--hairline)]">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group flex items-baseline justify-between gap-4 py-5 animate-fade-up"
                    style={{ animationDelay: `${index * 45}ms` }}
                  >
                    <span
                      className={cn(
                        "type-h3 transition-colors",
                        isActive(item.href) ? "text-bone" : "text-ash group-hover:text-bone",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="type-eyebrow shrink-0 pb-1 text-[0.625rem] text-ash-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {site.secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ash transition-colors hover:text-bone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <Button href={site.booking.href} size="lg" className="w-full" icon={<ArrowUpRight className="h-4 w-4" />}>
              {site.booking.label}
            </Button>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-ash">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                WhatsApp
              </a>
              <a href={site.social[0].href} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                {site.social[0].handle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
