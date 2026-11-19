"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { clientWhatsapp } from "../utils";
import type { DemoClient } from "../types";

type DemoHeaderProps = {
  client: DemoClient;
  logo: ReactNode;
  nav: readonly { href: string; label: string }[];
  ctaLabel: string;
  ctaMessage: string;
};

export function DemoHeader({ client, logo, nav, ctaLabel, ctaMessage }: DemoHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="d-header" data-scrolled={scrolled || open || undefined}>
      <div className="d-container d-header-inner">
        <a href="#inicio" className="d-logo" onClick={() => setOpen(false)}>
          {logo}
          <span>{client.shortName ?? client.name}</span>
        </a>
        <nav className="d-nav" aria-label="Navegação principal">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="d-header-actions">
          <a
            href={clientWhatsapp(client, ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="d-btn d-btn-primary d-btn-sm d-header-cta"
          >
            <WhatsAppIcon width={16} height={16} />
            {ctaLabel}
          </a>
          <button
            type="button"
            className="d-burger"
            aria-expanded={open}
            aria-controls="d-mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="d-mobile-nav" className="d-mobile-nav" hidden={!open} aria-label="Navegação no celular">
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a
          href={clientWhatsapp(client, ctaMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="d-btn d-btn-primary"
          onClick={() => setOpen(false)}
        >
          <WhatsAppIcon width={18} height={18} />
          {ctaLabel}
        </a>
      </nav>
    </header>
  );
}
