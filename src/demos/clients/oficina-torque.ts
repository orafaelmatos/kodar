import type { DemoClient } from "../types";

/**
 * Demo modelo de oficina mecânica. Os campos entre colchetes são marcadores:
 * troque pelos dados reais do cliente. Nota, anos e veículos atendidos ficam de fora
 * até serem informados (a página mostra itens qualitativos no lugar).
 */
export const torque: DemoClient = {
  slug: "torque-auto-center",
  niche: "oficina",
  name: "Torque Auto Center",
  shortName: "Torque",
  contactName: "Carlos",
  city: "Campinas",
  state: "SP",
  address: "Rua [endereço da oficina], [número] - [Bairro], Campinas - SP",
  whatsapp: "5519999990000",
  instagram: "torqueautocenter",
  hours: ["Seg a sex · [8h às 18h]", "Sábado · [8h às 12h]"],
};
