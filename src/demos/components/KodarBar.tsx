"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { kodarWhatsapp } from "../utils";
import type { DemoClient } from "../types";

/**
 * Faixa da Kodar em toda demo: deixa claro que é uma prévia e leva direto ao WhatsApp da Kodar.
 * É o que transforma a demo em venda.
 */
export function KodarBar({ client }: { client: DemoClient }) {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  if (closed) return null;

  return (
    <aside className="kodar-bar" data-visible={visible || undefined} aria-label="Sobre esta prévia">
      <Logo variant="symbol" className="kodar-bar-logo" title="Kodar" />
      <p className="kodar-bar-long">
        {client.contactName ? <strong>Oi, {client.contactName}! </strong> : null}
        Esta é uma prévia que a Kodar criou para a {client.name}.
      </p>
      <p className="kodar-bar-short">Prévia da Kodar</p>
      <a href={kodarWhatsapp(client)} target="_blank" rel="noopener noreferrer" className="kodar-bar-cta">
        Quero este site
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <button
        type="button"
        className="kodar-bar-close"
        aria-label="Fechar aviso"
        onClick={() => setClosed(true)}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </aside>
  );
}
