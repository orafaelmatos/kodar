import { Chevrons } from "@/components/brand/Chevrons";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/config/site";

/**
 * Página provisória: só confirma que marca, fontes e tokens estão funcionando.
 * O site real será construído a partir de brand/conteudo-site.md e docs/ROADMAP.md.
 */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-10 px-4 py-16 sm:px-8">
      <Logo className="h-12 w-auto self-start" />
      <div className="flex flex-col gap-4">
        <span className="label text-menta-forte">Em construção</span>
        <h1 className="text-display-xl">{site.slogan}</h1>
        <p className="max-w-xl text-body-l text-ink-muted">{site.description}</p>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-noite p-6">
        <Logo tone="negative" className="relative h-10 w-auto" />
        <Chevrons count={4} className="absolute top-1/2 -right-6 h-28 -translate-y-1/2" />
      </div>
    </main>
  );
}
