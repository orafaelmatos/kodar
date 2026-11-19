"use client";

import { useEffect, useRef } from "react";
import { Chevrons } from "@/components/brand/Chevrons";

/**
 * Carrega a cena 3D do hero por importação dinâmica, depois que a página já está visível.
 * O arco de objetos se encaixa na área `.hero-art` da mesma seção.
 * Sem WebGL, os colchetes em SVG continuam no lugar.
 */
export function HeroScene() {
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const element = container.current;
    const surface = canvas.current;
    const art = element?.parentElement?.querySelector<HTMLElement>(".hero-art");
    if (!element || !surface || !art) return;
    const load = () =>
      import("./hero-scene")
        .then(async ({ createHeroScene }) => {
          if (disposed) return;
          const dispose = await createHeroScene(surface, element, art);
          if (disposed) dispose();
          else cleanup = dispose;
        })
        .catch(() => {
          /* A composição em SVG permanece se WebGL não estiver disponível. */
        });
    const useIdle = typeof window.requestIdleCallback === "function";
    const handle = useIdle
      ? window.requestIdleCallback(load, { timeout: 900 })
      : window.setTimeout(load, 150);
    return () => {
      disposed = true;
      if (useIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={container} className="hero-scene" aria-hidden="true">
      <div className="hero-scene-fallback">
        <Chevrons count={3} className="h-full w-auto" />
      </div>
      <canvas ref={canvas} className="hero-scene-canvas" />
    </div>
  );
}
