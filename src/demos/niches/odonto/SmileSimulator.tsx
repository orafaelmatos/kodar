"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Simulador ilustrativo de clareamento: um sorriso desenhado em SVG com anatomia realista
 * e uma divisória de antes/depois que o visitante arrasta. Na primeira vez que aparece,
 * a divisória se move sozinha para mostrar o efeito.
 */

const BEFORE = "rgb(214 190 140)";
const AFTER = "rgb(247 245 238)";
const CENTER = 300;

/** Linha da gengiva e borda dos dentes acompanham o arco do sorriso. */
const gumAt = (x: number) => 112 + 28 * ((x - CENTER) / 200) ** 2;
const edgeAt = (x: number) => 214 - 66 * ((x - CENTER) / 200) ** 2;

type Tooth = { x0: number; x1: number; top: number; bottom: number; depth: number; canine: boolean };

/** Meia arcada a partir do centro: incisivo central, lateral, canino, pré-molares e molar. */
const UPPER = [
  { w: 46, canine: false },
  { w: 37, canine: false },
  { w: 34, canine: true },
  { w: 30, canine: false },
  { w: 27, canine: false },
  { w: 23, canine: false },
];
const LOWER = [28, 26, 26, 25, 23, 21];

function arch(
  widths: { w: number; canine: boolean }[],
  top: (x: number) => number,
  bottom: (x: number) => number,
) {
  const teeth: Tooth[] = [];
  [-1, 1].forEach((side) => {
    let cursor = CENTER;
    widths.forEach(({ w, canine }, depth) => {
      const a = cursor;
      const b = cursor + side * w;
      cursor = b;
      const x0 = Math.min(a, b);
      const x1 = Math.max(a, b);
      const middle = (x0 + x1) / 2;
      teeth.push({ x0, x1, top: top(middle), bottom: bottom(middle), depth, canine });
    });
  });
  return teeth;
}

const upperTeeth = arch(UPPER, (x) => gumAt(x) - 4, edgeAt);
const lowerTeeth = arch(
  LOWER.map((w) => ({ w, canine: false })),
  (x) => edgeAt(x) - 6,
  () => 262,
);

function toothPath({ x0, x1, top, bottom, canine }: Tooth) {
  const r = Math.min(11, (x1 - x0) / 3);
  const tip = canine ? 4 : 0;
  const mid = (x0 + x1) / 2;
  return `M${x0 + 0.3} ${top} L${x1 - 0.3} ${top} L${x1 - 0.3} ${bottom - r} Q${x1 - 0.3} ${bottom} ${x1 - r} ${bottom} L${mid} ${bottom + tip} L${x0 + r} ${bottom} Q${x0 + 0.3} ${bottom} ${x0 + 0.3} ${bottom - r} Z`;
}

const DEPTH_SHADOW = [0, 0.04, 0.1, 0.18, 0.28, 0.4];

const MOUTH =
  "M110 140 C170 112 240 104 300 108 C360 104 430 112 490 140 C440 200 370 232 300 234 C230 232 160 200 110 140 Z";
const UPPER_LIP =
  "M92 144 C150 98 222 66 272 76 Q300 88 328 76 C378 66 450 98 508 144 L490 140 C430 112 360 104 300 108 C240 104 170 112 110 140 Z";
const LOWER_LIP =
  "M92 144 C150 236 228 276 300 276 C372 276 450 236 508 144 L490 140 C440 200 370 232 300 234 C230 232 160 200 110 140 Z";

function Teeth({ shade, id }: { shade: string; id: string }) {
  return (
    <g>
      {lowerTeeth.map((tooth, index) => (
        <g key={`${id}-l${index}`}>
          <path d={toothPath(tooth)} fill={shade} />
          <path d={toothPath(tooth)} fill="#000" opacity={0.06 + DEPTH_SHADOW[tooth.depth] * 0.6} />
        </g>
      ))}
      <path d="M90 270 Q300 290 510 270 L510 236 Q300 262 90 236 Z" fill="url(#od-gum-lower)" />
      {upperTeeth.map((tooth, index) => (
        <g key={`${id}-u${index}`}>
          <path d={toothPath(tooth)} fill={shade} />
          <path d={toothPath(tooth)} fill="url(#od-cervical)" />
          <path d={toothPath(tooth)} fill="url(#od-incisal)" />
          <path d={toothPath(tooth)} fill="url(#od-shine)" />
          <path d={toothPath(tooth)} fill="#000" opacity={DEPTH_SHADOW[tooth.depth]} />
          <path d={toothPath(tooth)} fill="none" stroke="rgb(90 60 40 / 0.12)" strokeWidth={0.8} />
        </g>
      ))}
    </g>
  );
}

