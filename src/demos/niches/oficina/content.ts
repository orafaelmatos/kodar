import type { DemoClient } from "../../types";
import { yearsSince } from "../../utils";

export type ServiceArt = "revisao" | "oleo" | "freios" | "suspensao" | "diagnostico" | "manutencao";

/** Textos padrão do nicho oficina mecânica, preenchidos com os dados do cliente. */
export function oficinaContent(client: DemoClient) {
  const short = client.shortName ?? client.name;
  const quote = `Olá, ${client.name}! Quero um orçamento. Meu carro é: `;
  const years = yearsSince(client.since);
  const place = client.neighborhood ? `${client.neighborhood}, ${client.city}` : client.city;

  /* Indicadores: números só quando existem nos dados; o resto completa com itens qualitativos. */
  const numbers = [
    client.rating
      ? {
          value: client.rating.score,
          decimals: 1,
          suffix: "",
          label: `de nota no Google · ${client.rating.count} avaliações`,
        }
      : null,
    years ? { value: years, decimals: 0, suffix: "+", label: "anos de oficina" } : null,
    client.served ? { value: client.served, decimals: 0, suffix: "+", label: "veículos atendidos" } : null,
  ].filter(Boolean) as { value: number; decimals: number; suffix: string; label: string }[];
  const qualities = [
    { title: "Orçamento", label: "antes de qualquer serviço" },
    { title: "Fotos", label: "das peças pelo WhatsApp" },
    { title: "Garantia", label: "em peças e mão de obra" },
    { title: "Scanner", label: "para diagnóstico eletrônico" },
  ];

  return {
    quote,
    nav: [
      { href: "#servicos", label: "Serviços" },
      { href: "#sobre", label: "Sobre" },
      { href: "#avaliacoes", label: "Avaliações" },
      { href: "#contato", label: "Contato" },
    ],
    hero: {
      label: `Oficina mecânica · ${place}`,
      title: client.headline
        ? [client.headline]
        : ["Diagnóstico certo.", "Orçamento antes.", "Carro no prazo."],
      text: `Revisão, freios, suspensão e injeção eletrônica em ${client.city}. Você recebe o orçamento com fotos pelo WhatsApp e só autoriza o que quiser.`,
      cta: "Pedir orçamento no WhatsApp",
      micro: "Mande o modelo do carro e o que está acontecendo. Pode ser por áudio.",
      proof: client.rating
        ? `${client.rating.score.toLocaleString("pt-BR")} no Google · ${client.rating.count} avaliações`
        : "Orçamento sem compromisso",
    },
    trust: { numbers, qualities: qualities.slice(0, Math.max(0, 4 - numbers.length)) },
    services: {
      eyebrow: "Serviços",
      title: "O que a gente resolve",
      accent: "no seu carro.",
      text: "Da troca de óleo ao diagnóstico eletrônico. Passe o mouse ou toque em um serviço para ver o que está incluso.",
      items: [
        {
          art: "revisao",
          title: "Revisão",
          text: "Revisão por quilometragem ou antes de viajar, seguindo o manual do fabricante.",
          includes: ["Checklist de itens", "Filtros e fluidos", "Relatório do que precisa de atenção"],
        },
        {
          art: "oleo",
          title: "Troca de óleo",
          text: "Óleo certo para o seu motor, com troca de filtro e conferência dos níveis.",
          includes: ["Óleo na especificação", "Filtro de óleo", "Níveis completados"],
        },
        {
          art: "freios",
          title: "Freios",
          text: "Pastilhas, discos e fluido. Freio que chia, puxa ou está baixo merece atenção logo.",
          includes: ["Pastilhas e discos", "Fluido de freio", "Teste de frenagem"],
        },
        {
          art: "suspensao",
          title: "Suspensão",
          text: "Amortecedores, molas, buchas e alinhamento para o carro voltar a ficar firme.",
          includes: ["Amortecedores e molas", "Buchas e pivôs", "Barulhos em lombadas"],
        },
        {
          art: "diagnostico",
          title: "Diagnóstico eletrônico",
          text: "Luz acesa no painel? O scanner lê a falha e a gente confirma a causa antes de trocar peça.",
          includes: ["Leitura com scanner", "Injeção e ignição", "Sensores e módulos"],
        },
        {
          art: "manutencao",
          title: "Manutenção preventiva e corretiva",
          text: "Do item que vence ao conserto que não pode esperar, com prazo combinado.",
          includes: ["Correias e arrefecimento", "Embreagem", "Parte elétrica"],
        },
      ] satisfies { art: ServiceArt; title: string; text: string; includes: string[] }[],
      message: (title: string) =>
        `Olá, ${client.name}! Quero um orçamento de ${title.toLowerCase()}. Meu carro é: `,
    },
    why: {
      eyebrow: `Por que a ${short}`,
      statement: "Aqui você vê a peça que saiu do seu carro.",
      text: "Oficina boa é a que explica. Antes de mexer, a gente mostra o problema, passa o valor e combina o prazo.",
      reasons: [
        {
          title: "Diagnóstico antes da troca",
          text: "Scanner e teste na mão. A gente encontra a causa antes de sugerir qualquer peça.",
        },
        {
          title: "Orçamento por escrito",
          text: "Peça e mão de obra separadas, enviadas pelo WhatsApp para você decidir com calma.",
        },
        {
          title: "Prazo combinado",
          text: "Você sabe quando buscar o carro. Se algo mudar, a gente avisa antes.",
        },
        {
          title: "Garantia no serviço",
          text: "Peças com nota fiscal e garantia em peças e mão de obra.",
        },
      ],
    },
    steps: {
      eyebrow: "Como funciona",
      title: "Do primeiro contato",
      accent: "à entrega do carro.",
      items: [
        {
          title: "Chame no WhatsApp",
          text: "Mande o modelo, o ano e o que está acontecendo. Pode ser por áudio.",
        },
        {
          title: "Explique o problema",
          text: "Barulho, luz no painel ou revisão vencendo. Se precisar, a gente marca um horário.",
        },
        {
          title: "Receba o orçamento",
          text: "Diagnóstico, fotos, valor e prazo antes de qualquer serviço.",
        },
        {
          title: "Carro pronto",
          text: "Com o seu ok, a gente executa, testa e entrega com as peças trocadas.",
        },
      ],
    },
    diagnosis: {
      eyebrow: "Transparência",
      title: "Você vê o que",
      accent: "a gente vê.",
      text: "O diagnóstico chega no seu WhatsApp com a leitura do scanner, fotos das peças e o que é urgente ou pode esperar.",
      points: [
        "Separamos o que é urgente do que pode esperar",
        "Fotos e vídeos das peças antes da troca",
        "Nada é feito sem a sua autorização",
      ],
      cta: "Quero um diagnóstico",
      message: `Olá, ${client.name}! Meu carro está com um problema e quero um diagnóstico. O carro é: `,
    },
    reviews: {
      eyebrow: "Avaliações",
      title: "Quem traz o carro",
      accent: "volta.",
      text: "O que os clientes contam depois de buscar o carro.",
      items: client.testimonials ?? [
        {
          name: "Ricardo M.",
          text: "Mandaram foto da pastilha gasta e o orçamento antes de trocar. Primeira oficina que me explicou tudo sem enrolação.",
        },
        {
          name: "Aline P.",
          text: "A luz da injeção acendeu na estrada. Fizeram o diagnóstico no mesmo dia e o preço foi o combinado.",
        },
        {
          name: "Marcos T.",
          text: "Faço as revisões aqui há anos. Prazo cumprido e o carro volta limpo.",
        },
      ],
    },
    faq: [
      {
        q: "O orçamento é sem compromisso?",
        a: "Sim. Você manda uma mensagem explicando o problema ou traz o carro, e a gente passa o orçamento antes de qualquer serviço.",
      },
      {
        q: "Preciso agendar ou posso chegar?",
        a: "Pode chegar, mas agendando pelo WhatsApp você garante horário e não espera.",
      },
      {
        q: "Vou saber o que foi trocado?",
        a: "Sim. As peças substituídas ficam separadas para você ver, e mandamos fotos pelo WhatsApp sempre que possível.",
      },
      {
        q: "Vocês dão garantia?",
        a: "Sim. Os serviços e as peças têm garantia, e o prazo vem informado no orçamento.",
      },
      {
        q: "Quanto tempo o carro fica na oficina?",
        a: "Depende do serviço. Troca de óleo e revisões simples costumam sair no mesmo dia. O prazo de cada serviço vem no orçamento.",
      },
      {
        q: "Quais as formas de pagamento?",
        a: "Pix, cartão de débito e crédito. Consulte as condições de parcelamento pelo WhatsApp.",
      },
    ],
    cta: {
      title: ["Barulho estranho?", "Luz no painel?"],
      accent: "Manda uma mensagem.",
      text: "Conte o que está acontecendo e receba uma orientação ainda hoje.",
      button: "Chamar no WhatsApp",
      micro: "Pode mandar áudio ou vídeo do barulho.",
      message: `Olá, ${client.name}! Meu carro está com um problema. Posso mandar um áudio explicando?`,
    },
    fabBubble: "Precisa de um orçamento? Manda o modelo do carro aqui.",
  };
}

export function oficinaMeta(client: DemoClient) {
  return {
    title: `${client.name} · Oficina mecânica em ${client.city}`,
    description: `Revisão, troca de óleo, freios, suspensão e diagnóstico eletrônico em ${client.city}. Orçamento com fotos pelo WhatsApp na ${client.name}.`,
  };
}
