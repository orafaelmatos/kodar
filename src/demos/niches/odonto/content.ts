import type { DemoClient, DentalService } from "../../types";
import { yearsSince } from "../../utils";

export type TreatmentIcon = DentalService;

const treatments: Record<DentalService, { title: string; text: string }> = {
  implante: {
    title: "Implantodontia",
    text: "Converse sobre a reposição de dentes e conheça as possibilidades de tratamento para o seu caso.",
  },
  clareamento: {
    title: "Clareamento dental",
    text: "Conheça as opções de clareamento com orientação e acompanhamento profissional.",
  },
  ortodontia: {
    title: "Ortodontia",
    text: "Uma avaliação do alinhamento dos dentes e da mordida para planejar o cuidado com o seu sorriso.",
  },
  lentes: {
    title: "Lentes de contato dental",
    text: "Avalie as possibilidades para a estética do sorriso com atenção à saúde dos seus dentes.",
  },
  prevencao: {
    title: "Limpeza e prevenção",
    text: "Cuidados de rotina e orientação para manter a saúde bucal em dia.",
  },
  infantil: {
    title: "Odontopediatria",
    text: "Cuidado com a saúde bucal das crianças em cada etapa do desenvolvimento.",
  },
  clinico: {
    title: "Clínico geral",
    text: "O ponto de partida para cuidar da saúde bucal, avaliar seus dentes e conversar sobre o que você precisa.",
  },
  endodontia: {
    title: "Endodontia",
    text: "Avaliação e tratamento de canal, com atenção à preservação do dente e às necessidades de cada caso.",
  },
};

