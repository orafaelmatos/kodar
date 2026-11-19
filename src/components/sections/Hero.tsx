import type { CSSProperties } from "react";
import { HeroScene } from "@/components/three/HeroScene";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/ui/SplitWords";
import { whatsappUrl } from "@/config/site";

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <HeroScene />
      <div className="hero-art" aria-hidden="true" />
      <div className="container-page hero-copy">
        <h1 id="hero-title" className="hero-title font-display">
          <SplitWords
            parts={[
              "Sites que ninguém esquece.",
              { text: "Feitos para", breakBefore: true },
              { text: "vender.", className: "text-menta-forte" },
            ]}
          />
        </h1>
        <p className="hero-sub text-body-l" data-in style={{ "--j": 0 } as CSSProperties}>
          Landing pages, sites e sistemas sob medida, desenhados do zero para transformar visita em cliente.
          Sem template. Com gente de verdade por trás.
        </p>
        <div className="hero-ctas" data-in style={{ "--j": 1 } as CSSProperties}>
          <Button
            href={whatsappUrl("Olá, Kodar! Quero um site que traga clientes.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conte seu projeto
          </Button>
          <Button href="#produtos" variant="secondary" icon={false}>
            Ver o que a gente faz
          </Button>
        </div>
      </div>
    </section>
  );
}
