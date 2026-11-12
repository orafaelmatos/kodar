# Cores

A base é **azul-noite** e **verde-menta**, que dão o ar futurista. O **coral** é o toque humano e quente, usado em pequenos detalhes. Todos os valores estão em [`tokens.json`](tokens.json), com versão para tema claro e escuro.

## Paleta

| Token | Claro | Escuro | Classe Tailwind | Uso |
| --- | --- | --- | --- | --- |
| `surface` | `#F5F8F7` | `#0B111C` | `bg-surface` | Fundo da página |
| `surface-raised` | `#FFFFFF` | `#141C2C` | `bg-surface-raised` | Cards, menus, áreas elevadas |
| `line` | `#D7DFE2` | `#2A364C` | `border-line` | Divisórias e bordas de campos |
| `ink` | `#0D1424` | `#EEF3F6` | `text-ink` | Texto principal |
| `ink-muted` | `#4B5668` | `#9AA6B8` | `text-ink-muted` | Texto secundário, legendas |
| `noite` | `#0D1424` | `#24375C` | `bg-noite` | Faixas escuras, rodapé, bloco do símbolo |
| `noite-claro` | `#1E2B45` | `#2F4670` | `bg-noite-claro` | Cards sobre `noite`, símbolo no negativo |
| `menta` | `#14C9A1` | `#14C9A1` | `bg-menta` | Cor-assinatura: botões primários, colchete do logo, grafismo |
| `menta-forte` | `#0A7A64` | `#3DE3BC` | `text-menta-forte` | Links, texto em destaque, anel de foco |
| `papel` | `#EEF3F6` | `#EEF3F6` | `text-papel` | Traço e texto claro sobre `noite` |
| `nevoa` | `#E2F5EF` | `#103129` | `bg-nevoa` | Fundos tingidos de menta, badges |
| `coral` | `#FF6B4A` | `#FF8466` | `bg-coral` | Acento humano: números em destaque, selos |
| `coral-forte` | `#C2401F` | `#FF8466` | `text-coral-forte` | Coral quando vira texto |
| `on-brand` | `#0D1424` | `#0D1424` | `text-on-brand` | Texto e ícones sobre `menta` ou `coral` |

## Regras

- **Proporção:** cerca de 60% neutros (`surface`, `surface-raised`, `ink`), 30% `noite` e `menta` e no máximo 10% `coral`.
- **Botão primário:** `bg-menta text-on-brand`. Nunca texto branco sobre menta.
- **Menta não é cor de texto em fundo claro** (1.9:1). Para texto e links, use `text-menta-forte`.
- **Coral nunca em grandes áreas** e nunca dentro do logo. Como texto, `text-coral-forte`.
- **Foco:** anel sólido de 2px em `menta-forte`, já aplicado globalmente em `globals.css`.
- **Sem gradientes** e sem sombras coloridas.

## Contrastes verificados (WCAG)

| Par | Claro | Escuro |
| --- | --- | --- |
| `ink` sobre `surface` | 17.2:1 | 16.9:1 |
| `ink` sobre `surface-raised` | 18.4:1 | 15.3:1 |
| `ink-muted` sobre `surface` | 6.9:1 | 7.7:1 |
| `ink-muted` sobre `surface-raised` | 7.4:1 | 6.9:1 |
| `menta-forte` sobre `surface` | 4.9:1 | 11.6:1 |
| `menta-forte` sobre `nevoa` | 4.7:1 | 8.7:1 |
| `on-brand` sobre `menta` | 8.7:1 | 8.7:1 |
| `on-brand` sobre `coral` | 6.5:1 | — |
| `coral-forte` sobre `surface` | 4.9:1 | 7.9:1 |

Ao criar um novo par de cores, confira se texto normal tem pelo menos 4.5:1 e texto grande (24px ou mais) pelo menos 3:1, nos dois temas.

## Temas

O site segue o tema do sistema (`prefers-color-scheme`). Para forçar um tema, defina `data-theme="light"` ou `data-theme="dark"` no `<html>`. Os componentes usam só os tokens, então mudam sozinhos.
