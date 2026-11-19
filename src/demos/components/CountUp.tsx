"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = { value: number; decimals?: number; prefix?: string; suffix?: string };

/** Número que conta até o valor quando aparece na tela. Sem animação com movimento reduzido. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: CountUpProps) {
  const element = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const node = element.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1600, 1);
          setCurrent(value * (1 - Math.pow(1 - progress, 4)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        setCurrent(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  const formatted = current.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={element} aria-label={`${prefix}${value.toLocaleString("pt-BR")}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
