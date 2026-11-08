# Recuperação dos dados das abas Horários e Projetos

Branch: `cabral`. Só as abas **Horários** e **Projetos** (com as 8 subpáginas) foram alteradas. As outras abas, a pesquisa e o menu não mudaram.

---

## 1. O que foi encontrado na análise

Revisei todo o histórico (`main`, `cabral`, `versao1`/`versao2`, commits `7145962` → `be973c2`). As conclusões:

- **Em nenhuma versão do repositório os dados dessas abas existiram como texto.** Desde o primeiro protótipo (`e118c20` na `versao1`, `8155385` na `versao2`), as duas abas mostravam **capturas de tela em PNG** (`img/horarios.png`, `img/pesquisa-1.png` … `img/assuntos-2.png`).
- Os commits seguintes (`631b27e`, `ed6d715`, `be973c2`) **não apagaram dados**. Eles só adicionaram `width`/`height` às imagens (mapa `IMG_DIM`) e mudaram a pesquisa. Os 14 PNGs estão idênticos aos do commit original.
- A "perda" de informação vinha do formato. Como as tabelas eram imagens, o conteúdo **não aparecia na busca do site** nem para **leitores de tela**, e não podia ser filtrado nem copiado. Isso já estava apontado como pendência em `CORRECOES.md` (item 3) e `CORRECOES-VERSAO2.md` (item 8).

Por isso, a recuperação foi feita **transcrevendo o conteúdo das imagens** para dados no código, exibidos como tabelas HTML reais.

## 2. O que foi feito

### Aba Projetos
- Transcrevi as 14 imagens de tabelas para a constante `PROJETOS` em `script.js`. Cada projeto tem nome, registro, coordenador e período.

  | Categoria | Projetos | Imagens de origem |
  |---|---|---|
  | Pesquisa | 41 | pesquisa-1, -2, -3 |
  | Extensão | 27 | extensao-1, -2 |
  | Inovação | 18 | inovacao |
  | Ensino | 17 | ensino-1, -2 |
  | Inclusão e diversidade | 8 | inclusao-1, -2 |
  | Empreendedorismo | 3 | empreendedorismo |
  | Gestão acadêmica | 3 | gestao |
  | Assuntos estudantis | 2 | assuntos-1, -2 |
  | **Total** | **119** | |

- As páginas `#projetos-<categoria>` agora exibem uma `<table class="projetos-tabela">` com `caption` (oculto visualmente), `th scope="col"` e um contador de projetos. O visual imita o das capturas: cabeçalho azul-claro, bordas cinza e linhas zebradas.
- Removi o mapa `IMG_DIM`, que não tem mais uso. A página-índice `#projetos` (os 8 botões) não mudou.

### Aba Horários
- Transcrevi para a constante `HORARIOS` **todas as linhas visíveis** em `img/horarios.png`: 4 aulas de Banco de Dados (AL0327) e 1 de Computação e Sociedade.
- Recriei a página como **interface funcional**, com os mesmos controles da captura:
  - **Mostrar**: Aulas / Atendimento ao aluno;
  - **Semestre**: Todos, 2º, 4º, 6º, 8º, Sem período ideal;
  - **Dia**: Todos, Seg a Sáb;
  - **Buscar disciplina ou professor**: busca sem diferenciar acentos, em nome, código e professor;
  - contador de resultados (`aria-live`) e tabela agrupada por semestre. Como no original, o nome da disciplina não se repete nas linhas seguintes. Para leitores de tela ele é mantido com `sr-only`.
- Um aviso **"Dados parciais"** informa que a captura indicava 47 resultados e que só 5 estavam visíveis.
- A página tem a função `busca`, igual à de Docentes, para a pesquisa do site encontrar os horários.

### CSS (`style.css`)
Acrescentei estilos novos: `.projetos-tabela`, `.hor-*`, `.sr-only`, `.nowrap`, além de variantes de alto contraste. Nenhuma regra existente foi alterada.

## 3. Como foi feito
1. Comparei `git log --stat` e `git show <commit>:script.js` entre todas as versões e branches, e o checksum dos PNGs.
2. Li cada imagem e transcrevi as linhas, conferindo a quantidade de linhas por imagem.
3. Troquei, em `script.js`, só os blocos `PROJETOS`/`IMG_DIM`, `PAGES["horarios"]` e `PAGES["projetos-*"]`.
4. Testes:
   - `node --check script.js`: ok;
   - teste com **jsdom**, no scratchpad e fora do repositório, sem adicionar dependências:
     - Horários exibe 5 linhas e "5 resultados";
     - o filtro Qui retorna 2 linhas;
     - a busca "ildevana" retorna 1 linha;
     - "Atendimento ao aluno" mostra a mensagem de vazio;
     - cada categoria de Projetos tem a quantidade esperada (41/27/18/17/8/3/3/2);
     - a página Projetos continua com 8 botões e nenhuma imagem `img.shot` é renderizada.
   - **Não testei visualmente num navegador real.** Falta conferir aparência e responsividade.

## 4. O que ficou pendente (dentro do escopo)
1. **Horários incompletos.** A captura original foi cortada após 5 das 47 linhas. As outras 42 aulas e **todos os horários de atendimento ao aluno** não existem em nenhuma versão do projeto, nem como imagem. Uma busca na web não encontrou a oferta 2026/2 publicada. Elas precisam ser preenchidas a partir da oferta oficial (GURI/SIE), seguindo o formato de `HORARIOS` (`sem`, `disc`, `cod`, `prof`, `dia`, `hora`, `sala`, `tipo`).
2. **Código de "Computação e Sociedade"** não aparece na captura e ficou vazio.
3. **Possíveis erros de transcrição.** Os dados foram lidos de imagem. Vale uma revisão humana, principalmente de registros e datas. Os textos foram mantidos como estavam na origem, inclusive grafias como "Streamming", "Poluentes Emergente" e "implementacao".
4. **Imagens antigas mantidas.** Os PNGs de `img/` (horarios, pesquisa-*, extensao-* etc.) e as regras `.shot`/`.shot-group` do CSS continuam no repositório, mas não são mais usados. Deixei assim para servir de referência na conferência. Podem ser apagados depois.

## 5. Observações fora do escopo (não alteradas)
- `CORRECOES.md`, `CORRECOES-VERSAO2.md` e `ANALISE-ERRO-SELETOR.md` ainda descrevem as tabelas como imagens e citam o `IMG_DIM`. São relatórios históricos e não foram editados.
- `PESQUISA-AVANCADA-ABAS.md` cita "9 páginas de Projetos" no filtro. Esse número continua correto.
