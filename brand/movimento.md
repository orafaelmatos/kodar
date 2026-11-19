# Movimento

O movimento da Kodar deve mostrar cuidado, clareza e domínio técnico. Ele faz parte da composição e da explicação do serviço.

## Direção

- Abertura escura e centralizada: título em peso regular, palavras entrando uma a uma com desfoque, depois o texto e os botões. O menu entra com desfoque e o texto do hero esmaece ao rolar.
- Cena 3D própria no hero (Three.js): um arco de objetos em cromado, vidro fosco e menta acima do título (conversa, cursor, janela de site, o colchete do grafismo no centro, gráfico, banco de dados e um botão de ligar), ligados por uma linha de luz menta com pulsos que correm de um lado ao outro. Ao fundo, um fluido de luz menta e noite se move devagar. Os objetos entram do centro para as pontas, flutuam, reagem ao ponteiro e se abrem na rolagem. Não é uma nova versão do logo.
- Botões em pílula com brilho interno e luz menta suave; o texto rola letra a letra no hover.
- Composições animadas em HTML e CSS para cada produto: landing page com clique no botão e notificação, páginas de um site em leque e um sistema que alterna entre CRM, estoque, agenda e financeiro.
- Anatomia da conversão: uma página de exemplo em perspectiva destaca, em 3D, a área ligada a cada princípio conforme a rolagem.
- Reação leve ao ponteiro e à rolagem, sem impedir o uso normal da página.
- Revelação de conteúdo por recorte e deslocamento curto, mantendo as cores do texto e o contraste.
- Cards com inclinação 3D e luz que segue o mouse; faixa contínua com tudo o que a Kodar constrói.
- Mockups são ilustrativos: nomes e números neles são de exemplo e não representam clientes ou resultados reais.
- Setas e links respondem ao hover; o conteúdo principal também funciona por teclado e toque.

## Limites

- Não alterar o logo nem acrescentar cores fora dos tokens da marca.
- Não usar animação como tela de carregamento ou bloquear conteúdo esperando a cena 3D.
- Não substituir a rolagem do navegador, esconder o cursor ou criar flashes.
- A escultura carrega separadamente do conteúdo e possui alternativa em CSS quando WebGL não está disponível.
- Renderizar a cena apenas quando visível, com resolução controlada e limite de quadros: cerca de 60 por segundo em computadores e 30 em celulares e aparelhos modestos (sem vidro com transmissão).
- Respeitar `prefers-reduced-motion`: com a preferência ativa, os movimentos contínuos param e a cena 3D fica estática. Não há botão de pausa na interface.

## Referências de direção

As referências fornecidas pelo Rafael são [Fragment Studio](https://www.fragment.im/), [Blue Square X](https://www.bluesqx.com/) e [Profitize](https://profitize.com.br/) (fundo quase preto, objeto 3D protagonista, mockups de produto e botões em pílula). A aplicação na Kodar usa composição própria, geometria criada no código e a identidade existente da marca.
