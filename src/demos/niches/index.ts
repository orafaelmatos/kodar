import type { ComponentType } from "react";
import type { DemoClient, Niche } from "../types";
import { OdontoTemplate } from "./odonto/OdontoTemplate";
import { odontoMeta } from "./odonto/content";
import { OficinaTemplate } from "./oficina/OficinaTemplate";
import { oficinaMeta } from "./oficina/content";

type NicheEntry = {
  label: string;
  /** Template visual do nicho. Sem template, as demos desse nicho não são publicadas. */
  template?: ComponentType<{ client: DemoClient }>;
  /** Título e descrição para a página e para a prévia do link no WhatsApp. */
  meta?: (client: DemoClient) => { title: string; description: string };
};

export const niches: Record<Niche, NicheEntry> = {
  odonto: { label: "Clínica odontológica", template: OdontoTemplate, meta: odontoMeta },
  oficina: { label: "Oficina mecânica", template: OficinaTemplate, meta: oficinaMeta },
  marmoraria: { label: "Marmoraria" },
  marcenaria: { label: "Marcenaria e móveis planejados" },
  metalurgica: { label: "Pequena indústria e metalúrgica" },
};
