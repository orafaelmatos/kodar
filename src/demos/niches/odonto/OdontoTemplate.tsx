import type { ComponentType, CSSProperties, SVGProps } from "react";
import { Manrope } from "next/font/google";
import {
  ArrowRight,
  Baby,
  CalendarCheck,
  CircleCheck,
  ClipboardList,
  CreditCard,
  Gem,
  HeartHandshake,
  ScanLine,
  ShieldCheck,
  Siren,
  Smile,
  Sofa,
  Sparkles,
  Users,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SplitWords } from "@/components/ui/SplitWords";
import { CountUp } from "../../components/CountUp";
import { DemoHeader } from "../../components/DemoHeader";
import { KodarBar } from "../../components/KodarBar";
import { WhatsAppFab } from "../../components/WhatsAppFab";
import {
  ContactCard,
  DemoFaq,
  DemoFooter,
  Reviews,
  SectionHead,
  Stars,
  delay,
} from "../../components/blocks";
import { ToothIcon } from "../../components/icons";
import { clientWhatsapp } from "../../utils";
import type { DemoClient } from "../../types";
import { odontoContent, type TreatmentIcon } from "./content";
import { SmileSimulator } from "./SmileSimulator";
import { ToothScene } from "./ToothScene";
import "./theme.css";

const font = Manrope({ subsets: ["latin"], variable: "--font-odonto", display: "swap" });

const treatmentIcons: Record<TreatmentIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  implante: ToothIcon,
  clareamento: Sparkles,
  ortodontia: Smile,
  lentes: Gem,
  prevencao: ShieldCheck,
  infantil: Baby,
};
const perkIcons = [CreditCard, Siren, ScanLine];
const featureIcons = [HeartHandshake, ClipboardList, Users, Sofa];

function Logo() {
  return (
    <span className="od-logo-mark" aria-hidden="true">
      <ToothIcon width={20} height={20} />
    </span>
  );
}

