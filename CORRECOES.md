# Relatório de correções – protótipo IHC (Engenharia de Software / Unipampa)

Continuação de [`ANALISE-ERRO-SELETOR.md`](ANALISE-ERRO-SELETOR.md). Este documento descreve:

1. Por que o erro continuava depois da primeira correção.
2. Como ele foi resolvido de forma definitiva.
3. A correção dos outros problemas encontrados na análise anterior e nesta.
4. Como tudo foi verificado.
5. O que ficou de fora.

---

## 1. Por que o erro continuava

A saída relatada começa com:

```
/home/gatopreto/.nvm/versions/node/v24.14.0/bin/node /home/gatopreto/WebstormProjects/ihc/script.js
```

Ou seja, o arquivo ainda estava sendo executado pelo **Node.js** (botão **Run** do WebStorm com o `script.js` aberto), e não pelo navegador. A primeira correção só trocou o erro enganoso (`ReferenceError: document is not defined` na linha do `$`) por uma mensagem explicativa. Mas a mensagem continuava sendo um erro, e o fluxo "clicar em Run" continuava sem funcionar.

O `script.js` depende do DOM (`document`, `window`, `location`), que **só existe no navegador**. Não há como "rodar o site" dentro do Node. O que o Node pode fazer é **servir os arquivos e abrir o navegador**.

## 2. Correção definitiva: o Run do WebStorm agora abre o site

### 2.1 `script.js`: dois caminhos de execução

Todo o código do protótipo foi movido para uma função `iniciar()`. No topo do arquivo, o script detecta o ambiente:

```js
if (typeof document === "undefined") {
  if (typeof require === "function") require("./server.js"); // Node: sobe servidor e abre navegador
} else {
  iniciar();                                                  // Navegador: roda o protótipo
}

function iniciar() { /* ...todo o código do protótipo... */ }
```

- `function iniciar()` é *hoisted*, então pode ser chamada antes da declaração.
- Não se usa `return` no nível superior, que seria erro de sintaxe no navegador.
- Efeito colateral positivo: `$`, `modal`, `body`, `input` etc. deixaram de ser variáveis globais. Antes, incluir o script duas vezes gerava `Identifier 'DOCENTES' has already been declared`.

### 2.2 `server.js` (novo)

Servidor estático feito só com módulos nativos do Node (`http`, `fs`, `path`, `child_process`). Não precisa de `npm install`.

- Serve a pasta do projeto em `http://localhost:8080/`. Se a porta estiver ocupada, tenta 8081, 8082… (até 10 tentativas).
- Abre o navegador padrão com `xdg-open` (Linux), `open` (macOS) ou `start` (Windows). Se não conseguir, mostra a URL no terminal.
- Define o `Content-Type` correto e usa `Cache-Control: no-store`, para o navegador sempre buscar a versão mais recente.
- Bloqueia acesso fora da pasta do projeto e às pastas `.git` e `.idea`.
- Variáveis opcionais: `PORT` (porta inicial) e `NO_BROWSER=1` (não abre o navegador).

### 2.3 `package.json` (novo)

Contém o script `npm start` (= `node server.js`). O WebStorm detecta esse script e mostra o botão ▶ ao lado dele.

### Resultado

| Ação | Antes | Agora |
|---|---|---|
| Run sobre `script.js` no WebStorm | `ReferenceError` (1ª versão) / `Error: precisa rodar no navegador` (2ª versão) | `Protótipo disponível em http://localhost:8080/` e o navegador abre |
| `npm start` / `node server.js` | não existia | idem acima |
| Abrir `index.html` no navegador | funcionava | continua funcionando |

---

## 3. Outras correções

### 3.1 Bugs funcionais

