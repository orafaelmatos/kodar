/**
 * Ilustrações em traço técnico do nicho oficina (SVG, sem imagens externas).
 * Animações em theme.css: desenho do traço (.of-draw), escaneamento e peças em movimento.
 */
import type { CSSProperties } from "react";
import type { ServiceArt } from "./content";

const d = (index: number) => ({ "--d": index }) as CSSProperties;

/* Carro de perfil, estilo prancheta de engenharia, com pontos de diagnóstico. */
const BODY =
  "M78 266 L64 238 Q60 206 86 199 L178 188 Q236 180 304 132 Q344 106 424 102 L556 102 Q618 104 684 152 L726 178 Q862 186 924 202 Q948 208 950 230 L946 258 Q942 266 930 266 L832 266 A62 62 0 0 0 708 266 L292 266 A62 62 0 0 0 168 266 Z";

function Wheel({ cx, brake = false, index }: { cx: number; brake?: boolean; index: number }) {
  const spokes = [0, 72, 144, 216, 288].map((angle) => {
    const r = (angle * Math.PI) / 180;
    return `M${cx + Math.cos(r) * 10} ${270 + Math.sin(r) * 10} L${cx + Math.cos(r) * 33} ${270 + Math.sin(r) * 33}`;
  });
  return (
    <g>
      <circle className="of-draw" style={d(index)} cx={cx} cy={270} r={48} pathLength={1} />
      <circle className="of-draw" style={d(index + 1)} cx={cx} cy={270} r={35} pathLength={1} />
      <circle className="of-draw" style={d(index + 2)} cx={cx} cy={270} r={9} pathLength={1} />
      {spokes.map((path, spoke) => (
        <path key={spoke} className="of-draw" style={d(index + 2)} d={path} pathLength={1} />
      ))}
      {brake ? (
        <path
          className="of-draw of-accent-stroke"
          style={d(index + 3)}
          d={`M${cx + 18} ${246} A30 30 0 0 1 ${cx + 30} ${282}`}
          strokeWidth={6}
          pathLength={1}
        />
      ) : null}
    </g>
  );
}

const callouts = [
  { x: 610, y: 150, lx: 610, ly: 34, label: "Diagnóstico", anchor: "end" },
  { x: 836, y: 196, lx: 930, ly: 70, label: "Injeção", anchor: "end" },
  { x: 788, y: 252, lx: 930, ly: 344, label: "Freios", anchor: "end" },
  { x: 230, y: 214, lx: 120, ly: 64, label: "Suspensão", anchor: "start" },
] as const;

