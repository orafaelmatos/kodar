# Kodar — instruções para agentes de IA

Este é o repositório do site da **Kodar**, a software house de Rafael Soares Matos que desenvolve sites, sistemas sob medida, automação e IA aplicada para empresas. O slogan é "Tecnologia com gente por trás."

## Leia antes de qualquer tarefa

1. [`brand/README.md`](brand/README.md): resumo da marca e índice. **A pasta `brand/` é a fonte da verdade.**
2. [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md): stack, pastas e convenções.
3. [`docs/ROADMAP.md`](docs/ROADMAP.md): o que construir a seguir.
4. Para textos e seções do site: [`brand/conteudo-site.md`](brand/conteudo-site.md) e [`brand/tom-de-voz.md`](brand/tom-de-voz.md).

## Regras da marca (obrigatórias)

- **Cores:** use só os tokens via Tailwind: `bg-surface`, `bg-surface-raised`, `text-ink`, `text-ink-muted`, `border-line`, `bg-noite`, `bg-noite-claro`, `bg-menta`, `text-menta-forte`, `bg-nevoa`, `text-papel`, `bg-coral`, `text-coral-forte` e `text-on-brand`.
  - Nunca escreva hex solto em componentes.
  - Botão primário: `bg-menta text-on-brand`. Nunca texto branco sobre menta.
  - Menta não é cor de texto sobre fundo claro; para texto, use `text-menta-forte`.
  - Coral só em pequenos detalhes (até 10%) e nunca dentro do logo.
- **Tipografia:**
  - títulos com `font-display` (Sora) e os estilos `text-display-xl`, `text-display-l`, `text-heading` e `text-title`;
  - texto com `font-sans` (DM Sans) e `text-body-l`, `text-body` e `text-body-s`;
  - rótulos com o utilitário `label` (JetBrains Mono, caixa alta).
- **Espaço e cantos:**
  - escala `1, 2, 4, 6, 10, 16` do Tailwind (4 a 64px);
  - `rounded-sm` (6), `rounded-md` (12, botões e cards), `rounded-lg` (20, painéis) e `rounded-pill`;
  - bordas `line` em vez de sombras.
- **Logo:** sempre pelo componente `<Logo />` (`src/components/brand/Logo.tsx`) ou pelos SVGs de `public/brand/logos/`. Nunca recrie o logo nem escreva "kodar" em fonte no lugar dele.
- **Grafismo:** `<Chevrons />`: colchetes `<` em menta sobre `noite`, no máximo 5, sangrando para fora do bloco.
- **Tom de voz:**
  - pt-BR, fale com "você" e chame a Kodar de "a gente";
  - frases curtas, sem jargão, sem emoji e sem exclamações exageradas;
  - escreva "IA" e "site".
- **Dados de contato e links:** sempre de `src/config/site.ts` (use `whatsappUrl()`).
- **Tema:** a landing page é só escura. Profundidade vem da cena 3D, de brilhos radiais de menta e de bordas `line`.
- **Proibido:** gradientes azul-roxo ou de várias cores, ícones emoji, robôs 3D, fotos de banco de imagens genéricas, fontes fora das três da marca.

## Demos para clientes (`src/demos/`)

- Landing pages de demonstração por nicho, publicadas em `/demo/<slug>` (noindex). Leia [`src/demos/README.md`](src/demos/README.md).
- **As regras da marca Kodar acima não se aplicam às demos**: cada nicho tem cores (hex nos `theme.css` do nicho), fonte (`next/font/google`) e estilo próprios. Só a faixa da Kodar (`KodarBar`) e o crédito do rodapé usam a marca.
- Dados do cliente em `src/demos/clients/`; textos e visual do nicho em `src/demos/niches/<nicho>/`. Nunca invente nota, avaliações ou números: use os campos do cliente.

## Arquivos gerados (não edite)

- `src/styles/tokens.css` e `public/brand/logos/` são gerados por `npm run brand` a partir de `brand/tokens.json` e `brand/assets/logos/`. Para mudar um valor, edite o JSON e rode o script.

## Convenções de código

- Next.js App Router, Server Components por padrão; `"use client"` só com interação.
- Código em inglês, conteúdo em português.
- Pastas:
  - `src/components/ui` para primitivos;
  - `src/components/sections` para seções;
  - `src/components/layout` para header e footer;
  - `src/content` para dados tipados.
- Acessibilidade:
  - contraste de 4.5:1 ou mais;
  - foco visível;
  - `aria-label` em botões só com ícone;
  - respeito a `prefers-reduced-motion`.
- Antes de concluir uma tarefa, rode `npm run lint`, `npm run typecheck` e `npm run build`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