export function OdontoTemplate({ client }: { client: DemoClient }) {
  const c = odontoContent(client);
  const book = clientWhatsapp(client, c.book);

  return (
    <div className={`demo demo-odonto ${font.variable}`}>
      <DemoHeader
        client={client}
        logo={<Logo />}
        nav={c.nav}
        ctaLabel="Agendar avaliação"
        ctaMessage={c.book}
      />

      <main>
        {/* Hero */}
        <section id="inicio" className="od-hero">
          <div className="od-blobs" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="d-container od-hero-grid">
            <div className="od-hero-copy">
              <p className="od-badge od-in" style={{ "--j": 0 } as CSSProperties}>
                <Stars size={14} />
                {c.hero.badge}
              </p>
              <h1 className="d-h1 od-hero-title">
                <SplitWords
                  parts={c.hero.title.map((text, index) =>
                    index === 1 ? { text, className: "d-accent-text" } : text,
                  )}
                />
              </h1>
              <p className="d-lead od-in" style={{ "--j": 1 } as CSSProperties}>
                {c.hero.text}
              </p>
              <div className="od-hero-ctas od-in" style={{ "--j": 2 } as CSSProperties}>
                <a href={book} target="_blank" rel="noopener noreferrer" className="d-btn d-btn-primary">
                  <WhatsAppIcon width={18} height={18} />
                  Agendar pelo WhatsApp
                </a>
                <a href="#tratamentos" className="d-btn d-btn-ghost">
                  Ver tratamentos
                </a>
              </div>
              <ul className="od-perks od-in" style={{ "--j": 3 } as CSSProperties}>
                {c.hero.perks.map((perk, index) => {
                  const Icon = perkIcons[index % perkIcons.length];
                  return (
                    <li key={perk}>
                      <Icon size={18} aria-hidden="true" />
                      {perk}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="od-hero-visual">
              <div className="od-halo" aria-hidden="true" />
              <ToothScene />
              <div className="od-float od-float-1" aria-hidden="true">
                <span className="od-float-icon">
                  <CalendarCheck size={18} />
                </span>
                <span>
                  <small>Próximo horário</small>
                  <b>Hoje, 16h30</b>
                </span>
              </div>
              {client.rating ? (
                <div className="od-float od-float-2" aria-hidden="true">
                  <Stars size={13} />
                  <b>{client.rating.score.toLocaleString("pt-BR")}</b>
                  <small>{client.rating.count} avaliações</small>
                </div>
              ) : (
                <div className="od-float od-float-2" aria-hidden="true">
                  <span className="od-float-icon">
                    <ScanLine size={18} />
                  </span>
                  <span>
                    <small>Avaliação completa</small>
                    <b>Raio-x digital</b>
                  </span>
                </div>
              )}
              <div className="od-float od-float-3" aria-hidden="true">
                <span className="od-float-icon">
                  <Sparkles size={18} />
                </span>
                <span>
                  <small>Clareamento</small>
                  <b>Sorriso mais branco</b>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Faixa de tratamentos */}
        <div className="od-strip" aria-label="Tratamentos">
          <div className="od-strip-track">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 || undefined}>
                {c.strip.map((item) => (
                  <li key={item}>
                    <Sparkles size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Tratamentos */}
        <section id="tratamentos" className="d-section">
          <div className="d-container">
            <SectionHead
              eyebrow="Tratamentos"
              title="Tudo para o seu sorriso,"
              accent="em um só lugar."
              text="Da prevenção à estética, com especialistas que explicam cada passo antes de começar."
              center
            />
            <ul className="od-treatments">
              {c.treatments.map((treatment, index) => {
                const Icon = treatmentIcons[treatment.icon];
                return (
                  <li key={treatment.title} className="od-treatment" data-reveal style={delay(index % 3)}>
                    <span className="od-treatment-icon">
                      <Icon width={26} height={26} aria-hidden="true" />
                    </span>
                    <h3 className="d-h3">{treatment.title}</h3>
                    <p>{treatment.text}</p>
                    <a
                      href={clientWhatsapp(client, c.treatmentMessage(treatment.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="od-link"
                    >
                      Agendar avaliação <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Simulador */}
        <section id="simulador" className="d-section od-sim">
          <div className="d-container od-sim-grid">
            <div>
              <SectionHead
                eyebrow={c.simulator.eyebrow}
                title={c.simulator.title}
                accent={c.simulator.accent}
                text={c.simulator.text}
              />
              <a
                href={clientWhatsapp(client, c.simulator.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="d-btn d-btn-primary"
                data-reveal
              >
                <WhatsAppIcon width={18} height={18} />
                {c.simulator.cta}
              </a>
              <p className="od-note" data-reveal>
                {c.simulator.note}
              </p>
            </div>
            <div data-reveal>
              <SmileSimulator />
            </div>
          </div>
        </section>

        {/* A clínica */}
        <section id="clinica" className="d-section">
          <div className="d-container od-clinic">
            <div>
              <SectionHead eyebrow={c.clinic.eyebrow} title={c.clinic.title} accent={c.clinic.accent} />
              <ul className="od-features">
                {c.clinic.features.map((feature, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <li key={feature.title} data-reveal style={delay(index)}>
                      <span className="od-feature-icon">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="d-h3">{feature.title}</h3>
                        <p>{feature.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <ul className="od-stats">
              {c.clinic.stats.map((stat, index) => (
                <li key={stat.label} data-reveal style={delay(index)}>
                  <strong>
                    <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Como agendar */}
        <section className="d-section od-steps-section">
          <div className="d-container">
            <SectionHead eyebrow={c.steps.eyebrow} title={c.steps.title} accent={c.steps.accent} center />
            <ol className="od-steps">
              {c.steps.items.map((step, index) => (
                <li key={step.title} data-reveal style={delay(index, 140)}>
                  <span className="od-step-number">{index + 1}</span>
                  <h3 className="d-h3">{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Avaliações */}
        <section id="avaliacoes" className="d-section od-reviews">
          <div className="d-container od-reviews-head">
            <SectionHead eyebrow={c.reviews.eyebrow} title={c.reviews.title} accent={c.reviews.accent} />
            {client.rating ? (
              <div className="od-rating" data-reveal>
                <strong>{client.rating.score.toLocaleString("pt-BR")}</strong>
                <div>
                  <Stars size={18} />
                  <span>{client.rating.count} avaliações no Google</span>
                </div>
              </div>
            ) : null}
          </div>
          <Reviews items={c.reviews.items} />
        </section>

        {/* Dúvidas e contato */}
        <section id="contato" className="d-section">
          <div className="d-container od-contact">
            <div>
              <SectionHead eyebrow="Dúvidas" title="Perguntas" accent="frequentes." />
              <DemoFaq items={c.faq} />
            </div>
            <div className="od-contact-side">
              <ContactCard client={client} message={c.book} title={c.contactTitle} />
              <a
                href={book}
                target="_blank"
                rel="noopener noreferrer"
                className="d-btn d-btn-primary"
                data-reveal
              >
                <WhatsAppIcon width={18} height={18} />
                Agendar avaliação
              </a>
            </div>
          </div>
        </section>

        {/* Chamada final */}
        <section className="od-cta-wrap">
          <div className="d-container">
            <div className="od-cta" data-reveal>
              <ToothIcon className="od-cta-tooth" strokeWidth={1} />
              <h2 className="d-h2">
                {c.cta.title} <span>{c.cta.accent}</span>
              </h2>
              <p>{c.cta.text}</p>
              <a href={book} target="_blank" rel="noopener noreferrer" className="d-btn od-btn-light">
                <WhatsAppIcon width={18} height={18} />
                {c.cta.button}
              </a>
              <ul>
                {["Resposta rápida", "Sem compromisso", "Atendimento humanizado"].map((item) => (
                  <li key={item}>
                    <CircleCheck size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <DemoFooter
        client={client}
        logo={<Logo />}
        note={client.responsible ? `Responsável técnico: ${client.responsible}` : undefined}
      />
      <WhatsAppFab client={client} message={c.book} bubble={c.fabBubble} />
      <KodarBar client={client} />
    </div>
  );
}
