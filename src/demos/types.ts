/**
 * Dados de um cliente de demonstração. O visual vem do nicho; tudo o que muda de um
 * cliente para outro (nome, cidade, contato, números) fica aqui.
 * Veja src/demos/README.md para criar uma demo nova.
 */
export type Niche = "odonto" | "oficina" | "marmoraria" | "marcenaria" | "metalurgica";

export type DentalService =
  "implante" | "clareamento" | "ortodontia" | "lentes" | "prevencao" | "infantil" | "clinico" | "endodontia";

export type DemoClient = {
  /** Endereço da demo: /demo/<slug>. Só letras minúsculas, números e hífen. */
  slug: string;
  niche: Niche;
  /** Nome completo da empresa, como aparece no título e no rodapé. */
  name: string;
  /** Nome curto para o logo do topo (opcional). */
  shortName?: string;
  /** Com quem você está falando. Aparece na saudação da faixa da Kodar. */
  contactName?: string;
  city: string;
  state: string;
  neighborhood?: string;
  /** Endereço completo, usado no mapa. */
  address?: string;
  /** WhatsApp da empresa, só números com DDI e DDD: 5519999999999. */
  whatsapp: string;
  /** Telefone para exibir (opcional). */
  phone?: string;
  instagram?: string;
  /** Linhas de horário, ex.: ["Seg a sex · 8h às 19h", "Sáb · 8h às 12h"]. */
  hours?: string[];
  /** Ano de fundação, para "X anos de experiência". */
  since?: number;
  /** Nota e quantidade de avaliações no Google. */
  rating?: { score: number; count: number };
  /** Número de clientes atendidos (ex.: pacientes, carros, projetos). */
  served?: number;
  /** Responsável técnico, quando o nicho exige (ex.: CRO na odontologia). */
  responsible?: string;
  /** Troca o título principal padrão do nicho. */
  headline?: string;
  /** Identidade própria do cliente. As paletas ficam no theme.css do nicho. */
  brand?: { theme?: "forest"; logo?: string; logoAlt?: string };
  /** Especialidades confirmadas da clínica; omita para usar o modelo do nicho. */
  dentalServices?: readonly DentalService[];
  /**
   * Fotos reais do cliente (caminho em /public ou URL). Sem elas, o template usa
   * a ilustração do nicho. Use imagens já otimizadas (WebP, até ~300 KB).
   */
  photos?: {
    hero?: string;
    heroAlt?: string;
    gallery?: readonly {
      src: string;
      alt: string;
      caption?: string;
      sourceUrl?: string;
      sourceLabel?: string;
    }[];
  };
  /** Vídeos locais da clínica, exibidos com controles e sem reprodução automática. */
  videos?: readonly { src: string; poster?: string; caption: string }[];
  /** Depoimentos reais. Na odontologia, a seção fica oculta quando não há itens. */
  testimonials?: { name: string; text: string }[];
};
