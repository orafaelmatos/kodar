# Publicar a Kodar no Easypanel

A landing principal e as demos rodam no mesmo serviço. O projeto usa exportação estática do Next.js: a build gera `out/`, e um servidor Node.js entrega esses arquivos. Não há banco de dados para configurar.

Endereço escolhido para esta publicação: `https://demo.autoopera.com.br`. O link da Pro Dente será `https://demo.autoopera.com.br/demo/pro-dente`, depois que DNS, domínio no Easypanel e deploy estiverem prontos.

O `Dockerfile` da raiz instala as dependências, executa `npm run build` e monta uma imagem de produção com os arquivos exportados e `scripts/serve-static.mjs`. Ela escuta em `0.0.0.0:3000` e executa uma checagem de saúde na página inicial.

## 1. Enviar os arquivos ao GitHub

O repositório configurado neste checkout é `orafaelmatos/kodar`, na branch `main`. As alterações locais, incluindo a demo Pro Dente, precisam estar nessa branch no GitHub antes do deploy.

Revise as alterações e envie:

```bash
git status
git add Dockerfile .dockerignore README.md docs scripts/serve-static.mjs src/demos public/demos
git commit -m "Prepare Pro Dente demo and Easypanel deployment"
git push origin main
```

Se o seu fluxo usa pull requests, envie para sua branch e faça o merge em `main`. O Easypanel deve acompanhar a branch que contém a demo e o `Dockerfile`.

`node_modules/`, `.next/` e `out/` são gerados durante a build. Não é necessário enviá-los ao GitHub.

## 2. Criar a aplicação

No Easypanel:

1. Crie ou abra um projeto chamado `kodar`.
2. Adicione um serviço do tipo **App**, com nome `site`.
3. Em **Source / Fonte**, escolha **GitHub**.
4. Configure:

| Campo | Valor |
| --- | --- |
| Repository / Repositório | `orafaelmatos/kodar` |
| Branch | `main` |
| Build Path / Caminho de build | `/` |

Para um repositório privado, use a integração/token do GitHub configurada no Easypanel com acesso a esse repositório. Mantenha essa credencial no painel.

Em **Build / Compilação**, escolha:

| Campo | Valor |
| --- | --- |
| Builder | `Dockerfile` |
| Dockerfile Path | `Dockerfile` |

Deixe o comando de inicialização em **Advanced / Deploy** sem substituição: o Dockerfile já define o processo que deve rodar.

## 3. Escolher o endereço e configurar o ambiente

Para esta publicação, use `demo.autoopera.com.br`. No provedor que administra o DNS de `autoopera.com.br`, configure o registro:

| Tipo | Nome / Host | Valor |
| --- | --- | --- |
| A | `demo` | IP público IPv4 da sua VPS |

Na consulta pública de 19/11/2026, esse subdomínio ainda não resolvia (NXDOMAIN). Confira o DNS depois de criar o registro e aguarde a propagação antes de validar o HTTPS.

Se já houver um registro para esse hostname, confira para onde ele aponta antes de alterá-lo. Um eventual registro AAAA também deve apontar para o IPv6 correto da VPS. Em provedores que pedem o nome completo, preencha `demo.autoopera.com.br` no campo de nome.

Em **Domains / Domínios** no Easypanel, adicione `demo.autoopera.com.br` ao serviço `site`.

Marque o domínio escolhido como principal, quando essa opção estiver disponível. Em **Environment / Ambiente**, defina:

```dotenv
NEXT_PUBLIC_SITE_URL=https://demo.autoopera.com.br
HOST=0.0.0.0
PORT=3000
```

Use exatamente esse endereço na variável, sem `/demo/pro-dente` e sem barra no final.

O `Dockerfile` já define `HOST` e `PORT`; deixá-los explícitos no painel facilita conferir a configuração. A URL é um argumento de build público: o Easypanel fornece as variáveis ao Docker, e o Dockerfile declara `ARG NEXT_PUBLIC_SITE_URL` para usá-la na exportação.

Sempre que `NEXT_PUBLIC_SITE_URL` mudar, execute **Deploy** novamente. Essa variável fica gravada no HTML, no sitemap, nos metadados e nos links de compartilhamento durante a build.

## 4. Configurar o domínio e publicar

Em **Domains / Domínios**, configure o destino:

