# Arquitetura

Este projeto é dedicado à landing page institucional da Kodar e à sua marca, documentada em `brand/`. Cada cliente é desenvolvido em um projeto e repositório próprios.

## Stack

| Camada | Escolha | Observação |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router) + **React 19** | Landing page institucional com exportação estática |
| Linguagem | **TypeScript** (strict) | Alias `@/*` → `src/*` |
| Estilo | **Tailwind CSS 4** | Tema gerado a partir de `brand/tokens.json` |
| Fontes | `next/font/local` | Sora, DM Sans e JetBrains Mono auto-hospedadas em `brand/fonts/` |
| Qualidade | ESLint (config Next) + Prettier (com ordenação de classes Tailwind) | `npm run lint`, `npm run format` |
| Publicação | Export estático (`output: "export"`) | `npm run build` gera `out/`, pronta para hospedagem estática. `npm start` serve essa pasta localmente |

## Estrutura de pastas

```
kodar/
├── brand/                     FONTE DA VERDADE DA MARCA (docs + tokens + logos + fontes)
├── docs/
│   ├── ARQUITETURA.md         este arquivo
│   └── ROADMAP.md             próximos passos e pendências
├── public/
│   └── brand/logos/           cópia gerada de brand/assets/logos (não edite)
├── scripts/
│   └── build-brand.mjs        brand/tokens.json → src/styles/tokens.css + copia logos
├── src/
│   ├── app/                   rotas (App Router)
│   │   ├── layout.tsx         <html lang="pt-BR">, fontes, metadados/SEO
│   │   ├── page.tsx           landing page, composição das seções e JSON-LD
│   │   ├── globals.css        Tailwind + tokens + estilos base da marca
│   │   ├── icon.svg           favicon (símbolo)
│   │   ├── apple-icon.png     ícone iOS 180px
│   │   └── opengraph-image.png imagem de compartilhamento 1200×630
│   ├── components/
│   │   └── brand/             primitivos da marca: Logo, Chevrons
│   ├── config/
│   │   ├── site.ts            nome, slogan, navegação, contatos, WhatsApp
│   │   └── fonts.ts           fontes da marca (next/font/local)
│   └── styles/
│       └── tokens.css         GERADO — variáveis CSS + @theme do Tailwind
├── AGENTS.md / CLAUDE.md      contexto para agentes de IA
└── README.md
```

### Onde colocar o que vier

| Tipo | Pasta | Exemplo |
| --- | --- | --- |
| Primitivos de UI reutilizáveis | `src/components/ui/` | `Button.tsx`, `Card.tsx`, `Badge.tsx` |
| Seções da home | `src/components/sections/` | `Hero.tsx`, `Services.tsx`, `Projects.tsx`, `About.tsx`, `Faq.tsx`, `FinalCta.tsx` |
| Layout global | `src/components/layout/` | `Header.tsx`, `Footer.tsx`, `MotionDirector.tsx` |
| Conteúdo estruturado | `src/content/` | `services.ts`, `projects.ts`, `faq.ts` (dados tipados, textos de `brand/conteudo-site.md`) |
| Imagens de projetos | `public/projects/` | `nome-do-projeto.webp` |
| Funções utilitárias | `src/lib/` | `cn.ts` (junção de classes) |

## Fluxo dos tokens da marca

```
brand/tokens.json ──(npm run brand)──► src/styles/tokens.css ──► globals.css ──► classes Tailwind
                                          ├─ :root            variáveis claras (--surface, --menta…)
                                          ├─ dark             tema escuro (sistema ou data-theme="dark")
                                          └─ @theme inline    bg-surface, text-ink, font-display, text-display-xl, rounded-md…
```

- `npm run brand` roda sozinho antes de `dev` e `build` (`predev`/`prebuild`).
- **Nunca edite `src/styles/tokens.css` nem `public/brand/`**: eles são sobrescritos.
- Para criar uma cor nova, adicione-a em `brand/tokens.json` com valor claro, valor escuro e `usage`, e documente em `brand/cores.md`.

## Convenções

- **Idioma:** conteúdo e documentação em português (pt-BR); código (nomes de componentes, variáveis, funções) em inglês. Tokens mantêm os nomes da marca (`menta`, `noite`, `papel`).
- **Componentes:** um por arquivo, nome em PascalCase, export nomeado. Server Components por padrão; `"use client"` só quando houver interação (menu mobile, acordeão com estado).
- **Estilo:** só classes do Tailwind geradas pelos tokens. Proibido hex solto, `px` arbitrário fora da escala ou fonte fora das três da marca.
- **Textos:** sigam `brand/tom-de-voz.md`. Contatos e links vêm de `src/config/site.ts`, nunca escritos direto no componente.
- **Acessibilidade:**
  - contraste mínimo de 4.5:1;
  - foco visível (já global);
  - `aria-label` em botões só com ícone;
  - respeito a `prefers-reduced-motion`;
  - acordeão com `<details>`/`<summary>` ou com ARIA correto.
- **Imagens:** `next/image`, formato WebP/AVIF, `alt` descritivo em português.
- **SEO:** metadados por página com `export const metadata`; títulos seguem o template `%s · Kodar`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor local em http://localhost:3000 (gera os tokens antes) |
| `npm run build` | Build de produção |
| `npm start` | Serve `out/` localmente; execute a build primeiro |
| `npm run brand` | Regenera tokens e logos a partir de `brand/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos |
| `npm run format` | Formata com Prettier |

## Landing page

- Seções em `src/components/sections/`; header, rodapé e controle de movimento em `src/components/layout/`.
- Menu mobile, controle de movimento, escultura, acordeão de serviços e simulação usam Client Components. As dúvidas usam `<details>` nativo.
- Serviços e dúvidas têm conteúdo tipado em `src/content/`. A simulação tem quatro etapas ilustrativas no componente `Solutions`.
- WhatsApp é o contato principal; todos os links usam `whatsappUrl()`, com mensagens contextualizadas.
- A página acompanha o tema do sistema e respeita movimento reduzido.
- `robots.ts`, `sitemap.ts`, metadados de compartilhamento e JSON-LD compõem o SEO técnico. `NEXT_PUBLIC_SITE_URL` define a origem antes da build.
- A análise de posicionamento e as decisões para a versão inicial estão em [`ANALISE-DA-MARCA.md`](ANALISE-DA-MARCA.md).

## Movimento e cena 3D

- `MotionDirector.tsx` coordena a pausa global, o movimento reduzido, o progresso de rolagem e as revelações por recorte.
- `KineticSculpture.tsx` carrega `kinetic-scene.ts` por importação dinâmica. A cena usa geometria própria, materiais com as cores dos tokens e iluminação de estúdio.
- A renderização usa aproximadamente 30 quadros por segundo, resolução limitada e interrupção fora da tela ou com a aba oculta. A cena estática respeita movimento reduzido.
- A alternativa em CSS mantém a composição quando WebGL não está disponível. O conteúdo e os contatos não dependem da cena.
- O slider da simulação aceita toque, mouse e teclado. Não há rolagem substituída nem cursor personalizado.
