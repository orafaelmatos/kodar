import type { DemoClient } from "../types";

/** Fontes e pendências de confirmação: docs/demos/pro-dente.md. */
export const proDente: DemoClient = {
  slug: "pro-dente",
  niche: "odonto",
  name: "Pro Dente Odontologia Especializada",
  shortName: "Pro Dente",
  city: "Piracicaba",
  state: "SP",
  neighborhood: "Centro",
  address: "Rua Governador Pedro de Toledo, 1471 - Centro, Piracicaba - SP, 13400-075",
  whatsapp: "5519999086442",
  phone: "(19) 99908-6442",
  instagram: "prodenteodontologiapira",
  headline: "Cuidado completo para o seu sorriso.",
  brand: {
    theme: "forest",
    logo: "/demos/pro-dente/logo.jpg",
    logoAlt: "ProDente — Odontologia Especializada",
  },
  dentalServices: ["ortodontia", "implante", "clinico", "endodontia"],
  photos: {
    hero: "/demos/pro-dente/acolhimento.webp",
    heroAlt: "Profissional da Pro Dente ao lado de uma paciente na recepção da clínica",
    gallery: [
      {
        src: "/demos/pro-dente/rotina.webp",
        alt: "Equipe da Pro Dente na recepção em um registro da rotina da clínica",
        caption: "Nossa equipe, de perto.",
        sourceUrl: "https://www.instagram.com/reel/DfKjFJhER9B/",
        sourceLabel: "Ver vídeo no Instagram",
      },
      {
        src: "/demos/pro-dente/conversa.webp",
        alt: "Profissional da Pro Dente conversando com uma paciente na clínica",
        caption: "Cada pessoa, uma história.",
        sourceUrl: "https://www.instagram.com/reel/Ddbn5cVRnDW/",
        sourceLabel: "Ver vídeo no Instagram",
      },
      {
        src: "/demos/pro-dente/protese.webp",
        alt: "Publicação da Pro Dente mostrando uma prótese dentária sobre um modelo de gesso",
        caption: "Informação para cuidar do sorriso.",
        sourceUrl: "https://www.instagram.com/p/Dc1Fb3wOZbf/",
      },
    ],
  },
};
