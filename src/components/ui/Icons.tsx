import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const ArrowRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowLeft = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const ArrowUp = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 20V5M6 11l6-6 6 6" />
  </svg>
);

export const ChevronDown = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Close = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Menu = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 7h18M3 17h18" />
  </svg>
);

export const Check = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m4 12.5 5 5L20 7" />
  </svg>
);

export const Plus = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const Star = (props: IconProps) => (
  <svg {...base(props)} fill="currentColor" stroke="none">
    <path d="M12 2.6l2.7 5.9 6.3.8-4.7 4.4 1.3 6.3L12 16.9 6.4 20l1.3-6.3L3 9.3l6.3-.8z" />
  </svg>
);

export const Phone = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z" />
  </svg>
);

export const Mail = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const MapPin = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Clock = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
);

export const Instagram = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsApp = (props: IconProps) => (
  <svg {...base(props)} strokeWidth={1.6}>
    <path d="M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8 19.3l-4.5 1.2z" />
    <path d="M9.2 8.4c.3-.6.6-.6.9-.6h.6c.2 0 .5 0 .7.6l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.2.2-.3.4-.1.7a6 6 0 0 0 2.6 2.4c.3.1.5 0 .7-.2l.6-.6c.2-.2.4-.2.6-.1l1.6.8c.4.2.5.4.5.6a2 2 0 0 1-1.4 1.6c-.6.2-1.4.2-3.4-.7a9 9 0 0 1-4-4c-.8-1.6-.7-2.5-.6-3z" />
  </svg>
);

export const Sparkle = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3.5c.7 4.3 2.2 5.8 6.5 6.5-4.3.7-5.8 2.2-6.5 6.5-.7-4.3-2.2-5.8-6.5-6.5 4.3-.7 5.8-2.2 6.5-6.5z" />
    <path d="M18.5 15.5c.3 1.9 1 2.6 2.9 2.9-1.9.3-2.6 1-2.9 2.9-.3-1.9-1-2.6-2.9-2.9 1.9-.3 2.6-1 2.9-2.9z" />
  </svg>
);

export const Shield = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3 5 6v5.5c0 4.4 3 7.7 7 9.5 4-1.8 7-5.1 7-9.5V6z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>
);

export const Upload = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 16V4M8 8l4-4 4 4" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

export const Quote = (props: IconProps) => (
  <svg {...base(props)} fill="currentColor" stroke="none">
    <path d="M9.5 5C6.5 6.6 5 9.2 5 12.7V19h6.2v-6.3H8.4c0-2.2.8-3.8 2.6-4.9zm9.5 0c-3 1.6-4.5 4.2-4.5 7.7V19H20.7v-6.3h-2.8c0-2.2.8-3.8 2.6-4.9z" />
  </svg>
);

export const Filter = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 6h18M7 12h10M10 18h4" />
  </svg>
);
