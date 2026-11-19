"use client";

import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { LandingMock, SiteMock, SystemMock } from "@/components/mockups/ProductMockups";
import { SplitWords } from "@/components/ui/SplitWords";
import { whatsappUrl } from "@/config/site";
import { products, type Product } from "@/content/products";

const mockups: Record<Product["id"], ComponentType> = {
  "landing-pages": LandingMock,
  sites: SiteMock,
  sistemas: SystemMock,
};

const cta: Record<Product["id"], string> = {
  "landing-pages": "Quero uma landing page",
  sites: "Quero um site novo",
  sistemas: "Quero um sistema sob medida",
};

/**
 * Vitrine única dos três produtos: abas com progresso (avançam sozinhas quando a seção está
 * na tela e o visitante não está interagindo) e um palco com texto e prévia do produto.
 */
export function Products() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const showcase = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const element = showcase.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function advance() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive((current) => (current + 1) % products.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: products.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + products.length) % products.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="produtos" className="section" aria-labelledby="products-title">
      <div className="container-page">
        <header className="section-header section-header-center">
          <p className="section-eyebrow label" data-reveal>
            <span>01</span> O que a gente constrói
          </p>
          <h2 id="products-title" className="reveal-words font-display text-display-l" data-reveal>
            <SplitWords
              parts={["Desenhado do zero,", { text: "até o último detalhe.", className: "text-ink-muted" }]}
            />
          </h2>
          <p className="section-lead text-body-l text-ink-muted" data-reveal>
            Três formas de colocar sua empresa no digital, todas com identidade própria e código de verdade.
            Sem template e sem construtor de sites.
          </p>
        </header>

        <div ref={showcase} className="showcase" data-reveal data-inview={inView || undefined}>
          <div className="showcase-tabs" role="tablist" aria-label="Produtos" onKeyDown={onKeyDown}>
            {products.map((product, index) => (
              <button
                key={product.id}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`tab-${product.id}`}
                aria-selected={active === index}
                aria-controls={`panel-${product.id}`}
                tabIndex={active === index ? 0 : -1}
                className="showcase-tab"
                onClick={() => setActive(index)}
              >
                <span className="label text-menta-forte">{product.index}</span>
                <span className="showcase-tab-title font-display">{product.title}</span>
                <span className="showcase-tab-short text-body-s">{product.short}</span>
                <span className="showcase-progress" aria-hidden="true">
                  {active === index ? <span onAnimationEnd={advance} /> : null}
                </span>
              </button>
            ))}
          </div>

          {products.map((product, index) => {
            const Mockup = mockups[product.id];
            return (
              <div
                key={product.id}
                id={`panel-${product.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${product.id}`}
                hidden={active !== index}
                className="showcase-panel"
              >
                <div className="showcase-copy">
                  <h3 className="font-display text-heading">{product.lead}</h3>
                  <p className="text-body text-ink-muted">{product.text}</p>
                  <ul className="showcase-list" aria-label={`O que entra em ${product.title}`}>
                    {product.items.map((item) => (
                      <li key={item} className="text-body-s">
                        <Check size={16} aria-hidden="true" className="text-menta-forte" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappUrl(product.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    {cta[product.id]}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
                <div className="showcase-visual">
                  <Mockup />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
