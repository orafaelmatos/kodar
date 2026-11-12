/**
 * Logo Colchete da Kodar, desenhado em SVG inline para seguir o tema (claro/escuro)
 * pelas variáveis da marca. Regras de uso: brand/logo.md.
 *
 *   <Logo />                         horizontal (símbolo + wordmark), sobre fundo claro
 *   <Logo variant="wordmark" />      só o nome
 *   <Logo variant="symbol" />        só o símbolo (favicon, avatar, espaços pequenos)
 *   <Logo tone="negative" />         sobre fundos noite
 *
 * Tamanho: controle pela altura (ex.: className="h-8"). Mínimos: wordmark 96px de largura, símbolo 24px.
 */
type LogoProps = {
  variant?: "horizontal" | "wordmark" | "symbol";
  tone?: "default" | "negative";
  className?: string;
  title?: string;
};

const STROKE = { strokeWidth: 9, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;

function Wordmark({ ink }: { ink: string }) {
  return (
    <g {...STROKE}>
      <path d="M4.5 4.5V55.5" stroke={ink} />
      <path d="M35 24.5L19 40L35 55.5" stroke="var(--menta)" />
      <circle cx="67.5" cy="40" r="15.5" stroke={ink} />
      <circle cx="115.5" cy="40" r="15.5" stroke={ink} />
      <path d="M131 4.5V55.5" stroke={ink} />
      <circle cx="163.5" cy="40" r="15.5" stroke={ink} />
      <path d="M179 24.5V55.5" stroke={ink} />
      <path d="M196 55.5V40A15.5 15.5 0 0 1 211.5 24.5" stroke={ink} />
    </g>
  );
}

function Symbol({ tile }: { tile: string }) {
  return (
    <>
      <rect width="120" height="120" rx="28" fill={tile} />
      <g fill="none" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 30V90" stroke="var(--papel)" />
        <path d="M84 32L60 60L84 88" stroke="var(--menta)" />
      </g>
    </>
  );
}

export function Logo({ variant = "horizontal", tone = "default", className, title = "Kodar" }: LogoProps) {
  const negative = tone === "negative";
  const ink = negative ? "var(--papel)" : "var(--ink)";
  const tile = negative ? "var(--noite-claro)" : "var(--noite)";

  if (variant === "symbol") {
    return (
      <svg viewBox="0 0 120 120" role="img" aria-label={title} className={className}>
        <Symbol tile={tile} />
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <svg viewBox="0 0 216 60" role="img" aria-label={title} className={className}>
        <Wordmark ink={ink} />
      </svg>
    );
  }

  // Horizontal: símbolo de 72 + respiro de 20 + wordmark (mesma proporção dos SVGs em brand/assets/logos)
  return (
    <svg viewBox="0 0 308 72" role="img" aria-label={title} className={className}>
      <g transform="scale(0.6)">
        <Symbol tile={tile} />
      </g>
      <g transform="translate(92 6)">
        <Wordmark ink={ink} />
      </g>
    </svg>
  );
}
