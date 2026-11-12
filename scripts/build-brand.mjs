#!/usr/bin/env node
/**
 * Gera os arquivos da marca usados pelo site a partir da fonte única em `brand/`.
 *
 *   brand/tokens.json      ->  src/styles/tokens.css   (variáveis CSS + tema do Tailwind)
 *   brand/assets/logos/*   ->  public/brand/logos/*    (logos servidos pelo site)
 *
 * Rode com `npm run brand`. O script também roda sozinho antes de `dev` e `build`.
 * Nunca edite os arquivos gerados à mão: mude `brand/tokens.json` e rode de novo.
 */
import { readFile, writeFile, mkdir, readdir, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(await readFile(join(root, "brand/tokens.json"), "utf8"));

const [light, dark] = tokens.color.themes.map((t) => t.id);
const colors = tokens.color.tokens;
const valueFor = (token, theme) =>
  typeof token.value === "string" ? token.value : (token.value[theme] ?? token.value[light]);

const decl = (name, value, indent = "  ") => `${indent}--${name}: ${value};`;

const lightVars = colors.map((c) => decl(c.name, valueFor(c, light)));
const darkVars = colors
  .filter((c) => valueFor(c, dark) !== valueFor(c, light))
  .map((c) => decl(c.name, valueFor(c, dark), "    "));
const darkVarsFlat = darkVars.map((l) => l.slice(2));

const spacing = tokens.spacing.tokens.map((t) => decl(t.name, t.value));
const radius = tokens.radius.tokens.map((t) => decl(t.name, t.value));

// Famílias: as fontes são carregadas por next/font (src/config/fonts.ts),
// que expõe --font-sora, --font-dm-sans e --font-jetbrains-mono.
const fontVar = { display: "--font-sora", sans: "--font-dm-sans", mono: "--font-jetbrains-mono" };
const families = Object.entries(tokens.type.families).map(
  ([key, stack]) => `  --font-${key}: var(${fontVar[key]}), ${stack};`,
);

const textStyles = tokens.type.groups.flatMap((g) =>
  g.styles.flatMap((s) => {
    const out = [`  --text-${s.name}: ${s.fontSize};`];
    if (s.lineHeight) out.push(`  --text-${s.name}--line-height: ${s.lineHeight};`);
    if (s.letterSpacing) out.push(`  --text-${s.name}--letter-spacing: ${s.letterSpacing};`);
    if (s.fontWeight) out.push(`  --text-${s.name}--font-weight: ${s.fontWeight};`);
    return out;
  }),
);

const css = `/* Kodar — gerado de brand/tokens.json por scripts/build-brand.mjs. NÃO EDITE À MÃO. */

/* 1. Variáveis da marca: tema claro (padrão) */
:root {
${lightVars.join("\n")}
${spacing.join("\n")}
${radius.join("\n")}
}

/* 2. Tema escuro: segue o sistema, a menos que data-theme="light" force o claro */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="${light}"]) {
${darkVars.join("\n")}
    color-scheme: dark;
  }
}

/* 3. Tema escuro forçado (ex.: botão de tema) */
:root[data-theme="${dark}"] {
${darkVarsFlat.join("\n")}
  color-scheme: dark;
}

/* 4. Tema do Tailwind: bg-surface, text-ink, border-line, bg-menta, font-display, text-display-xl, rounded-md… */
@theme inline {
${colors.map((c) => `  --color-${c.name}: var(--${c.name});`).join("\n")}
${families.join("\n")}
${tokens.radius.tokens.map((t) => `  --radius-${t.name.replace(/^radius-/, "")}: var(--${t.name});`).join("\n")}
${textStyles.join("\n")}
}
`;

await mkdir(join(root, "src/styles"), { recursive: true });
await writeFile(join(root, "src/styles/tokens.css"), css);

const logosSrc = join(root, "brand/assets/logos");
const logosDst = join(root, "public/brand/logos");
await mkdir(logosDst, { recursive: true });
const logos = (await readdir(logosSrc)).filter((f) => f.endsWith(".svg"));
await Promise.all(logos.map((f) => copyFile(join(logosSrc, f), join(logosDst, f))));

console.log(
  `brand: ${colors.length} cores, ${textStyles.length ? tokens.type.groups.reduce((n, g) => n + g.styles.length, 0) : 0} estilos de texto, ${logos.length} logos sincronizados.`,
);
