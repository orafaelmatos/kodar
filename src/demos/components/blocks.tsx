/**
 * Blocos comuns às demos (Server Components). O estilo de cada nicho vem das variáveis
 * --d-* definidas no tema do nicho; a estrutura é a mesma.
 */
import type { CSSProperties, ReactNode } from "react";
import { Clock, MapPin, Phone, Plus, Star } from "lucide-react";
import { InstagramIcon } from "./icons";
import { Logo } from "@/components/brand/Logo";
import { SplitWords } from "@/components/ui/SplitWords";
import { site } from "@/config/site";
import { clientWhatsapp, displayPhone, mapsUrl } from "../utils";
import type { DemoClient } from "../types";

export function SectionHead({
  eyebrow,
  title,
  accent,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <header className={`d-section-head ${center ? "is-center" : ""}`}>
      <p className="d-eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 className="d-h2 reveal-words" data-reveal>
        <SplitWords parts={accent ? [title, { text: accent, className: "d-accent-text" }] : [title]} />
      </h2>
      {text ? (
        <p className="d-lead" data-reveal>
          {text}
        </p>
      ) : null}
    </header>
  );
}

export function Stars({ score = 5, size = 16 }: { score?: number; size?: number }) {
  return (
    <span className="d-stars" aria-label={`Nota ${score.toLocaleString("pt-BR")} de 5`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Star key={index} width={size} height={size} aria-hidden="true" />
      ))}
    </span>
  );
}

export function Reviews({ items }: { items: readonly { name: string; text: string }[] }) {
  const row = (hidden: boolean) => (
    <ul className="d-reviews-row" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item.name} className="d-review">
          <Stars />
          <p>&ldquo;{item.text}&rdquo;</p>
          <span className="d-review-author">
            <span className="d-avatar" aria-hidden="true">
              {item.name.charAt(0)}
            </span>
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="d-reviews" data-reveal>
      <div className="d-reviews-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function DemoFaq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="d-faq" data-reveal>
      {items.map((item) => (
        <details key={item.q} name="d-faq" className="d-faq-item">
          <summary>
            <span>{item.q}</span>
            <span className="d-faq-icon" aria-hidden="true">
              <Plus size={18} />
            </span>
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ContactCard({
  client,
  message,
  title,
}: {
  client: DemoClient;
  message: string;
  title: string;
}) {
  return (
    <div className="d-contact-card" data-reveal>
      <h3 className="d-h3">{title}</h3>
      <ul>
        <li>
          <MapPin size={18} aria-hidden="true" />
          <span>
            {client.address ?? `${client.city} - ${client.state}`}
            <a href={mapsUrl(client)} target="_blank" rel="noopener noreferrer">
              Ver no mapa
            </a>
          </span>
        </li>
        {client.hours?.length ? (
          <li>
            <Clock size={18} aria-hidden="true" />
            <span>
              {client.hours.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </li>
        ) : null}
        <li>
          <Phone size={18} aria-hidden="true" />
          <a href={clientWhatsapp(client, message)} target="_blank" rel="noopener noreferrer">
            {displayPhone(client)}
          </a>
        </li>
        {client.instagram ? (
          <li>
            <InstagramIcon width={18} height={18} />
            <a href={`https://instagram.com/${client.instagram}`} target="_blank" rel="noopener noreferrer">
              @{client.instagram}
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export function DemoFooter({ client, logo, note }: { client: DemoClient; logo: ReactNode; note?: string }) {
  return (
    <footer className="d-footer">
      <div className="d-container d-footer-inner">
        <div className="d-footer-brand">
          <span className="d-logo">
            {logo}
            {client.brand?.logo ? null : <span>{client.shortName ?? client.name}</span>}
          </span>
          <p>
            {client.name} · {client.city} - {client.state}
          </p>
          {note ? <p className="d-footer-note">{note}</p> : null}
        </div>
        <a className="d-credit" href={site.url} target="_blank" rel="noopener noreferrer">
          Site criado pela
          <Logo variant="wordmark" tone="negative" className="d-credit-logo" title="Kodar" />
        </a>
      </div>
    </footer>
  );
}

/** Atraso em cascata para listas reveladas ao rolar. */
export const delay = (index: number, step = 80) =>
  ({ transitionDelay: `${index * step}ms` }) as CSSProperties;
