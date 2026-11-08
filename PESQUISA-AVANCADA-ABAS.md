# Pesquisa avançada: abas superiores como filtros de categoria

Este documento descreve a mudança na **Pesquisa avançada** do modal de busca (branch `cabral`). Ele cobre:

1. Como era antes.
2. O que mudou para o usuário.
3. Como foi implementado.
4. Como foi testado.
5. Problemas, inconsistências e melhorias que ficaram **fora do escopo**.

---

## 1. Como era antes

Com a caixa **"Pesquisa avançada"** marcada:

- Um **segundo campo de texto** (`#nav-search-input`) se abria ao lado da lupa, na barra verde. O texto digitado ali era só concatenado ao termo do modal (`input.value + " " + navInput.value`). Na prática, era uma segunda caixa de pesquisa, não um filtro.
- As **abas superiores** (Informações, PPC, Projetos…) ficavam **atrás** do fundo do modal (`.modal-backdrop`, `position: fixed; inset: 0; z-index: 50`). Um clique numa aba caía no fundo e **fechava a pesquisa**.
- A dica "Utilize a barra superior para filtrar a pesquisa" mandava o usuário para uma interação que não existia.

## 2. Comportamento novo

Com o modal aberto e **"Pesquisa avançada"** marcada:

| Ação | Resultado |
|---|---|
| Marcar a caixa | A barra verde fica acima do fundo do modal. As abas ganham um contorno tracejado (indicando que são clicáveis) e o foco vai para a primeira aba. A dica passa a ser "Clique nas abas da barra superior para filtrar a pesquisa por categoria". |
| Clicar numa aba (ou Enter/Espaço com foco nela) | A aba **não navega**. Ela é **selecionada como filtro** e fica em destaque (fundo branco, texto verde, borda preta sólida). A busca é refeita na hora. |
| Clicar de novo na mesma aba | Remove o filtro e tira o destaque. |
| Selecionar várias abas | Os filtros se **somam** (OU): aparecem páginas de qualquer categoria marcada. |
| Abas selecionadas e campo de texto vazio | Lista **todas as páginas** das categorias marcadas. |
| Abas selecionadas e termo digitado | Lista as páginas das categorias que contêm **todas** as palavras do termo. |
| Linha "Filtrando por: …" | Aparece acima dos resultados, com `aria-live="polite"`, para leitores de tela. |
| Nenhum resultado | Mensagem cita o termo e as categorias e sugere remover algum filtro. |
| Desmarcar a caixa | Filtros e destaques são limpos, as abas voltam a ser links comuns. Se havia resultados, a busca é refeita sem filtros. |
| Fechar o modal (X, Esc, clique fora, clique num resultado) | Filtros e destaques são limpos. A caixa continua marcada para a próxima abertura. |

Com a pesquisa avançada desligada (ou o modal fechado), as abas funcionam como antes: navegam para a página.

## 3. Implementação

### `index.html`
- Removido o campo `#nav-search-input` da barra verde. A lupa (`#btn-busca`) continua lá.
- Novo texto na dica `#search-hint`.
- Novo parágrafo `#search-filtros` (`aria-live="polite"`) dentro do corpo do modal, para o resumo "Filtrando por: …".

### `script.js` (seção `// Pesquisa`)
- **`abas`**: lista dos links `.main-nav__list a[data-tab]`. **`filtros`**: `Set` com os `data-tab` selecionados.
- **`abaDe(id)`**: categoria de uma página. É o `tab` dela ou, se for `null`, o `tab` da página-pai (`pai`). Assim, por exemplo, `projetos-pesquisa` cai em "Projetos" e `biblioteca-uruguaiana` em "Bibliotecas".
- **`modoAvancado(on)`**: único ponto que liga/desliga o modo.
  - Liga/desliga a classe `busca-avancada` no `<body>`.
  - Para cada aba, aplica `.filtro-on`, `role="button"` e `aria-pressed="true|false"` (só enquanto o modo está ativo; ao desligar, remove os atributos).
  - Limpa `filtros` ao desligar e atualiza o resumo `#search-filtros`.
  - Chamada em `abrirBusca()` (conforme a caixa), em `fecharBusca()` (sempre desliga) e no `change` da caixa.
