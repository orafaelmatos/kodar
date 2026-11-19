/** Princípios de conversão mostrados na anatomia da página (seção #conversao). */
export type Principle = {
  id: "promessa" | "acao" | "prova" | "velocidade" | "google" | "medicao";
  title: string;
  text: string;
};

export const principles: readonly Principle[] = [
  {
    id: "promessa",
    title: "Mensagem clara em segundos",
    text: "Quem chega entende o que você faz e por que escolher você antes de rolar a página.",
  },
  {
    id: "acao",
    title: "Contato sempre à mão",
    text: "WhatsApp e botões nos pontos certos. O cliente nunca precisa procurar como falar com você.",
  },
  {
    id: "prova",
    title: "Prova que gera confiança",
    text: "Depoimentos, números e casos posicionados exatamente onde a dúvida aparece.",
  },
  {
    id: "velocidade",
    title: "Rápido em qualquer celular",
    text: "Código enxuto, que abre rápido até no 4G. Cada segundo de espera é um visitante a menos.",
  },
  {
    id: "google",
    title: "Feito para ser encontrado",
    text: "Estrutura, textos e dados técnicos para aparecer para quem já procura o que você vende.",
  },
  {
    id: "medicao",
    title: "Medido desde o primeiro dia",
    text: "Eventos e análise configurados para você saber de onde vêm os contatos e o que melhorar.",
  },
];

/** Comparação entre um gerador de sites genérico e um projeto da Kodar. */
export const comparison: readonly { topic: string; generic: string; kodar: string }[] = [
  {
    topic: "Design",
    generic: "Um modelo que milhares de empresas já usam.",
    kodar: "Desenhado do zero para a sua marca.",
  },
  {
    topic: "Conversão",
    generic: "Bonito no começo, sem estratégia por trás.",
    kodar: "Cada seção pensada para levar ao contato.",
  },
  {
    topic: "Velocidade",
    generic: "Código pesado da plataforma, lento no celular.",
    kodar: "Código próprio e enxuto, que abre rápido.",
  },
  {
    topic: "Propriedade",
    generic: "Preso à mensalidade e às regras da plataforma.",
    kodar: "O código é seu. Você leva para onde quiser.",
  },
  {
    topic: "Evolução",
    generic: "Para no limite do que o construtor permite.",
    kodar: "Cresce junto, até virar um sistema completo.",
  },
  {
    topic: "Atendimento",
    generic: "Chat de suporte genérico.",
    kodar: "Você fala direto com quem desenvolveu.",
  },
];

export type Step = {
  icon: "conversa" | "proposta" | "design" | "lancamento";
  title: string;
  text: string;
  deliverable: string;
};

export const steps: readonly Step[] = [
  {
    icon: "conversa",
    title: "Conversa",
    text: "Você conta como sua empresa funciona e o que precisa vender. A gente faz as perguntas certas.",
    deliverable: "Objetivo claro do projeto",
  },
  {
    icon: "proposta",
    title: "Proposta",
    text: "Escopo, etapas, prazo e investimento por escrito. Nada começa sem a sua aprovação.",
    deliverable: "Proposta fechada",
  },
  {
    icon: "design",
    title: "Design e código",
    text: "Desenho exclusivo e código próprio. Você vê as versões e opina em cada etapa.",
    deliverable: "Versões para aprovar",
  },
  {
    icon: "lancamento",
    title: "Lançamento",
    text: "Site no ar, medido e ajustado. A gente continua junto depois da entrega.",
    deliverable: "Site no ar e medindo",
  },
];
