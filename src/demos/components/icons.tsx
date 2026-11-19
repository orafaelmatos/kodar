import type { SVGProps } from "react";

/** Ícones que não existem no lucide. Mesmo traço (2) e caixa 24x24. */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function ToothIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} {...base} {...props}>
      <path d="M7.5 3C5 3 3.5 5 3.5 7.6c0 2.2.8 3.6 1.4 5.2.7 1.8.8 4.4 1.4 6.4.4 1.3 1 1.8 1.6 1.8.9 0 1.3-.9 1.6-2.4.3-1.6.6-3.6 2.5-3.6s2.2 2 2.5 3.6c.3 1.5.7 2.4 1.6 2.4.6 0 1.2-.5 1.6-1.8.6-2 .7-4.6 1.4-6.4.6-1.6 1.4-3 1.4-5.2C20.5 5 19 3 16.5 3c-1.9 0-2.8 1.2-4.5 1.2S9.4 3 7.5 3Z" />
    </svg>
  );
}
