import localFont from "next/font/local";

/**
 * Fontes da marca (brand/tipografia.md), auto-hospedadas a partir de brand/fonts/
 * (versões variáveis, licença SIL Open Font License). Sem dependência do Google Fonts no build.
 * Cada uma expõe uma variável CSS usada pelo tema em src/styles/tokens.css:
 * font-display (Sora), font-sans (DM Sans) e font-mono (JetBrains Mono).
 */
export const sora = localFont({
  src: "../../brand/fonts/Sora-Variable-latin.woff2",
  weight: "100 800",
  variable: "--font-sora",
  display: "swap",
});

export const dmSans = localFont({
  src: "../../brand/fonts/DMSans-Variable-latin.woff2",
  weight: "100 1000",
  variable: "--font-dm-sans",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: "../../brand/fonts/JetBrainsMono-Variable-latin.woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontVariables = [sora.variable, dmSans.variable, jetbrainsMono.variable].join(" ");
