# Análise: erro no helper `$` em `script.js`

## 1. Sintoma relatado

A linha abaixo "quebra o código" e o erro diz que algo não foi declarado:

```js
const $ = (s, el = document) => el.querySelector(s);
```

## 2. Diagnóstico

### 2.1 O `$` está declarado corretamente

- O `$` é uma `const` declarada no escopo global do script, **antes** de qualquer chamada a ele (a primeira chamada é `const content = $("#conteudo")`, mais abaixo no arquivo).
- `node --check script.js` não aponta erro de sintaxe.
- Executando o script com um DOM simulado (como o navegador faz ao carregar `index.html`), ele roda até o fim sem erros.

Portanto, **o problema não é o `$`**.

### 2.2 O que realmente não está declarado é `document`

Reproduzindo como o WebStorm faz quando se clica em **Run** com `script.js` aberto (ele executa o arquivo com **Node.js**):

```
$ node script.js
/home/.../ihc/script.js:135
const $ = (s, el = document) => el.querySelector(s);
                   ^

ReferenceError: document is not defined
    at $ (script.js:135:20)
    at Object.<anonymous> (script.js:410:17)
```

Explicação:

1. `script.js` é um script **de navegador**. Ele usa `document`, `window` e `location`, que são objetos do navegador (DOM) e **não existem no Node.js**.
2. O valor padrão `el = document` só é avaliado quando `$` é chamado sem o segundo argumento. A primeira chamada acontece em `const content = $("#conteudo")`.
3. Nesse momento o Node tenta ler `document`, não encontra, e lança `ReferenceError: document is not defined`.
4. Como o erro ocorre **dentro** do parâmetro padrão, o stack trace aponta (com o `^`) exatamente para a linha do `$`. Isso dá a impressão de que o `$` é que não foi declarado.

Em resumo: o código está certo para o navegador, mas estava sendo executado no ambiente errado (Node), e a mensagem de erro aponta para a linha do helper.

## 3. Correção aplicada

### 3.1 Como executar corretamente (a solução de fato)

Abra o **`index.html` no navegador**, não o `script.js` no Node:

- **WebStorm:** com `index.html` aberto, clique no ícone de navegador que aparece no canto superior direito do editor, ou clique com o botão direito em `index.html` → *Open In* → *Browser*. O WebStorm serve a página pelo servidor embutido (`http://localhost:63342/...`).
- **Alternativa:** dê dois cliques no `index.html` ou rode um servidor estático (`npx serve .` ou `python3 -m http.server`) e acesse pelo navegador.

### 3.2 Mudança no código (`script.js`)

1. **Guarda de ambiente no topo do arquivo.** Se o script for executado sem DOM, ele para logo no início com uma mensagem clara, em vez do `ReferenceError` enganoso:

   ```js
   if (typeof document === "undefined") {
     throw new Error(
       "script.js precisa rodar no navegador (não no Node). Abra o index.html no navegador para visualizar o protótipo."
     );
   }
   ```

   `typeof` não lança erro com identificadores não declarados, por isso é seguro usá-lo aqui. No navegador, `document` sempre existe e a guarda não tem efeito.

2. **Comentários** explicando o motivo da guarda e por que o erro aparecia na linha do `$`.

O helper `$` em si **não foi alterado**, porque está correto.

### 3.3 Verificação

| Cenário | Antes | Depois |
|---|---|---|
| `node script.js` (Run do WebStorm) | `ReferenceError: document is not defined` na linha do `$` | `Error: script.js precisa rodar no navegador (não no Node)...` na linha da guarda |
| Execução com DOM (navegador / DOM simulado) | OK | OK (sem mudança de comportamento) |

## 4. Outros erros e inconsistências (fora do escopo, **não corrigidos**)

> **Atualização:** todos os itens desta seção foram corrigidos depois. Veja [`CORRECOES.md`](CORRECOES.md).

As linhas citadas referem-se ao `script.js` já com a correção.

### Bugs funcionais

1. **A busca não encontra docentes pelo nome** (`script.js:255`, `script.js:508`). `textoDaPagina()` indexa o texto retornado por `PAGES[id].html()`, mas na página de docentes o `<tbody id="docentes-body">` sai vazio. Ele só é preenchido depois, por `renderDocentes()` (o `after`). Assim, buscar "Schepke" não retorna nada, embora a mensagem da busca (`script.js:549`) sugira procurar "o nome de um docente". *Sugestão:* incluir os nomes de `DOCENTES` no texto indexado da página `docentes`.
2. **A página fica vazia ao abrir com `#conteudo`, `#menu`, `#busca` ou `#rodape` na URL** (`script.js:427`). `render()` retorna cedo nesses hashes, mas no carregamento inicial nada foi renderizado ainda, então o `<main>` fica em branco. *Sugestão:* nesses casos, renderizar a página padrão quando `content` estiver vazio.
3. **Fechar a busca clicando num resultado não restaura o estado do campo superior** (`script.js:564`). O handler `[data-close]` esconde o modal, mas não volta `navInput.tabIndex = -1`, ao contrário de `fecharBusca()`. O campo fica acessível por Tab mesmo com a busca fechada.
4. **Atalhos `Alt+1..4`** (`script.js:474`): no Linux/Windows, Chrome e Firefox usam `Alt+número` para trocar de aba. O `preventDefault()` nem sempre impede isso, então o atalho pode não funcionar ou trocar de aba.

### Inconsistências de dados e conteúdo

5. **Erro de digitação:** `nome: "Uruguaina"` → deveria ser **"Uruguaiana"** (`script.js:134`). Aparece no botão, no título da página e nos resultados da busca.
6. **E-mails das bibliotecas formatados de forma desigual:** Alegrete, Bagé, Caçapava, Dom Pedrito e São Borja têm a marcação `"mail"` (texto colorido). Itaqui, Jaguarão, Santana do Livramento, São Gabriel e Uruguaiana não têm (`script.js:92, 102, 111, 127, 137`).
7. **Comentário desatualizado:** `script.js:52` diz que o e-mail "vira texto verde", mas o CSS (`style.css:264`, `.lib .mail { color: var(--link); }`) usa a cor de link.
8. **Calendário:** o mês está fixo em Outubro/2026, e o link `« nov` (`index.html:108`) usa a seta de "anterior" para o mês seguinte. Deveria ser `nov »` ou `« set`.

### Qualidade de código e manutenção

9. **Escape inconsistente:** a tabela de docentes (`script.js:272`) interpola nome, e-mail e URL sem `esc()`, enquanto as bibliotecas usam `esc()`. Hoje os dados são estáticos, então não há risco imediato, mas vira um problema se os dados passarem a vir de fonte externa.
10. **Regex de remoção de acentos frágil** (`script.js:513`): `/[̀-ͯ]/g` usa os caracteres combinantes literais, que são invisíveis no editor e fáceis de corromper. Prefira `/[̀-ͯ]/g`.
11. **Modal de busca sem *focus trap*:** com `aria-modal="true"`, o Tab ainda sai do diálogo para a página ao fundo.
12. **Imagens das páginas de projetos sem `width`/`height`**, o que causa deslocamento de layout (CLS) ao carregar.
13. **README vazio** (só `# ihc`): não explica como abrir o protótipo. Foi isso que levou à execução pelo Node. Vale adicionar a seção "Como executar" da seção 3.1.
14. **Pasta `.idea/` não versionada nem ignorada:** convém decidir entre adicioná-la ao `.gitignore` do projeto ou versionar só as configurações compartilháveis.
