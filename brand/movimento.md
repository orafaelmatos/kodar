# Movimento

O movimento da Kodar deve mostrar cuidado, clareza e domínio técnico. Ele faz parte da composição e da explicação do serviço.

## Direção

- Abertura escura e tipografia ampla, com entrada curta em três linhas.
- Escultura geométrica própria: cinco molduras em menta e papel, com profundidade e iluminação. Não é uma nova versão do logo.
- Reação leve ao ponteiro e à rolagem, sem impedir o uso normal da página.
- Revelação de conteúdo por recorte e deslocamento curto, mantendo as cores do texto e o contraste.
- Serviços apresentados por linhas editoriais, com uma composição visual específica para cada serviço.
- Demonstração manipulável de tarefas dispersas que se organizam em um fluxo. Identificar como simulação, sem inventar resultados.
- Setas e links respondem ao hover; o conteúdo principal também funciona por teclado e toque.

## Limites

- Não alterar o logo nem acrescentar cores fora dos tokens da marca.
- Não usar animação como tela de carregamento ou bloquear conteúdo esperando a cena 3D.
- Não substituir a rolagem do navegador, esconder o cursor ou criar flashes.
- A escultura carrega separadamente do conteúdo e possui alternativa em CSS quando WebGL não está disponível.
- Renderizar a cena apenas quando visível, com limite de aproximadamente 30 quadros por segundo e resolução controlada.
- Respeitar `prefers-reduced-motion` e oferecer um controle visível para pausar movimentos contínuos.

## Referências de direção

As referências fornecidas pelo Rafael são [Fragment Studio](https://www.fragment.im/) e [Blue Square X](https://www.bluesqx.com/). A aplicação na Kodar usa composição própria, geometria criada no código e a identidade existente da marca.
