import type { DemoClient } from "../types";
import { sorrisoVivo } from "./odonto-sorriso-vivo";
import { torque } from "./oficina-torque";

/**
 * Todas as demos publicadas em /demo/<slug>.
 * Para criar uma nova: `npm run demo:new` (ou copie um arquivo desta pasta e adicione aqui).
 */
export const clients: readonly DemoClient[] = [sorrisoVivo, torque];

export function getClient(slug: string) {
  return clients.find((client) => client.slug === slug);
}
