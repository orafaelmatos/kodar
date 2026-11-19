/**
 * Dados centrais do site. Textos de marca vêm de brand/posicionamento.md e brand/tom-de-voz.md.
 * Itens marcados com TODO precisam ser confirmados antes de publicar.
 */
export const site = {
  name: "Kodar",
  slogan: "Tecnologia com gente por trás.",
  altSlogans: ["Codar é com a gente.", "Do código à solução.", "Seu negócio, em código."],
  description:
    "A Kodar desenha e programa do zero landing pages, sites e sistemas sob medida que transformam visita em cliente. Tecnologia com gente por trás.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kodarsoft.com",
  locale: "pt_BR",
  founder: "Rafael Soares Matos",

  products: [
    { id: "landing-pages", title: "Landing pages" },
    { id: "sites", title: "Sites" },
    { id: "sistemas", title: "Sistemas sob medida" },
  ],

  /** Âncoras das seções da home, na ordem do menu. */
  nav: [
    { href: "#produtos", label: "O que a gente faz" },
    { href: "#conversao", label: "Por que converte" },
    { href: "#processo", label: "Como funciona" },
    { href: "#duvidas", label: "Dúvidas" },
  ],

  contact: {
    whatsapp: "5519995828704",
    whatsappDisplay: "(19) 99582-8704",
    whatsappMessage: "Olá, Kodar! Quero conversar sobre um projeto.",
    // TODO: confirmar quando o domínio e o e-mail estiverem ativos.
    email: "contato@kodarsoft.com",
    instagram: "kodarsoft", // TODO: confirmar o @ disponível
  },
} as const;

export function whatsappUrl(message: string = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
