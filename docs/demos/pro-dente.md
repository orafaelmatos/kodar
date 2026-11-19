# Demo Pro Dente

- Rota: `/demo/pro-dente` (noindex).
- Dados do cliente: `src/demos/clients/odonto-pro-dente.ts`.
- Arquivos locais: `public/demos/pro-dente/`.
- Tema: `forest` no `theme.css` de odontologia. Verde profundo e tons quentes inspirados na logo enviada; a paleta é uma adaptação visual, não um manual oficial da clínica.

## Informações e fontes

Consulta em 19/11/2026.

- [Instagram oficial](https://www.instagram.com/prodenteodontologiapira/): nome, logo e especialidades da bio (ortodontia, implantodontia, clínico geral e endodontia). O perfil público e sua prévia incorporável forneceram os arquivos usados abaixo.
- Endereço e WhatsApp: Rua Governador Pedro de Toledo, 1471, Centro, Piracicaba/SP, CEP 13400-075; (19) 99908-6442. Encontrados no [Waze](https://www.waze.com/live-map/directions/br/sp/dentistas-piracicaba-pro-dente?to=place.ChIJXbaKDgYxxpQR-27p7xWiPGU) e em cadastros locais; **confirmados pelo usuário nesta conversa**.
- Sem horários, responsável técnico/CRO, ano de fundação, números de pacientes, condições de pagamento ou avaliações confirmados. Esses dados foram omitidos.
- O usuário autorizou tratamentos padrão para esta demo. Esta versão utiliza as quatro áreas identificadas na bio oficial.

## Seleção de imagens

| Arquivo | Uso | Origem |
| --- | --- | --- |
| `logo.jpg` | Cabeçalho e rodapé | Avatar do Instagram oficial, igual à logo enviada (150 × 150). Preservado sem redesenho. |
| `acolhimento.webp` | Foto principal | [Profissional e paciente na clínica](https://www.instagram.com/p/De4QHjyxs6o/). |
| `rotina.webp` | Galeria, capa com link para o vídeo | [Registro da equipe na recepção](https://www.instagram.com/reel/DfKjFJhER9B/). |
| `conversa.webp` | Galeria, capa com link para o vídeo | [Conversa com uma paciente](https://www.instagram.com/reel/Ddbn5cVRnDW/). |
| `protese.webp` | Galeria, publicação informativa | [Publicação sobre prótese dentária](https://www.instagram.com/p/Dc1Fb3wOZbf/). |

Os WebPs foram comprimidos e redimensionados sem ampliar os originais. Todos ficam abaixo de 300 KB. A página carrega arquivos locais, sem depender dos endereços temporários do Instagram. As capas de vídeos têm links identificados para o Instagram; elas não são apresentadas como players locais.

Fotos encontradas no DentMap foram descartadas: o cadastro mistura imagens de outras clínicas. Não foram utilizadas imagens genéricas nem depoimentos fabricados.

## Acrescentar fotos e vídeos enviados pelo cliente

1. Coloque os arquivos em `public/demos/pro-dente/`.
2. Atualize `photos.hero` e `photos.heroAlt` para trocar a foto principal.
3. Adicione fotos em `photos.gallery`, com `src`, `alt` e, opcionalmente, `caption`, `sourceUrl` e `sourceLabel`.
4. Adicione vídeos em `videos`, com `src`, `caption` e `poster` opcional. O player tem controles, não inicia automaticamente e não baixa o vídeo antes da interação.

Se todas as mídias forem removidas, a galeria e seu link de navegação ficam ocultos. Sem foto principal, o dente 3D do template continua disponível.
