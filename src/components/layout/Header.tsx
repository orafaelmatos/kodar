"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MotionDirector } from "@/components/layout/MotionDirector";
import { site, whatsappUrl } from "@/config/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [isOpen]);

  return (
    <header ref={header} className="site-header" data-scrolled={scrolled || isOpen || undefined}>
      <div className="header-bar">
        <a href="#inicio" aria-label="Kodar, voltar ao início" onClick={() => setIsOpen(false)}>
          <Logo variant="wordmark" tone="negative" className="h-7 w-auto" />
        </a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-body-s">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <MotionDirector />
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header-cta hidden text-body-s font-semibold sm:inline-flex"
          >
            Conte seu projeto
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            className="icon-button lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Navegação no celular"
        hidden={!isOpen}
        className="mobile-nav lg:hidden"
      >
        {site.nav.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="font-display text-heading"
            onClick={() => setIsOpen(false)}
          >
            <span className="label text-menta-forte">0{index + 1}</span>
            {item.label}
          </a>
        ))}
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta mt-4 justify-center text-body font-semibold"
          onClick={() => setIsOpen(false)}
        >
          Conte seu projeto
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
