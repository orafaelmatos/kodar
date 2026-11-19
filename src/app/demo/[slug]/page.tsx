import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clients, getClient } from "@/demos/clients";
import { niches } from "@/demos/niches";
import { demoUrl } from "@/demos/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return clients.filter((client) => niches[client.niche].template).map((client) => ({ slug: client.slug }));
}

export async function generateMetadata({ params }: PageProps<"/demo/[slug]">): Promise<Metadata> {
  const client = getClient((await params).slug);
  if (!client) return {};
  const meta = niches[client.niche].meta?.(client) ?? { title: client.name, description: client.name };
  return {
    title: { absolute: meta.title },
    description: meta.description,
    openGraph: {
      type: "website",
      locale: "pt_BR",
      title: meta.title,
      description: meta.description,
      url: demoUrl(client),
      siteName: client.name,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function DemoPage({ params }: PageProps<"/demo/[slug]">) {
  const client = getClient((await params).slug);
  const Template = client ? niches[client.niche].template : undefined;
  if (!client || !Template) notFound();
  return <Template client={client} />;
}
