import type { CSSProperties } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappUrl } from "@/config/site";

export function FinalCta() {
  return (
    <section id="contato" className="section final-cta" aria-labelledby="cta-title">
      <div className="container-page">
        <div className="cta-panel" data-reveal>
          <div className="cta-chevrons" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
              <span key={index} style={{ "--i": index } as CSSProperties} />
            ))}
          </div>
          <div className="cta-copy">
            <div className="cta-badge">
              <Logo variant="symbol" className="size-12" title="Kodar" />
              <p className="label text-menta-forte">Vamos conversar</p>
            </div>
            <h2 id="cta-title" className="font-display text-display-l">
              Seu próximo cliente está procurando você agora.
            </h2>
            <p className="text-body-l text-ink-muted">
              Conte o que você precisa. A primeira conversa é sem compromisso e você fala direto com quem vai
              desenvolver.
            </p>
            <div className="cta-actions">
              <Button
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                icon={<WhatsAppIcon width={18} height={18} />}
              >
                Falar no WhatsApp
              </Button>
              <p className="text-body-s text-ink-muted">
                ou chame no <span className="font-mono text-ink">{site.contact.whatsappDisplay}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
