import type { CSSProperties } from "react";
import { Barlow, Barlow_Condensed } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  Car,
  CheckCheck,
  CircleCheck,
  Clock,
  MapPin,
  Phone,
  ScanLine,
  Wrench,
} from "lucide-react";
import { Logo as KodarLogo } from "@/components/brand/Logo";
import { SplitWords } from "@/components/ui/SplitWords";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/config/site";
import { CountUp } from "../../components/CountUp";
import { DemoHeader } from "../../components/DemoHeader";
import { KodarBar } from "../../components/KodarBar";
import { WhatsAppFab } from "../../components/WhatsAppFab";
import { DemoFaq, SectionHead, Stars, delay } from "../../components/blocks";
import { InstagramIcon } from "../../components/icons";
import { clientWhatsapp, displayPhone, mapsUrl } from "../../utils";
import type { DemoClient } from "../../types";
import { oficinaContent } from "./content";
import { CarBlueprint, ServiceIllustration } from "./illustrations";
import { ServicesExplorer } from "./ServicesExplorer";
import "./theme.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oficina-display",
  display: "swap",
});
const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oficina-body",
  display: "swap",
});

function Mark() {
  return (
    <span className="of-mark" aria-hidden="true">
      <Wrench size={18} strokeWidth={2.4} />
    </span>
  );
}

/* Ordem de serviço do hero: mostra, de forma concreta, como a oficina trabalha. */
function OrderTicket() {
  const items = [
    { label: "Óleo e filtro", status: "Trocado" },
    { label: "Pastilhas dianteiras", status: "Trocado" },
    { label: "Suspensão", status: "Revisado" },
    { label: "Luz da injeção", status: "Corrigido" },
  ];
  return (
    <div className="of-ticket" aria-hidden="true">
      <div className="of-ticket-head">
        <span>Ordem de serviço</span>
        <span className="of-mono">#0427</span>
      </div>
      <div className="of-ticket-car">
        <span className="of-plate">
          <small>BRASIL</small>
          BRA2E19
        </span>
        <span>
          <b>Hatch 1.0 · 2019</b>
          <small>Revisão dos 60.000 km</small>
        </span>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item.label} style={{ "--i": index } as CSSProperties}>
            <CircleCheck size={16} />
            <span>{item.label}</span>
            <small>{item.status}</small>
          </li>
        ))}
      </ul>
      <div className="of-ticket-foot">
        <span className="of-status">
          <i />
          Pronto para retirada
        </span>
        <span className="of-mono">Hoje · 17h</span>
      </div>
    </div>
  );
}

/* Relatório de diagnóstico enviado ao cliente. */
function DiagnosisReport() {
  const codes = [
    { code: "P0301", text: "Falha de ignição · cilindro 1", level: "urgente", tag: "Urgente" },
    { code: "P0171", text: "Mistura pobre · banco 1", level: "atencao", tag: "Atenção" },
    { code: "FREIO", text: "Pastilhas dianteiras · 3 mm", level: "atencao", tag: "Trocar em breve" },
    { code: "BAT", text: "Bateria · 12,6 V", level: "ok", tag: "OK" },
  ];
  return (
    <div className="of-report" aria-hidden="true">
      <div className="of-report-head">
        <span>
          <ScanLine size={18} />
          Relatório de diagnóstico
        </span>
        <span className="of-plate of-plate-sm">
          <small>BRASIL</small>
          BRA2E19
        </span>
      </div>
      <ul className="of-codes">
        {codes.map((row, index) => (
          <li key={row.code} style={delay(index, 120)}>
            <span className="of-mono">{row.code}</span>
            <span>{row.text}</span>
            <span className={`of-level of-level-${row.level}`}>{row.tag}</span>
          </li>
        ))}
      </ul>
      <div className="of-photos">
        <figure>
          <ServiceIllustration art="freios" />
          <figcaption>Foto · pastilha atual</figcaption>
        </figure>
        <figure>
          <ServiceIllustration art="diagnostico" />
          <figcaption>Leitura do scanner</figcaption>
        </figure>
      </div>
      <div className="of-chat">
        <p className="of-bubble of-bubble-in">
          Segue o diagnóstico com as fotos. Posso seguir com as velas e as pastilhas?
        </p>
        <p className="of-bubble of-bubble-out">
          Pode seguir, obrigado!
          <CheckCheck size={14} />
        </p>
        <span className="of-approved">
          <CircleCheck size={14} />
          Orçamento aprovado pelo cliente
        </span>
      </div>
    </div>
  );
}

