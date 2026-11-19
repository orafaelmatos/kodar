import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { clients } from "@/demos/clients";
import { niches } from "@/demos/niches";
import { demoUrl } from "@/demos/utils";
import { DemoShareActions } from "@/demos/components/DemoShareActions";

export const metadata: Metadata = { title: "Demos" };

/** Painel interno: todas as demos, com link e mensagem pronta para enviar ao cliente. */
export default function DemoIndex() {
  const groups = (Object.keys(niches) as (keyof typeof niches)[]).map((niche) => ({
    niche,
    label: niches[niche].label,
    ready: Boolean(niches[niche].template),
    items: clients.filter((client) => client.niche === niche),
  }));

  return (
    <main className="min-h-dvh bg-surface px-4 py-16 text-ink md:px-16">
      <div className="mx-auto max-w-5xl">
        <Logo variant="wordmark" tone="negative" className="h-7 w-auto" />
        <h1 className="mt-10 font-display text-display-l">Demos para clientes</h1>
        <p className="mt-4 max-w-2xl text-body-l text-ink-muted">
          Cada demo usa o visual do nicho com os dados do cliente. Envie o link pelo WhatsApp no primeiro
          contato. Para criar uma nova, rode <code className="font-mono text-ink">npm run demo:new</code>.
        </p>

        <div className="mt-16 flex flex-col gap-10">
          {groups.map((group) => (
            <section key={group.niche} aria-labelledby={`niche-${group.niche}`}>
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <h2 id={`niche-${group.niche}`} className="font-display text-title">
                  {group.label}
                </h2>
                <span className="label text-ink-muted">
                  {group.ready ? "Template pronto" : "Em produção"}
                </span>
              </div>
              {group.items.length ? (
                <ul className="flex flex-col">
                  {group.items.map((client) => (
                    <li
                      key={client.slug}
                      className="flex flex-col gap-4 border-b border-line py-6 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-display text-title">{client.name}</p>
                        <p className="text-body-s text-ink-muted">
                          {client.city} - {client.state} · /demo/{client.slug}
                        </p>
                      </div>
                      {group.ready ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={`/demo/${client.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-line px-4 text-body-s font-semibold hover:border-menta"
                          >
                            Abrir <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                          <DemoShareActions
                            url={demoUrl(client)}
                            whatsapp={client.whatsapp}
                            message={`Oi${client.contactName ? `, ${client.contactName}` : ""}! Tudo bem? Aqui é o Rafael, da Kodar. Preparei uma prévia de como poderia ficar o site da ${client.name}: ${demoUrl(client)}\n\nMe conta o que achou?`}
                          />
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-6 text-body-s text-ink-muted">Nenhuma demo ainda.</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
