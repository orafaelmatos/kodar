# Kodar

Site da **Kodar**, a software house que desenvolve sites, sistemas sob medida, automação e IA aplicada para empresas.

> Tecnologia com gente por trás.

Este repositório reúne a landing page institucional e todo o material da marca Kodar. Os sites de clientes são desenvolvidos em projetos e repositórios próprios.

Landing page em tema escuro, com cena 3D interativa no hero (Three.js), vitrine dos produtos (landing pages, sites e sistemas sob medida) com prévias animadas, princípios de conversão com mini animações, comparação com geradores de sites, linha do tempo do processo e dúvidas frequentes. Os contatos abrem o WhatsApp **(19) 99582-8704**, com mensagens específicas por produto. A identidade da marca está organizada em [`brand/`](brand/). Os mockups são ilustrativos: nomes e números neles não representam clientes reais.

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

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, ESLint e Prettier. Fontes auto-hospedadas com `next/font/local`. A cena 3D usa Three.js, carregado separadamente, com alternativa em SVG.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Ambiente local |
| `npm run build` / `npm start` | Exporta para `out/` e serve a versão de produção em http://127.0.0.1:3000 |
| `npm run brand` | Regenera tokens e logos a partir de `brand/` |
| `npm run lint` · `npm run typecheck` · `npm run format` | Qualidade de código |

## Publicação

O projeto gera arquivos estáticos na pasta `out/`, sem depender de servidor de aplicação. Essa pasta pode ser publicada em uma hospedagem estática. O servidor de `npm start` permite conferir a build local; `PORT` e `HOST` são opcionais.

O endereço principal usa `https://kodarsoft.com` por padrão. Para publicar em outro endereço, defina `NEXT_PUBLIC_SITE_URL` **antes da build**, para atualizar os metadados, o sitemap e os dados estruturados:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com npm run build
npm start
```

Os dados de contato ficam em `src/config/site.ts`. E-mail e redes sociais não confirmados não aparecem na página. Prazos, condições de suporte e projetos reais continuam como pendências em [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Licenças

O código é privado da Kodar. As fontes em `brand/fonts/` são distribuídas sob a SIL Open Font License 1.1; os arquivos de licença estão na mesma pasta.
