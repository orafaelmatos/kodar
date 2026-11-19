import type { DemoClient } from "../types";

/** Demo modelo de clínica odontológica. Dados fictícios: troque pelos do cliente. */
export const sorrisoVivo: DemoClient = {
  slug: "sorriso-vivo",
  niche: "odonto",
  name: "Clínica Sorriso Vivo",
  shortName: "Sorriso Vivo",
  contactName: "Dra. Ana",
  city: "Campinas",
  state: "SP",
  neighborhood: "Cambuí",
  address: "Rua Coronel Quirino, 1200 - Cambuí, Campinas - SP",
  whatsapp: "5519999990000",
  instagram: "sorrisovivo",
  hours: ["Seg a sex · 8h às 19h", "Sábado · 8h às 12h"],
  since: 2011,
  rating: { score: 4.9, count: 312 },
  served: 4800,
  responsible: "Dra. Ana Ribeiro · CRO-SP 000000",
};
