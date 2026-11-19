import type { CSSProperties } from "react";
import { Check, FileText, MessagesSquare, PenTool, Rocket } from "lucide-react";
import { SplitWords } from "@/components/ui/SplitWords";
import { steps, type Step } from "@/content/conversion";

const icons: Record<Step["icon"], typeof Rocket> = {
  conversa: MessagesSquare,
  proposta: FileText,
  design: PenTool,
  lancamento: Rocket,
};

export function Process() {
  return (
    <section id="processo" className="section" aria-labelledby="process-title">
      <div className="container-page">
        <header className="section-header section-header-center">
          <p className="section-eyebrow label" data-reveal>
            <span>04</span> Como funciona
          </p>
          <h2 id="process-title" className="reveal-words font-display text-display-l" data-reveal>
            <SplitWords
              parts={["Da ideia ao site no ar,", { text: "em quatro etapas.", className: "text-ink-muted" }]}
            />
          </h2>
          <p className="section-lead text-body-l text-ink-muted" data-reveal>
            Um processo simples e transparente. Você sabe o que vai acontecer, quando e quanto custa, antes de
            começar.
          </p>
        </header>

        <ol className="timeline" data-reveal>
          {steps.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <li key={step.title} className="timeline-step" style={{ "--n": index } as CSSProperties}>
                <span className="timeline-node" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div className="timeline-card">
                  <span className="label text-ink-muted">Etapa {index + 1}</span>
                  <h3 className="font-display text-title">{step.title}</h3>
                  <p className="text-body-s text-ink-muted">{step.text}</p>
                  <p className="timeline-deliverable text-body-s">
                    <Check size={14} aria-hidden="true" />
                    {step.deliverable}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
