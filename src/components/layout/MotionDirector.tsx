"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function MotionDirector() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [userPaused, setUserPaused] = useState(false);
  const paused = reduced || userPaused;

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
    window.dispatchEvent(new Event("kodar:motion"));
    if (paused)
      document
        .querySelectorAll("[data-reveal]")
        .forEach((element) => element.setAttribute("data-reveal", "visible"));
  }, [paused]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    if (!media.matches)
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        if (element.getBoundingClientRect().top >= window.innerHeight)
          element.setAttribute("data-reveal", "pending");
        observer.observe(element);
      });
    let frame = 0;
    const update = () => {
      frame = 0;
      const length = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--page-progress",
        `${length > 0 ? window.scrollY / length : 0}`,
      );
      document.querySelectorAll<HTMLElement>("[data-word-reveal]").forEach((element) => {
        const box = element.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (innerHeight * 0.82 - box.top) / (box.height + innerHeight * 0.2)),
        );
        const words = element.querySelectorAll("[data-word]");
        words.forEach((word, index) =>
          word.classList.toggle(
            "word-lit",
            media.matches ||
              document.documentElement.dataset.motion === "paused" ||
              progress > index / words.length,
          ),
        );
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("kodar:motion", schedule);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("kodar:motion", schedule);
    };
  }, []);

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-label={
        reduced
          ? "Animações reduzidas pela preferência do dispositivo"
          : paused
            ? "Retomar animações"
            : "Pausar animações"
      }
      aria-pressed={paused}
      disabled={reduced}
      onClick={() => setUserPaused(!userPaused)}
    >
      {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      <span className="sr-only">{paused ? "Retomar animações" : "Pausar animações"}</span>
    </button>
  );
}
