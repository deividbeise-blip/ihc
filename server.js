/* Servidor estático local para visualizar o protótipo no navegador.
 *
 * Uso:  node server.js   (ou: npm start)
 * Também é carregado automaticamente quando alguém executa `node script.js`
 * (ex.: botão "Run" do WebStorm), já que script.js só funciona no navegador.
 *
 * Usa apenas módulos nativos do Node — não precisa de `npm install`.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const RAIZ = __dirname;
const PORTA_INICIAL = Number(process.env.PORT) || 8080;
const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const servidor = http.createServer((req, res) => {
  let caminho;
  try {
    caminho = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400).end("Requisição inválida");
    return;
  }
  if (caminho.endsWith("/")) caminho += "index.html";
  const arquivo = path.join(RAIZ, path.normalize(caminho));

  // impede acesso a arquivos fora da pasta do projeto e à pasta .git/.idea
  const relativo = path.relative(RAIZ, arquivo);
  if (relativo.startsWith("..") || path.isAbsolute(relativo) || /^\.(git|idea)([\\/]|$)/.test(relativo)) {
    res.writeHead(403).end("Acesso negado");
    return;
  }

  fs.readFile(arquivo, (erro, dados) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Não encontrado: " + caminho);
      return;
    }
    res.writeHead(200, {
      "Content-Type": TIPOS[path.extname(arquivo).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store", // sempre a versão mais recente durante o desenvolvimento
    });
    res.end(dados);
  });
});

function abrirNavegador(url) {
  if (process.env.NO_BROWSER) return;
  const cmd =
    process.platform === "darwin" ? `open "${url}"` :
    process.platform === "win32" ? `start "" "${url}"` :
    `xdg-open "${url}"`;
  exec(cmd, (erro) => {
    if (erro) console.log("Não foi possível abrir o navegador automaticamente. Acesse manualmente: " + url);
  });
}

function iniciar(porta, tentativas = 10) {
  servidor.once("error", (erro) => {
    if (erro.code === "EADDRINUSE" && tentativas > 0) {
      iniciar(porta + 1, tentativas - 1); // porta ocupada: tenta a próxima
    } else {
      console.error("Falha ao iniciar o servidor:", erro.message);
      process.exitCode = 1;
    }
  });
  servidor.listen(porta, "127.0.0.1", () => {
    const url = `http://localhost:${porta}/`;
    console.log("Protótipo disponível em " + url);
    console.log("(script.js roda no navegador; este processo é só o servidor. Ctrl+C ou Stop para encerrar.)");
    abrirNavegador(url);
  });
}

iniciar(PORTA_INICIAL);
