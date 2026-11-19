import { capabilities } from "@/content/products";

/** Faixa em movimento com tudo o que a Kodar constrói. Pausa com o controle de movimento. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {capabilities.map((item) => (
        <li key={item}>
          <span className="marquee-mark" aria-hidden="true">
            &lt;
          </span>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee" role="region" aria-label="O que a gente constrói">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