| Campo | Valor |
| --- | --- |
| Domínio público | `demo.autoopera.com.br` |
| Caminho público | `/` |
| Protocolo interno / Destination protocol | `HTTP` |
| Porta interna / Target port | `3000` |
| Caminho de destino, se houver | `/` |
| HTTPS público | Habilitado |

O HTTPS é atendido pelo proxy do Easypanel; a aplicação recebe HTTP na porta interna `3000`. Use a aba Domínios para o tráfego do site.

Salve e clique em **Deploy**. Acompanhe a saída da build e, depois, os logs da aplicação. O início do servidor deve mostrar:

```text
Kodar: http://0.0.0.0:3000
```

Quando a aplicação estiver pronta, confira:

- `/`: landing da Kodar;
- `/demo`: lista das demos;
- `/demo/pro-dente`: landing da Pro Dente.

Para compartilhar com o cliente, use `https://demo.autoopera.com.br/demo/pro-dente`. O painel com a lista das demos ficará em `https://demo.autoopera.com.br/demo`.

Abra a demo diretamente, atualize a página e confira no celular: menu, imagens, FAQ, botão de WhatsApp e links dos vídeos. O WhatsApp da clínica é `(19) 99908-6442`.

As demos mantêm `noindex`. Elas podem ser visitadas por quem tiver o link; `noindex` não exige login nem torna a página privada.

## 5. Trocar de domínio depois

Quando quiser usar `kodarsoft.com` ou um subdomínio como `demos.kodarsoft.com`:

1. No provedor de DNS, crie o registro para esse hostname apontando para o IP público da VPS. Use o host `@` para a raiz ou `demos` para o subdomínio. Um registro AAAA, se existir, também deve apontar para o IPv6 correto da VPS.
2. No Easypanel, adicione o hostname ao mesmo serviço, com porta interna `3000`, caminho `/` e HTTPS habilitado.
3. Aguarde o DNS apontar para a VPS e o certificado HTTPS ficar válido.
4. Atualize `NEXT_PUBLIC_SITE_URL` com o endereço definitivo e faça um novo deploy.

O link final poderá ser `https://kodarsoft.com/demo/pro-dente` ou `https://demos.kodarsoft.com/demo/pro-dente`, conforme o domínio configurado.

## Atualizações

Depois do primeiro deploy, você pode habilitar **Auto Deploy** na integração GitHub do serviço. Um push na branch configurada dispara uma nova build. Mantendo o deploy manual, clique em **Deploy** depois de cada atualização enviada ao GitHub.

Fotos e vídeos ficam em `public/demos/` e são incluídos na imagem. As mudanças nesses arquivos também precisam de commit, push e deploy.

## Se algo falhar

| Sintoma | O que conferir |
| --- | --- |
| A demo retorna 404 | A branch contém `src/demos/clients/odonto-pro-dente.ts`, o registro em `clients/index.ts` e a correção de `serve-static.mjs`? A build deve listar `/demo/pro-dente`. |
| Erro 502 ou aplicação inacessível | Domínio apontando à porta interna `3000`, protocolo interno HTTP e processo com `HOST=0.0.0.0`. Confira os logs do serviço. |
| Clone do repositório falha | A integração/token do GitHub no Easypanel tem acesso ao repositório privado? |
| Build falha ao baixar fontes | O servidor precisa alcançar o Google Fonts durante a build das demos. Confira DNS e acesso de saída da VPS. |
| Build encerrada por falta de memória | Confira a RAM disponível na VPS e o limite do builder nos logs; ajuste esses recursos antes de tentar novamente. |
| Links usam outro domínio | Defina `NEXT_PUBLIC_SITE_URL` antes de refazer o deploy. |
| Alteração enviada não aparece | Confira branch e commit do deploy. Use **Force Rebuild** se houver suspeita de cache antigo. |

## Conferir localmente com Docker

Com o Docker ativo:

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:8080 -t kodar-preview .
docker run --rm -p 8080:3000 kodar-preview
```

Abra `http://localhost:8080/demo/pro-dente`. Para conferir sem Docker, execute `npm run build` e `npm start`.

## Documentação oficial consultada

- [Easypanel — App Service](https://easypanel.io/docs/services/app): fonte GitHub, domínios, porta interna e auto deploy.
- [Easypanel — Builders](https://easypanel.io/docs/builders#dockerfile): Dockerfile, contexto da build e argumentos vindos do ambiente.
- [Docker — Build variables](https://docs.docker.com/build/building/variables/): comportamento de `ARG` e `ENV`.
