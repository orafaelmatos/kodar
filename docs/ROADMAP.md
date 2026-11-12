# Roadmap

## Fase 1: site institucional (home de página única)

Siga a ordem abaixo. A estrutura e os textos de cada seção estão em [`brand/conteudo-site.md`](../brand/conteudo-site.md).

- [ ] **Primitivos de UI** em `src/components/ui/`:
  - `Button`: primário `bg-menta text-on-brand`, secundário com borda `line`, altura 44–48px, `rounded-md`;
  - `Card`;
  - `Badge`;
  - `Section`: container de 1120px com os espaçamentos da marca.
- [ ] **Layout:** `Header` fixo com menu mobile, `Footer` e `WhatsAppButton` flutuante.
- [ ] **Conteúdo tipado** em `src/content/`: `services.ts`, `projects.ts` e `faq.ts`.
- [ ] **Seções da home:**
  - Hero;
  - Serviços;
  - Projetos (faixa noite);
  - Sobre;
  - Dúvidas;
  - Chamada final.
- [ ] **Ícones:** instalar `lucide-react` (ver [`brand/iconografia.md`](../brand/iconografia.md)).
- [ ] **Qualidade:**
  - Lighthouse acima de 95 em performance, acessibilidade e SEO;
  - teste no celular e nos temas claro e escuro.
- [ ] **SEO técnico:**
  - `sitemap.ts`, `robots.ts`;
  - dados estruturados `Organization` / `ProfessionalService` em JSON-LD.
- [ ] **Deploy** na Vercel e domínio kodarsoft.com apontado.

## Pendências de conteúdo (do Rafael)

- [ ] Número de WhatsApp real em `src/config/site.ts`.
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