export function CarBlueprint() {
  return (
    <svg
      viewBox="0 0 1000 380"
      className="of-car"
      role="img"
      aria-label="Desenho técnico de um carro com pontos de diagnóstico"
    >
      <defs>
        <linearGradient id="of-scan" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.85" stopColor="var(--d-accent)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--d-accent)" stopOpacity="0.9" />
        </linearGradient>
        <clipPath id="of-car-clip">
          <path d={BODY} />
          <circle cx={230} cy={270} r={48} />
          <circle cx={770} cy={270} r={48} />
        </clipPath>
      </defs>

      <g className="of-car-lines">
        <line className="of-draw of-faint" style={d(0)} x1={20} x2={980} y1={322} y2={322} pathLength={1} />
        <path className="of-draw" style={d(1)} d={BODY} pathLength={1} />
        <path
          className="of-draw"
          style={d(2)}
          d="M316 156 Q350 120 426 114 L552 114 Q604 117 654 156 Z"
          pathLength={1}
        />
        <path
          className="of-draw"
          style={d(3)}
          d="M482 114 L482 156 M482 156 L486 258 M664 160 L672 252 M304 158 Q300 210 300 258"
          pathLength={1}
        />
        <path className="of-draw of-faint" style={d(3)} d="M96 214 Q500 202 930 214" pathLength={1} />
        <path
          className="of-draw"
          style={d(4)}
          d="M904 206 L944 214 L940 226 L906 220 Z M66 212 L96 206 L98 222 L68 226 Z M650 158 L672 152 L676 164 Z M420 182 L450 182 M590 180 L620 180"
          pathLength={1}
        />
        <Wheel cx={230} index={4} />
        <Wheel cx={770} index={5} brake />
        <path
          className="of-draw of-faint"
          style={d(7)}
          d="M230 344 L770 344 M230 336 L230 352 M770 336 L770 352"
          pathLength={1}
        />
      </g>

      <g clipPath="url(#of-car-clip)">
        <rect className="of-scan" x={-160} y={90} width={160} height={240} fill="url(#of-scan)" />
      </g>

      {callouts.map((callout, index) => (
        <g key={callout.label} className="of-callout" style={d(8 + index)}>
          <path d={`M${callout.x} ${callout.y} L${callout.lx} ${callout.ly}`} className="of-callout-line" />
          <circle cx={callout.x} cy={callout.y} r={10} className="of-callout-pulse" />
          <circle cx={callout.x} cy={callout.y} r={4.5} className="of-callout-dot" />
          <text
            x={callout.anchor === "start" ? callout.lx + 8 : callout.lx - 8}
            y={callout.ly + 4}
            textAnchor={callout.anchor}
            className="of-callout-label"
          >
            {callout.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* Engrenagem gerada em código (dentes em volta de um círculo). */
function gearPath(cx: number, cy: number, inner: number, outer: number, teeth: number) {
  const points: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const a0 = (i / (teeth * 2)) * Math.PI * 2;
    const a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2;
    points.push(`${cx + Math.cos(a0) * radius} ${cy + Math.sin(a0) * radius}`);
    points.push(`${cx + Math.cos(a1) * radius} ${cy + Math.sin(a1) * radius}`);
  }
  return `M${points.join(" L")} Z`;
}

export function ServiceIllustration({ art }: { art: ServiceArt }) {
  return (
    <svg viewBox="0 0 240 240" className={`of-art of-art-${art}`} aria-hidden="true">
      {art === "revisao" ? (
        <g>
          <rect x={58} y={40} width={124} height={164} rx={12} />
          <rect x={94} y={28} width={52} height={24} rx={7} className="of-art-fill" />
          {[84, 122, 160].map((y, index) => (
            <g key={y}>
              <path
                d={`M78 ${y} l9 9 l17 -19`}
                className="of-art-accent of-art-check"
                style={d(index)}
                pathLength={1}
              />
              <path d={`M116 ${y + 2} H162`} />
            </g>
          ))}
        </g>
      ) : null}
      {art === "oleo" ? (
        <g>
          <path d="M120 34 C120 34 66 104 66 142 a54 54 0 0 0 108 0 C174 104 120 34 120 34 Z" />
          <clipPath id="of-drop">
            <path d="M120 34 C120 34 66 104 66 142 a54 54 0 0 0 108 0 C174 104 120 34 120 34 Z" />
          </clipPath>
          <g clipPath="url(#of-drop)">
            <path
              className="of-art-wave of-art-accent-fill"
              d="M20 150 Q50 138 80 150 T140 150 T200 150 T260 150 V240 H20 Z"
            />
          </g>
          <path d="M98 150 a24 24 0 0 0 20 26" className="of-art-accent" />
        </g>
      ) : null}
      {art === "freios" ? (
        <g>
          <g className="of-art-spin">
            <circle cx={120} cy={120} r={82} />
            <circle cx={120} cy={120} r={34} />
            {Array.from({ length: 5 }, (_, index) => {
              const a = (index / 5) * Math.PI * 2;
              return (
                <circle key={`b${index}`} cx={120 + Math.cos(a) * 20} cy={120 + Math.sin(a) * 20} r={4} />
              );
            })}
            {Array.from({ length: 14 }, (_, index) => {
              const a = (index / 14) * Math.PI * 2;
              return (
                <circle key={`v${index}`} cx={120 + Math.cos(a) * 60} cy={120 + Math.sin(a) * 60} r={5} />
              );
            })}
          </g>
          <path
            d="M150 44 A82 82 0 0 1 198 98"
            className="of-art-accent"
            strokeWidth={16}
            strokeLinecap="round"
          />
        </g>
      ) : null}
      {art === "suspensao" ? (
        <g>
          <circle cx={120} cy={30} r={12} />
          <rect x={110} y={42} width={20} height={70} rx={4} />
          <g className="of-art-spring">
            <path
              d="M84 70 L156 84 L84 98 L156 112 L84 126 L156 140 L84 154 L156 168 L84 182"
              className="of-art-accent"
              strokeLinejoin="round"
            />
          </g>
          <rect x={100} y={112} width={40} height={80} rx={6} />
          <circle cx={120} cy={210} r={12} />
        </g>
      ) : null}
      {art === "diagnostico" ? (
        <g>
          <rect x={46} y={44} width={148} height={116} rx={16} />
          <rect x={60} y={58} width={120} height={60} rx={6} className="of-art-fill" />
          <path
            className="of-art-accent of-art-pulse"
            d="M66 92 H92 L100 72 L112 110 L122 82 L130 92 H174"
            pathLength={1}
          />
          <circle cx={92} cy={138} r={7} />
          <circle cx={120} cy={138} r={7} />
          <circle cx={148} cy={138} r={7} />
          <path d="M120 160 V188 Q120 204 136 204 H170" />
          <rect x={170} y={192} width={30} height={24} rx={4} />
        </g>
      ) : null}
      {art === "manutencao" ? (
        <g>
          <g className="of-art-spin-slow">
            <path d={gearPath(98, 104, 50, 64, 12)} />
            <circle cx={98} cy={104} r={20} />
          </g>
          <g className="of-art-spin-reverse">
            <path d={gearPath(172, 170, 24, 34, 8)} className="of-art-accent" />
            <circle cx={172} cy={170} r={9} className="of-art-accent" />
          </g>
        </g>
      ) : null}
    </svg>
  );
}
