# Logo

O logo da Kodar é o **Colchete**. É um wordmark próprio, desenhado em traço único com pontas e cantos arredondados: traço de 9 unidades sobre uma altura total de 60. O braço do "k" é um sinal de menor `<` em **menta**, solto da haste, para mostrar código já na primeira letra. A haste e as demais letras ficam em **ink**, ou **papel** no negativo.

O wordmark é desenhado e não depende de fonte, mas conversa com a Sora usada nos títulos.

## Versões

| Arquivo | Quando usar |
| --- | --- |
| `assets/logos/kodar-horizontal.svg` | Versão principal: site, propostas, documentos. Fundo claro. |
| `assets/logos/kodar-horizontal-negativo.svg` | Mesma, sobre `noite` e fundos escuros. |
| `assets/logos/kodar-wordmark.svg` | Só o nome: rodapés e espaços estreitos. Fundo claro. |
| `assets/logos/kodar-wordmark-negativo.svg` | Só o nome sobre fundos escuros. |
| `assets/logos/kodar-simbolo.svg` | Ícone: favicon, avatar, ícone de app. |

No código, use o componente `<Logo />` (`src/components/brand/Logo.tsx`). Ele já segue o tema claro/escuro:

```tsx
<Logo />                         // horizontal, fundo claro
<Logo tone="negative" />         // sobre bg-noite
<Logo variant="wordmark" />      // só o nome
<Logo variant="symbol" />        // só o símbolo
```

## Cores fixas nos SVGs

| Parte | Cor |
| --- | --- |
| Wordmark (normal) | ink `#0D1424` |
| Wordmark (negativo) | papel `#EEF3F6` |
| Colchete | menta `#14C9A1`, sempre |
| Bloco do símbolo | noite `#0D1424`. No horizontal negativo, `#1E2B45` (`noite-claro`), para se destacar do fundo. |
| Haste do símbolo | papel `#EEF3F6` |

## Regras

- **Área de proteção:** deixe livre em volta um espaço igual à altura do "o".
- **Tamanho mínimo:** 96px de largura para o wordmark e 24px para o símbolo. Abaixo disso, use só o símbolo.
- **Fundo:** use a versão normal sobre `surface` e fundos claros, e a `-negativo` sobre `noite` e fundos escuros.
- **Não faça:**
  - recolorir o colchete;
  - encostar o colchete na haste;
  - esticar, girar ou inclinar o logo;
  - aplicar sombra, contorno ou gradiente;
  - escrever "kodar" em outra fonte no lugar do wordmark;
  - usar o coral dentro do logo.

## Geometria (para recriar ou ajustar)

```
viewBox wordmark: 0 0 216 60 · traço 9 · round caps/joins
k   haste  M4.5 4.5 V55.5            colchete M35 24.5 L19 40 L35 55.5 (menta)
o   círculo cx 67.5  cy 40 r 15.5
d   círculo cx 115.5 cy 40 r 15.5 + haste M131 4.5 V55.5
a   círculo cx 163.5 cy 40 r 15.5 + haste M179 24.5 V55.5
r   M196 55.5 V40 A15.5 15.5 0 0 1 211.5 24.5
símbolo: 120×120, rx 28, traço 14 · haste M40 30 V90 · colchete M84 32 L60 60 L84 88
horizontal: símbolo a 60% (72px) + 20 de respiro + wordmark → viewBox 0 0 308 72
```
