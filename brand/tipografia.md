# Tipografia

| Papel | Fonte | Classe | Por quê |
| --- | --- | --- | --- |
| Títulos | **Sora** 400 (grandes) e 500 (pequenos) | `font-display` | Geométrica, de traço limpo e levemente futurista |
| Texto | **DM Sans** 400/500/600 | `font-sans` (padrão) | Humana, legível, boa em telas pequenas |
| Rótulos e código | **JetBrains Mono** 400/600 | `font-mono` | O detalhe "dev" da marca; use com moderação |

As três estão auto-hospedadas em [`fonts/`](fonts/) (versões variáveis, subset latino com acentos do português, licença SIL Open Font License) e são carregadas por `next/font/local` em `src/config/fonts.ts`. O build não depende do Google Fonts.

## Escala

Cada estilo vira uma classe do Tailwind com tamanho, altura de linha, peso e espaçamento já definidos.

| Estilo | Classe | Fonte | Tamanho / linha | Peso | Uso |
| --- | --- | --- | --- | --- | --- |
| display-xl | `text-display-xl` | Sora | fluido, 48–100 / 0.98, −0.035em | 400 | Hero do site |
| display-l | `text-display-l` | Sora | fluido, 36–52 / 1.08, −0.03em | 400 | Títulos de seção |
| heading | `text-heading` | Sora | 28 / 34 | 500 | Títulos de página e blocos |
| title | `text-title` | Sora | 20 / 28 | 500 | Títulos de cards |
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

## Aplicação editorial e movimento

Na landing page animada, o hero usa três linhas com Sora, entreletra mais fechada e entrada sequencial. A última linha pode usar contorno em `papel` sobre `noite`. O texto permanece no HTML. No celular, o hero usa escala fluida entre 44 e 76px, limitada pela largura disponível. Os demais textos conservam a escala da marca.

O logotipo grande do rodapé continua sendo o SVG oficial pelo componente `<Logo />`.

## Títulos grandes em peso regular

Títulos grandes usam Sora **400** com espaçamento negativo (−0.03em a −0.04em) e entrelinha curta. O peso leve em tamanho grande passa sofisticação; o contraste vem do tamanho, não do negrito. No site, as palavras do hero e dos títulos de seção entram uma a uma, com desfoque (`SplitWords`).