| # | Problema | Correção |
|---|---|---|
| 1 | **A busca não encontrava docentes pelo nome.** A busca indexava o HTML da página, mas a tabela de docentes só é preenchida depois, por `renderDocentes()`. | A página `docentes` ganhou o campo `busca: () => ...` com os nomes e e-mails, e `textoDaPagina()` inclui esse texto extra quando ele existe. Agora "schepke" retorna "Docentes do campus Alegrete". |
| 2 | **Página em branco ao abrir a URL com `#menu`, `#conteudo`, `#busca` ou `#rodape`.** `render()` retornava cedo nesses hashes, mesmo sem nenhum conteúdo renderizado. | `render()` só ignora esses hashes se já houver conteúdo. No carregamento inicial, renderiza a página padrão. |
| 3 | **Clicar num resultado da busca não restaurava o campo da barra superior.** O `tabIndex` ficava 0, então o campo continuava focável com a busca fechada. | Há um único caminho de fechamento, `fecharBusca(devolverFoco = true)`. Ao clicar num resultado, chama `fecharBusca(false)`: fecha corretamente, mas não devolve o foco, porque a navegação já leva o usuário para a nova página. |
| 4 | **Atalhos `Alt+1..4` conflitavam com a troca de abas** do Chrome/Firefox no Linux e Windows. | O teclado agora é lido por `e.code` (`Digit1`, `Numpad1`…), o que aceita também **`Alt+Shift+1..4`** e independe do layout do teclado. Os links de atalho no `index.html` ganharam `title` informando a alternativa. |
| 5 | **Modal de busca sem *focus trap*.** Mesmo com `aria-modal="true"`, o Tab escapava para a página ao fundo. | `Tab`/`Shift+Tab` circulam entre os elementos focáveis do modal (e o campo superior, quando a "Pesquisa avançada" está ativa). |

### 3.2 Dados e conteúdo

| # | Problema | Correção |
|---|---|---|
| 6 | Erro de digitação "Uruguaina". | Corrigido para **"Uruguaiana"**. |
| 7 | E-mails de Itaqui, Jaguarão, Santana do Livramento, São Gabriel e Uruguaiana sem a classe `mail`. | Classe adicionada: todas as bibliotecas exibem o e-mail destacado da mesma forma. |
| 8 | Comentário dizia que o e-mail "vira texto verde", mas o CSS usa `var(--link)`. | Comentário reescrito: `[rótulo, valor, classe?]; a classe "mail" destaca o e-mail na cor de link`. |
| 9 | Link do calendário `« nov`: a seta de "anterior" apontava para o mês seguinte. | Alterado para **`nov »`** no `index.html`. |

### 3.3 Qualidade, acessibilidade e manutenção

| # | Problema | Correção |
|---|---|---|
| 10 | Tabela de docentes interpolava dados sem `esc()`, ao contrário das bibliotecas. | Nome, e-mail e URL passam por `esc()`. |
| 11 | Regex de acentos com caracteres combinantes literais (`/[̀-ͯ]/g`), invisíveis e frágeis. | Trocada por `/[̀-ͯ]/g`. |
| 12 | Imagens das páginas de projetos sem `width`/`height`, causando deslocamento de layout ao carregar. | Novo mapa `IMG_DIM` com as dimensões reais de cada PNG (lidas do cabeçalho dos arquivos), aplicadas como atributos. O CSS (`height: auto`) mantém a responsividade. |
| 13 | Botões de filtro de docentes indicavam o estado ativo só pela cor. | Adicionado `aria-pressed`, atualizado a cada clique. |
| 14 | `README.md` vazio, sem instruções de execução. | README com as formas de executar, a estrutura e os atalhos. |
| 15 | Pasta `.idea/` sem tratamento no Git. | Criado `.gitignore` na raiz ignorando `.idea/`, `node_modules/` e logs do npm. |
| 16 | Espaçamento do helper alterado durante a edição (`const $ =(s, ...`). | Restaurado para `const $ = (s, el = document) => ...`. A lógica não mudou. |

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
| `/.git/config` | 403 |
| `/../etc/passwd` | 404 (não sai da pasta) |

### 4.2 Execução no navegador (DOM real com jsdom)

O `index.html` e o `script.js` foram carregados num DOM real (jsdom 24) e 18 verificações foram executadas. O mesmo teste rodou na versão original (`HEAD`) para provar que ele detecta os bugs:

