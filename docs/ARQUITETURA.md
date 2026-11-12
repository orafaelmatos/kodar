# Arquitetura

## Stack

| Camada | Escolha | Observação |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router) + **React 19** | Páginas estáticas por padrão; pronto para crescer para área do cliente e APIs |
| Linguagem | **TypeScript** (strict) | Alias `@/*` → `src/*` |
| Estilo | **Tailwind CSS 4** | Tema gerado a partir de `brand/tokens.json` |
| Fontes | `next/font/local` | Sora, DM Sans e JetBrains Mono auto-hospedadas em `brand/fonts/` |
| Qualidade | ESLint (config Next) + Prettier (com ordenação de classes Tailwind) | `npm run lint`, `npm run format` |
| Hospedagem sugerida | Vercel | Também funciona como export estático (`output: "export"`) se preferir hospedagem comum |

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
│   │   ├── page.tsx           home (provisória até o site ser construído)
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
| Layout global | `src/components/layout/` | `Header.tsx`, `Footer.tsx`, `WhatsAppButton.tsx` |
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
| `npm run brand` | Regenera tokens e logos a partir de `brand/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos |
| `npm run format` | Formata com Prettier |
