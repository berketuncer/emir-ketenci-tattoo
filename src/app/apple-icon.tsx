import { ImageResponse } from "next/og";

/**
 * iOS ana ekran ikonu (180×180). Yalnızca marka mührü ve koyu zemin;
 * Apple ikonlarında şeffaflık kullanılmaz.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BONE = "#f3f0ea";
const INK = "#08080a";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: INK,
        }}
      >
        <svg width="128" height="128" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18.5"
            fill="none"
            stroke={BONE}
            strokeWidth="1.2"
            opacity="0.6"
          />
          <circle
            cx="20"
            cy="20"
            r="13"
            fill="none"
            stroke={BONE}
            strokeWidth="1"
            opacity="0.35"
          />
          <path d="M20 6.5v27" stroke={BONE} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="20" cy="20" r="3.6" fill={BONE} />
        </svg>
      </div>
    ),
    { ...size },
  );
}
