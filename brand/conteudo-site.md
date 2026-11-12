# Conteúdo do site (referência)

Estrutura e textos aprovados no rascunho da home de kodarsoft.com. É um ponto de partida para o desenvolvimento: ajuste os textos conforme o [tom de voz](tom-de-voz.md) e confirme as promessas marcadas em [posicionamento.md](posicionamento.md).

**Contato principal:** WhatsApp com a mensagem pronta "Olá, Kodar! Quero conversar sobre um projeto." (`src/config/site.ts`). Ele aparece no menu, no hero, no bloco final, no rodapé e em um botão flutuante.

## 1. Menu (fixo no topo)

- Logo horizontal
- Links: Serviços · Projetos · Sobre · Dúvidas
- Botão primário: **Falar no WhatsApp**
- No celular, os links ficam atrás de um ícone de menu.

## 2. Hero

- **Rótulo:** SITES · SISTEMAS · AUTOMAÇÃO · IA
- **Título:** Tecnologia com gente por trás.
- **Texto:** A gente desenvolve sites, sistemas sob medida e automações com IA para sua empresa crescer. E explica cada passo sem complicar.
- **Botões:** Conte seu projeto (primário, WhatsApp) · Ver projetos (secundário, âncora)
- **Prova:** Orçamento em até **1 dia útil**. Você fala direto com quem desenvolve.
- **Visual:** painel `noite` com cinco colchetes `menta` e um cartão de código:

```js
// seu próximo sistema
const projeto = kodar.criar({
  cliente: "sua empresa",
  objetivo: "crescer",
});
```

## 3. Serviços (`#servicos`)

- **Rótulo:** Serviços
- **Título:** Do site ao sistema, do processo manual à IA.
- **Texto:** Começamos pelo problema do seu negócio e escolhemos a tecnologia depois. Você recebe uma solução que a sua equipe consegue usar no dia seguinte.
- **Quatro cards**, cada um com ícone, título, frase e três itens. O conteúdo está na tabela de serviços de [posicionamento.md](posicionamento.md).

## 4. Projetos (`#projetos`), faixa `noite`

- **Rótulo:** Projetos
- **Título:** O que a gente já tirou do papel.
- **Texto:** Alguns trabalhos recentes, do primeiro rascunho ao sistema rodando.
- **Cards de projeto:**
  - imagem 16:10;
  - tipo, no estilo `label` em menta (ex.: SISTEMA SOB MEDIDA);
  - nome;
  - uma frase com o problema e o resultado;
  - tags de tecnologia ou entrega.
- **Pendente:** os projetos reais. Para cada um, informe o nome, o tipo, a frase, as tags e uma imagem.

## 5. Sobre (`#sobre`)

- **Rótulo:** Sobre
- **Título:** Uma software house do tamanho da sua conversa.
- **Texto:**
  - O nome Kodar vem de **codar**, o verbo que todo dev brasileiro usa para programar. A Kodar foi criada por **Rafael Soares Matos** para ser a parceira técnica que empresas pequenas e médias não encontravam: alguém que entende o negócio antes de escrever código.
  - Aqui você não fala com um call center. Fala com quem vai desenvolver o seu projeto, do primeiro contato até o suporte depois da entrega.
- **Três valores** (numerados `<01`, `<02`, `<03`):
  - **Sem jargão:** a gente explica cada decisão em português claro.
  - **Feito sob medida:** cada solução nasce do jeito que a sua empresa trabalha.
  - **Junto depois da entrega:** suporte, ajustes e evolução contínua do que foi construído.

## 6. Dúvidas (`#duvidas`), em acordeão

1. **Quanto custa um projeto?** Depende do tamanho e do que o projeto precisa fazer. Depois de uma conversa rápida, você recebe um orçamento fechado em até 1 dia útil, sem surpresas no meio do caminho.
2. **Quanto tempo leva para ficar pronto?** Um site costuma levar de 2 a 4 semanas. Sistemas e automações variam conforme o escopo, e o prazo vem definido no orçamento, com entregas parciais para você acompanhar.
3. **Preciso entender de tecnologia?** Não. Você conta como a sua empresa funciona e o que quer melhorar. A parte técnica é com a gente, e cada etapa é explicada sem complicação.
4. **Vocês dão suporte depois da entrega?** Sim. Todo projeto tem um período de suporte incluso e, depois dele, você pode contratar um plano mensal de manutenção e melhorias.
5. **Atendem empresas de qualquer cidade?** Sim. O trabalho é todo remoto, com reuniões por vídeo e conversa pelo WhatsApp.

## 7. Chamada final

- Bloco `noite` com colchetes sangrando à direita.
- **Título:** Vamos tirar sua ideia do papel?
- **Texto:** Conte o que você precisa. A primeira conversa é sem compromisso.
- **Botão:** Falar no WhatsApp.

## 8. Rodapé

- Logo, o slogan, os links das seções e o WhatsApp.
- © ano Kodar · kodarsoft.com

## SEO

- **Título da página:** Kodar · Tecnologia com gente por trás.
- **Descrição:** Kodar desenvolve sites, sistemas sob medida, automações e soluções com IA para empresas. Tecnologia com gente por trás.
- Idioma `pt-BR`; imagem de compartilhamento já configurada.
