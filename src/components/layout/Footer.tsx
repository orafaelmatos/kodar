import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="experience-footer bg-noite text-papel">
      <div className="experience-container">
        <div className="footer-topline">
          <p className="text-body-s text-papel/70">{site.slogan}</p>
          <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-6 gap-y-4">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} className="text-body-s text-papel/70 hover:text-papel">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <a href="#inicio" className="footer-wordmark" aria-label="Kodar — voltar ao início">
          <Logo variant="wordmark" tone="negative" className="w-full" />
          <span className="footer-backtop">
            <ArrowUpRight size={28} aria-hidden="true" />
          </span>
        </a>
        <div className="footer-bottomline text-body-s text-papel/65">
          <p>
            © {new Date().getFullYear()} {site.name}.
          </p>
          <p>Design e código, com cuidado.</p>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </div>
    </footer>
  );
}
