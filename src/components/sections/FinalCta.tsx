import { ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappUrl } from "@/config/site";

export function FinalCta() {
  return (
    <section id="contato" className="contact-section bg-noite text-papel" aria-labelledby="contact-title">
      <div className="experience-container">
        <div className="contact-topline" data-reveal>
          <p className="label">
            <span className="live-dot" />
            Uma boa conversa muda o próximo passo.
          </p>
          <span className="label">Brasil inteiro. Perto de você.</span>
        </div>
        <div className="contact-composition">
          <h2 id="contact-title" className="font-display text-display-xl" data-reveal>
            Vamos fazer
            <br />
            <span className="outline-word">
              acontecer<span className="hero-period">.</span>
            </span>
          </h2>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-orbit bg-menta text-on-brand"
            aria-label="Comece com um oi: falar no WhatsApp sobre o seu projeto"
          >
            <ArrowUpRight size={64} strokeWidth={1.2} aria-hidden="true" />
            <span className="label">Comece com um oi</span>
          </a>
        </div>
        <div className="contact-bottomline">
          <p className="max-w-sm text-body-l text-papel/75">
            Uma ideia, uma dúvida ou um processo que pode melhorar. Conta pra gente.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-phone text-body"
          >
            <WhatsAppIcon className="size-4" />
            {site.contact.whatsappDisplay}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
