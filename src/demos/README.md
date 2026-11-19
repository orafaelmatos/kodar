# Demos para clientes

Landing pages de demonstração para enviar no **primeiro contato** com um cliente. O visual é do **nicho**; os dados são do **cliente**. Trocar de cliente é trocar só os dados.

Cada demo fica em `kodarsoft.com/demo/<slug>`, fora do Google (noindex), e mostra a faixa "Prévia feita pela Kodar" com o botão **Quero este site**, que leva ao WhatsApp da Kodar.

## Criar e enviar uma demo

1. Rode `npm run demo:new` e responda: nicho, nome da empresa, cidade, WhatsApp e com quem você está falando.
   - Sem perguntas: `npm run demo:new -- --niche=odonto --name="Clínica Exemplo" --city=Campinas --state=SP --whatsapp=19999999999 --contact="Dra. Ana"`
2. Abra o arquivo criado em `src/demos/clients/` e complete o que souber: endereço, horários, ano de fundação, nota e quantidade de avaliações no Google, número de clientes atendidos, Instagram, responsável técnico e depoimentos reais.
3. Veja em `npm run dev` → `http://localhost:3000/demo/<slug>`.
4. Publique o site. No painel **`/demo`**, use **Enviar ao cliente**: abre o WhatsApp do cliente com a mensagem e o link prontos.

Fotos reais: coloque o arquivo em `public/demos/<slug>/` (WebP, até ~300 KB) e preencha `photos: { hero: "/demos/<slug>/hero.webp", heroAlt: "..." }`. Sem foto, o template usa a ilustração do nicho (na oficina, o carro em desenho técnico).

Campos que você não preencher ficam de fora. A demo **não inventa** nota, avaliações nem tempo de mercado. Os depoimentos padrão do nicho são exemplos: troque pelos reais antes de o cliente publicar o site.

## Nichos

| Nicho | `niche` | Status |
| --- | --- | --- |
| Clínica odontológica | `odonto` | Pronto |
| Oficina mecânica | `oficina` | Pronto |
| Marmoraria | `marmoraria` | Próxima etapa |
| Marcenaria e móveis planejados | `marcenaria` | Próxima etapa |
| Pequena indústria e metalúrgica | `metalurgica` | Próxima etapa |

Demos de um nicho sem template não são publicadas.

## Estrutura

```
src/demos/
├── types.ts                 DemoClient: os dados que mudam por cliente
├── utils.ts                 links de WhatsApp (cliente e Kodar), mapa, telefone
├── clients/                 um arquivo por cliente + index.ts (lista publicada)
├── components/              peças comuns: topo, WhatsApp fixo, faixa da Kodar,
│                            contador, avaliações, dúvidas, contato, rodapé
├── styles/demos.css         base visual com variáveis --d-* (cores, fontes, cantos)
└── niches/
    ├── index.ts             registro dos nichos (nome, template, título da página)
    └── odonto/
        ├── content.ts       textos do nicho, preenchidos com os dados do cliente
        ├── theme.css        cores, fonte e estilos próprios (prefixo .od-)
        ├── OdontoTemplate.tsx
        ├── ToothScene.tsx   + tooth-scene.ts: dente 3D do hero (Three.js)
        └── SmileSimulator.tsx  simulador de clareamento
    └── oficina/
        ├── content.ts       textos do nicho
        ├── theme.css        grafite + laranja, tipografia condensada (prefixo .of-)
        ├── OficinaTemplate.tsx  inclui a ordem de serviço e o relatório de diagnóstico
        ├── illustrations.tsx    carro em traço técnico e artes dos serviços (SVG)
        └── ServicesExplorer.tsx lista de serviços com painel
```

Rotas: `src/app/demo/page.tsx` (painel), `src/app/demo/[slug]/page.tsx` (cada demo) e `src/app/demo/layout.tsx` (noindex).

## Criar um nicho novo

1. Copie a pasta `niches/odonto` como referência e troque o prefixo das classes (ex.: `.of-` para oficina).
2. Em `theme.css`, defina as variáveis `--d-*` em `.demo-<nicho>` e a fonte com `next/font/google` no template.
3. Escreva `content.ts` com textos de conversão para o nicho e uma função `<nicho>Meta` para o título da página.
4. Registre em `niches/index.ts` (`template` e `meta`).
5. Crie um cliente modelo em `clients/` com dados fictícios.

### Regras

- As demos **não seguem a marca Kodar**: cada nicho tem cores, fonte e estilo próprios. Só a faixa da Kodar e o crédito do rodapé usam a marca.
- Todo CTA leva ao WhatsApp do cliente com mensagem pronta e específica (serviço, simulador, agendamento).
- Sem números ou depoimentos inventados apresentados como reais: use os campos do cliente e esconda o que não existir.
- Celular primeiro: o cliente vai abrir o link no WhatsApp. Confira em 375px.
- Respeite `prefers-reduced-motion` (cenas 3D ficam paradas, contadores mostram o valor final).
