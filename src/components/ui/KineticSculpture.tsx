"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export function KineticSculpture() {
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const element = container.current;
    const surface = canvas.current;
    if (!element || !surface) return;
    import("./kinetic-scene")
      .then(async ({ createKineticScene }) => {
        if (disposed) return;
        const disposeScene = await createKineticScene(surface, element);
        if (disposed) disposeScene();
        else cleanup = disposeScene;
      })
      .catch(() => {
        /* A escultura em CSS permanece visível se WebGL não estiver disponível. */
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={container} className="kinetic-sculpture" aria-hidden="true">
      <div className="sculpture-fallback">
        {[0, 1, 2, 3, 4].map((index) => (
          <span key={index} style={{ "--frame-index": index } as CSSProperties} />
        ))}
      </div>
      <canvas ref={canvas} className="sculpture-canvas" />
      <div className="sculpture-coordinate label">
        <span className="live-dot" />
        Ideias em movimento
      </div>
    </div>
  );
}
