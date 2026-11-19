import type { CSSProperties, ReactNode } from "react";
import {
  BarChart3,
  Gauge,
  MessageCircle,
  MousePointerClick,
  Search,
  ShieldCheck,
  Star,
  UserCheck,
} from "lucide-react";
import { SplitWords } from "@/components/ui/SplitWords";
import { principles, type Principle } from "@/content/conversion";

const funnel = [
  { icon: MousePointerClick, title: "Visita", text: "Chega pelo Google, anúncio ou indicação" },
  { icon: Gauge, title: "Interesse", text: "Entende a oferta em segundos" },
  { icon: ShieldCheck, title: "Confiança", text: "Vê provas e tira as dúvidas" },
  { icon: UserCheck, title: "Contato", text: "Chama no WhatsApp ou preenche o formulário" },
];

/* Mini animações (decorativas) de cada princípio. CSS em globals.css (`.vig-*`). */
const vignettes: Record<Principle["id"], ReactNode> = {
  promessa: (
    <div className="vig vig-promessa">
      <svg viewBox="0 0 44 44" className="vig-timer">
        <circle cx="22" cy="22" r="19" />
        <circle cx="22" cy="22" r="19" pathLength={100} />
      </svg>
      <div className="vig-headline">
        <i />
        <i />
        <i />
      </div>
    </div>
  ),
  acao: (
    <div className="vig vig-acao">
      <span className="vig-bubble">Olá! Quero um orçamento.</span>
      <span className="vig-wa">
        <MessageCircle />
      </span>
    </div>
  ),
  prova: (
    <div className="vig vig-prova">
      <span className="vig-stars">
        {[0, 1, 2, 3, 4].map((star) => (
          <Star key={star} style={{ "--s": star } as CSSProperties} />
        ))}
      </span>
      <span className="vig-quote">&ldquo;Recomendo de olhos fechados.&rdquo;</span>
    </div>
  ),
  velocidade: (
    <div className="vig vig-velocidade">
      <svg viewBox="0 0 100 56" className="vig-gauge">
        <path d="M8 50a42 42 0 0 1 84 0" pathLength={100} />
        <path d="M8 50a42 42 0 0 1 84 0" pathLength={100} />
      </svg>
      <span className="vig-needle" />
      <span className="vig-speed label">Rápido</span>
    </div>
  ),
  google: (
    <div className="vig vig-google">
      <span className="vig-search">
        <Search />
        <span className="vig-typing">site para clínica perto de mim</span>
      </span>
      <span className="vig-result">
        <b>1</b>
        <span>
          <small className="font-mono">suaempresa.com.br</small>
          Sua Empresa · Agende online
        </span>
      </span>
    </div>
  ),
  medicao: (
    <div className="vig vig-medicao">
      <span className="vig-chart-head">
        <BarChart3 />
        Contatos por origem
      </span>
      <span className="vig-bars">
        {[38, 56, 44, 72, 64, 90].map((value, index) => (
          <i key={index} style={{ "--v": `${value}%`, "--b": index } as CSSProperties} />
        ))}
      </span>
    </div>
  ),
};

export function Conversion() {
  return (
    <section id="conversao" className="section" aria-labelledby="conversion-title">
      <div className="container-page">
        <header className="section-header section-header-center">
          <p className="section-eyebrow label" data-reveal>
            <span>02</span> Por que converte
          </p>
          <h2 id="conversion-title" className="reveal-words font-display text-display-l" data-reveal>
            <SplitWords
              parts={[
                "Bonito é o mínimo.",
                { text: "O site precisa vender.", className: "text-menta-forte" },
              ]}
            />
          </h2>
          <p className="section-lead text-body-l text-ink-muted" data-reveal>
            No fim, o que você quer é cliente novo. Cada parte da página leva o visitante para o próximo
            passo, até ele falar com você.
          </p>
        </header>

        <ol className="funnel" data-reveal aria-label="Caminho do visitante até virar contato">
          {funnel.map(({ icon: Icon, title, text }, index) => (
            <li key={title} style={{ "--f": index } as CSSProperties}>
              <span className="funnel-icon">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="funnel-title font-display">{title}</span>
              <span className="funnel-text text-body-s text-ink-muted">{text}</span>
            </li>
          ))}
        </ol>

        <ul className="principles">
          {principles.map((principle, index) => (
            <li
              key={principle.id}
              className="principle"
              data-reveal
              style={{ transitionDelay: `${(index % 3) * 80}ms` }}
            >
              <div className="principle-visual" aria-hidden="true">
                {vignettes[principle.id]}
              </div>
              <div className="principle-copy">
                <span className="label text-menta-forte">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-title">{principle.title}</h3>
                <p className="text-body-s text-ink-muted">{principle.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
