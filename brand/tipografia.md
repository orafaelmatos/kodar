# Tipografia

| Papel | Fonte | Classe | Por quê |
| --- | --- | --- | --- |
| Títulos | **Sora** 600 | `font-display` | Geométrica, de traço limpo e levemente futurista |
| Texto | **DM Sans** 400/500/600 | `font-sans` (padrão) | Humana, legível, boa em telas pequenas |
| Rótulos e código | **JetBrains Mono** 400/600 | `font-mono` | O detalhe "dev" da marca; use com moderação |

As três estão auto-hospedadas em [`fonts/`](fonts/) (versões variáveis, subset latino com acentos do português, licença SIL Open Font License) e são carregadas por `next/font/local` em `src/config/fonts.ts`. O build não depende do Google Fonts.

## Escala

Cada estilo vira uma classe do Tailwind com tamanho, altura de linha, peso e espaçamento já definidos.

| Estilo | Classe | Fonte | Tamanho / linha | Peso | Uso |
| --- | --- | --- | --- | --- | --- |
| display-xl | `text-display-xl` | Sora | 56 / 60 | 600 | Hero do site e capas |
| display-l | `text-display-l` | Sora | 40 / 46 | 600 | Títulos de seção |
| heading | `text-heading` | Sora | 28 / 34 | 600 | Títulos de página e blocos |
| title | `text-title` | Sora | 20 / 28 | 600 | Títulos de cards |
| body-l | `text-body-l` | DM Sans | 18 / 28 | 400 | Parágrafos de abertura |
| body | `text-body` | DM Sans | 16 / 26 | 400 | Texto corrido |
| body-s | `text-body-s` | DM Sans | 14 / 22 | 400 | Legendas e notas |
| label | `label` (utilitário) | JetBrains Mono | 12 / 16, +0.08em, caixa alta | 600 | Rótulos, eyebrows, tags |
| code | `text-code` | JetBrains Mono | 14 / 22 | 400 | Trechos de código |

`h1`, `h2` e `h3` já usam Sora por padrão (`globals.css`). Exemplo:

```tsx
<span className="label text-menta-forte">Serviços</span>
<h2 className="text-display-l">Do site ao sistema, do processo manual à IA.</h2>
<p className="text-body-l text-ink-muted">…</p>
```

## Regras

- No celular, reduza os títulos um degrau (ex.: `text-heading md:text-display-l`) ou use `clamp()`.
- Linhas de texto com cerca de 65 caracteres (`max-w-xl` a `max-w-2xl`).
- Títulos em caixa normal, com `text-wrap: balance` (já aplicado).
- Nunca use outra fonte para escrever "kodar" no lugar do logo.
