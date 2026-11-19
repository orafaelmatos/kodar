# Roadmap

## Fase 1: landing page (tema escuro, 3D)

- [x] Primitivos de UI: `Button` (pílula), `TiltCard`, ícones `lucide-react` e WhatsApp.
- [x] Layout: header flutuante com menu mobile, rodapé, botão fixo de WhatsApp e controle global de movimento.
- [x] Seções: hero com cena 3D, faixa em movimento, produtos (landing pages, sites, sistemas sob medida), por que converte, comparação com geradores de sites, processo, quem está por trás, dúvidas e chamada final.
- [x] SEO técnico: `sitemap.ts`, `robots.ts`, JSON-LD `ProfessionalService` e `FAQPage`.
- [ ] Medir no Lighthouse a versão nova (celular) e registrar o resultado.
- [ ] Testar em aparelhos reais (Android modesto e iPhone) a fluidez da cena 3D.
- [ ] **Deploy** e domínio kodarsoft.com apontado.

## Demos para clientes (`/demo`)

- [x] Etapa 1: arquitetura (dados por cliente, visual por nicho, painel `/demo`, faixa da Kodar, `npm run demo:new`).
- [x] Etapa 2: clínica odontológica.
- [x] Etapa 3: oficina mecânica.
- [ ] Etapa 4: marmoraria.
- [ ] Etapa 5: marcenaria e móveis planejados.
- [ ] Etapa 6: pequena indústria e metalúrgica.
- [ ] Imagem de compartilhamento por demo (prévia do link no WhatsApp com o nome do cliente).
- [ ] Fotos reais do cliente nos templates (campo opcional), quando ele enviar.

## Pendências de conteúdo (do Rafael)

- [x] Número de WhatsApp real em `src/config/site.ts`: +55 19 99582-8704.
- [ ] Projetos do portfólio. Para cada um:
  - nome;
  - tipo;
  - uma frase com o problema e o resultado;
  - tags;
  - imagem 16:10.
- [ ] Confirmar as promessas listadas em [`brand/posicionamento.md`](../brand/posicionamento.md): orçamento em 1 dia útil, prazo de 2 a 4 semanas e suporte incluso.
- [ ] Confirmar e-mail (contato@kodarsoft.com) e @ das redes sociais.

## Pendências de negócio

- [ ] Registrar kodarsoft.com e kodarsoft.com.br.
- [ ] Pesquisar "Kodar" no INPI, classe 42, e registrar a marca.
- [ ] Ajuste fino do logo com designer antes do registro.

## Fase 2: depois do lançamento (ideias)

- Páginas por produto (`/landing-pages`, `/sites`, `/sistemas`) para SEO.
- Página de cada projeto (`/projetos/[slug]`).
- Blog ou conteúdos.
- Formulário de orçamento integrado ao WhatsApp ou ao e-mail.
- Analytics com respeito à LGPD (Vercel Analytics ou Plausible).

## Próximos passos de conversão

- [ ] Seção de projetos reais (cases com resultado) assim que houver projetos autorizados: é a prova mais forte para quem está decidindo.
- [ ] Depoimentos de clientes.
- [ ] Analytics com eventos de clique no WhatsApp, respeitando a LGPD.
