import { ArrowDown, ArrowUpRight } from "lucide-react";
import { KineticSculpture } from "@/components/ui/KineticSculpture";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/config/site";

export function Hero() {
  return (
    <section id="inicio" className="experience-hero bg-noite text-papel" aria-labelledby="hero-title">
      <div className="experience-container hero-layout">
        <div className="hero-eyebrow label">
          <span className="live-dot" />
          Software feito para o seu próximo passo.
          <span className="hero-edition">Independente. Próxima. Sob medida.</span>
        </div>
        <h1 id="hero-title" className="hero-title font-display text-display-xl">
          <span className="hero-line">
            <span>Tecnologia</span>
          </span>
          <span className="hero-line">
            <span>com gente</span>
          </span>
          <span className="hero-line">
            <span className="outline-word">
              por trás<span className="hero-period">.</span>
            </span>
          </span>
        </h1>
        <div className="hero-art">
          <KineticSculpture />
        </div>
        <div className="hero-footer">
          <a href="#servicos" className="scroll-link">
            <span className="scroll-ring">
              <ArrowDown size={18} aria-hidden="true" />
            </span>
            <span className="label">
              Explore o que
              <br />a gente faz
            </span>
          </a>
          <div className="hero-introduction">
            <p className="text-body-l">
              Sites, sistemas, automação e IA.
              <br />A gente conecta sua próxima ideia
              <br className="hidden sm:block" /> ao que o seu negócio precisa.
            </p>
            <Button
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="experience-button"
            >
              Conte seu projeto <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
        <span className="hero-side-note label" aria-hidden="true">
          Estratégia + design + código
        </span>
      </div>
    </section>
  );
}