- **`alternarFiltro(tab)`**: adiciona/remove do `Set`, redesenha os destaques e chama `buscar()`.
- **Eventos nas abas**: `click` com `preventDefault()` quando o modo está ativo, para não trocar o `#hash`. `keydown` de Espaço também alterna, já que o link passa a ser `role="button"` (o Enter já dispara o `click` do link).
- **`buscar()`**: não usa mais o campo superior. Aceita busca **sem termo** quando há filtros. O filtro por categoria é aplicado antes da busca textual, o que evita renderizar o HTML de páginas fora das categorias.
- **Focus trap**: no modo avançado, o ciclo de `Tab` inclui as abas (antes incluía o campo superior removido).
- **`posicionarModal()`**: a barra verde vira `position: sticky` no modo avançado. Em telas estreitas, onde o menu quebra em várias linhas, ela poderia cobrir o topo do modal. A função mede `nav.getBoundingClientRect().bottom` e, se preciso, aumenta o `padding-top` do fundo do modal. Roda ao ligar/desligar o modo, no `resize` e no `scroll`.

### `style.css`
- Removidas as regras de `.nav-search input` (campo que não existe mais).
- `body.busca-avancada .main-nav`: `position: sticky; top: 0; z-index: 51`, acima do fundo do modal (`z-index: 50`), com uma sombra preta separando-a do resto.
- `body.busca-avancada .main-nav__list a`: contorno tracejado branco, indicando que são clicáveis. O `:hover` deixa o contorno sólido.
- `.filtro-on`: fundo branco, texto verde-escuro, borda preta sólida. O peso da fonte **não** muda, para não deslocar o menu.
- Foco visível amarelo (`#f5c400`, o mesmo da caixa "Pesquisa avançada").
- Alto contraste: aba selecionada com fundo amarelo e texto preto. A regra global `body.contraste a { color: #ffeb3b !important }` deixaria texto amarelo sobre branco.
- `.search-filtros`: estilo da linha "Filtrando por: …".

## 4. Testes

- `node --check script.js`: sintaxe ok.
- Teste automatizado com **jsdom** (fora do repositório). Ele carrega `index.html` + `script.js`, abre o modal, marca a pesquisa avançada e verifica:
  - `body` recebe `busca-avancada` e a dica nova aparece;
  - clicar em "Projetos" **não altera o hash**, o modal **continua aberto**, a aba recebe `.filtro-on` e `aria-pressed="true"`, e o resumo mostra "Filtrando por: Projetos";
  - sem termo, os resultados são as 9 páginas de Projetos;
  - Projetos + Bibliotecas + termo "campus" retorna só as páginas dessas categorias;
  - Espaço sobre a aba "Projetos" remove o filtro;
  - desmarcar a caixa remove classes, `role` e `aria-pressed`, e refaz a busca sem filtros;
  - com o modo desligado, clicar numa aba **não** é bloqueado (navegação normal).
- **Não foi testado visualmente num navegador real.** A aparência (contorno tracejado, destaque, barra sticky, ajuste no celular) precisa de conferência manual.

---

## 5. Fora do escopo: problemas, inconsistências e melhorias

### Cobertura das categorias
1. **A maioria das páginas não tem aba.** Início, O Curso (e filhas), Perfil do Egresso, Agenda, Avaliações MEC, TCC, Estágio, Atividades Complementares, Representação Discente, Grupos de Pesquisa, Laboratórios, Notícias, Comissão, Mapa do site e Política de cookies têm `tab: null`. Por isso **nunca aparecem quando há um filtro ativo**. Opções: um filtro extra "Outras páginas", ou usar também as seções do menu lateral como categorias.
2. **Categorias desbalanceadas.** "Informações", "Horários", "Docentes", "Infraestrutura" e "Contato" têm uma página cada. Filtrar por elas devolve um único resultado, o que é pouco útil como filtro.
3. **Classificação discutível.** "Coordenação", "Núcleo Docente Estruturante" e "Corpo Docente" (menu lateral) não ficam em "Docentes". "Laboratórios" não fica em "Infraestrutura". A categoria vem só do campo `tab` de cada página.

### Interação e acessibilidade
4. **`<a href>` com `role="button"` é um meio-termo.** O mesmo elemento é link no modo normal e botão de alternância no modo avançado. Funciona com `aria-pressed` e Espaço, mas um grupo próprio de botões de filtro (ou `role="group"` com rótulo) seria mais claro para leitores de tela.
5. **O destaque da aba da página atual (`.active`) some durante a pesquisa avançada**, porque o contorno tracejado o sobrescreve. Foi intencional, para não confundir "página atual" com "filtro selecionado", mas é uma perda de contexto.
6. **Filtros não persistem.** Ao fechar e reabrir o modal, a caixa continua marcada mas as abas voltam desmarcadas.
7. **Não há botão "Limpar filtros".** É preciso clicar de novo em cada aba ou desmarcar a caixa.
8. **Só a lógica OU entre categorias.** Não há como combinar com outros critérios (tipo de conteúdo, data das notícias etc.).
9. **O fundo do modal ainda cobre a barra gov.br, a barra de acessibilidade e o cabeçalho.** Clicar nelas fecha a pesquisa. Os botões "Alto contraste"/"Escala de cinza" ficam inacessíveis com o modal aberto.
10. **A página ao fundo continua rolando com o modal aberto** (sem *scroll lock*). Por isso a barra precisou ficar `sticky` e o `posicionarModal()` roda no `scroll`.

