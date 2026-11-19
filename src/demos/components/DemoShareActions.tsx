"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Botões do painel de demos: copiar o link e enviar a mensagem pronta para o cliente. */
export function DemoShareActions({
  url,
  whatsapp,
  message,
}: {
  url: string;
  whatsapp: string;
  message: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copie o link:", url);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-line px-4 text-body-s font-semibold hover:border-menta"
      >
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {copied ? "Copiado" : "Copiar link"}
      </button>
      <a
        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-10 items-center gap-2 rounded-pill bg-menta px-4 text-body-s font-semibold text-on-brand"
      >
        <WhatsAppIcon width={14} height={14} />
        Enviar ao cliente
      </a>
    </>
  );
}
