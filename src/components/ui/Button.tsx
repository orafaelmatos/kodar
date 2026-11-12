import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"a"> & { variant?: "primary" | "secondary" };

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-menta text-on-brand hover:bg-menta/85"
      : "border border-line bg-surface-raised text-ink hover:bg-nevoa";
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-2 text-body-s font-semibold transition-colors ${styles} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
