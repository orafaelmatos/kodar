export type Service = {
  id: "sites" | "sistemas" | "automacao" | "ia";
  number: string;
  title: string;
  description: string;
  features: readonly string[];
  message: string;
};

export const services: readonly Service[] = [
  {
    id: "sites",
    number: "01",
    title: "Sites e landing pages",
    description: "Um site que apresenta sua empresa com clareza e facilita o caminho até o contato.",
    features: [
      "Design com a sua identidade",
      "Boa experiência no celular",
      "Estrutura para aparecer no Google",
    ],
    message: "Olá, Kodar! Quero conversar sobre um site para minha empresa.",
  },
  {
    id: "sistemas",
    number: "02",
    title: "Sistemas sob medida",
    description: "Pedidos, clientes e processos em uma ferramenta feita para a rotina da sua empresa.",
    features: ["Gestão em um só lugar", "Área do cliente e painéis", "Integração entre ferramentas"],
    message: "Olá, Kodar! Quero conversar sobre um sistema sob medida.",
  },
  {
    id: "automacao",
    number: "03",
    title: "Automação de processos",
    description: "A gente conecta ferramentas e automatiza tarefas que hoje tomam o tempo da sua equipe.",
    features: ["Fluxos entre sistemas", "Relatórios automáticos", "Menos trabalho manual"],
    message: "Olá, Kodar! Quero automatizar processos da minha empresa.",
  },
  {
    id: "ia",
    number: "04",
    title: "IA aplicada ao negócio",
    description: "Assistentes que ajudam no atendimento, encontram informações e apoiam sua operação.",
    features: ["Assistentes para atendimento", "Consulta a documentos", "Respostas com os seus dados"],
    message: "Olá, Kodar! Quero entender como aplicar IA na minha empresa.",
  },
];
