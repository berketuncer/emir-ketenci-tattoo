import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "ember";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-bone text-ink hover:bg-white active:bg-bone/90 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset]",
  secondary:
    "border border-[color-mix(in_oklab,var(--color-bone)_24%,transparent)] text-bone hover:border-bone hover:bg-bone/[0.06]",
  ghost: "text-bone hover:text-white",
  ember: "bg-ember text-ink hover:bg-ember-bright",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem] gap-1.5",
  md: "h-12 px-6 text-sm gap-2",
  lg: "h-14 px-8 text-[0.9375rem] gap-2.5",
};

const baseClass =
  "inline-flex items-center justify-center rounded-full font-medium tracking-[0.01em] transition-all duration-300 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

type ButtonAsLink = CommonProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;

type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, icon, ...rest } = props;
  const classes = cn(baseClass, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorProps } = rest as ButtonAsLink;
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorProps}
        >
          {children}
          {icon}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
        {icon}
      </Link>
    );
  }

  const { ...buttonProps } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
      {icon}
    </button>
  );
}
