import { ArrowUpRight } from "lucide-react";
import { Chevrons } from "@/components/brand/Chevrons";
import { site, whatsappUrl } from "@/config/site";

const steps = [
  {
    title: "A gente escuta.",
    text: "Você conta o desafio. A gente entende a rotina, faz perguntas e encontra o ponto de partida.",
  },
  {
    title: "O caminho fica claro.",
    text: "Solução, etapas, prazo e investimento. Tudo combinado antes de começar.",
  },
  {
    title: "Você vê acontecer.",
    text: "O projeto ganha forma com entregas para você acompanhar, testar e participar.",
  },
  {
    title: "Sua ideia entra em movimento.",
    text: "A gente coloca no ar, orienta no uso e combina os próximos passos de suporte e evolução.",
  },
];

export function About() {
  return (
    <section id="sobre" className="about-section bg-surface text-ink" aria-labelledby="about-title">
      <div className="experience-container">
        <div className="about-heading">
          <p className="section-index label" data-reveal>
            03 / O lado humano do código
          </p>
          <h2 id="about-title" className="font-display text-display-l" data-reveal>
            Prazer.
            <br />
            Tem gente aqui.
          </h2>
        </div>
        <div className="about-story">
          <div className="founder-signature" data-reveal>
            <span className="founder-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <p className="font-display text-title">{site.founder}</p>
            <p className="mt-2 text-body-s text-ink-muted">
              Fundador da Kodar.
              <br />
              Do primeiro oi à última linha de código.
            </p>
          </div>
          <div data-reveal>
            <p className="about-lead font-display text-heading">
              Seu projeto tem nome.
              <br />
              Quem desenvolve também.
            </p>
            <p className="mt-6 text-body-l text-ink-muted">
              A Kodar nasceu para aproximar quem tem um desafio de quem sabe construir a solução. Você fala
              direto com quem desenvolve, participa das escolhas e entende o que está acontecendo.
            </p>
            <p className="mt-4 text-body text-ink-muted">
              Kodar vem de “codar”. É o nosso jeito de transformar uma boa conversa em tecnologia que funciona
              no seu dia a dia.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="service-contact mt-6 text-body-s"
            >
              Vamos nos conhecer
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="process-heading" data-reveal>
          <p className="label text-ink-muted">Da conversa à entrega</p>
          <p className="text-body-s text-ink-muted">Você faz parte de cada etapa.</p>
        </div>
        <ol className="process-rail">
          {steps.map((step, index) => (
            <li key={step.title} data-reveal>
              <span className="process-number label">0{index + 1}</span>
              <h3 className="font-display text-title">{step.title}</h3>
              <p className="mt-4 text-body-s text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="about-closer bg-noite text-papel" data-reveal>
          <p className="font-display text-heading">
            Antes do código,
            <br />a gente entende você.
          </p>
          <Chevrons count={3} className="about-chevrons" />
        </div>
      </div>
    </section>
  );
}
