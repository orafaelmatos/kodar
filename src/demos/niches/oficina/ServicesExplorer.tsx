"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import type { ServiceArt } from "./content";
import { ServiceIllustration } from "./illustrations";

type Service = { art: ServiceArt; title: string; text: string; includes: string[]; href: string };

/**
 * Lista editorial de serviços. No computador, passar o mouse ou focar troca o painel ao lado;
 * no celular, tocar abre os detalhes dentro da própria linha.
 */
export function ServicesExplorer({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="of-services">
      <ol className="of-service-list">
        {services.map((service, index) => {
          const open = index === active;
          return (
            <li key={service.art} className="of-service" data-open={open || undefined} data-reveal>
              <button
                type="button"
                className="of-service-row"
                aria-expanded={open}
                aria-controls={`of-service-${service.art}`}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span className="of-service-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="of-service-title">{service.title}</span>
                <ArrowUpRight className="of-service-arrow" size={22} aria-hidden="true" />
              </button>
              <div id={`of-service-${service.art}`} className="of-service-body">
                <p>{service.text}</p>
                <a href={service.href} target="_blank" rel="noopener noreferrer" className="of-text-link">
                  Orçar {service.title.toLowerCase()}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </li>
          );
        })}
      </ol>

      <aside className="of-service-panel" aria-live="polite">
        <div key={current.art} className="of-service-panel-inner">
          <div className="of-service-art">
            <ServiceIllustration art={current.art} />
          </div>
          <p className="of-service-panel-index">
            {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </p>
          <h3 className="of-service-panel-title">{current.title}</h3>
          <ul>
            {current.includes.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a href={current.href} target="_blank" rel="noopener noreferrer" className="d-btn d-btn-primary">
            <WhatsAppIcon width={18} height={18} />
            Pedir orçamento
          </a>
        </div>
      </aside>
    </div>
  );
}
