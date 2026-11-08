# Relatório de correções: branch `versao2`

Este documento cobre:

1. O que causava o erro `ReferenceError: document is not defined`.
2. Por que a `versao2` tinha o mesmo erro que a `versao1` já havia resolvido.
3. O que foi corrigido.
4. Como as correções foram verificadas.
5. O que ficou **fora do escopo** e não foi corrigido.

---

## 1. Causa do erro

```
/home/gatopreto/.nvm/versions/node/v24.14.0/bin/node /home/gatopreto/WebstormProjects/ihc/script.js
/home/gatopreto/WebstormProjects/ihc/script.js:831
document.querySelectorAll(".sub-toggle").forEach((btn) =>
^
ReferenceError: document is not defined
```

O `script.js` foi executado pelo **Node.js** (botão **Run** do WebStorm com o arquivo aberto), não pelo navegador.

- `script.js` é um script **de navegador**. Ele usa `document`, `window`, `location` e `localStorage`, objetos do DOM que **não existem no Node**.
- As linhas 1–830 só declaram dados e funções. Nenhuma delas acessa o DOM no momento da carga (o `$` usa `document` só quando é chamado).
- A **linha 831** é a primeira instrução de nível superior que acessa `document`, por isso o Node para ali.
  - Na `versao1` o erro aparecia na linha do helper `$`. Lá, a primeira chamada ao `$` vinha antes de qualquer acesso direto a `document`.
  - A causa é a mesma nas duas versões: o arquivo está sendo executado fora do navegador.

**O código da linha 831 não está errado.** No navegador (abrindo o `index.html`), essa parte funcionava.

## 2. Por que a `versao2` ainda tinha o problema

```
* b2ab86b (versao1) [fix] - adição correções referencias
* e118c20 feat: add initial functional prototype of the course website
| * 8155385 (versao2) feat: add second version of the prototype ...
|/
* 7145962 Initial commit
```

A `versao2` foi criada a partir do **`Initial commit`**, não da `versao1`. Por isso ela não recebeu nada da correção `b2ab86b`: `server.js`, `package.json`, a função `iniciar()` e as outras correções.

Além disso, muitos bugs da `versao1` foram copiados para a `versao2`: busca, roteador, atalhos, dados das bibliotecas etc. Eles foram **reaplicados (portados)** manualmente sobre o código da `versao2`, adaptados às mudanças dela.

> Os arquivos `ANALISE-ERRO-SELETOR.md` e `CORRECOES.md`, não rastreados na pasta, são relatórios da `versao1`. Lá eles não entraram no Git porque o `.gitignore` daquela branch ignora `*.md`. Eles descrevem a `versao1`, não esta branch, e não foram alterados.

---

## 3. Correções aplicadas

### 3.1 Erro principal: o Run do WebStorm agora abre o site

| Arquivo | Mudança |
|---|---|
| `script.js` | Todo o código foi movido para `function iniciar() { ... }`. No topo, uma guarda detecta o ambiente. **No navegador**, chama `iniciar()`. **No Node**, faz `require("./server.js")`, que sobe um servidor e abre o navegador. Usa `typeof document`, que não gera erro mesmo quando o identificador não existe. Não usa `return` no nível superior, que seria erro de sintaxe no navegador. |
| `server.js` (novo, igual ao da `versao1`) | Servidor estático só com módulos nativos (`http`, `fs`, `path`, `child_process`), sem `npm install`. Serve a pasta em `http://localhost:8080/` e, se a porta estiver ocupada, tenta as próximas. Abre o navegador padrão (`xdg-open`/`open`/`start`). Bloqueia `.git`, `.idea` e caminhos fora do projeto. Aceita as variáveis `PORT` e `NO_BROWSER=1`. |
| `package.json` (novo) | `npm start` executa `node server.js`. |

Efeito colateral positivo: `$`, `modal`, `body`, `input`, `content` etc. deixaram de ser variáveis globais da página.