### Busca (já existia antes desta mudança)
11. **`textoDaPagina()` gera o HTML de cada página a cada busca.** É aceitável com as poucas dezenas de páginas atuais, mas um índice calculado uma vez seria melhor.
12. **Os títulos nos resultados não passam por `esc()`** (`${PAGES[id].titulo}`). Hoje os títulos são fixos no código, então não há risco real, mas é inconsistente com o resto.
13. **Correspondência por substring.** "ppc" encontra qualquer texto que contenha "ppc". Não há ranking: a ordem é a de declaração em `PAGES`.
14. **O termo só é buscado ao clicar em "Buscar" ou apertar Enter.** Os filtros, por outro lado, refazem a busca na hora. Busca incremental (com *debounce*) deixaria os dois iguais.

### Documentação
15. `CORRECOES-VERSAO2.md` (item 5 da seção 3.2) e `CORRECOES.md` ainda descrevem o **campo superior** no *focus trap* da pesquisa avançada. Esse campo não existe mais. Esses relatórios são históricos e não foram editados.

---

## 6. Correção posterior: a lupa da barra superior não pesquisava

### Diagnóstico
O botão de lupa (`#btn-busca`) **nunca executava a pesquisa**:

- **Pesquisa padrão:** a barra verde ficava **atrás** do fundo do modal (`z-index: 50`). O clique na lupa caía no `.modal-backdrop`, cujo handler (`e.target === modal`) **fechava** o modal.
- **Pesquisa avançada:** a barra já ficava acima do fundo, mas o handler da lupa era `modal.hidden ? abrirBusca() : fecharBusca()`. Com o modal aberto, ela também **só fechava**.

Só o botão "Buscar" do rodapé do modal e o Enter no campo executavam `buscar()`.

### Correção
| Arquivo | Mudança |
|---|---|
| `script.js` | Handler da lupa: `modal.hidden ? abrirBusca() : buscar()`. Com o modal aberto ela faz o mesmo que "Buscar" e respeita o modo (padrão ou avançado com filtros). |
| `script.js` | `abrirBusca()`/`fecharBusca()` ligam/desligam a classe `busca-aberta` no `<body>` e trocam o `aria-label`/`title` da lupa entre "Abrir pesquisa" e "Pesquisar". |
| `style.css` | A regra que deixa a barra verde `sticky` e acima do fundo do modal passou de `body.busca-avancada` para `body.busca-aberta`. Ela vale com o modal aberto **em qualquer modo**, então a lupa é sempre clicável. Os estilos de filtro das abas continuam só no modo avançado. |
| `script.js` | `posicionarModal()` (evita que a barra cubra o topo do modal) passou a valer sempre que o modal está aberto, não só na pesquisa avançada. |
| `script.js` | Como na pesquisa **padrão** as abas agora também ficam clicáveis por cima do fundo, clicar numa delas **fecha o modal e navega**. É o mesmo efeito de clicar fora, só que já levando à página. |
| `script.js` | *Focus trap*: a lupa entra no ciclo de `Tab` (antes das abas no modo avançado). |

### Testes (jsdom)
- A lupa abre o modal. Com ele aberto, o rótulo vira "Pesquisar".
- Pesquisa padrão: termo "biblioteca" + lupa → modal continua aberto, 13 resultados.
- Pesquisa avançada: filtro "Bibliotecas" + "uruguaiana" + lupa → "Bibliotecas" e "Biblioteca Uruguaiana".
- Pesquisa avançada só com filtro (sem termo) + lupa → 12 páginas de Bibliotecas.
- Esc fecha, remove `busca-aberta` e o rótulo volta a "Abrir pesquisa".
- Modo padrão: clicar numa aba com o modal aberto fecha o modal e navega.

### Observações / fora do escopo
16. **A lupa não fecha mais o modal.** Para fechar: **X**, **Esc** ou clique fora. Se alguém estiver acostumado a fechar pela lupa, vai estranhar. Uma alternativa seria um botão "fechar" ao lado da lupa enquanto o modal estiver aberto.
17. **Com o modal aberto, a barra verde agora fica fixa no topo também na pesquisa padrão** (com a sombra preta). É uma mudança visual pequena em relação ao comportamento anterior.
18. **Clicar na lupa com o campo vazio** (e sem filtros) mostra a dica "Digite o que você procura…" em vez de um aviso mais visível. É o mesmo comportamento do botão "Buscar".
