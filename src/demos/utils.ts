import { site, whatsappUrl } from "@/config/site";
import type { DemoClient } from "./types";

/** Link de WhatsApp da empresa do cliente, com mensagem pronta. */
export function clientWhatsapp(client: DemoClient, message: string) {
  return `https://wa.me/${client.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Link de WhatsApp da Kodar, a partir da demo de um cliente. */
export function kodarWhatsapp(client: DemoClient) {
  return whatsappUrl(`Olá, Kodar! Vi a prévia do site da ${client.name} e quero conversar sobre ela.`);
}

/** Endereço público da demo. */
export function demoUrl(client: DemoClient) {
  return `${site.url}/demo/${client.slug}`;
}

/** Busca do endereço no Google Maps. */
export function mapsUrl(client: DemoClient) {
  const query = client.address ?? `${client.name}, ${client.city} - ${client.state}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function yearsSince(year?: number) {
  return year ? Math.max(1, new Date().getFullYear() - year) : undefined;
}

/** Telefone para exibir: usa `phone` ou formata o WhatsApp brasileiro. */
export function displayPhone(client: DemoClient) {
  if (client.phone) return client.phone;
  const digits = client.whatsapp.replace(/^55/, "");
  return digits.length === 11 ? `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}` : digits;
}

export function formatNumber(value: number) {
  return value.toLocaleString("pt-BR");
}
