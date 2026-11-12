/**
 * Grafismo da marca: o colchete do logo repetido (brand/espaco-e-formas.md).
 * Mesmo traço (9) e ângulo (45°) do logo, passo de 40px, no máximo 5 por peça.
 * Use decorativo, sangrando para fora de um bloco noite.
 *
 *   <div className="relative overflow-hidden bg-noite"> <Chevrons count={4} className="absolute right-0 h-40" /> … </div>
 */
type ChevronsProps = {
  count?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  color?: string;
};

export function Chevrons({ count = 3, className, color = "var(--menta)" }: ChevronsProps) {
  const pitch = 40;
  const width = 56 + 9 + pitch * (count - 1);
  return (
    <svg
      viewBox={`-4.5 -4.5 ${width} 121`}
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={`M${56 + i * pitch} 0L${i * pitch} 56L${56 + i * pitch} 112`} />
      ))}
    </svg>
  );
}
