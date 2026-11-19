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
│   │   ├── brand/             primitivos da marca: Logo, Chevrons
│   │   ├── layout/            Header, Footer, FloatingWhatsApp, MotionDirector
│   │   ├── mockups/           composições animadas dos produtos (decorativas)
│   │   ├── sections/          seções da home
│   │   ├── three/             cena 3D do hero (Three.js)
│   │   └── ui/                Button, TiltCard, WhatsAppIcon
│   ├── content/               products.ts, conversion.ts, faq.ts
│   ├── demos/                 demos de clientes por nicho (ver src/demos/README.md)
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
| Seções da home | `src/components/sections/` | `Hero.tsx`, `Products.tsx`, `Conversion.tsx`, `Faq.tsx`, `FinalCta.tsx` |
| Layout global | `src/components/layout/` | `Header.tsx`, `Footer.tsx`, `MotionDirector.tsx` |
| Conteúdo estruturado | `src/content/` | `products.ts`, `conversion.ts`, `faq.ts` (dados tipados, textos de `brand/conteudo-site.md`) |
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

- Tema escuro fixo (`data-theme="dark"` em `layout.tsx`).
- Seções em `src/components/sections/`, na ordem: `Hero`, `Marquee`, `Products`, `Conversion`, `Comparison`, `Process`, `Faq`, `FinalCta`.
- Header, rodapé, botão fixo de WhatsApp e controle de movimento ficam em `src/components/layout/`.
- Conteúdo tipado em `src/content/`: `products.ts`, `conversion.ts` (princípios, comparação e etapas) e `faq.ts`.
- WhatsApp é o contato principal; todos os links usam `whatsappUrl()`, com mensagens por produto.
- `robots.ts`, `sitemap.ts`, metadados de compartilhamento e JSON-LD (`ProfessionalService` e `FAQPage`) compõem o SEO técnico. `NEXT_PUBLIC_SITE_URL` define a origem antes da build.

## Movimento e cena 3D

- `src/components/three/HeroScene.tsx` carrega `hero-scene.ts` (Three.js) por importação dinâmica, quando o navegador fica ocioso. A cena tem um fundo de fluido (shader), um arco de objetos 3D feitos com geometria própria e uma linha de luz; ela lê as cores das variáveis da marca e encaixa o arco na área `.hero-art`, acima do texto.
- `src/components/ui/SplitWords.tsx` quebra títulos em palavras para a entrada com desfoque; o `Button` faz o texto rolar letra a letra no hover.
- Desempenho: resolução limitada, cerca de 60 quadros por segundo em computadores e 30 em celulares, sem vidro com transmissão em aparelhos modestos, e pausa fora da tela ou com a aba oculta.
- Sem WebGL, os colchetes em SVG continuam no lugar. O conteúdo e os contatos não dependem da cena.
- `src/components/mockups/ProductMockups.tsx`: composições dos produtos em HTML e CSS (animações em `globals.css`, classes `.mock-*`).
- `src/components/ui/TiltCard.tsx`: inclinação 3D e luz que seguem o mouse.
- `MotionDirector.tsx` (sem interface) respeita `prefers-reduced-motion` (`<html data-motion>`) e revela elementos com `data-reveal`. Com movimento reduzido, as animações CSS param e a cena fica estática.
- `Products.tsx` é a vitrine com abas acessíveis (setas, Home e End); o progresso avança sozinho só com a seção na tela e pausa com o mouse ou o foco dentro dela.
- Não há rolagem substituída nem cursor personalizado.

## Demos para clientes

- Rotas em `src/app/demo/`: painel interno (`/demo`) e uma página estática por cliente (`/demo/[slug]`, com `generateStaticParams` e `dynamicParams = false`). O layout marca tudo como noindex e o `robots.txt` bloqueia `/demo/`.
- `src/demos/` separa **dados do cliente** (`clients/`) de **visual do nicho** (`niches/<nicho>/`: textos, tema, template e peças interativas). Componentes comuns em `src/demos/components/` e base de estilo em `src/demos/styles/demos.css`, com variáveis `--d-*`.
- `npm run demo:new` (`scripts/new-demo.mjs`) cria o arquivo do cliente e o registra em `clients/index.ts`.
- As demos não seguem a marca Kodar (cores e fontes próprias por nicho); só a faixa `KodarBar` e o crédito do rodapé usam a marca.