| Verificação | Original | Corrigido |
|---|---|---|
| Página inicial renderiza / 12 páginas navegam sem erro de script | ✅ | ✅ |
| Busca sem acento ("laboratorio") encontra Infraestrutura | ✅ | ✅ |
| Modal abre / `Esc` fecha | ✅ | ✅ |
| "Uruguaiana" correto | ❌ | ✅ |
| E-mail de Itaqui com classe `mail` | ❌ | ✅ |
| Imagens de projetos com `width`/`height` | ❌ | ✅ |
| Filtro de docentes com `aria-pressed` | ❌ | ✅ |
| Busca encontra docente ("schepke") | ❌ | ✅ |
| Clicar em resultado fecha a busca e restaura o `tabIndex` | ❌ | ✅ |
| *Focus trap* no modal | ❌ | ✅ |
| `Alt+Shift+1` leva ao conteúdo | ❌ | ✅ |
| Abrir com `#menu`, `#conteudo`, `#rodape`, `#busca` não deixa a página vazia (4 testes) | ❌ | ✅ |

> O teste não foi incluído no projeto, para não adicionar dependências (`jsdom`). Ele ficou num diretório temporário da sessão.

---

## 5. Erros e inconsistências fora do escopo (não corrigidos)

São problemas que mudariam o desenho do protótipo ou exigiriam decisões da equipe, por isso só estão registrados aqui.

### Acessibilidade (relevante para IHC)

1. **Fontes muito pequenas:** barra de acessibilidade com `8.5px`, menu lateral e filtros com `8–9px`, barra lateral direita com `8.5px` (`style.css`). Ficam abaixo do mínimo recomendado para leitura (~12px) e prejudicam usuários com baixa visão.
2. **Contraste dos botões grandes:** texto branco sobre `#0a8f3c` dá cerca de 4,3:1, abaixo do 4,5:1 exigido pela WCAG AA para texto pequeno (`.big-btn.small-text`, 13px).
3. **Tabelas como imagem:** as páginas de Projetos e Horários exibem tabelas como PNG. Leitores de tela e a busca do site não acessam o conteúdo, e o `alt` descreve só a estrutura da tabela, não os dados.
4. **Modo alto contraste incompleto:** o modal de busca, o menu lateral, a barra gov.br e os cards de contato (`.card.mint`) não recebem o tema escuro.
5. **`Alt+número` pode continuar trocando de aba** em alguns navegadores, porque a página não consegue bloquear atalhos reservados do navegador. A alternativa `Alt+Shift+número` foi adicionada, mas o rótulo visual `<kbd>1</kbd>` não a menciona (só o `title`).

### Conteúdo e comportamento de protótipo

6. **Calendário fixo em Outubro/2026**, sem marcar o dia atual (a classe `.calendar td.today` existe no CSS, mas nunca é usada), e o link `nov »` não navega (`noop`).
7. **Muitos links `noop`** (PPC em PDF, menu lateral, barra SisBi, notícias): clicar neles não faz nada e não há indicação visual de que estão indisponíveis.
8. **O formulário de contato não envia nada** (comportamento declarado), e a validação de e-mail (`/\S+@\S+\.\S+/`) é permissiva.
9. **Datas "Página gerada em" fixas** (06/11/26) no código.
10. **"Bens patrimoniais"** mostra sempre o mesmo texto de placeholder em todas as salas.
11. **O filtro de docentes guarda estado global:** ao sair e voltar para a página, o último filtro continua aplicado, sem indicação disso na URL.

### Código

12. **`esc()` não escapa aspas simples (`'`):** hoje é seguro porque os atributos usam aspas duplas, mas é frágil para usos futuros.
13. **A busca re-renderiza o HTML de todas as páginas a cada pesquisa:** aceitável para cerca de 30 páginas, mas convém criar um índice único se o conteúdo crescer.
14. **Sem testes automatizados no repositório:** a verificação da seção 4.2 poderia virar um teste (`npm test`) se a equipe aceitar `jsdom` como dependência de desenvolvimento.
15. **`ANALISE-ERRO-SELETOR.md`:** a seção 4 desse documento lista como "não corrigidos" itens que este relatório corrigiu. Este arquivo (`CORRECOES.md`) é a referência atualizada.