export function OficinaTemplate({ client }: { client: DemoClient }) {
  const c = oficinaContent(client);
  const quote = clientWhatsapp(client, c.quote);

  return (
    <div className={`demo demo-oficina ${display.variable} ${body.variable}`}>
      <DemoHeader
        client={client}
        logo={<Mark />}
        nav={c.nav}
        ctaLabel="Solicitar orçamento"
        ctaMessage={c.quote}
      />

      <main>
        {/* Hero */}
        <section id="inicio" className="of-hero">
          <div className="of-grid-lines" aria-hidden="true" />
          <div className="d-container of-hero-top">
            <div className="of-hero-copy">
              <p className="of-label of-in" style={{ "--j": 0 } as CSSProperties}>
                <span className="of-label-dot" />
                {c.hero.label}
              </p>
              <h1 className="of-h1">
                <SplitWords
                  parts={c.hero.title.map((text, index) => ({
                    text,
                    breakBefore: index > 0,
                    className:
                      index === c.hero.title.length - 1 && c.hero.title.length > 1 ? "of-accent" : undefined,
                  }))}
                />
              </h1>
              <p className="of-hero-text of-in" style={{ "--j": 1 } as CSSProperties}>
                {c.hero.text}
              </p>
              <div className="of-hero-actions of-in" style={{ "--j": 2 } as CSSProperties}>
                <a href={quote} target="_blank" rel="noopener noreferrer" className="d-btn d-btn-primary">
                  <WhatsAppIcon width={18} height={18} />
                  {c.hero.cta}
                </a>
                <a href="#servicos" className="of-text-link">
                  Ver serviços <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
              <p className="of-micro of-in" style={{ "--j": 3 } as CSSProperties}>
                {client.rating ? <Stars size={13} /> : <CircleCheck size={14} aria-hidden="true" />}
                <span>
                  <b>{c.hero.proof}.</b> {c.hero.micro}
                </span>
              </p>
            </div>
            <div className="of-hero-side of-in" style={{ "--j": 2 } as CSSProperties}>
              <OrderTicket />
            </div>
          </div>
          <div className="d-container of-hero-visual">
            {client.photos?.hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={client.photos.hero}
                alt={client.photos.heroAlt ?? `Oficina ${client.name}`}
                className="of-hero-photo"
                width={1600}
                height={900}
                fetchPriority="high"
                decoding="async"
              />
            ) : (
              <CarBlueprint />
            )}
          </div>
        </section>

        {/* Faixa de confiança */}
        <section className="of-trust" aria-label="Por que confiar">
          <div className="d-container of-trust-grid">
            {c.trust.numbers.map((item) => (
              <div key={item.label} className="of-trust-item" data-reveal>
                <strong>
                  <CountUp value={item.value} decimals={item.decimals} suffix={item.suffix} />
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
            {c.trust.qualities.map((item, index) => (
              <div key={item.title} className="of-trust-item" data-reveal style={delay(index)}>
                <strong>{item.title}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="d-section of-light">
          <div className="d-container">
            <div className="of-split-head">
              <SectionHead eyebrow={c.services.eyebrow} title={c.services.title} accent={c.services.accent} />
              <p className="d-lead" data-reveal>
                {c.services.text}
              </p>
            </div>
            <ServicesExplorer
              services={c.services.items.map((item) => ({
                ...item,
                href: clientWhatsapp(client, c.services.message(item.title)),
              }))}
            />
          </div>
        </section>

        {/* Por que escolher */}
        <section id="sobre" className="d-section of-why">
          <div className="d-container of-why-grid">
            <div>
              <p className="d-eyebrow" data-reveal>
                {c.why.eyebrow}
              </p>
              <h2 className="of-statement reveal-words" data-reveal>
                <SplitWords parts={[c.why.statement]} />
              </h2>
              <p className="d-lead" data-reveal>
                {c.why.text}
              </p>
            </div>
            <ol className="of-reasons">
              {c.why.reasons.map((reason, index) => (
                <li key={reason.title} data-reveal style={delay(index)}>
                  <span className="of-reason-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Processo */}
        <section className="d-section of-process">
          <div className="d-container">
            <SectionHead eyebrow={c.steps.eyebrow} title={c.steps.title} accent={c.steps.accent} />
            <div className="of-road-wrap" data-reveal>
              <ol className="of-steps">
                {c.steps.items.map((step, index) => (
                  <li key={step.title} style={{ "--n": index } as CSSProperties}>
                    <span className="of-step-number">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
              <div className="of-road" aria-hidden="true">
                <span className="of-road-lane" />
                {c.steps.items.map((step, index) => (
                  <span key={step.title} className="of-road-pin" style={{ "--n": index } as CSSProperties} />
                ))}
                <span className="of-road-car">
                  <Car size={26} />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnóstico e transparência */}
        <section className="d-section of-light of-diagnosis-section">
          <div className="d-container">
            <div className="of-diagnosis" data-reveal>
              <div className="of-diagnosis-copy">
                <SectionHead
                  eyebrow={c.diagnosis.eyebrow}
                  title={c.diagnosis.title}
                  accent={c.diagnosis.accent}
                  text={c.diagnosis.text}
                />
                <ul className="of-points">
                  {c.diagnosis.points.map((point) => (
                    <li key={point}>
                      <CircleCheck size={18} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={clientWhatsapp(client, c.diagnosis.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-btn d-btn-primary"
                >
                  <WhatsAppIcon width={18} height={18} />
                  {c.diagnosis.cta}
                </a>
              </div>
              <DiagnosisReport />
            </div>
          </div>
        </section>

        {/* Avaliações */}
        <section id="avaliacoes" className="d-section of-light of-reviews-section">
          <div className="d-container of-reviews">
            <div className="of-reviews-side">
              <SectionHead
                eyebrow={c.reviews.eyebrow}
                title={c.reviews.title}
                accent={c.reviews.accent}
                text={c.reviews.text}
              />
              {client.rating ? (
                <div className="of-rating" data-reveal>
                  <strong>{client.rating.score.toLocaleString("pt-BR")}</strong>
                  <span>
                    <Stars size={18} />
                    {client.rating.count} avaliações no Google
                  </span>
                </div>
              ) : null}
            </div>
            <div className="of-quotes">
              {c.reviews.items.slice(0, 3).map((review, index) => (
                <figure
                  key={review.name}
                  className={index === 0 ? "of-quote of-quote-main" : "of-quote"}
                  data-reveal
                  style={delay(index)}
                >
                  <Stars size={index === 0 ? 18 : 14} />
                  <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
                  <figcaption>{review.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Dúvidas */}
        <section id="duvidas" className="d-section of-light of-faq-section">
          <div className="d-container of-faq">
            <div>
              <SectionHead eyebrow="Dúvidas" title="Antes de trazer" accent="o seu carro." />
              <div className="of-help" data-reveal>
                <p>Não achou a sua dúvida? Manda pra gente.</p>
                <a href={quote} target="_blank" rel="noopener noreferrer" className="of-text-link">
                  Perguntar no WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <DemoFaq items={c.faq} />
          </div>
        </section>

        {/* Chamada final */}
        <section className="of-cta">
          <div className="d-container of-cta-inner">
            <h2 className="of-cta-title reveal-words" data-reveal>
              <SplitWords
                parts={[
                  ...c.cta.title.map((text, index) => ({ text, breakBefore: index > 0 })),
                  { text: c.cta.accent, breakBefore: true, className: "of-cta-accent" },
                ]}
              />
            </h2>
            <div className="of-cta-side" data-reveal>
              <p>{c.cta.text}</p>
              <a
                href={clientWhatsapp(client, c.cta.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="d-btn of-btn-dark"
              >
                <WhatsAppIcon width={18} height={18} />
                {c.cta.button}
              </a>
              <small>{c.cta.micro}</small>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer id="contato" className="of-footer">
        <div className="d-container">
          <div className="of-footer-grid">
            <div className="of-footer-brand">
              <span className="d-logo">
                <Mark />
                <span>{client.shortName ?? client.name}</span>
              </span>
              <p>Oficina mecânica em {client.city}. Orçamento com fotos pelo WhatsApp e prazo combinado.</p>
              <a
                href={quote}
                target="_blank"
                rel="noopener noreferrer"
                className="d-btn d-btn-primary d-btn-sm"
              >
                <WhatsAppIcon width={16} height={16} />
                Solicitar orçamento
              </a>
            </div>
            <div>
              <h3>
                <MapPin size={16} aria-hidden="true" />
                Endereço
              </h3>
              <p>{client.address ?? `${client.city} - ${client.state}`}</p>
              <a href={mapsUrl(client)} target="_blank" rel="noopener noreferrer" className="of-text-link">
                Como chegar <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
            {client.hours?.length ? (
              <div>
                <h3>
                  <Clock size={16} aria-hidden="true" />
                  Horário
                </h3>
                {client.hours.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}
            <div>
              <h3>
                <Phone size={16} aria-hidden="true" />
                Contato
              </h3>
              <p>
                <a href={quote} target="_blank" rel="noopener noreferrer">
                  {displayPhone(client)}
                </a>
              </p>
              {client.instagram ? (
                <p>
                  <a
                    href={`https://instagram.com/${client.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="of-social"
                  >
                    <InstagramIcon width={16} height={16} />@{client.instagram}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
          <div className="of-footer-bottom">
            <p>
              © {new Date().getFullYear()} {client.name}
            </p>
            <a className="d-credit" href={site.url} target="_blank" rel="noopener noreferrer">
              Site criado pela
              <KodarLogo variant="wordmark" tone="negative" className="d-credit-logo" title="Kodar" />
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppFab client={client} message={c.quote} bubble={c.fabBubble} />
      <KodarBar client={client} />
    </div>
  );
}
