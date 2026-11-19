import { ArrowUpRight, Plus } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { faq } from "@/content/faq";
import { SplitWords } from "@/components/ui/SplitWords";

export function Faq() {
  return (
    <section id="duvidas" className="section" aria-labelledby="faq-title">
      <div className="container-page faq-layout">
        <div>
          <p className="section-eyebrow label" data-reveal>
            <span>05</span> Dúvidas
          </p>
          <h2 id="faq-title" className="reveal-words font-display text-display-l" data-reveal>
            <SplitWords parts={["A gente já te adianta."]} />
          </h2>
          <p className="section-lead text-body text-ink-muted" data-reveal>
            Ficou com outra dúvida? Manda pra gente. Quem responde é quem desenvolve.
          </p>
          <a
            href={whatsappUrl("Olá, Kodar! Tenho uma dúvida sobre um projeto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link mt-6"
          >
            Perguntar no WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="faq-list" data-reveal>
          {faq.map((item) => (
            <details key={item.question} name="faq" className="faq-item group">
              <summary>
                <span className="font-display text-title">{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  <Plus size={18} />
                </span>
              </summary>
              <p className="text-body text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
