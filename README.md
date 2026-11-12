# Kodar

Site da **Kodar**, a software house que desenvolve sites, sistemas sob medida, automação e IA aplicada para empresas.

> Tecnologia com gente por trás.

Este repositório tem o ambiente e a arquitetura do site, com toda a identidade da marca organizada em [`brand/`](brand/). O site ainda vai ser construído; o roteiro está em [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Começar

Requisitos: Node.js 20.9 ou mais recente (veja `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
```

## Mapa do repositório

| Onde | O quê |
| --- | --- |
| [`brand/`](brand/README.md) | **Marca:** posicionamento, tom de voz, logo, cores, tipografia, grafismo, aplicações, conteúdo do site, tokens, logos e fontes |
| [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) | Stack, pastas, fluxo dos tokens e convenções de código |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Próximos passos e pendências |
| `src/config/site.ts` | Nome, slogan, navegação, contatos e WhatsApp |
| `src/components/brand/` | `<Logo />` e `<Chevrons />` (grafismo) |
| `src/styles/tokens.css` | Gerado a partir de `brand/tokens.json` (não edite) |
| [`AGENTS.md`](AGENTS.md) | Instruções para agentes de IA (Claude Code, Cursor, Copilot…) |

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, ESLint e Prettier. Fontes auto-hospedadas com `next/font/local`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Ambiente local |
| `npm run build` / `npm start` | Build e servidor de produção |
| `npm run brand` | Regenera tokens e logos a partir de `brand/` |
| `npm run lint` · `npm run typecheck` · `npm run format` | Qualidade de código |

## Licenças

O código é privado da Kodar. As fontes em `brand/fonts/` são distribuídas sob a SIL Open Font License 1.1; os arquivos de licença estão na mesma pasta.
