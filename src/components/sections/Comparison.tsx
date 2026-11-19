import { Check, Minus } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { comparison } from "@/content/conversion";
import { SplitWords } from "@/components/ui/SplitWords";

export function Comparison() {
  return (
    <section id="diferenca" className="section" aria-labelledby="comparison-title">
      <div className="container-page">
        <header className="section-header section-header-center">
          <p className="section-eyebrow label" data-reveal>
            <span>03</span> A diferença
          </p>
          <h2 id="comparison-title" className="reveal-words font-display text-display-l" data-reveal>
            <SplitWords parts={["Ninguém confunde com template."]} />
          </h2>
          <p className="section-lead text-body-l text-ink-muted" data-reveal>
            Seu cliente percebe em segundos quando um site foi feito com cuidado. E confia mais em quem cuida
            dos detalhes.
          </p>
        </header>

        <div className="comparison" data-reveal>
          <div className="comparison-head" aria-hidden="true">
            <span />
            <p className="label text-ink-muted">Gerador de sites</p>
            <p className="comparison-brand">
              <Logo variant="wordmark" tone="negative" className="h-5 w-auto" title="Kodar" />
            </p>
          </div>
          <dl>
            {comparison.map((row) => (
              <div key={row.topic} className="comparison-row">
                <dt className="label text-ink-muted">{row.topic}</dt>
                <dd className="comparison-generic text-body-s text-ink-muted">
                  <Minus size={16} aria-hidden="true" />
                  <span>
                    <span className="sr-only">Gerador de sites: </span>
                    {row.generic}
                  </span>
                </dd>
                <dd className="comparison-kodar text-body-s">
                  <Check size={16} aria-hidden="true" className="text-menta-forte" />
                  <span>
                    <span className="sr-only">Kodar: </span>
                    {row.kodar}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