| Ação | Antes | Agora |
|---|---|---|
| Run sobre `script.js` no WebStorm | `ReferenceError: document is not defined` (linha 831) | `Protótipo disponível em http://localhost:8080/` e o navegador abre |
| `npm start` / `node server.js` | não existia | idem |
| Abrir `index.html` no navegador | funcionava | continua funcionando |

### 3.2 Bugs funcionais (portados da `versao1` e confirmados na `versao2`)

| # | Problema | Correção |
|---|---|---|
| 1 | **A busca não encontrava docentes pelo nome.** A busca indexa o HTML gerado pela página, mas a tabela de docentes é preenchida depois, por `renderDocentes()`. | A página `docentes` ganhou `busca: () => nomes + e-mails`, e `textoDaPagina()` inclui esse texto. Agora "schepke" retorna "Docentes do campus Alegrete". |
| 2 | **Página em branco ao abrir a URL com `#menu`, `#conteudo`, `#busca` ou `#rodape`** (ex.: recarregar depois de usar um atalho). `render()` retornava cedo sem ter renderizado nada. | `render()` só ignora esses hashes se já houver conteúdo na página. No primeiro carregamento, mostra a página inicial. |
| 3 | **Clicar num resultado da busca deixava o campo superior focável** (`tabIndex = 0`) com a busca fechada. O fechamento por clique repetia só parte de `fecharBusca()`. | `fecharBusca(devolverFoco = true)` passou a ser o único caminho de fechamento. Ao clicar num resultado, usa `fecharBusca(false)`, porque a navegação já leva o usuário à nova página. |
| 4 | **`Alt+1..4` conflita com a troca de abas** do Chrome/Firefox no Linux e Windows. | Teclas lidas por `e.code` (`Digit1`, `Numpad1`…). Agora aceita também **`Alt+Shift+1..4`** e funciona em qualquer layout de teclado. Os links de atalho do `index.html` ganharam um `title` com a alternativa. |
| 5 | **Modal de busca sem *focus trap*.** Apesar de `aria-modal="true"`, o `Tab` escapava para a página ao fundo. | `Tab`/`Shift+Tab` circulam dentro do modal. Com "Pesquisa avançada" marcada, o campo superior também entra no ciclo. |

### 3.3 Dados e conteúdo

| # | Problema | Correção |
|---|---|---|
| 6 | "Uruguaina" no botão da biblioteca. | **"Uruguaiana"**. |
| 7 | Os e-mails de Itaqui, Jaguarão, Santana do Livramento, São Gabriel e Uruguaiana estavam sem a classe `mail`, ao contrário das outras bibliotecas. | Classe adicionada. |
| 8 | Comentário dizia que o e-mail "vira texto verde", mas o CSS usa a cor de link. | Comentário corrigido. |

### 3.4 Acessibilidade, qualidade e manutenção

| # | Problema | Correção |
|---|---|---|
| 9 | Filtros de docentes (letras) e de categorias de notícias indicavam o estado ativo só pela cor. | `aria-pressed` adicionado e atualizado a cada clique. |
| 10 | A tabela de docentes interpolava dados sem `esc()`. | Nome, e-mail e URL passam por `esc()`. |
| 11 | A regex de remoção de acentos usava caracteres combinantes literais (`/[̀-ͯ]/g`), invisíveis no editor e frágeis. | `/[̀-ͯ]/g`. |
| 12 | As imagens das páginas de projetos não tinham `width`/`height`, o que desloca o layout durante o carregamento. | Mapa `IMG_DIM` com as dimensões reais dos PNGs (lidas do cabeçalho dos arquivos). A regra `img { max-width:100%; height:auto }` mantém a responsividade. |
| 13 | `README.md` continha só `# ihc`. | README com as formas de executar, a estrutura e os atalhos. |
| 14 | Sem `.gitignore`. A pasta `.idea/` aparecia como não rastreada. | `.gitignore` enxuto: `.idea/`, `node_modules/` e logs do npm. Diferente da `versao1`, ele **não** ignora `*.md`. |

