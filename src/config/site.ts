/**
 * Dados centrais do site. Textos de marca vêm de brand/posicionamento.md e brand/tom-de-voz.md.
 * Itens marcados com TODO precisam ser confirmados antes de publicar.
 */
export const site = {
  name: "Kodar",
  slogan: "Tecnologia com gente por trás.",
  altSlogans: ["Codar é com a gente.", "Do código à solução.", "Seu negócio, em código."],
  description:
    "Kodar desenvolve sites, sistemas sob medida, automações e soluções com IA para empresas. Tecnologia com gente por trás.",
  url: "https://kodarsoft.com",
  locale: "pt_BR",
  founder: "Rafael Soares Matos",

  services: [
    { id: "sites", title: "Sites" },
    { id: "sistemas", title: "Sistemas sob medida" },
    { id: "automacao", title: "Automação" },
    { id: "ia", title: "IA aplicada" },
  ],

  /** Âncoras das seções da home, na ordem do menu. */
  nav: [
    { href: "#servicos", label: "Serviços" },
    { href: "#projetos", label: "Projetos" },
    { href: "#sobre", label: "Sobre" },
    { href: "#duvidas", label: "Dúvidas" },
  ],

  contact: {
    // TODO: número real — código do país + DDD + número, só dígitos (ex.: 5511999999999).
    whatsapp: "5500000000000",
    whatsappMessage: "Olá, Kodar! Quero conversar sobre um projeto.",
    // TODO: confirmar quando o domínio e o e-mail estiverem ativos.
    email: "contato@kodarsoft.com",
    instagram: "kodarsoft", // TODO: confirmar o @ disponível
  },
} as const;

export function whatsappUrl(message: string = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
