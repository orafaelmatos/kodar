/**
 * Composições animadas (decorativas) dos produtos. Todas em HTML e CSS, com as cores da marca.
 * As animações ficam em globals.css (`.mock-*`) e pausam com o controle de movimento.
 */
import type { CSSProperties } from "react";
import { MousePointer2, Search, Star } from "lucide-react";

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="mock-bar">
      <span className="bg-coral" />
      <span className="bg-ink-muted/50" />
      <span className="bg-menta" />
      <p className="font-mono">{url}</p>
    </div>
  );
}

export function LandingMock() {
  return (
    <div className="mock-stage show-landing" aria-hidden="true">
      <div className="mock-window sl-window">
        <BrowserBar url="lumenodonto.com.br" />
        <div className="sl-body">
          <div className="sl-nav">
            <span className="sl-logo">
              <i />
              Lumen
            </span>
            <span>Tratamentos</span>
            <span>Equipe</span>
            <span>Contato</span>
            <span className="sl-nav-cta">Agendar</span>
          </div>
          <div className="sl-hero">
            <div className="sl-copy">
              <span className="mock-chip">Clínica em Campinas</span>
              <p className="sl-title font-display">Seu sorriso merece atenção de verdade.</p>
              <p className="sl-text">Avaliação completa e plano de tratamento no mesmo dia.</p>
              <div className="sl-actions">
                <span className="mock-cta">
                  <span className="mock-cta-pulse" />
                  Agendar pelo WhatsApp
                </span>
                <span className="sl-ghost">Ver tratamentos</span>
              </div>
              <div className="sl-proof">
                <span className="sl-stars">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} />
                  ))}
                </span>
                <b>4,9</b>
                <small>+300 avaliações</small>
              </div>
            </div>
            <div className="sl-art">
              <span className="sl-ring" />
              <span className="sl-ring sl-ring-2" />
              <span className="sl-orb" />
              <div className="sl-quote">
                <small>&ldquo;Atendimento impecável.&rdquo;</small>
                <b>Ana P.</b>
              </div>
            </div>
          </div>
          <div className="sl-logos">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <MousePointer2 className="mock-cursor" />
      </div>
      <div className="sl-phone">
        <span className="sl-phone-notch" />
        <i className="sl-phone-orb" />
        <b className="font-display">Seu sorriso merece atenção.</b>
        <span className="mock-line" />
        <span className="mock-line w-2/3" />
        <span className="sl-phone-cta">Agendar</span>
      </div>
      <div className="mock-toast">
        <span className="mock-toast-icon">&lt;</span>
        <div>
          <p>Novo contato pelo site</p>
          <small>agora · via WhatsApp</small>
        </div>
      </div>
    </div>
  );
}

const projects = [
  { name: "Casa Jardins", kind: "Residencial" },
  { name: "Edifício Aurora", kind: "Comercial" },
  { name: "Loja Matriz", kind: "Varejo" },
];

