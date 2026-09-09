import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Paylaşım görseli (1200×630).
 *
 * next/og Satori üzerinde çalışır: harici font ya da dosya okuma yok, yalnızca
 * satır içi stil. Birden fazla çocuğu olan her kutuya `display: flex` verilir,
 * aksi halde derleme hata verir.
 */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BONE = "#f3f0ea";
const ASH = "#9c9891";
const INK = "#08080a";
const EMBER = "#c2603a";

/** Sağdaki soyut desen — ince çizgiler ve marka mührünün büyütülmüş hâli. */
const PATTERN_X = 1010;
const PATTERN_Y = 315;

export default function OpengraphImage() {
  const rules = Array.from({ length: 13 }, (_, i) => 700 + i * 40);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: INK,
          color: BONE,
        }}
      >
        <svg
          width={size.width}
          height={size.height}
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {rules.map((x) => (
            <line
              key={x}
              x1={x}
              y1={140}
              x2={x}
              y2={486}
              stroke={BONE}
              strokeWidth="1"
              opacity="0.05"
            />
          ))}
          <circle
            cx={PATTERN_X}
            cy={PATTERN_Y}
            r="232"
            fill="none"
            stroke={BONE}
            strokeWidth="1"
            opacity="0.16"
          />
          <circle
            cx={PATTERN_X}
            cy={PATTERN_Y}
            r="158"
            fill="none"
            stroke={BONE}
            strokeWidth="1"
            opacity="0.09"
          />
          <line
            x1={PATTERN_X}
            y1={56}
            x2={PATTERN_X}
            y2={486}
            stroke={BONE}
            strokeWidth="1.4"
            opacity="0.26"
          />
          <circle cx={PATTERN_X} cy={PATTERN_Y} r="7" fill={EMBER} />
        </svg>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "70px 80px",
          }}
        >
          {/* Üst: mühür + marka adı */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width="46" height="46" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="18.5"
                fill="none"
                stroke={BONE}
                strokeWidth="1.2"
                opacity="0.5"
              />
              <circle
                cx="20"
                cy="20"
                r="13"
                fill="none"
                stroke={BONE}
                strokeWidth="1"
                opacity="0.3"
              />
              <path d="M20 6.5v27" stroke={BONE} strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="20" cy="20" r="3.6" fill={BONE} />
            </svg>
            <div
              style={{
                marginLeft: 20,
                fontSize: 21,
                letterSpacing: 7,
                color: BONE,
              }}
            >
              EMİR KETENCİ
            </div>
          </div>

          {/* Orta: başlık */}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 650 }}>
            <div style={{ display: "flex", width: 64, height: 2, backgroundColor: EMBER }} />
            <div
              style={{
                marginTop: 34,
                fontSize: 71,
                lineHeight: 1.1,
                letterSpacing: -1.6,
                color: BONE,
              }}
            >
              {site.tagline}
            </div>
            <div style={{ marginTop: 26, fontSize: 26, lineHeight: 1.4, color: ASH }}>
              Kişiye özel dövme tasarımı ve uygulama.
            </div>
          </div>

          {/* Alt: konum ve alan adı */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingTop: 26,
              borderTop: "1px solid rgba(243, 240, 234, 0.14)",
              fontSize: 22,
              color: ASH,
            }}
          >
            <div style={{ letterSpacing: 1 }}>İstanbul · Sadece randevuyla</div>
            <div style={{ letterSpacing: 1 }}>{site.domain}</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
