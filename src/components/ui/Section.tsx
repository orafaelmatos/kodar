import type { ComponentProps } from "react";

export function Section({ className = "", children, ...props }: ComponentProps<"section">) {
  return (
    <section className={`scroll-mt-24 py-16 ${className}`} {...props}>
      <div className="experience-container">{children}</div>
    </section>
  );
}
