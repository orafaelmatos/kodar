"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { services, type Service } from "@/content/services";
import { whatsappUrl } from "@/config/site";

const titles: Record<Service["id"], string> = {
  sites: "Sites",
  sistemas: "Sistemas",
  automacao: "Automação",
  ia: "IA aplicada",
};
const captions: Record<Service["id"], string> = {
  sites: "Sua presença. Seu jeito.",
  sistemas: "Tudo conversa. Tudo funciona.",
  automacao: "Mais tempo para o que importa.",
  ia: "Informação que vira resposta.",
};

function ServiceArt({ id }: { id: Service["id"] }) {
  return (
    <div className={`service-art service-art--${id}`} aria-hidden="true">
      <span className="art-corner art-corner--tl" />
      <span className="art-corner art-corner--br" />
      {id === "sites" && (
        <div className="site-composition">
          <div className="site-plane site-plane--back" />
          <div className="site-plane site-plane--middle" />
          <div className="site-plane site-plane--front">
            <div className="sample-header">
              <span className="label">Sua marca.</span>
              <span />
              <span />
            </div>
            <div className="sample-body">
              <span className="label">Presença digital</span>
              <p className="font-display text-heading">
                Uma presença
                <br />à sua altura.
              </p>
              <div className="sample-link text-body-s">
                Vamos conversar <ArrowUpRight size={16} />
              </div>
            </div>
            <span className="sample-orbit" />
          </div>
        </div>
      )}
      {id === "sistemas" && (
        <div className="system-composition">
          <div className="system-grid">
            {Array.from({ length: 16 }, (_, index) => (
              <span
                key={index}
                className={index % 5 === 0 ? "system-cell is-connected" : "system-cell"}
                style={{ "--cell-index": index } as CSSProperties}
              >
                <span className="label">{String(index + 1).padStart(2, "0")}</span>
              </span>
            ))}
          </div>
          <p className="system-caption label">Cada parte no seu lugar.</p>
        </div>
      )}
      {id === "automacao" && (
        <div className="automation-composition">
          <div className="orbit-path" />
          <div className="orbit-path orbit-path--second" />
          <span className="orbit-satellite" />
          <span className="orbit-satellite orbit-satellite--second" />
          <div className="orbit-center font-display text-heading">
            Seu tempo.
            <br />
            De volta.
          </div>
        </div>
      )}
      {id === "ia" && (
        <div className="intelligence-composition">
          <div className="voice-wave">
            {Array.from({ length: 32 }, (_, index) => (
              <span
                key={index}
                style={
                  {
                    "--bar-index": index,
                    "--bar-height": `${18 + Math.sin(index * 0.6) ** 2 * 75}%`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <p className="font-display text-heading">
            Uma boa pergunta.
            <br />
            Uma resposta útil.
          </p>
        </div>
      )}
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState<Service["id"]>("sites");
  const selected = services.find((service) => service.id === active)!;
  return (
    <section id="servicos" className="services-section bg-surface text-ink" aria-labelledby="services-title">
      <div className="experience-container">
        <div className="manifesto-block">
          <p className="section-index label" data-reveal>
            01 / O ponto de partida
          </p>
          <div>
            <h2 id="services-title" className="manifesto-title font-display text-display-l" data-word-reveal>
              {"Seu negócio é único. A tecnologia também deveria ser.".split(" ").map((word, index) => (
                <span key={index} data-word>
                  {word}{" "}
                </span>
              ))}
            </h2>
            <p className="manifesto-description text-body-l text-ink-muted" data-reveal>
              A gente entende o que está travando o seu próximo passo. Depois, desenha e desenvolve o que faz
              sentido para você.
            </p>
          </div>
        </div>
        <div className="services-layout" data-reveal>
          <div className="service-list">
            <p className="service-list-label label text-ink-muted">O que você quer transformar?</p>
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-entry ${active === service.id ? "service-entry--active" : ""}`}
              >
                <h3>
                  <button
                    type="button"
                    className="service-trigger"
                    aria-expanded={active === service.id}
                    aria-controls={`service-detail-${service.id}`}
                    onClick={() => setActive(service.id)}
                  >
                    <span className="service-number label">/{service.number}</span>
                    <span className="font-display text-display-l">{titles[service.id]}</span>
                    <Plus size={22} className="service-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`service-detail-${service.id}`}
                  hidden={active !== service.id}
                  className="service-detail"
                >
                  <p className="text-body text-ink-muted">{service.description}</p>
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature} className="text-body-s">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappUrl(service.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-contact text-body-s"
                  >
                    Conversar sobre {titles[service.id]}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="service-stage bg-noite text-papel">
            <div className="service-stage-header label">
              <span>Desenhado para você</span>
              <span>{selected.number} / 04</span>
            </div>
            <div key={active} className="service-art-transition">
              <ServiceArt id={active} />
            </div>
            <div className="service-stage-footer">
              <p className="font-display text-title">{captions[active]}</p>
              <span className="label">Possibilidades, em movimento.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
