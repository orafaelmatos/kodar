# Espaço, formas e grafismo

## Espaçamento

| Token | Valor | Classe Tailwind equivalente | Uso |
| --- | --- | --- | --- |
| `space-1` | 4px | `1` (`gap-1`, `p-1`) | Ícone e texto |
| `space-2` | 8px | `2` | Tags, itens próximos |
| `space-3` | 16px | `4` | Padding de botões e campos; margem lateral mínima no celular |
| `space-4` | 24px | `6` | Padding de cards |
| `space-5` | 40px | `10` | Entre blocos de uma seção |
| `space-6` | 64px | `16` | Entre seções do site |

O Tailwind usa base de 4px, então a escala da marca corresponde a `1, 2, 4, 6, 10, 16`. Fique nesses degraus.

## Cantos

| Token | Valor | Classe | Uso |
| --- | --- | --- | --- |
| `radius-sm` | 6px | `rounded-sm` | Tags, campos, elementos pequenos |
| `radius-md` | 12px | `rounded-md` | Botões e cards |
| `radius-lg` | 20px | `rounded-lg` | Painéis grandes, imagens, blocos `noite` |
| `radius-pill` | 999px | `rounded-pill` | Pílulas e chips |

Cantos arredondados repetem as pontas arredondadas do wordmark.

## Bordas e profundidade

- Prefira **bordas `line`** a sombras.
- Para profundidade, use `bg-surface-raised` sobre `bg-surface`.
- Sombra só em elementos flutuantes, como o botão de WhatsApp: suave e neutra.

## Grafismo: colchetes

O grafismo da marca é o **colchete do logo repetido**: uma sequência de `<` com o mesmo traço (9) e ângulo (45°) do logo, em passo de 40px.

- Use em `menta` sobre `noite`, ou em `line` sobre `surface`.
- Deixe o grafismo sangrar para fora de um bloco (cortado pela borda).
- Use no máximo cinco colchetes por peça.
- Use como decoração, nunca como seta de navegação.

No código: `<Chevrons count={4} className="absolute -right-6 h-28" />` (`src/components/brand/Chevrons.tsx`).

## Layout

- Largura máxima do conteúdo: 1120px. Margem lateral de 16px no celular e 32px do tablet em diante.
- Alterne seções claras (`surface`) e escuras (`noite`) para dar ritmo.
- Um único botão primário (`menta`) por tela.
