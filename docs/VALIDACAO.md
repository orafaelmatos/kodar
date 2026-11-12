# Validação da landing page animada

Verificações realizadas em 12 de novembro de 2026 sobre a build de produção.

## Código

- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm run build`: passou; export estático em `out/`.
- `npm start`: serve a build com compressão gzip e cache de arquivos estáticos.
- `git diff --check`: passou.

## Navegador e interação

Chrome com Playwright, em **320, 390, 768, 1024 e 1440 pixels**, além de verificações no tema escuro com movimento normal e reduzido:

- Escultura 3D inicializada; a pausa global mantém a imagem do canvas estável entre capturas.
- Nenhum erro de JavaScript ou rolagem horizontal detectado nas verificações.
- Links de WhatsApp usam `5519995828704`, com mensagem preenchida.
- Os quatro serviços alternam descrição e composição visual; estado indicado por `aria-expanded`.
- A simulação funciona por arraste, botões e teclado. A tecla End conecta as quatro etapas.
- Menu mobile abre, fecha com Escape e fecha ao escolher uma seção.
- Dúvidas usam controles nativos e apenas uma fica aberta por vez.
- Movimento reduzido pausa a cena e os movimentos contínuos.
- Auditoria axe dos critérios WCAG 2 A/AA e 2.1 A/AA: nenhuma violação automática detectada nas sete combinações verificadas.
- Capturas de celular e desktop revisadas visualmente. Tipografia, geometria e organização do fluxo foram ajustadas conforme as capturas.

## Lighthouse

Auditoria local isolada, em simulação de celular, com a **cena 3D habilitada** e a build servida por `npm start`:

| Categoria | Pontuação |
| --- | --- |
| Desempenho | 93 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

Métricas: FCP 0,8 s, LCP 0,8 s, bloqueio total 310 ms e deslocamento de layout 0.

A inicialização dos materiais foi dividida e a compilação dos shaders passou a ser assíncrona. Isso reduziu o bloqueio total de 1.030 ms para 310 ms na medição local. A cena roda a aproximadamente 30 quadros por segundo, para fora da tela ou com a aba oculta e possui alternativa estática em CSS.

As pontuações representam esta execução local e variam com rede, hospedagem, GPU e dispositivo. A meta acima de 95 em desempenho segue como refinamento no roadmap. A auditoria automática complementa a revisão visual e de teclado; não substitui uma avaliação completa com tecnologias assistivas.

## Conteúdo e publicação

- Fontes, cores e logotipo oficiais preservados. A ampliação da escala editorial está documentada em `brand/tipografia.md` e nos tokens.
- Direção e limites do movimento em `brand/movimento.md`.
- Demonstração identificada como simulação; sem clientes, resultados ou prazos inventados.
- E-mail e redes não confirmados ficam fora da página.
- Metadados, sitemap, robots e dados estruturados mantidos; origem configurável por `NEXT_PUBLIC_SITE_URL` antes da build.
- A revisão atualiza o mesmo projeto privado do Sites, preservando a audiência.