/** O conteúdo só apresenta especialidades e números informados nos dados do cliente. */
export function odontoContent(client: DemoClient) {
  const short = client.shortName ?? client.name;
  const book = `Olá, ${client.name}! Vim pelo site e quero agendar uma avaliação.`;
  const years = yearsSince(client.since);
  const services: readonly DentalService[] = client.dentalServices ?? [
    "implante",
    "clareamento",
    "ortodontia",
    "lentes",
    "prevencao",
    "infantil",
  ];
  const selectedTreatments = services.map((icon) => ({ icon, ...treatments[icon] }));
  const showSimulator = services.includes("clareamento");
  const hasMedia = Boolean(client.photos?.gallery?.length || client.videos?.length);
  const hasReviews = Boolean(client.testimonials?.length);

  return {
    book,
    showSimulator,
    hasMedia,
    hasReviews,
    nav: [
      { href: "#tratamentos", label: "Tratamentos" },
      ...(showSimulator ? [{ href: "#simulador", label: "Clareamento" }] : []),
      { href: "#clinica", label: "A clínica" },
      ...(hasMedia ? [{ href: "#galeria", label: "De perto" }] : []),
      ...(hasReviews ? [{ href: "#avaliacoes", label: "Avaliações" }] : []),
      { href: "#contato", label: "Contato" },
    ],
    hero: {
      badge: client.rating
        ? `${client.rating.score.toLocaleString("pt-BR")} no Google · ${client.rating.count} avaliações`
        : `Odontologia em ${client.city} · ${client.neighborhood ?? client.state}`,
      title: client.headline
        ? [client.headline]
        : ["O sorriso que você quer,", "com o cuidado que você merece."],
      text: `Na ${short}, o primeiro passo é entender o que você precisa. Conheça nossos tratamentos e agende uma avaliação em ${client.city}. Seu sorriso merece esse cuidado.`,
      perks: [
        "Agendamento pelo WhatsApp",
        client.neighborhood ? `Bairro ${client.neighborhood}` : `Em ${client.city}`,
      ],
      visualLabel: "Cada sorriso tem uma história.",
      visualText: "O seu cuidado começa com uma conversa.",
    },
    strip: selectedTreatments.map((treatment) => treatment.title),
    treatments: selectedTreatments,
    treatmentMessage: (title: string) =>
      `Olá, ${client.name}! Quero saber mais sobre ${title.toLowerCase()}.`,
    treatmentIntro: {
      title: "Diferentes cuidados.",
      accent: "Um só propósito: você.",
      text: "Conheça as áreas de atendimento da clínica. Na avaliação, converse com a equipe sobre o cuidado indicado para o seu caso.",
    },
    simulator: {
      eyebrow: "Simulador de clareamento",
      title: "Veja a diferença",
      accent: "antes de marcar.",
      text: "Arraste para explorar uma ilustração de mudança de tom. Converse com o dentista sobre as possibilidades para o seu sorriso.",
      note: "Simulação ilustrativa. O resultado varia de pessoa para pessoa.",
      cta: "Conversar sobre clareamento",
      message: `Olá, ${client.name}! Vi o simulador no site e quero saber sobre clareamento.`,
    },
    clinic: {
      eyebrow: `Conheça a ${short}`,
      title: "Mais perto de você.",
      accent: "Mais cuidado com seu sorriso.",
      text: `Estamos ${client.neighborhood ? `no bairro ${client.neighborhood}, em ` : "em "}${client.city}. Um lugar para dar o próximo passo no cuidado com a sua saúde bucal.`,
      stats: [
        years ? { value: years, suffix: "+", label: "anos de história" } : null,
        client.served ? { value: client.served, suffix: "+", label: "pacientes atendidos" } : null,
        client.rating
          ? { value: client.rating.score, decimals: 1, suffix: "", label: "de nota no Google" }
          : null,
      ].filter(Boolean) as { value: number; suffix: string; label: string; decimals?: number }[],
      features: [
        {
          title: "Seu momento de cuidado",
          text: "Conte o que você busca e tire suas dúvidas com a equipe.",
        },
        {
          title: "Entenda o próximo passo",
          text: "Converse sobre as opções de tratamento antes de decidir.",
        },
        {
          title: "Conheça as especialidades",
          text: selectedTreatments.map((treatment) => treatment.title).join(" · "),
        },
        {
          title: `Perto de você em ${client.city}`,
          text: client.address ?? `Fale com a equipe para saber como chegar à ${short}.`,
        },
      ],
    },
    gallery: {
      eyebrow: "De perto",
      title: "Pessoas de verdade.",
      accent: "Cuidado de perto.",
      text: `Registros e conteúdos da ${short}. Conheça um pouco da nossa rotina antes da sua visita.`,
    },
    steps: {
      eyebrow: "Vamos conversar?",
      title: "O primeiro passo é simples.",
      accent: "A gente te acompanha.",
      items: [
        {
          title: "Fale com a equipe",
          text: "Chame no WhatsApp e conte o que você procura para o seu sorriso.",
        },
        {
          title: "Combine sua avaliação",
          text: "Consulte os horários disponíveis e escolha um momento para a sua visita.",
        },
        {
          title: "Converse sobre o tratamento",
          text: "Tire suas dúvidas sobre as opções, as etapas e as condições antes de começar.",
        },
      ],
    },
    reviews: {
      eyebrow: "Avaliações",
      title: "Histórias de quem",
      accent: "cuida do sorriso com a gente.",
      items: client.testimonials ?? [],
    },
    faq: [
      {
        q: "Como agendar uma avaliação?",
        a: `É só chamar a ${short} pelo WhatsApp. Conte o que você precisa e consulte os horários disponíveis com a equipe.`,
      },
      {
        q: "Quais são as áreas de atendimento?",
        a: `A clínica atende nas áreas de ${selectedTreatments.map((treatment) => treatment.title.toLowerCase()).join(", ")}. Fale com a equipe para saber mais.`,
      },
      {
        q: "Onde fica a clínica?",
        a: client.address
          ? `Estamos na ${client.address}. Use o link do mapa para traçar sua rota.`
          : `Estamos em ${client.city}, ${client.state}. Consulte a equipe pelo WhatsApp para saber como chegar.`,
      },
      {
        q: "Como consultar valores e formas de pagamento?",
        a: "Converse com a equipe sobre a avaliação e as condições disponíveis. O planejamento depende das necessidades de cada pessoa.",
      },
    ],
    contactTitle: `Esperamos você na ${short}`,
    cta: {
      title: "Reserve um momento",
      accent: "para cuidar de você.",
      text: "Seu próximo passo começa com uma conversa. Fale com a equipe e agende sua avaliação.",
      button: "Conversar pelo WhatsApp",
      perks: ["Agendamento pelo WhatsApp", `${client.city} · ${client.state}`],
    },
    fabBubble: "Quer cuidar do seu sorriso? Fale com a nossa equipe.",
  };
}

export function odontoMeta(client: DemoClient) {
  const services = client.dentalServices?.map((service) => treatments[service].title).join(", ");
  return {
    title: `${client.name} · Dentista em ${client.city}`,
    description: `${services ?? "Cuidados para o seu sorriso"} em ${client.city}. Conheça a ${client.name} e agende uma avaliação pelo WhatsApp.`,
  };
}
