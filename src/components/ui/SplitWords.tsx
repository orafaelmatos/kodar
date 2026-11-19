import { Fragment, type CSSProperties } from "react";

type Part = string | { text: string; className?: string; breakBefore?: boolean };

/**
 * Quebra um texto em palavras para animar uma a uma (entrada do hero e títulos de seção).
 * Cada palavra recebe `--i` (ordem). O texto continua legível para leitores de tela
 * porque as palavras ficam no fluxo normal, com espaços reais entre elas.
 *
 *   <SplitWords parts={["Desenhado do zero,", { text: "até o último detalhe.", className: "text-ink-muted" }]} />
 */
export function SplitWords({ parts, start = 0 }: { parts: readonly Part[]; start?: number }) {
  let index = start;
  return (
    <>
      {parts.map((part, partIndex) => {
        const { text, className, breakBefore } = typeof part === "string" ? { text: part } : part;
        const words = text.split(/\s+/).filter(Boolean);
        return (
          <Fragment key={partIndex}>
            {breakBefore ? <br /> : partIndex > 0 ? " " : null}
            {words.map((word, wordIndex) => {
              const style = { "--i": index++ } as CSSProperties;
              return (
                <Fragment key={wordIndex}>
                  {wordIndex > 0 ? " " : null}
                  <span className="w">
                    <span className={`wi ${className ?? ""}`} style={style}>
                      {word}
                    </span>
                  </span>
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}
