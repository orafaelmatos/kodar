export type Product = {
  id: "landing-pages" | "sites" | "sistemas";
  index: string;
  title: string;
  /** Frase curta da aba. */
  short: string;
  lead: string;
  text: string;
  items: readonly string[];
  whatsappMessage: string;
};

export const products: readonly Product[] = [
  {
    id: "landing-pages",
    index: "01",
    title: "Landing pages",
    short: "Para campanhas e anúncios",
    lead: "Uma página, um objetivo: fazer o visitante agir.",
    text: "Para campanhas, lançamentos e anúncios. Cada bloco leva o visitante um passo mais perto de falar com você.",
    items: ["Texto que vende", "WhatsApp e formulário", "Pronta para anúncios"],
    whatsappMessage: "Olá, Kodar! Quero uma landing page para a minha empresa.",
  },
  {
    id: "sites",
    index: "02",
    title: "Sites",
    short: "Sua empresa inteira online",
    lead: "Sua empresa inteira, com a mesma cara e o mesmo cuidado.",
    text: "Institucional, catálogo ou blog. Várias páginas na mesma linguagem, feitas para ser encontradas no Google.",
    items: ["Design próprio", "Estrutura para o Google", "Fácil de crescer"],
    whatsappMessage: "Olá, Kodar! Quero um site novo para a minha empresa.",
  },
  {
    id: "sistemas",
    index: "03",
    title: "Sistemas sob medida",
    short: "Do CRM ao ERP",
    lead: "Do CRM ao ERP: o sistema que o seu processo pede.",
    text: "A gente estuda como sua empresa trabalha e constrói a ferramenta certa. Menos planilha, menos retrabalho, mais controle.",
    items: [
      "CRM e funil de vendas",
      "ERP, estoque e financeiro",
      "Portal do cliente",
      "Agendamento online",
      "Painéis de gestão",
      "Integrações e automações",
    ],
    whatsappMessage: "Olá, Kodar! Quero conversar sobre um sistema sob medida.",
  },
];

/** Palavras da faixa em movimento abaixo do hero. */
export const capabilities = [
  "Landing pages",
  "Sites institucionais",
  "CRM",
  "ERP",
  "Portal do cliente",
  "Agendamento online",
  "Painéis de gestão",
  "E-commerce",
  "Integrações",
  "Automação",
  "IA aplicada",
] as const;
