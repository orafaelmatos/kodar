# Marca Kodar

Tudo o que define a marca Kodar, organizado para quem desenvolve o site (pessoas e agentes de IA). **Esta pasta é a fonte da verdade**: o código lê daqui e nada de marca deve ser inventado fora dela.

## Resumo em uma tela

| | |
| --- | --- |
| **Nome** | Kodar (vem de *codar*, "programar" no jeito brasileiro) |
| **O que faz** | Sites, sistemas sob medida, automação e IA aplicada para empresas |
| **Slogan** | Tecnologia com gente por trás. |
| **Personalidade** | Próxima e humana no jeito de falar; futurista no jeito de parecer |
| **Logo** | Colchete: o braço do "k" é um `<` em menta, solto da haste |
| **Cores-chave** | noite `#0D1424` · menta `#14C9A1` · coral `#FF6B4A` (pouco) |
| **Fontes** | Sora (títulos) · DM Sans (texto) · JetBrains Mono (rótulos e código) |
| **Grafismo** | Colchetes `<` repetidos, traço 9, 45°, passo de 40px |
| **Domínio** | kodarsoft.com / kodarsoft.com.br |

## Índice

| Arquivo | Conteúdo |
| --- | --- |
| [posicionamento.md](posicionamento.md) | Essência, público, proposta de valor, serviços, diferenciais |
| [tom-de-voz.md](tom-de-voz.md) | Como a Kodar escreve, slogans, exemplos e glossário |
| [logo.md](logo.md) | Logo Colchete: versões, área de proteção, tamanhos, o que não fazer |
| [cores.md](cores.md) | Paleta, tokens, contrastes e proporções |
| [tipografia.md](tipografia.md) | Fontes, escala tipográfica e uso |
| [espaco-e-formas.md](espaco-e-formas.md) | Espaçamento, cantos, bordas e o grafismo de colchetes |
| [iconografia.md](iconografia.md) | Estilo de ícones |
| [aplicacoes.md](aplicacoes.md) | Cartão, assinatura de e-mail, avatar e imagem de compartilhamento |
| [conteudo-site.md](conteudo-site.md) | Estrutura e textos de referência do site |
| [tokens.json](tokens.json) | **Fonte única dos tokens** (cores, tipografia, espaço, cantos) |

## Arquivos

```
brand/
├── tokens.json                 fonte única dos tokens → gera src/styles/tokens.css
├── assets/
│   ├── logos/                  SVGs oficiais (copiados para public/brand/logos)
│   │   ├── kodar-horizontal.svg            símbolo + wordmark, fundo claro
│   │   ├── kodar-horizontal-negativo.svg   símbolo + wordmark, fundo escuro
│   │   ├── kodar-wordmark.svg              só o nome, fundo claro
│   │   ├── kodar-wordmark-negativo.svg     só o nome, fundo escuro
│   │   └── kodar-simbolo.svg               ícone quadrado
│   └── social/
│       ├── avatar-1080.png                 foto de perfil (fundo noite)
│       ├── avatar-1080-claro.png           foto de perfil alternativa (fundo claro)
│       └── og-image-1200x630.png           imagem de compartilhamento de links
└── fonts/                      Sora, DM Sans e JetBrains Mono (variáveis, woff2, licença OFL)
```

## Como mudar algo da marca

1. Edite o documento `.md` correspondente e, se for um valor (cor, tamanho, fonte), o `tokens.json`.
2. Rode `npm run brand` para regenerar `src/styles/tokens.css` e copiar os logos para `public/`.
3. Nunca coloque cores ou tamanhos soltos no código: use as classes do Tailwind geradas pelos tokens.
