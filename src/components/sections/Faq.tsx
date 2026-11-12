import { ArrowUpRight, Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { whatsappUrl } from "@/config/site";
import { faq } from "@/content/faq";

export function Faq() {
  return (
    <Section id="duvidas" aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="mb-4 label text-menta-forte">Sem complicação</p>
          <h2 id="faq-title" className="font-display text-heading md:text-display-l">
            A gente já
            <br />
            te adianta.
          </h2>
          <p className="mt-6 max-w-xs text-body text-ink-muted">
            Ficou com outra dúvida?
            <br />A gente conversa sobre ela.
          </p>
          <a
            href={whatsappUrl("Olá, Kodar! Tenho uma dúvida sobre um projeto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-12 items-center gap-2 text-body-s font-semibold text-menta-forte"
          >
            Perguntar no WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="border-t border-line">
          {faq.map((item) => (
            <details key={item.question} name="faq" className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 text-body font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  size={20}
                  className="shrink-0 text-menta-forte transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-xl pr-6 pb-6 text-body text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
