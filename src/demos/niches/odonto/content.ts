import type { DemoClient } from "../../types";
import { yearsSince } from "../../utils";

export type TreatmentIcon = "implante" | "clareamento" | "ortodontia" | "lentes" | "prevencao" | "infantil";

/** Textos padrão do nicho odontológico, preenchidos com os dados do cliente. */
export function odontoContent(client: DemoClient) {
  const short = client.shortName ?? client.name;
  const book = `Olá, ${client.name}! Vim pelo site e quero agendar uma avaliação.`;
  const years = yearsSince(client.since);

  return {
    book,
    nav: [
      { href: "#tratamentos", label: "Tratamentos" },
      { href: "#simulador", label: "Clareamento" },
      { href: "#clinica", label: "A clínica" },
      { href: "#avaliacoes", label: "Avaliações" },
      { href: "#contato", label: "Contato" },
    ],
    hero: {
      badge: client.rating
        ? `${client.rating.score.toLocaleString("pt-BR")} no Google · ${client.rating.count} avaliações`
        : `Clínica odontológica em ${client.city}`,
      title: client.headline
        ? [client.headline]
        : ["O sorriso que você quer,", "com o cuidado que você merece."],
      text: `Na ${client.name}, em ${client.city}, você tem avaliação completa, plano de tratamento claro e atendimento sem pressa. Do primeiro dia ao sorriso pronto.`,
      perks: ["Parcelamento facilitado", "Atendimento de urgência", "Raio-x digital na clínica"],
    },
    strip: [
      "Implantes",
      "Clareamento",
      "Alinhadores invisíveis",
      "Lentes de contato dental",
      "Ortodontia",
      "Odontopediatria",
      "Prevenção",
    ],
    treatments: [
      {
        icon: "implante",
        title: "Implantes dentários",
        text: "Volte a mastigar e sorrir com segurança, com dentes fixos de aparência natural.",
      },
      {
        icon: "clareamento",
        title: "Clareamento",
        text: "Dentes mais brancos com técnica segura e acompanhamento de perto a cada sessão.",
      },
      {
        icon: "ortodontia",
        title: "Ortodontia e alinhadores",
        text: "Aparelho tradicional ou alinhadores transparentes, do jeito que combina com a sua rotina.",
      },
      {
        icon: "lentes",
        title: "Lentes de contato dental",
        text: "Formato, cor e alinhamento do sorriso redesenhados com naturalidade.",
      },
      {
        icon: "prevencao",
        title: "Limpeza e prevenção",
        text: "Check-up, limpeza e orientação para manter o sorriso saudável por muito mais tempo.",
      },
      {
        icon: "infantil",
        title: "Odontopediatria",
        text: "Atendimento leve e paciente para as crianças criarem uma boa relação com o dentista.",
      },
    ] satisfies { icon: TreatmentIcon; title: string; text: string }[],
    treatmentMessage: (title: string) =>
      `Olá, ${client.name}! Quero saber mais sobre ${title.toLowerCase()}.`,
    simulator: {
      eyebrow: "Simulador de clareamento",
      title: "Veja a diferença",
      accent: "antes de marcar.",
      text: "Arraste para comparar o tom do sorriso antes e depois de um clareamento. Na avaliação, a gente mostra o que é possível no seu caso.",
      note: "Simulação ilustrativa. O resultado varia de pessoa para pessoa.",
      cta: "Quero clarear meus dentes",
      message: `Olá, ${client.name}! Vi o simulador no site e quero saber sobre clareamento.`,
    },
    clinic: {
      eyebrow: `Por que a ${short}`,
      title: "Tecnologia de ponta",
      accent: "e um atendimento que acolhe.",
      stats: [
        years ? { value: years, suffix: "+", label: "anos cuidando de sorrisos" } : null,
        client.served ? { value: client.served, suffix: "+", label: "pacientes atendidos" } : null,
        client.rating
          ? { value: client.rating.score, decimals: 1, suffix: "", label: "de nota no Google" }
          : null,
        { value: 12, suffix: "x", label: "para parcelar seu tratamento" },
      ].filter(Boolean) as { value: number; suffix: string; label: string; decimals?: number }[],
      features: [
        {
          title: "Sem dor e sem pressa",
          text: "Anestesia moderna e tempo de sobra para tirar todas as suas dúvidas.",
        },
        { title: "Plano claro", text: "Você conhece cada etapa, o prazo e o valor antes de começar." },
        {
          title: "Especialistas no mesmo lugar",
          text: "Implantes, ortodontia, estética e odontopediatria sem precisar mudar de clínica.",
        },
        { title: "Ambiente acolhedor", text: "Clínica moderna, higienizada e pensada para você relaxar." },
      ],
    },
    steps: {
      eyebrow: "Como agendar",
      title: "Do primeiro contato",
      accent: "ao sorriso pronto.",
      items: [
        {
          title: "Chame no WhatsApp",
          text: "Conte o que você precisa. A gente responde rápido e encontra o melhor horário.",
        },
        {
          title: "Avaliação completa",
          text: "Exame clínico, raio-x e uma conversa sem pressa sobre o seu sorriso.",
        },
        {
          title: "Plano e tratamento",
          text: "Você recebe o plano por escrito, com etapas, prazos e formas de pagamento.",
        },
      ],
    },
    reviews: {
      eyebrow: "Avaliações",
      title: "Quem sorri com a gente",
      accent: "recomenda.",
      items: client.testimonials ?? [
        {
          name: "Mariana S.",
          text: "Tinha pavor de dentista e saí encantada. Explicaram tudo e não senti dor nenhuma.",
        },
        {
          name: "Carlos E.",
          text: "Fiz implante e hoje como de tudo de novo. Atendimento impecável do começo ao fim.",
        },
        {
          name: "Juliana R.",
          text: "O clareamento ficou natural, exatamente como eu queria. Equipe muito atenciosa.",
        },
        {
          name: "Pedro A.",
          text: "Agendei pelo WhatsApp e fui atendido no mesmo dia, com dor. Salvaram minha semana.",
        },
        {
          name: "Fernanda L.",
          text: "Minha filha adora ir na consulta. Paciência e carinho que fazem diferença.",
        },
      ],
    },
    faq: [
      {
        q: "Vocês parcelam o tratamento?",
        a: "Sim. Trabalhamos com parcelamento no cartão e condições especiais para tratamentos maiores. Na avaliação, você recebe todas as opções.",
      },
      {
        q: "Atendem urgência?",
        a: "Sim. Em caso de dor ou acidente, chame no WhatsApp que a gente encaixa o atendimento o quanto antes.",
      },
      {
        q: "Implante dói?",
        a: "O procedimento é feito com anestesia e a maioria dos pacientes relata pouco desconforto. Antes de começar, explicamos cada passo.",
      },
      {
        q: "Quanto tempo dura o clareamento?",
        a: "Com bons hábitos e acompanhamento, o resultado dura bastante tempo. Na avaliação, indicamos a técnica certa para você.",
      },
      {
        q: "Atendem crianças?",
        a: "Sim. Temos odontopediatria, com uma abordagem leve e paciente para os pequenos.",
      },
    ],
    contactTitle: "Venha conhecer a clínica",
    cta: {
      title: "Seu novo sorriso começa",
      accent: "com uma mensagem.",
      text: "Agende sua avaliação pelo WhatsApp. A resposta é rápida e o atendimento, sem pressa.",
      button: "Agendar pelo WhatsApp",
    },
    fabBubble: "Olá! Quer agendar sua avaliação? A gente responde rapidinho.",
  };
}

export function odontoMeta(client: DemoClient) {
  return {
    title: `${client.name} · Dentista em ${client.city}`,
    description: `Implantes, clareamento, alinhadores e mais em ${client.city}. Agende sua avaliação pelo WhatsApp com a ${client.name}.`,
  };
}
