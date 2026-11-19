import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary";
  icon?: ReactNode | false;
};

/** Texto que "rola" letra a letra no hover. Leitores de tela leem o rótulo inteiro. */
function RollText({ children }: { children: ReactNode }) {
  if (typeof children !== "string") return <span>{children}</span>;
  return (
    <span className="roll-wrap">
      <span className="roll" aria-hidden="true">
        {Array.from(children).map((char, index) => (
          <span key={index} className="roll-c" style={{ "--c": index } as CSSProperties}>
            {char}
          </span>
        ))}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

/**
 * Botão-link da marca em pílula. Primário: menta com texto on-brand (nunca branco sobre menta),
 * brilho interno e luz menta suave. Secundário: vidro escuro com borda `line`.
 */
export function Button({ variant = "primary", icon, className = "", children, ...props }: ButtonProps) {
  const styles =
    variant === "primary" ? "button-primary bg-menta text-on-brand" : "button-secondary text-ink";
  return (
    <a
      className={`button inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 text-body font-medium ${styles} ${className}`}
      {...props}
    >
      <RollText>{children}</RollText>
      {icon === false ? null : (
        <span className="button-icon" aria-hidden="true">
          {icon ?? <ArrowUpRight size={18} />}
        </span>
      )}
    </a>
  );
}
