# Aplicações

## Avatar das redes sociais

- **Arquivos:**
  - `assets/social/avatar-1080.png`: fundo `noite`, a versão principal. Use em Instagram, LinkedIn e WhatsApp.
  - `assets/social/avatar-1080-claro.png`: fundo `papel`, haste `noite`. Use só onde o fundo escuro some.
- O quadrado vai cheio, sem cantos arredondados: a rede faz o recorte em círculo.
- **Bio sugerida:** "Sites, sistemas e IA para empresas. Tecnologia com gente por trás."

## Imagem de compartilhamento (Open Graph)

- `assets/social/og-image-1200x630.png`: fundo `noite`, wordmark negativo, slogan e colchetes.
- Já aplicada no site em `src/app/opengraph-image.png`. O Next.js gera as meta tags sozinho.

## Favicon e ícone de app

- `src/app/icon.svg` (símbolo) e `src/app/apple-icon.png` (180px, fundo cheio). O Next.js publica os dois automaticamente.

## Cartão de visita (90 × 50 mm)

- **Frente:** fundo `noite`, wordmark negativo centralizado, dois colchetes `menta` sangrando à direita e o slogan pequeno em `papel` no canto inferior esquerdo.
- **Verso:** fundo branco, símbolo no canto superior direito. Embaixo dele:
  - nome em Sora 600 20pt;
  - cargo no estilo `label` em `menta-forte`, por exemplo "FUNDADOR · DESENVOLVIMENTO";
  - e-mail, telefone e site em DM Sans 13pt.
- **Impressão:** couché fosco 300 g, 4×4 cores e 5 mm de margem de segurança. O `noite` precisa de preto rico para não ficar acinzentado.

## Assinatura de e-mail

- Ao lado esquerdo, o símbolo de 56px. Depois, um divisor vertical `line`.
- Em seguida, o nome em Sora 600 16px e "Cargo · Kodar" em `ink-muted`.
- Abaixo, "kodarsoft.com · telefone", com o site em `menta-forte`.
- Por último, o slogan no estilo `label` em `menta-forte`.
- Use o símbolo como PNG hospedado no site: muitos clientes de e-mail bloqueiam SVG.
