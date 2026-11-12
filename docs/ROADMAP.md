# Roadmap

## Fase 1: site institucional (home de página única)

Siga a ordem abaixo. A estrutura e os textos de cada seção estão em [`brand/conteudo-site.md`](../brand/conteudo-site.md).

- [x] **Primitivos de UI** em `src/components/ui/`:
  - `Button`: primário `bg-menta text-on-brand`, secundário com borda `line`, altura 44–48px, `rounded-md`;
  - cards específicos por serviço e rótulos com os tokens da marca;
  - `Section`: container de 1120px com os espaçamentos da marca.
- [x] **Layout:** `Header` fixo com menu mobile, `Footer` e controle global de movimento.
- [x] **Conteúdo tipado** em `src/content/`: `services.ts` e `faq.ts`; etapas da simulação no componente `Solutions`.
- [x] **Seções da home:**
  - Hero imersivo com escultura 3D;
  - Serviços em acordeão editorial e composições animadas;
  - Na prática: simulação manipulável de automação em faixa noite;
  - Processo de trabalho integrado à apresentação humana;
  - Sobre;
  - Dúvidas;
  - Chamada final.
- [x] **Ícones:** `lucide-react` e ícone oficial do WhatsApp (ver [`brand/iconografia.md`](../brand/iconografia.md)).
- [x] **Qualidade:**
  - [x] Lighthouse local da versão animada em celular: 93 em performance e 100 em acessibilidade, boas práticas e SEO. Ver [`VALIDACAO.md`](VALIDACAO.md);
  - [x] teste no celular e nos temas claro e escuro; navegação, abas, dúvidas, links e auditoria automática de acessibilidade.
- [x] **SEO técnico:**
  - `sitemap.ts`, `robots.ts`;
  - dados estruturados `Organization` / `ProfessionalService` em JSON-LD.
- [ ] **Deploy** na Vercel e domínio kodarsoft.com apontado.

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

- Páginas por serviço (`/sites`, `/sistemas`, `/automacao`, `/ia`) para SEO.
- Página de cada projeto (`/projetos/[slug]`).
- Blog ou conteúdos.
- Formulário de orçamento integrado ao WhatsApp ou ao e-mail.
- Analytics com respeito à LGPD (Vercel Analytics ou Plausible).

## Refinamentos após a versão animada

- [ ] Levar a medição local de desempenho acima de 95 mantendo a cena 3D. A versão atual atingiu 93, com LCP de 0,8 s e CLS de 0.
