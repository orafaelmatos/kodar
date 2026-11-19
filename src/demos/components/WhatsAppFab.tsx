"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { clientWhatsapp } from "../utils";
import type { DemoClient } from "../types";

/** Botão fixo de WhatsApp com um balão de convite que aparece depois de alguns segundos. */
export function WhatsAppFab({
  client,
  message,
  bubble,
}: {
  client: DemoClient;
  message: string;
  bubble: string;
}) {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowBubble(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="d-fab-wrap">
      {showBubble && !dismissed ? (
        <div className="d-fab-bubble" role="status">
          <p>{bubble}</p>
          <button type="button" aria-label="Fechar convite" onClick={() => setDismissed(true)}>
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      ) : null}
      <a
        href={clientWhatsapp(client, message)}
        target="_blank"
        rel="noopener noreferrer"
        className="d-fab"
        aria-label={`Falar com ${client.name} no WhatsApp`}
      >
        <WhatsAppIcon width={28} height={28} />
      </a>
    </div>
  );
}
