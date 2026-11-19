import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site, whatsappUrl } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-page">
        <div className="footer-top">
          <div>
            <Logo variant="symbol" className="size-14" />
            <p className="mt-4 text-body-s text-ink-muted">{site.slogan}</p>
          </div>
          <nav aria-label="Navegação do rodapé" className="footer-nav">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} className="text-body-s text-ink-muted hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <p className="label text-ink-muted">WhatsApp</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-title hover:text-menta-forte"
            >
              {site.contact.whatsappDisplay}
            </a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          <Logo variant="wordmark" tone="negative" className="w-full" title="" />
        </div>
        <div className="footer-bottom text-body-s text-ink-muted">
          <p>
            © {new Date().getFullYear()} {site.name}. Design e código, com cuidado.
          </p>
          <a href="#inicio" className="inline-flex items-center gap-2 hover:text-ink">
            Voltar ao início <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
