"use client";

import { useEffect } from "react";

/**
 * Controle global de movimento (sem interface): respeita `prefers-reduced-motion`
 * e revela os elementos com `data-reveal` quando entram na tela.
 * Estado exposto em <html data-motion="running|paused"> e no evento `kodar:motion`.
 */
export function MotionDirector() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      document.documentElement.dataset.motion = media.matches ? "paused" : "running";
      window.dispatchEvent(new Event("kodar:motion"));
      if (media.matches)
        document
          .querySelectorAll("[data-reveal]")
          .forEach((element) => element.setAttribute("data-reveal", "visible"));
    };
    sync();
    media.addEventListener("change", sync);
    if (media.matches) return () => media.removeEventListener("change", sync);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight)
        element.setAttribute("data-reveal", "pending");
      observer.observe(element);
    });
    return () => {
      media.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  return null;
}