### Arquivos alterados

```
M  script.js     (guarda de ambiente + iniciar(); itens 1–12. Em `git diff -w`: +94/-28 linhas)
M  index.html    (title dos 4 atalhos de acessibilidade)
M  README.md
A  server.js
A  package.json
A  .gitignore
A  CORRECOES-VERSAO2.md
```

`style.css` e as imagens não foram alterados. O diff completo do `script.js` parece grande porque todo o código ganhou 2 espaços de indentação ao entrar em `iniciar()`. Use `git diff -w` para ver só as mudanças reais.

---

## 4. Verificação

### 4.1 Execução pelo Node

```
$ NO_BROWSER=1 node script.js
Protótipo disponível em http://localhost:8080/
```

| Requisição | Resposta |
|---|---|
| `/` | 200 `text/html` |
| `/script.js` | 200 `text/javascript` |
| `/style.css` | 200 `text/css` |
| `/img/logo-unipampa.png` | 200 `image/png` |
| `/.git/config`, `/.idea/workspace.xml` | 403 |
| `/../etc/passwd` | 404 (não sai da pasta) |

### 4.2 Execução no navegador (DOM real com jsdom)

`index.html` + `script.js` foram carregados em jsdom 24, e o mesmo teste rodou na versão original (`HEAD`) e na corrigida:

| Verificação | Original | Corrigido |
|---|---|---|
| Página inicial renderiza | ✅ | ✅ |
| As 54 páginas do mapa do site navegam sem erro de script | ✅ | ✅ |
| Nenhum link interno aponta para página inexistente | ✅ | ✅ |
| Submenu lateral abre/fecha e a página filha marca o item lateral | ✅ | ✅ |
| Busca sem acento ("laboratorio") encontra Laboratórios | ✅ | ✅ |
| Filtros de docentes e de categorias filtram | ✅ | ✅ |
| Calendário marca o dia atual e navega entre meses | ✅ | ✅ |
| Busca encontra docente ("schepke") | ❌ | ✅ |
| Clicar em resultado fecha a busca e restaura o `tabIndex` | ❌ | ✅ |
| `aria-pressed` nos filtros de docentes e de categorias (2 testes) | ❌ | ✅ |
| "Uruguaiana" correto / e-mail de Itaqui com `mail` (2 testes) | ❌ | ✅ |
| Abrir com `#menu`, `#conteudo`, `#busca`, `#rodape` não deixa a página vazia (4 testes) | ❌ | ✅ |
| `Alt+Shift+1` leva ao conteúdo | ❌ | ✅ |
| *Focus trap* no modal | ❌ | ✅ |
| **Total** | **12/24** | **24/24** |

> O teste não foi adicionado ao projeto para não criar dependências (`jsdom`). Ele foi executado num diretório temporário da sessão.

---

## 5. Fora do escopo (identificado, **não corrigido**)

Estes itens mudariam o desenho do protótipo ou dependem de decisão da equipe. Por isso só estão registrados aqui.

### Git / organização do repositório

1. **`versao1` e `versao2` divergem desde o `Initial commit`.** Correções feitas numa branch não chegam à outra, e um merge futuro deve ter conflitos em `script.js`, `index.html` e `style.css`. Vale escolher uma branch base e aplicar o trabalho sobre ela, por *rebase* ou *cherry-pick*.
2. **Nome da branch remota diferente:** a local se chama `versao2` e a remota `origin/versao-2`. Um `git push` sem *upstream* configurado cria uma terceira branch.
3. **O `.gitignore` da `versao1`** é um template genérico (Visual Studio, Python etc.). Ele ignora `*.md`, por isso os relatórios ficaram fora do Git, e padrões como `[Ll]ib`, `[Ss]cripts` e `[Bb]in`, que podem esconder arquivos legítimos.
4. **`ANALISE-ERRO-SELETOR.md` e `CORRECOES.md`** (da `versao1`) continuam soltos e não rastreados nesta pasta. Ainda é preciso decidir se serão versionados, movidos ou removidos.
5. **Nada foi commitado.** As alterações estão no *working tree* para revisão.

