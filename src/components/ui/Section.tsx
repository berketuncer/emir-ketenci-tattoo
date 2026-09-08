import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Dikey boşluk yoğunluğu. */
  spacing?: "sm" | "md" | "lg";
  as?: "section" | "div" | "article";
}

const spacings = {
  sm: "py-14 sm:py-16",
  md: "py-20 sm:py-24 lg:py-28",
  lg: "py-24 sm:py-32 lg:py-40",
};

export default function Section({ id, children, className, spacing = "md", as: Tag = "section" }: SectionProps) {
  return (
    <Tag id={id} className={cn("relative", spacings[spacing], className)}>
      {children}
    </Tag>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Başlık etiketi — sayfa hiyerarşisine göre değiştirilir. */
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h3";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  as: Tag = "h2",
  size = "h2",
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="type-eyebrow mb-5 flex items-center gap-3">
            {align === "left" ? <span aria-hidden className="h-px w-8 bg-[var(--hairline-strong)]" /> : null}
            {eyebrow}
          </p>
        ) : null}
        <Tag className={cn(size === "h1" ? "type-h1" : size === "h3" ? "type-h3" : "type-h2", "text-bone")}>{title}</Tag>
        {description ? <div className="type-lead mt-5 max-w-xl">{description}</div> : null}
      </div>
      {action ? <div className={cn("shrink-0", align === "center" && "mt-2")}>{action}</div> : null}
    </Reveal>
  );
}
