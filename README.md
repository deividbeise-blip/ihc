# ihc

Protótipo navegável do site do curso de **Engenharia de Software – Unipampa (Campus Alegrete)**, feito para a disciplina de IHC.

HTML, CSS e JavaScript puros, sem dependências.

## Como executar

O `script.js` é um script **de navegador**: ele precisa de `document`/`window`. Qualquer uma das opções abaixo funciona:

| Opção | Como |
|---|---|
| Servidor local (recomendado) | `npm start` ou `node server.js` → abre `http://localhost:8080/` no navegador |
| WebStorm – botão Run | Rodar `script.js` ou `server.js` com o Run sobe o mesmo servidor e abre o navegador |
| WebStorm – navegador embutido | Abrir `index.html` e clicar no ícone de navegador no canto superior direito do editor |
| Direto pelo arquivo | Dar dois cliques em `index.html` |

Variáveis opcionais do servidor: `PORT=3000` (porta inicial; se estiver ocupada, tenta as seguintes) e `NO_BROWSER=1` (não abre o navegador).

## Estrutura

```
index.html   estrutura fixa (barras, menus, laterais, modal de busca)
script.js    dados, páginas (roteamento por #hash), notícias, menu lateral, calendário, busca e acessibilidade
style.css    estilos, modos alto contraste/escala de cinza e responsividade
server.js    servidor estático local (só módulos nativos do Node)
img/         imagens das páginas
```

## Atalhos de acessibilidade

`Alt+1` conteúdo · `Alt+2` menu · `Alt+3` busca · `Alt+4` rodapé.
Se o navegador usar `Alt+número` para trocar de aba, use `Alt+Shift+número`.
