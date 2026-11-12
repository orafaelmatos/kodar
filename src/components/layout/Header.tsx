"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MotionDirector } from "@/components/layout/MotionDirector";
import { site, whatsappUrl } from "@/config/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

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
    <header ref={header} className="experience-header bg-noite text-papel">
      <div className="experience-container header-inner">
        <a href="#inicio" aria-label="Kodar — início" onClick={() => setIsOpen(false)}>
          <Logo variant="wordmark" tone="negative" className="header-logo" />
        </a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="navigation-link text-body-s">
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header-contact hidden items-center gap-2 text-body-s md:flex"
          >
            Vamos conversar
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <MotionDirector />
          <button
            ref={menuButton}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            className="mobile-toggle md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Navegação no celular"
        hidden={!isOpen}
        className="mobile-navigation bg-noite md:hidden"
      >
        {site.nav.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="font-display text-heading"
            onClick={() => setIsOpen(false)}
          >
            <span className="label">0{index + 1}</span>
            {item.label}
            <ArrowUpRight size={24} aria-hidden="true" />
          </a>
        ))}
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-menu-contact text-body"
          onClick={() => setIsOpen(false)}
        >
          Conte seu projeto
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </nav>
      <div className="page-progress" aria-hidden="true" />
    </header>
  );
}