### Acessibilidade (relevante para IHC)

6. **Fontes muito pequenas** no `style.css`: vários trechos com `8px`, `8.5px` e `9px` (barra de acessibilidade, menu lateral, filtros, barra direita), abaixo do mínimo recomendado (~12px).
7. **Contraste dos botões grandes:** texto branco sobre `#0a8f3c` fica em ~4,3:1, abaixo do 4,5:1 da WCAG AA para texto pequeno (`.big-btn.small-text`).
8. **Tabelas como imagem** (Horários e páginas de Projetos). O conteúdo não chega a leitores de tela nem à busca do site.
9. **Modo alto contraste incompleto:** o modal de busca, a barra gov.br, a barra SisBi, o aviso de cookies e os cards `.mint` não recebem o tema.
10. **`Alt+número` ainda pode trocar de aba** em alguns navegadores, porque a página não consegue bloquear atalhos reservados. A alternativa `Alt+Shift` aparece só no `title`, não no rótulo `<kbd>`.

### Navegação e conteúdo (específicos da `versao2`)

11. **"Docentes" duplicado no menu lateral:** o item de topo e "Corpo Docente" (submenu O Curso) apontam para `#docentes`. Os dois ficam destacados ao mesmo tempo, e a página não abre o submenu (não tem `pai`).
12. **Conteúdo duplicado na busca:** "O Curso" e "Apresentação" usam o mesmo texto (`TEXTO_CURSO`), assim como "Início" e "Notícias". Uma busca por esses termos retorna os dois.
13. **Os links de documentos** (`doc()`) abrem a página do site oficial, não o arquivo. Vários apontam para a mesma página: as 4 matrizes usam `page_id=18`, e as 2 normas de resolução de problemas, `page_id=1954`.
14. **A paginação das notícias** (2, 36, Próximo) leva ao site oficial, o que mistura protótipo e site real.
15. **O calendário não tem eventos.** A página Agenda diz "use o calendário na barra lateral para navegar", mas não há nada para ver nele. O `index.html` traz "Outubro 2026" e "« out" fixos até o JS rodar.
16. **Rótulos em inglês** na página "PPC anteriores" (Files, Citation, Collections, Date, Authors), copiados do DSpace.
17. **`GRUPOS`:** o segundo campo (nome completo do grupo) está vazio em 5 de 6 grupos e não é exibido.
18. **Botões de categoria dentro dos cards/posts** (`.post-meta .cat`) parecem etiquetas, mas filtram a lista ou navegam para ela. O comportamento não é indicado visualmente.

### Comportamento de protótipo

19. Ainda há muitos links `noop` (barra gov.br, barra SisBi, PDFs do PPC, "Cursos da Unipampa" no breadcrumb, posts do SisBi). Eles não fazem nada e não têm indicação visual disso.
20. O formulário de contato não envia nada (comportamento declarado), e a validação de e-mail (`/\S+@\S+\.\S+/`) é permissiva.
21. As datas "Página gerada em 06/11/26" estão fixas no código.
22. "Bens patrimoniais" mostra o mesmo texto de placeholder em todas as salas.
23. Os filtros de docentes e de categoria guardam estado global: ao sair e voltar para a página, o último filtro continua aplicado, sem reflexo na URL.

### Código

24. `esc()` não escapa aspas simples (`'`). Hoje é seguro, porque os atributos usam aspas duplas.
25. A busca gera o HTML de **todas as 54 páginas** a cada pesquisa. Funciona, mas um índice gerado uma vez seria mais eficiente se o conteúdo crescer.
26. Textos de páginas e notícias são interpolados sem `esc()`. Hoje são dados fixos do próprio código, mas o risco existe se vierem de fonte externa.
27. Não há testes automatizados no repositório. A verificação da seção 4.2 poderia virar um `npm test`, se a equipe aceitar `jsdom` como dependência de desenvolvimento.
