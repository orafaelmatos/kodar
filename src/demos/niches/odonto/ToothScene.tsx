"use client";

import { useEffect, useRef } from "react";
import { ToothIcon } from "../../components/icons";

/** Carrega o dente 3D depois que a página aparece. Sem WebGL, fica o ícone do dente. */
export function ToothScene() {
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const element = container.current;
    const surface = canvas.current;
    if (!element || !surface) return;
    const timer = window.setTimeout(() => {
      import("./tooth-scene")
        .then(async ({ createToothScene }) => {
          if (disposed) return;
          const dispose = await createToothScene(surface, element);
          if (disposed) dispose();
          else cleanup = dispose;
        })
        .catch(() => {});
    }, 120);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={container} className="od-scene" aria-hidden="true">
      <ToothIcon className="od-scene-fallback" strokeWidth={1} />
      <canvas ref={canvas} />
    </div>
  );
}
