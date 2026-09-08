import Image from "next/image";
import type { AspectRatio } from "@/data/types";
import { cn } from "@/lib/utils";

/** Oranlar, üretilen görsellerin gerçek piksel ölçüleriyle birebir aynıdır. */
export const ratioSize: Record<AspectRatio, { w: number; h: number; css: string }> = {
  square: { w: 1000, h: 1000, css: "1 / 1" },
  portrait: { w: 880, h: 1100, css: "4 / 5" },
  tall: { w: 760, h: 1140, css: "2 / 3" },
  landscape: { w: 1280, h: 854, css: "3 / 2" },
};

interface MediaProps {
  src: string;
  alt: string;
  ratio?: AspectRatio;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Tek görsel bileşeni.
 *
 * Üretilen görseller vektörel (SVG) olduğu için doğrudan <img> ile servis edilir:
 * her ekran yoğunluğunda nettir, ayrıca optimizasyon adımına gerek yoktur.
 * İleride raster (jpg/webp) görseller geldiğinde aynı bileşen next/image'a devreder;
 * çağıran taraf değişmez.
 *
 * Her iki durumda da genişlik/yükseklik verildiği için yerleşim kayması (CLS) olmaz.
 */
export default function Media({
  src,
  alt,
  ratio = "portrait",
  className,
  imgClassName,
  priority = false,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw",
}: MediaProps) {
  const size = ratioSize[ratio];
  const isVector = src.endsWith(".svg");

  return (
    <div
      className={cn("media-frame", className)}
      style={{ aspectRatio: size.css }}
    >
      {isVector ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={size.w}
          height={size.h}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size.w}
          height={size.h}
          priority={priority}
          sizes={sizes}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