export function SiteMock() {
  return (
    <div className="mock-stage show-site" aria-hidden="true">
      <div className="mock-window ss-back ss-back-2">
        <BrowserBar url="prumoarquitetura.com.br/contato" />
      </div>
      <div className="mock-window ss-back ss-back-1">
        <BrowserBar url="prumoarquitetura.com.br/escritorio" />
      </div>
      <div className="mock-window ss-window">
        <BrowserBar url="prumoarquitetura.com.br/projetos" />
        <div className="ss-body">
          <div className="ss-nav">
            <span className="ss-logo font-display">PRUMO</span>
            <span className="is-active">Projetos</span>
            <span>Escritório</span>
            <span>Blog</span>
            <span>Contato</span>
          </div>
          <p className="ss-kicker font-mono">Arquitetura e interiores</p>
          <p className="ss-title font-display">Espaços pensados para durar.</p>
          <div className="ss-grid">
            {projects.map((project, index) => (
              <figure key={project.name} className="ss-tile" style={{ "--t": index } as CSSProperties}>
                <span className="ss-sky">
                  <i className="ss-sun" />
                  <i className="ss-building ss-b1" />
                  <i className="ss-building ss-b2" />
                  <i className="ss-building ss-b3" />
                </span>
                <figcaption>
                  <b>{project.name}</b>
                  <small>{project.kind}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <div className="mock-search ss-search">
        <span className="ss-query">
          <Search />
          escritório de arquitetura campinas
        </span>
        <p className="font-mono">prumoarquitetura.com.br</p>
        <strong>Prumo Arquitetura · Projetos residenciais</strong>
        <i className="mock-line w-11/12" />
      </div>
    </div>
  );
}

const crmColumns = [
  { title: "Novo", cards: ["Clínica Sorriso", "Studio Fit"] },
  { title: "Proposta", cards: ["Auto Center Sul", "Escola Aprender"] },
  { title: "Fechado", cards: ["Ótica Visão"] },
];

const stock = [
  ["Produto A", "128 un.", "Em estoque"],
  ["Produto B", "12 un.", "Repor"],
  ["Produto C", "64 un.", "Em estoque"],
  ["Produto D", "0 un.", "Pedido feito"],
];

const agenda = [
  [1, 1, 2],
  [2, 3, 1],
  [3, 2, 2],
  [4, 4, 1],
  [5, 1, 3],
];

const finance = [38, 52, 46, 64, 58, 76, 70, 88];

export function SystemMock() {
  const tabs = ["CRM", "Estoque", "Agenda", "Financeiro"];
  return (
    <div className="mock-stage mock-system-stage" aria-hidden="true">
      <div className="mock-window mock-system">
        <BrowserBar url="sistema.suaempresa.com.br" />
        <div className="mock-system-body">
          <nav className="mock-system-nav">
            <span className="mock-system-logo bg-menta" />
            {tabs.map((tab, index) => (
              <p key={tab} style={{ "--tab": index } as CSSProperties}>
                {tab}
              </p>
            ))}
            <span className="mock-system-indicator" />
          </nav>
          <div className="mock-system-views">
            <section className="mock-view" style={{ "--tab": 0 } as CSSProperties}>
              <header>
                <p className="font-display">Funil de vendas</p>
                <span className="mock-chip label">CRM</span>
              </header>
              <div className="mock-kanban">
                {crmColumns.map((column, columnIndex) => (
                  <div key={column.title}>
                    <small className="font-mono">{column.title}</small>
                    {column.cards.map((card) => (
                      <span key={card} className={columnIndex === 2 ? "is-won" : undefined}>
                        {card}
                        <i className="mock-line w-1/2" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </section>
            <section className="mock-view" style={{ "--tab": 1 } as CSSProperties}>
              <header>
                <p className="font-display">Estoque</p>
                <span className="mock-chip label">ERP</span>
              </header>
              <div className="mock-table">
                {stock.map(([name, amount, status]) => (
                  <div key={name}>
                    <span>{name}</span>
                    <span className="font-mono">{amount}</span>
                    <span className={status === "Repor" ? "is-alert" : "is-ok"}>{status}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="mock-view" style={{ "--tab": 2 } as CSSProperties}>
              <header>
                <p className="font-display">Agenda da semana</p>
                <span className="mock-chip label">Online</span>
              </header>
              <div className="mock-agenda">
                {["Seg", "Ter", "Qua", "Qui", "Sex"].map((day, index) => (
                  <div key={day}>
                    <small className="font-mono">{day}</small>
                    {agenda[index].map((size, slot) => (
                      <span key={slot} style={{ "--size": size } as CSSProperties} />
                    ))}
                  </div>
                ))}
              </div>
            </section>
            <section className="mock-view" style={{ "--tab": 3 } as CSSProperties}>
              <header>
                <p className="font-display">Faturamento</p>
                <span className="mock-chip label">Financeiro</span>
              </header>
              <div className="mock-bars">
                {finance.map((value, index) => (
                  <span key={index} style={{ "--value": `${value}%`, "--bar": index } as CSSProperties} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