function easeInOut(t: number) {
  const x = Math.min(Math.max(t, 0), 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function SmileSimulator() {
  const [value, setValue] = useState(78);
  const touched = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = box.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        // 78 → 22 → 50: mostra o "depois", depois o "antes" e para no meio.
        const tick = (now: number) => {
          if (touched.current) return;
          const t = (now - start) / 1000;
          let next = 50;
          if (t < 1.4) next = 78 - 56 * easeInOut(t / 1.4);
          else if (t < 2.6) next = 22 + 28 * easeInOut((t - 1.4) / 1.2);
          setValue(Math.round(next));
          if (t < 2.6) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.55 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  // A divisória acompanha o dedo em toda a largura da imagem (viewBox de 40 a 560).
  const split = 40 + (value / 100) * 520;

  return (
    <div ref={box} className="od-sim-card">
      <div className="od-sim-stage">
        <svg viewBox="40 40 520 260" className="od-smile" aria-hidden="true">
          <defs>
            <radialGradient id="od-skin" cx="50%" cy="45%" r="70%">
              <stop offset="0" stopColor="#ecbf9f" />
              <stop offset="0.7" stopColor="#dca283" />
              <stop offset="1" stopColor="#c98a6b" />
            </radialGradient>
            <radialGradient id="od-inner" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#5c1f29" />
              <stop offset="1" stopColor="#2c0c12" />
            </radialGradient>
            <linearGradient id="od-lip-upper" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#b0505b" />
              <stop offset="1" stopColor="#cd717b" />
            </linearGradient>
            <linearGradient id="od-lip-lower" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#d9838c" />
              <stop offset="0.6" stopColor="#c86d77" />
              <stop offset="1" stopColor="#ad535d" />
            </linearGradient>
            <linearGradient id="od-gum" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#c9606c" />
              <stop offset="1" stopColor="#e58f98" />
            </linearGradient>
            <linearGradient id="od-gum-lower" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e58f98" />
              <stop offset="1" stopColor="#c45d69" />
            </linearGradient>
            <linearGradient id="od-cervical" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#b98a4a" stopOpacity="0.32" />
              <stop offset="0.38" stopColor="#b98a4a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="od-incisal" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0.78" stopColor="#8fa7c4" stopOpacity="0" />
              <stop offset="1" stopColor="#8fa7c4" stopOpacity="0.38" />
            </linearGradient>
            <linearGradient id="od-shine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0.05" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.35" stopColor="#fff" stopOpacity="0.22" />
              <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="od-corner" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#1a0508" stopOpacity="0.85" />
              <stop offset="1" stopColor="#1a0508" stopOpacity="0" />
            </radialGradient>
            <clipPath id="od-mouth">
              <path d={MOUTH} />
            </clipPath>
            <clipPath id="od-after">
              <rect x={split} y="0" width="600" height="320" />
            </clipPath>
            <filter id="od-soft" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <rect x="40" y="40" width="520" height="260" fill="url(#od-skin)" />
          <ellipse cx="300" cy="292" rx="150" ry="14" fill="#7a3b2c" opacity="0.25" filter="url(#od-soft)" />
          <path
            d="M282 50 Q300 70 318 50"
            fill="none"
            stroke="#b97a5e"
            strokeWidth="10"
            opacity="0.25"
            filter="url(#od-soft)"
          />

          <path d={MOUTH} fill="url(#od-inner)" />
          <g clipPath="url(#od-mouth)">
            <Teeth shade={BEFORE} id="before" />
            <g clipPath="url(#od-after)">
              <Teeth shade={AFTER} id="after" />
            </g>
            <path d="M90 92 L510 92 L510 146 Q300 86 90 146 Z" fill="url(#od-gum)" />
            {upperTeeth.map((tooth, index) => {
              const x = tooth.x0 < CENTER ? tooth.x0 : tooth.x1;
              const y = gumAt(x) - 2;
              return (
                <path
                  key={index}
                  d={`M${x - 6} ${y - 2} L${x + 6} ${y - 2} L${x} ${y + 5} Z`}
                  fill="#e58f98"
                />
              );
            })}
            <ellipse cx="118" cy="146" rx="46" ry="40" fill="url(#od-corner)" />
            <ellipse cx="482" cy="146" rx="46" ry="40" fill="url(#od-corner)" />
          </g>

          <path d={UPPER_LIP} fill="url(#od-lip-upper)" />
          <path d={LOWER_LIP} fill="url(#od-lip-lower)" />
          <ellipse cx="300" cy="254" rx="74" ry="7" fill="#fff" opacity="0.28" filter="url(#od-soft)" />
          <path
            d="M240 84 Q272 76 290 86"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.14"
            strokeLinecap="round"
          />

          <line x1={split} x2={split} y1="40" y2="300" stroke="#fff" strokeWidth="2.5" />
          <g transform={`translate(${split} 170)`}>
            <circle r="19" fill="#fff" />
            <path
              d="M-6 -6 L-12 0 L-6 6 M6 -6 L12 0 L6 6"
              fill="none"
              stroke="#0b2530"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <span className="od-sim-tag od-sim-tag-before">Antes</span>
        <span className="od-sim-tag od-sim-tag-after">Depois</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          className="od-sim-range"
          aria-label="Comparar o sorriso antes e depois do clareamento"
          onChange={(event) => {
            touched.current = true;
            setValue(Number(event.target.value));
          }}
        />
      </div>
      <div className="od-sim-legend">
        <span>
          <i style={{ background: BEFORE }} /> Tom A3
        </span>
        <span className="od-sim-hint">Arraste para comparar</span>
        <span>
          <i style={{ background: AFTER }} /> Tom BL2
        </span>
      </div>
    </div>
  );
}
