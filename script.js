/* Protótipo navegável – roteamento por hash (#pagina) */

// Este arquivo roda em dois ambientes:
//  - Navegador (index.html): executa o protótipo normalmente (função iniciar()).
//  - Node.js (ex.: botão "Run" do WebStorm sobre script.js): não existe `document`
//    no Node, então em vez de quebrar com "ReferenceError: document is not defined"
//    ele sobe um servidor local (server.js) e abre o index.html no navegador.
if (typeof document === "undefined") {
  if (typeof require === "function") require("./server.js");
} else {
  iniciar();
}

function iniciar() {
  // ---------------- Dados ----------------
  const DOCENTES = [
    ["ALESSANDRO BOF DE OLIVEIRA", "alessandrooliveira@unipampa.edu.br", "http://lattes.cnpq.br/0152113010079859"],
    ["ALEXANDRE SILVA DE OLIVEIRA", "alexandresilva@unipampa.edu.br", "http://lattes.cnpq.br/4920816501807863"],
    ["ALINE VIEIRA DE MELLO", "alinemello@unipampa.edu.br", "http://lattes.cnpq.br/7822927936432169"],
    ["AMANDA MEINCKE MELO", "amandamelo@unipampa.edu.br", "http://lattes.cnpq.br/3659434826954635"],
    ["ANIELLE SEVERO LISBOA DE ANDRADE", "anielleandrade@unipampa.edu.br", "http://lattes.cnpq.br/5211269100587746"],
    ["CARLOS AURELIO DILLI GONCALVES", "carlosgoncalves@unipampa.edu.br", "http://lattes.cnpq.br/4925047828614949"],
    ["CELSO NOBRE DA FONSECA", "celsofonseca@unipampa.edu.br", "http://lattes.cnpq.br/2799994982866901"],
    ["CLAUDIO SCHEPKE", "claudioschepke@unipampa.edu.br", "http://lattes.cnpq.br/6412713158883137"],
  ];

  const PROJETOS = [
    { id: "pesquisa", nome: "Pesquisa", imgs: ["pesquisa-1", "pesquisa-2", "pesquisa-3"] },
    { id: "extensao", nome: "Extensão", imgs: ["extensao-1", "extensao-2"] },
    { id: "inovacao", nome: "Inovação", imgs: ["inovacao"] },
    { id: "ensino", nome: "Ensino", imgs: ["ensino-1", "ensino-2"] },
    { id: "inclusao", nome: "Inclusão e diversidade", imgs: ["inclusao-1", "inclusao-2"], small: true },
    { id: "empreendedorismo", nome: "Empreendedorismo", imgs: ["empreendedorismo"], small: true },
    { id: "gestao", nome: "Gestão acadêmica", imgs: ["gestao"], small: true },
    { id: "assuntos", nome: "Assuntos estudantis", imgs: ["assuntos-1", "assuntos-2"], small: true },
  ];

  // Largura x altura reais (px) das imagens das tabelas de projetos (evita deslocamento de layout)
  const IMG_DIM = {
    "pesquisa-1": [1313, 787], "pesquisa-2": [1173, 811], "pesquisa-3": [1170, 366],
    "extensao-1": [1163, 383], "extensao-2": [1177, 742], "inovacao": [1167, 577],
    "ensino-1": [1166, 157], "ensino-2": [1163, 632], "inclusao-1": [1167, 107], "inclusao-2": [1147, 217],
    "empreendedorismo": [1167, 160], "gestao": [1171, 167], "assuntos-1": [1153, 92], "assuntos-2": [1182, 110],
  };

  const SALAS = [
    ["102 - Laboratório de Informática 5", 40, "15.95m (largura) x 6.42m (profundidade)"],
    ["304 - Sala de Aula", 60, "15.86m (largura) x 6.40m (profundidade)"],
    ["202 - Laboratório de Informática 4", 40, "15.95m (largura) x 6.42m (profundidade)"],
    ["305 - Sala de Aula", 60, "15.94m (largura) x 6.40m (profundidade)"],
    ["204 - Sala de Aula", 60, "15.86m (largura) x 6.40m (profundidade)"],
    ["210 - Laboratório de Informática 2", 30, "6.40m (largura) x 9.80m (profundidade)"],
    ["205 - Sala de Aula", 60, "15.94m (largura) x 6.40m (profundidade)"],
    ["211 - Sala de Aula", 50, "6.40m (largura) x 11.00m (profundidade)"],
    ["302 - Laboratório de Informática 3", 40, "15.95m (largura) x 6.42m (profundidade)"],
    ["212 - Laboratório de Informática 1", 30, "6.40m (largura) x 9.73m (profundidade)"],
    ["303 - Sala de Aula", 60, "12.00m (largura) x 6.40m (profundidade)"],
    ["309 - Pós-Graduação", 20, "6.40m (largura) x 6.10m (profundidade)"],
  ];

  // Cada biblioteca: [rótulo, valor, classe?]; a classe "mail" destaca o e-mail na cor de link
  const BIBLIOTECAS = [
    { id: "alegrete", nome: "Alegrete", dados: [
      ["Atendimento", "De segunda a sexta-feira: das 8h às 20h."],
      ["Fone", "(55) 3421-8403"],
      ["E-mail", "biblioteca.alegrete@unipampa.edu.br", "mail"],
      ["Endereço", "Av. Tiarajú, 810 – Bairro Ibirapuitã."],
      ["CEP", "97546-550 – Alegrete – RS."],
      ["Assistentes em Administração", "Bruna Luz da Silva, Leonardo Bachio Pavanelo e Marcio dos Santos Belous."],
      ["Bibliotecárias", "Cátia Araújo."],
    ]},
    { id: "bage", nome: "Bagé", dados: [
      ["Atendimento", "Segunda das 9h às 19h30; Terça das 9h às 21h; Quarta das 9h às 19h30; Quinta das 9h às 21h; Sexta das 9h às 17h30."],
      ["Fone", "(53) 3240 3605"],
      ["E-mail", "biblioteca.bage@unipampa.edu.br", "mail"],
      ["Endereço", "Travessa 45, n° 1650 Bairro Malafaia. CEP: 96413 – 170 – Bagé – RS."],
      ["Assistentes em Administração", "Elenara Robaina, Josiane Martins e Samuel Klarosk (licença)."],
      ["Bibliotecárias", "Daiana Leticia Paiva Bezerra e Andréa de Carvalho Pereira."],
    ]},
    { id: "cacapava", nome: "Caçapava do Sul", dados: [
      ["Atendimento", "De segunda a sexta-feira: das 8h às 20h."],
      ["Fone", "(55) 3281 9003"],
      ["E-mail", "biblioteca.cacapava@unipampa.edu.br", "mail"],
      ["Endereço", "Av. Pedro Anunciação, s/n."],
      ["CEP", "96570-000 – Caçapava do Sul – RS."],
      ["Assistente em Administração", "Lucas Castro Rodrigues."],
      ["Arquivista", "Emily Vivian Valcarengui"],
      ["Bibliotecárias", "Marindia Porto Nunes e Rosimeri Vergara."],
    ]},
    { id: "dom-pedrito", nome: "Dom Pedrito", dados: [
      ["Atendimento", "De segunda e Terça: das 8h às 14h – Quarta, Quinta e Sexta: 14h às 20h"],
      ["Fone", "(53) 3243 7300"],
      ["E-mail", "biblioteca.dompedrito@unipampa.edu.br", "mail"],
      ["Endereço", "Rua 21 de Abril, n.80."],
      ["CEP", "96450-000 – Dom Pedrito – RS"],
      ["Assistentes em Administração", "Deise Helena Rigo Fernandes e Paulo Josué Lemos Alves."],
    ]},
    { id: "itaqui", nome: "Itaqui", dados: [
      ["Atendimento", "De segunda a quinta-feira: das 8h às 21h e na sexta-feira 07:30 às 19:30"],
      ["Fone", "(55) 3432-1852 – VOIP 2136 | (55) 3432-1850 ramal 5001."],
      ["E-mail", "biblioteca.itaqui@unipampa.edu.br", "mail"],
      ["Endereço", "Rua Luiz Joaquim de Sá Britto, s/n."],
      ["CEP", "97650-000 – Itaqui – RS."],
      ["Assistentes em Administração", "Itamara Martins de Souza, José Miguel Astegiano."],
      ["Administradora", "Fátima Teresinha Rodrigues Pinheiro."],
      ["Bibliotecária", "Alexandra Santana Porto"],
    ]},
    { id: "jaguarao", nome: "Jaguarão", dados: [
      ["Atendimento", "De segunda a sexta-feira: 9h às 21h."],
      ["Fone", "(53) 3266 9400 Ramal Biblioteca: 5537 Ramal Bibliotecária: 5502."],
      ["E-mail", "biblioteca.jaguarao@unipampa.edu.br", "mail"],
      ["Endereço", "Rua Conselheiro Diana s/nº."],
      ["CEP", "96300-000 – Jaguarão – RS."],
      ["Assistente em Administração", "Edilson Calvete Blanco"],
      ["Bibliotecárias", "Kauana Rodrigues Amaral."],
    ]},
    { id: "livramento", nome: "Santana do Livramento", dados: [
      ["Atendimento", "De segunda a sexta-feira: das 8h às 21h."],
      ["Fone", "(55) 3967-1702"],
      ["E-mail", "biblioteca.livramento@unipampa.edu.br", "mail"],
      ["Endereço", "Rua Barão do Triunfo, 1048."],
      ["CEP", "97573-590 – Santana do Livramento – RS."],
      ["Assistente em Administração", "Anderson Rodrigues Gomes."],
      ["Bibliotecárias", "Amanda Juliana Kramer Arruda e Silvia Maria Puentes Bentacourt."],
    ]},
    { id: "sao-borja", nome: "São Borja", dados: [
      ["Atendimento", "De segunda a sexta-feira: das 9h às 13h e das 15h30min às 19h30min"],
      ["Fone", "(55) 3430-9852 Ramal 6501"],
      ["E-mail", "biblioteca.saoborja@unipampa.edu.br", "mail"],
      ["Endereço", "Rua Patrício Petit Jean, 3295, Prédio 4 – Campus 2, Sala: 5101. Bairro do Passo. São Borja – RS – 97670-000."],
      ["Assistentes em Administração", "Chaiane Ferrazza Gomes, Mateus Mack Weber e Tanize Damian Pizzuti da Silva."],
    ]},
    { id: "sao-gabriel", nome: "São Gabriel", dados: [
      ["Atendimento", "De segunda a sexta-feira: das 8h às 20h."],
      ["Fone", "(55) 3237-0850 Ramal :7620."],
      ["E-mail", "biblioteca.saogabriel@unipampa.edu.br", "mail"],
      ["Endereço", "Rua Aluísio Barros Macedo, s/n. BR 290."],
      ["CEP", "97307-020 – São Gabriel – RS Caixa Postal 02 – CEP 97300-970"],
      ["Assistentes em Administração", "Alex Marquez, Fabrício Lopez Costa"],
      ["Economista", "Edson Valderi Prestes de Oliveira."],
      ["Bibliotecárias", "Ana Paula Damasceno e Francine da Silva."],
    ]},
    { id: "uruguaiana", nome: "Uruguaiana", dados: [
      ["Atendimento", "De segunda a sexta-feira: das 8h às 21h."],
      ["Fone", "(55) 3911-0203 ou 3911 0200 (ramal 8010)."],
      ["E-mail", "biblioteca.uruguaiana@unipampa.edu.br", "mail"],
      ["Endereço", "BR-472 Km 595."],
      ["CEP", "97500-970 – Caixa Postal 118 – Uruguaiana – RS."],
      ["Assistentes em Administração", "Ana Gisela Martini Fagundes, Flávio Augusto Pedroso, Maurício Parra e Michelle Fernandes Garcez."],
      ["Bibliotecários", "Fernanda Rocha Ruffato e Marcos Anselmo."],
    ]},
  ];

  // ---------------- Helpers ----------------
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const back = (hash, label) => `<a class="back-link" href="#${hash}">← Voltar para ${label}</a>`;

  const SISBI_BAR = `
    <div class="sisbi-bar">
      <a href="#" class="noop">Consulta ao acervo | Renovações e Reservas ▾</a>
      <a href="#" class="noop">Pesquisa ▾</a>
      <a href="#" class="noop">Serviços ▾</a>
      <a href="#" class="noop">Editais</a>
      <a href="#" class="noop">Regimentos e normas ▾</a>
      <a href="#" class="noop">SisBi ▾</a>
      <a href="#" class="noop">Acessibilidade ▾</a>
    </div>`;

  // ---------------- Páginas ----------------
  // tab = qual aba do menu principal fica destacada
  const PAGES = {};

  PAGES["informacoes"] = { tab: "informacoes", titulo: "Informações do curso", html: () => `
    <h2 class="page-title">Página de informações do curso</h2>
    <table class="info-table">
      <tbody>
        <tr><th>Nome do Curso</th><td>Engenharia de Software</td></tr>
        <tr><th>Código do Curso</th><td>1103689</td></tr>
        <tr><th>Local onde é ofertado</th><td>Campus Alegrete</td></tr>
        <tr><th>Turno</th><td>Noturno</td></tr>
        <tr><th>Regime</th><td>Semestral</td></tr>
        <tr><th>Grau</th><td>Bacharelado</td></tr>
        <tr><th>Carga Horária</th><td>3300 horas</td></tr>
        <tr><th>Duração Regular</th><td>9 semestres</td></tr>
        <tr><th>Coordenador de curso</th><td>Paulo Silas Severo de Souza</td></tr>
      </tbody>
    </table>
    <p class="origem"><b>Origem dos dados:</b> secretarias acadêmicas e <a href="#" class="noop">Coordenadoria de Ingresso, Documentação e Registros Acadêmicos</a>, cadastrados diretamente no SIE, nos formulários da aplicação 1.1.1.01.<br>
    <b>Página gerada em:</b> 06/11/26 11:12:21 (dados sincronizados diariamente).</p>`
  };

  PAGES["ppc"] = { tab: "ppc", titulo: "PPC", html: () => `
    <h2 class="page-title">Página PPC</h2>
    <div class="ppc-block">
      <span class="tag-green">PPC vigente</span>
      <p>Acesse o PPC Engenharia de Software vigente aqui: <a href="#" class="noop">PPC Engenharia Software .pdf (3.57 MB)</a></p>
    </div>
    <div class="ppc-block">
      <span class="tag-green">PPC Anteriores</span>
      <p>Acesse os demais PPC de Engenharia de Software aqui: <a href="#ppc-anteriores">Link para os PPC anteriores</a></p>
    </div>
    <p class="origem small" style="margin-top:60px"><b>Origem dos dados:</b> o PPC (graduação) é disponibilizado pela <a href="#" class="noop">Divisão de Planejamento e Desenvolvimento</a> para a publicação no repositório institucional <a href="#" class="noop">DSPACE</a>.<br>
    <b>Página gerada em:</b> 06/11/26 10:46:55 (dados atualizados em tempo real).</p>`
  };

  PAGES["ppc-anteriores"] = { tab: "ppc", titulo: "PPC anteriores", html: () => `
    ${back("ppc", "PPC")}
    <h2 class="page-title">Página PPC anteriores</h2>
    <div class="ppc-ant">
      <div class="box">
        <h3>Files</h3>
        <ul>
          <li><a href="#" class="noop">PPC-Engenharia de Software_Alegrete.pdf (1.51 MB)</a></li>
          <li><a href="#" class="noop">PPC-ES-2015.pdf (1.87 MB)</a></li>
          <li><a href="#" class="noop">PPC Engenharia de Software_Alegrete.pdf (1.62 MB)</a></li>
          <li><a href="#" class="noop">PPC_Engenharia de Software_Alegrete.pdf (2.03 MB)</a></li>
          <li><a href="#" class="noop">PPC Engenharia de Software_Alegrete.pdf (1.55 MB)</a></li>
          <li><a href="#" class="noop">PPC Engenharia de Software_Alegrete (2.5 MB)</a></li>
          <li><a href="#" class="noop">PPC Engenharia de Software_Alegrete (3.5 MB)</a></li>
          <li><a href="#" class="noop">PPC.Engenharia de Software_Alegretepdf (3.47 MB)</a></li>
        </ul>
      </div>
      <dl class="box citation">
        <dt style="margin-top:0">Citation</dt>
        <dd>UNIVERSIDADE FEDERAL DO PAMPA, PPC Alegrete - Engenharia de Software, Unipampa - Campus Alegrete,130p., 2012.</dd>
        <dt>URI</dt>
        <dd class="blue"><a href="https://repositorio.unipampa.edu.br/handle/riu/100" target="_blank" rel="noopener">https://repositorio.unipampa.edu.br/handle/riu/100</a></dd>
        <dt>Collections</dt>
        <dd class="blue">PPCs</dd>
        <dt>Tipo de documento</dt>
        <dd>PPC</dd>
        <dt>Date</dt>
        <dd class="blue">2012-08</dd>
        <dt>Authors</dt>
        <dd class="blue">Universidade Federal do Pampa(Brasil)</dd>
      </dl>
    </div>`
  };

  PAGES["horarios"] = { tab: "horarios", titulo: "Horários de 2026/2", html: () => `
    <img class="shot" src="img/horarios.png" alt="Horários de 2026/2 – Engenharia de Software, com filtros por semestre, dia, disciplina e professor" width="1155" height="865">`
  };

  let filtroNome = "Todos", filtroSobrenome = "Todos";
  PAGES["docentes"] = { tab: "docentes", titulo: "Docentes do campus Alegrete", html: () => {
    const letras = ["Todos", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const linha = (tipo, atual) => letras.map((l) =>
      `<button type="button" data-filtro="${tipo}" data-letra="${l}" class="${l === atual ? "on" : ""}" aria-pressed="${l === atual}">${l}</button>`).join("");
    return `
    <h2 class="page-title">Página de docentes do campus de Alegrete</h2>
    <div class="filtro">
      <div class="filtro__label">Filtro</div>
      <div class="filtro__rows">
        <div class="filtro__row"><span>Nome</span><div class="letters">${linha("nome", filtroNome)}</div></div>
        <div class="filtro__row"><span>Sobrenome</span><div class="letters">${linha("sobrenome", filtroSobrenome)}</div></div>
      </div>
    </div>
    <div class="table-scroll">
      <table class="docentes">
        <thead><tr><th>Nome</th><th>Email institucional</th><th>Lattes</th></tr></thead>
        <tbody id="docentes-body"></tbody>
      </table>
    </div>
    <p class="origem small"><b>Origem dos dados:</b> cadastrados diretamente no SIE, na aplicação oferta de disciplinas (1.1.2.01). São listados todos os docentes que ministraram disciplinas no curso no ano acadêmico atual e no anterior. Os demais dados do docente são oriundos do cadastro realizado pela <a href="#" class="noop">PROGEPE</a> e pelo próprio docente no módulo identificação institucional do sistema <a href="#" class="noop">GURI</a>.<br>
    <b>Página gerada em:</b> 06/11/26 11:34:54 (dados sincronizados diariamente).</p>`;
  }, after: renderDocentes,
    // a tabela é preenchida depois (renderDocentes), então a busca recebe nomes e e-mails à parte
    busca: () => DOCENTES.map(([n, e]) => n + " " + e).join(" ") };

  function renderDocentes() {
    const body = $("#docentes-body");
    if (!body) return;
    const lista = DOCENTES.filter(([nome]) => {
      const partes = nome.split(" ");
      const okNome = filtroNome === "Todos" || partes[0].startsWith(filtroNome);
      const okSob = filtroSobrenome === "Todos" || partes[partes.length - 1].startsWith(filtroSobrenome);
      return okNome && okSob;
    });
    body.innerHTML = lista.length
      ? lista.map(([n, e, l]) => `<tr><td>${esc(n)}</td><td>${esc(e)}</td><td><a href="${esc(l)}" target="_blank" rel="noopener">${esc(l)}</a></td></tr>`).join("")
      : `<tr class="empty-row"><td colspan="3">Nenhum docente encontrado com esse filtro.</td></tr>`;
  }

  PAGES["projetos"] = { tab: "projetos", titulo: "Projetos", html: () => `
    <h2 class="page-title light">Projetos</h2>
    <div class="big-buttons cols-4">
      ${PROJETOS.map((p) => `<a class="big-btn${p.small ? " small-text" : ""}" href="#projetos-${p.id}">${p.nome}</a>`).join("")}
    </div>`
  };

  PROJETOS.forEach((p) => {
    PAGES["projetos-" + p.id] = { tab: "projetos", titulo: `Projetos de ${p.nome}`, html: () => `
      ${back("projetos", "Projetos")}
      <h2 class="page-title light">${p.nome}</h2>
      <div class="shot-group">
        ${p.imgs.map((img) => `<img class="shot" src="img/${img}.png" alt="Tabela de projetos de ${p.nome}: projeto, registro, coordenador e período" width="${IMG_DIM[img][0]}" height="${IMG_DIM[img][1]}" loading="lazy">`).join("")}
      </div>`
    };
  });

  PAGES["infraestrutura"] = { tab: "infraestrutura", titulo: "Infraestrutura", html: () => `
    <div class="infra">
      <h2>Infraestrutura</h2>
      <div class="rooms">
        ${SALAS.map(([nome, cap, dim], i) => `
          <div class="room">
            <h3>${nome}</h3>
            <p><u>Capacidade:</u> ${cap} pessoas</p>
            <p><u>Dimensões:</u> ${dim}</p>
            <p><u>Bens patrimoniais:</u> <button type="button" data-bens="${i}" aria-expanded="false">(clique para mostrar)</button></p>
            <p class="bens" id="bens-${i}" hidden>Lista de bens patrimoniais não cadastrada neste protótipo.</p>
          </div>`).join("")}
      </div>
    </div>`
  };

  const ICON = {
    pin: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7v1.8l8 5.2 8-5.2V7z"/></svg>',
    info: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zm-2 7v10h14V9z"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>',
    user: '<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-9 2.2-9 5v3h18v-3c0-2.8-4.6-5-9-5z"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M4 3h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8l-5 4V4a1 1 0 0 1 1-1z"/></svg>',
  };

  PAGES["contato"] = { tab: "contato", titulo: "Contato", html: () => `
    <div class="contato">
      <h2>Contato</h2>
      <p>Entre em contato conosco para tirar dúvidas, obter informações ou enviar sugestões.</p>

      <div class="card card-row">
        <div><span class="ico">${ICON.pin}</span><span><strong>Endereço</strong>Rua Av. Tiarajú nº810<br>Ibirapuitã - Alegrete - RS<br>CEP 97546550</span></div>
        <div><span class="ico">${ICON.phone}</span><span><strong>Telefone</strong>(55) 3421-8405</span></div>
        <div><span class="ico">${ICON.mail}</span><span><strong>E-mail do curso</strong>ales@listas.unipampa.edu.br</span></div>
      </div>

      <div class="two-cards">
        <div class="card">
          <span class="card-title">${ICON.info} Coordenação do Curso</span>
          <p><b>Coordenador do curso:</b> PAULO SILAS SEVERO DE SOUZA</p>
          <p><b>Coordenador substituto:</b> SILVIO ERENO QUINCOZES</p>
        </div>
        <div class="card mint">
          <span class="card-title">${ICON.cal} Horário de Atendimento</span>
          <p>Segunda a Sexta-feira</p>
          <p>Das 8h às 12h e das 14h às 18h</p>
        </div>
      </div>

      <div class="card msg-card">
        <form id="form-contato" novalidate>
          <span class="card-title">${ICON.send} Envie uma mensagem</span>
          <p>Utilize o formulário abaixo para entrar em contato com a coordenação ou equipe do curso.</p>
          <div class="form-row">
            <div class="field">${ICON.user}<input id="f-nome" type="text" placeholder="Nome" aria-label="Nome"></div>
            <div class="field">${ICON.mail}<input id="f-email" type="email" placeholder="E-mail" aria-label="E-mail"></div>
          </div>
          <div class="field">${ICON.chat}<textarea id="f-msg" placeholder="Mensagem" aria-label="Mensagem"></textarea></div>
          <button type="submit" class="btn-enviar">${ICON.send} Enviar mensagem</button>
          <p class="form-status" id="form-status" role="status"></p>
        </form>
        <img src="img/contato-ilustracao.png" alt="" width="280" height="240">
      </div>
    </div>`, after: () => {
      $("#form-contato").addEventListener("submit", (e) => {
        e.preventDefault();
        const campos = ["#f-nome", "#f-email", "#f-msg"].map((s) => $(s));
        let ok = true;
        campos.forEach((c) => {
          const valido = c.value.trim() !== "" && (c.type !== "email" || /\S+@\S+\.\S+/.test(c.value));
          c.classList.toggle("invalid", !valido);
          if (!valido) ok = false;
        });
        const st = $("#form-status");
        if (!ok) {
          st.className = "form-status err";
          st.textContent = "Preencha nome, um e-mail válido e a mensagem.";
          return;
        }
        st.className = "form-status ok";
        st.textContent = "Mensagem registrada (protótipo: nada é enviado de verdade).";
        e.target.reset();
      });
    }
  };

  PAGES["bibliotecas"] = { tab: "bibliotecas", titulo: "Bibliotecas", html: () => `
    ${SISBI_BAR}
    <h2 class="page-title light">Bibliotecas</h2>
    <div class="big-buttons cols-3">
      ${BIBLIOTECAS.map((b, i) => `<a class="big-btn${b.id === "livramento" ? " small-text" : ""}${i === 9 ? " span-mid" : ""}" href="#biblioteca-${b.id}">${b.nome}</a>`).join("")}
      <a class="big-btn span-mid" href="#biblioteca-mais-infos">Mais infos</a>
    </div>`
  };

  BIBLIOTECAS.forEach((b) => {
    PAGES["biblioteca-" + b.id] = { tab: "bibliotecas", titulo: `Biblioteca ${b.nome}`, html: () => `
      ${back("bibliotecas", "Bibliotecas")}
      <h2 class="page-title light center">${b.nome}</h2>
      <div class="lib">
        ${b.dados.map(([k, v, cls]) => `<p><b>${k}:</b> <span class="${cls || ""}">${esc(v)}</span></p>`).join("")}
      </div>`
    };
  });

  PAGES["biblioteca-mais-infos"] = { tab: "bibliotecas", titulo: "Mais informações – Bibliotecas", html: () => `
    ${back("bibliotecas", "Bibliotecas")}
    <h2 class="page-title light center">Mais informações</h2>
    <div class="mais-infos">
      <img src="img/sisbi-logos-1.png" alt="Pergamum, Periódicos CAPES, Minha Biblioteca, Springer e Repositório Institucional Unipampa" width="372" height="656">
      <div>
        <h3>Posts recentes</h3>
        <ul class="posts">
          <li><a href="#" class="noop">SisBi/UNIPAMPA promove o 3º Encontro de Bibliotecários com foco no futuro das Bibliotecas Universitárias</a></li>
          <li><a href="#" class="noop">Anais do 18º SIEPE da UNIPAMPA já estão disponíveis para acesso!</a></li>
          <li><a href="#" class="noop">SISBI/UNIPAMPA lança Guia Rápido para auxílio de Trabalhos Acadêmicos</a></li>
          <li><a href="#" class="noop">Campanha do Agasalho 2026</a></li>
          <li><a href="#" class="noop">Cinemateca Móvel SisBi chega ao Pint of Science Itaqui!</a></li>
        </ul>
        <p class="posts" style="margin-top:14px"><a href="https://sites.unipampa.edu.br/sisbi/bibliotecas/" target="_blank" rel="noopener">Abrir o site oficial do SisBi ↗</a></p>
      </div>
      <img src="img/sisbi-logos-2.png" alt="Publica-se, Portal SBE, Bases de Livre Acesso e a revista do SisBi" width="336" height="803">
    </div>`
  };

  // =====================================================
  // Páginas trazidas do site oficial (v2)
  // =====================================================
  const OFICIAL = "https://cursos.unipampa.edu.br/cursos/engenhariadesoftware/";
  // Documentos: o protótipo aponta para a página oficial onde o arquivo está publicado
  const doc = (rotulo, pageId, tipo) =>
    `<li><a href="${OFICIAL}?page_id=${pageId}" target="_blank" rel="noopener"${tipo ? ` data-tipo="${tipo}"` : ""}>${rotulo}</a></li>`;

  const NOTICIAS = [
    { id: "eres-2025", data: "5 de novembro de 2025", cats: ["Eventos"],
      titulo: "Unipampa se destaca na IX Escola Regional de Engenharia de Software (ERES 2025)",
      resumo: "A Unipampa teve 16 artigos aceitos entre os 38 apresentados e voltou para casa com três prêmios de melhor artigo.",
      corpo: [
        "A IX Escola Regional de Engenharia de Software (ERES) aconteceu de 29 a 31 de outubro de 2025, promovida pela SBC em parceria com a UnoChapecó e a UFFS.",
        "A Unipampa levou uma caravana de 23 pessoas, com três professores do curso, e teve 16 artigos aceitos dos 38 apresentados no evento.",
        "A universidade conquistou três prêmios de Melhor Artigo, nas trilhas de Graduação, Pós-Graduação e Extensão. A caravana também visitou as empresas Pollen, IXCsoft e Inovadata.",
        "A ERES 2026 será realizada na FAG, em Toledo/PR.",
      ]},
    { id: "relatorio-coordenacao-2025-1", data: "6 de junho de 2025", cats: ["Informações da coordenação"],
      titulo: "Relatório Atuação da Coordenação de Curso (2025/1)",
      resumo: "Relatório da coordenação com satisfação dos alunos, gestão do PPC e indicadores acadêmicos, incluindo a queda da evasão.",
      corpo: [
        "O relatório está organizado em três eixos: satisfação, gestão e indicadores acadêmicos.",
        "Na avaliação de 2023, a coordenação foi considerada “muito boa”, com média 3,87. O PPC foi atualizado em abril de 2025 e alinhado ao PDI 2025–2029.",
        "A evasão do curso foi de 11,73% em 2015/1, chegou a 22,99% em 2022 e caiu para 0,49% em 2024/2.",
        "A coordenação para o biênio 2025–2026 é formada por Paulo Silas Severo de Souza e Ildevana Poltronieri Rodrigues.",
      ]},
    { id: "gurias-of-code-2025", data: "31 de maio de 2025", cats: ["Eventos", "Sem categoria"],
      titulo: "2ª edição do Workshop Gurias Of Code reúne participantes para desbravar a arte da programação na Unipampa Alegrete",
      resumo: "Oficina gratuita de programação para mulheres a partir de 15 anos: 83 inscrições em uma semana e 35 selecionadas.",
      corpo: [
        "O workshop gratuito de programação para mulheres a partir de 15 anos aconteceu nos dias 24 e 25 de maio de 2025, no Campus Alegrete.",
        "Foram 83 inscrições em apenas uma semana, das quais 35 participantes foram selecionadas. Elas assistiram palestras e desenvolveram uma loja virtual.",
        "A ação teve financiamento do Fundo Social Sicredi e parceria do Ecossistema de Inovação de Alegrete. A organização foi das professoras Ildevana Poltronieri e Alice Finger.",
      ]},
    { id: "eres-2024", data: "18 de novembro de 2024", cats: ["Sem categoria"],
      titulo: "Unipampa Se Destaca Na VIII Escola Regional de Engenharia de Software (ERES 2024)",
      resumo: "21 artigos aceitos entre 29 apresentados na ERES 2024, em Santiago/RS, com prêmio de melhor artigo na Pós-Graduação.",
      corpo: [
        "A Unipampa levou 8 estudantes à VIII ERES, realizada de 11 a 13 de novembro de 2024 na URI Santiago/RS.",
        "Foram 21 artigos aceitos entre os 29 apresentados. A universidade recebeu o prêmio de Melhor Artigo na Pós-Graduação e duas menções honrosas.",
        "Os professores Rodrigo Brandão Mansilha e Maicon Bernardino foram reconhecidos como Revisores Destaque. A próxima edição será na UnoChapecó, em Chapecó/SC.",
      ]},
    { id: "ajuste-presencial-2024-02", data: "12 de agosto de 2024", cats: ["Sem categoria"],
      titulo: "Ajuste Presencial 2024/02",
      resumo: "Ajuste de matrícula nos dias 19, 20 e 21 de agosto de 2024, somente com horário agendado.",
      corpo: [
        "A Coordenação dá as boas-vindas aos ingressantes.",
        "O ajuste de matrícula acontece nos dias 19, 20 e 21 de agosto de 2024, apenas com horário agendado (a agenda está disponível em PDF).",
        "Quem não puder comparecer pode ser representado por um colega com procuração de próprio punho, enviar o pedido por e-mail ou fazer uma reunião online com a coordenação.",
      ]},
  ];
  const CATEGORIAS = ["Todas", "Eventos", "Informações da coordenação", "Sem categoria"];
  let catAtual = "Todas";

  function cardNoticia(n) {
    return `
      <article class="post-card">
        <h3><a href="#noticia-${n.id}">${n.titulo}</a></h3>
        <div class="post-meta"><span>${n.data}</span>${n.cats.map((c) => `<button type="button" class="cat" data-cat="${c}">${c}</button>`).join("")}</div>
        <p>${n.resumo}</p>
        <a class="leia-mais" href="#noticia-${n.id}">Continuar lendo →</a>
      </article>`;
  }
  function listaNoticias() {
    const lista = NOTICIAS.filter((n) => catAtual === "Todas" || n.cats.includes(catAtual));
    return `
      <div class="filtro-cats" role="group" aria-label="Filtrar por categoria">
        <span>Categorias:</span>
        ${CATEGORIAS.map((c) => `<button type="button" class="cat${c === catAtual ? " on" : ""}" data-cat="${c}" aria-pressed="${c === catAtual}">${c}</button>`).join("")}
      </div>
      <div class="posts-lista">${lista.map(cardNoticia).join("") || "<p>Nenhuma notícia nesta categoria.</p>"}</div>
      <nav class="paginacao" aria-label="Navegação por posts">
        <span class="atual">1</span>
        <a href="${OFICIAL}?paged=2" target="_blank" rel="noopener">2</a> …
        <a href="${OFICIAL}?paged=36" target="_blank" rel="noopener">36</a>
        <a href="${OFICIAL}?paged=2" target="_blank" rel="noopener">Próximo →</a>
      </nav>`;
  }

  PAGES["inicio"] = { tab: null, titulo: "Início", html: () => `
    <div class="boas-vindas-home">
      <strong>Seja bem-vindo à página do curso de Engenharia de Software</strong>
      Bacharelado noturno no Campus Alegrete, com 3300 horas em 9 semestres. Acesse rápido:
      <div class="atalhos">
        <a href="#informacoes">Informações do curso</a>
        <a href="#matriz-curricular">Matriz curricular</a>
        <a href="#horarios">Horários</a>
        <a href="#ingresso">Como ingressar</a>
        <a href="#contato">Fale com a coordenação</a>
      </div>
    </div>
    <h2 class="page-title light">Notícias</h2>
    <div id="lista-noticias">${listaNoticias()}</div>`
  };
  PAGES["noticias"] = { tab: null, titulo: "Notícias", html: () => `
    <h2 class="page-title light">Notícias</h2>
    <div id="lista-noticias">${listaNoticias()}</div>`
  };
  NOTICIAS.forEach((n, i) => {
    const ant = NOTICIAS[i + 1], prox = NOTICIAS[i - 1];
    PAGES["noticia-" + n.id] = { tab: null, pai: "noticias", lateral: "noticias", titulo: n.titulo, html: () => `
      ${back("noticias", "Notícias")}
      <h2 class="page-title light">${n.titulo}</h2>
      <div class="post-meta"><span>Publicado em ${n.data}</span>${n.cats.map((c) => `<button type="button" class="cat" data-cat="${c}">${c}</button>`).join("")}</div>
      <div class="post-corpo">${n.corpo.map((p) => `<p>${p}</p>`).join("")}
        <p class="nota">Texto resumido para o protótipo. <a href="${OFICIAL}" target="_blank" rel="noopener">Ver no site oficial</a>.</p>
      </div>
      <nav class="post-nav" aria-label="Navegação entre notícias">
        ${ant ? `<a href="#noticia-${ant.id}">← ${ant.titulo}</a>` : "<span></span>"}
        ${prox ? `<a href="#noticia-${prox.id}">${prox.titulo} →</a>` : "<span></span>"}
      </nav>`
    };
  });

  const TEXTO_CURSO = `
    <p>O curso de Engenharia de Software foi criado pelo Conselho Dirigente da Unipampa (Ata da 7ª reunião, 09/07/2009) e foi um dos primeiros do tipo no país. As aulas começaram no primeiro semestre de 2010.</p>
    <p>O curso foi autorizado pela Portaria nº 1776, de 07/12/2011, e reconhecido pela Portaria nº 43, de 22/01/2015, com Conceito de Curso (CC) 4.</p>
    <p>A metodologia adotada é a <a href="#metodologia">Aprendizagem Baseada em Problemas (ABP)</a>.</p>
    <h3>Objetivos do curso</h3>
    <p>Formar profissionais capazes de aplicar a prática da Engenharia de Software no desenvolvimento, na gestão e na evolução de sistemas de software.</p>
    <h3>Campos de atuação</h3>
    <ul><li>Desenvolvedor(a) de software</li><li>Gerente de projetos de software</li><li>Consultor(a)</li><li>Pesquisador(a)</li><li>Empreendedor(a)</li></ul>
    <p class="nota">O vídeo de apresentação do curso está disponível na <a href="${OFICIAL}?page_id=2036" target="_blank" rel="noopener">página oficial</a>.</p>`;

  PAGES["o-curso"] = { tab: null, titulo: "O Curso", html: () => `
    <h2 class="page-title light">O Curso</h2>
    <div class="texto">${TEXTO_CURSO}
      <h3>Nesta seção</h3>
      <ul>
        <li><a href="#apresentacao">Apresentação</a></li><li><a href="#ingresso">Ingresso</a></li>
        <li><a href="#metodologia">Metodologia</a></li><li><a href="#matriz-curricular">Matriz Curricular</a></li>
        <li><a href="#coordenacao">Coordenação</a></li><li><a href="#docentes">Corpo Docente</a></li>
        <li><a href="#nde">Núcleo Docente Estruturante</a></li>
      </ul>
    </div>`
  };
  PAGES["apresentacao"] = { tab: null, pai: "o-curso", titulo: "Apresentação", html: () => `
    <h2 class="page-title light">Apresentação</h2><div class="texto">${TEXTO_CURSO}</div>`
  };
  PAGES["ingresso"] = { tab: null, pai: "o-curso", titulo: "Ingresso", html: () => `
    <h2 class="page-title light">Ingresso</h2>
    <div class="texto">
      <p>O curso oferece <b>50 vagas anuais</b>. A seleção regular acontece uma vez por ano, no 1º semestre, pelo <b>SiSU</b>, usando somente a nota do Enem. Também há processo seletivo complementar a cada semestre.</p>
      <h3>Outras formas de ingresso</h3>
      <table class="tabela-simples">
        <thead><tr><th>Forma</th><th>Para quem</th></tr></thead>
        <tbody>
          <tr><td>Reingresso</td><td>Ex-alunos afastados há menos de 2 anos</td></tr>
          <tr><td>Transferência voluntária</td><td>Estudantes de outras instituições</td></tr>
          <tr><td>Portador de diploma</td><td>Quem já tem curso superior</td></tr>
          <tr><td>Transferência compulsória (Ex-Officio)</td><td>Casos previstos em lei</td></tr>
          <tr><td>Regime especial</td><td>Matrícula em componentes isolados</td></tr>
          <tr><td>Programa estudante convênio</td><td>Estudantes de países conveniados</td></tr>
          <tr><td>Mobilidade acadêmica</td><td>Programas interinstitucionais e intrainstitucionais</td></tr>
          <tr><td>Matrícula institucional de cortesia</td><td>Casos previstos em lei</td></tr>
        </tbody>
      </table>
      <p>A <b>reopção</b> permite trocar de curso ou de turno até 2 vezes.</p>
    </div>`
  };
  PAGES["metodologia"] = { tab: null, pai: "o-curso", titulo: "Metodologia", html: () => `
    <h2 class="page-title light">Metodologia</h2>
    <div class="texto">
      <p>Desde 2010 o curso usa a <b>Aprendizagem Baseada em Problemas (ABP)</b>. Nela, o estudante aprende resolvendo problemas reais, com autonomia, e o professor atua como tutor.</p>
      <h3>Elementos da ABP</h3>
      <ul><li><b>Problema:</b> o ponto de partida da aprendizagem</li><li><b>Conhecimento:</b> construído para resolver o problema</li><li><b>Estudante autônomo:</b> busca e organiza o próprio estudo</li><li><b>Tutor:</b> facilita e orienta o processo</li></ul>
      <h3>Documentos</h3>
      <ul class="docs">${doc("Normas para Resolução de Problemas – Versão 2018", 1954)}${doc("Normas para Resolução de Problemas – Versão 2010", 1954)}</ul>
    </div>`
  };
  PAGES["matriz-curricular"] = { tab: null, pai: "o-curso", titulo: "Matriz Curricular", html: () => `
    <h2 class="page-title light">Matriz Curricular</h2>
    <div class="texto">
      <p>Todas as matrizes são presenciais. A grade com as disciplinas de cada semestre está no PPC de cada versão.</p>
      <div class="table-scroll">
      <table class="tabela-simples">
        <thead><tr><th>Versão</th><th>Vigência</th><th>Turno</th><th>Carga horária</th><th>Duração</th></tr></thead>
        <tbody>
          <tr><td>2025 (2018 atualizada)</td><td>a partir de 2025/2</td><td>Noturno, sem sábado</td><td>3300 h</td><td>mín. 9 / máx. 18 semestres</td></tr>
          <tr><td>2023</td><td>a partir de 2023/1</td><td>Noturno, sem sábado</td><td>3300 h</td><td>mín. 9 / máx. 18 semestres</td></tr>
          <tr><td>2018</td><td>a partir de 2018/1</td><td>Noturno</td><td>3300 h</td><td>mín. 9 / máx. 14 semestres</td></tr>
          <tr><td>2010</td><td>2010</td><td>Noturno, com sábado</td><td>3000 h</td><td>mín. 4 / máx. 8 anos</td></tr>
        </tbody>
      </table>
      </div>
      <p class="nota">Na matriz 2018 não é permitida quebra de pré-requisitos (Ata Nº 9 de 2018). A matriz 2010 não tem pré-requisitos obrigatórios.</p>
      <h3>Documentos</h3>
      <ul class="docs">${doc("PPC e grade – Matriz 2025", 18)}${doc("PPC e grade – Matriz 2023", 18)}${doc("PPC e grade – Matriz 2018", 18)}${doc("PPC e grade – Matriz 2010", 18)}</ul>
      <p>Veja também a <a href="#ppc">página do PPC</a>.</p>
    </div>`
  };
  PAGES["coordenacao"] = { tab: null, pai: "o-curso", titulo: "Coordenação", html: () => `
    <h2 class="page-title light">Coordenação de Curso</h2>
    <div class="texto">
      <ul class="pessoas">
        <li>Paulo Silas Severo de Souza<small>Coordenador de Curso Titular</small></li>
        <li>Ildevana Poltronieri Rodrigues<small>Coordenadora de Curso Substituta</small></li>
      </ul>
      <p>Contato: <b>ales@listas.unipampa.edu.br</b> · <a href="#contato">enviar mensagem pelo site</a></p>
      <h3>Documentos</h3>
      <ul class="docs">${doc("Plano de Ação da Coordenação – biênio 2025-2026", 2040, "SEI")}</ul>
      <p>Relatório recente: <a href="#noticia-relatorio-coordenacao-2025-1">Relatório Atuação da Coordenação de Curso (2025/1)</a></p>
    </div>`
  };
  PAGES["nde"] = { tab: null, pai: "o-curso", titulo: "Núcleo Docente Estruturante", html: () => `
    <h2 class="page-title light">Núcleo Docente Estruturante (NDE)</h2>
    <div class="texto">
      <p>O NDE é responsável pela concepção, acompanhamento e atualização do PPC, conforme a Resolução Conaes nº 1 (17/06/2010) e a Resolução CONSUNI nº 97 (19/03/2015).</p>
      <ul class="pessoas">
        <li>Paulo Silas Severo de Souza<small>Presidente · Doutorado</small></li>
        <li>Ildevana Poltronieri Rodrigues<small>Secretária · Doutorado</small></li>
        <li>Alice Fonseca Finger<small>Membro · Doutorado</small></li>
        <li>Elder de Macedo Rodrigues<small>Membro · Doutorado</small></li>
        <li>Gilleanes Thorwald Araujo Guedes<small>Membro · Doutorado</small></li>
        <li>João Pablo Silva da Silva<small>Membro · Doutorado</small></li>
        <li>Maicon Bernardino da Silveira<small>Membro · Doutorado</small></li>
      </ul>
      <h3>Documentos</h3>
      <ul class="docs">${doc("Regimento do NDE", 2203)}${doc("Atas de reunião do NDE", 3026, "ATAS")}</ul>
    </div>`
  };
  PAGES["perfil-do-egresso"] = { tab: null, titulo: "Perfil do Egresso", html: () => `
    <h2 class="page-title light">Perfil do Egresso</h2>
    <div class="texto">
      <p>O egresso de Engenharia de Software da Unipampa é capaz de:</p>
      <ul>
        <li>aplicar a prática da Engenharia de Software no desenvolvimento de sistemas;</li>
        <li>gerenciar projetos e processos de software;</li>
        <li>trabalhar em equipe e se comunicar com clientes e usuários;</li>
        <li>agir com ética e responsabilidade social;</li>
        <li>empreender e inovar na área de software.</li>
      </ul>
      <h3>Campos de atuação</h3>
      <ul class="pessoas"><li>Desenvolvedor(a)</li><li>Gerente</li><li>Consultor(a)</li><li>Pesquisador(a)</li><li>Empreendedor(a)</li></ul>
    </div>`
  };
  PAGES["agenda"] = { tab: null, titulo: "Agenda do Curso", html: () => `
    <h2 class="page-title light">Agenda do Curso</h2>
    <div class="texto">
      <p>Confira a agenda do Curso de Engenharia de Software abaixo.</p>
      <ul class="docs">${doc("Reuniões da Comissão de Curso (2025)", 2259, "AGENDA")}${doc("Calendário Acadêmico (2025)", 2259)}</ul>
      <p class="nota">Use o calendário na barra lateral para navegar entre os meses.</p>
    </div>`
  };
  PAGES["avaliacoes-mec"] = { tab: null, titulo: "Avaliações MEC", html: () => `
    <h2 class="page-title light">Avaliações MEC</h2>
    <div class="texto">
      <table class="tabela-simples">
        <thead><tr><th>Etapa</th><th>Documento</th><th>Data</th></tr></thead>
        <tbody>
          <tr><td>Autorização</td><td>Portaria nº 1776</td><td>07/12/2011</td></tr>
          <tr><td>Visita do Inep</td><td>Avaliação in loco</td><td>2º semestre de 2014</td></tr>
          <tr><td>Reconhecimento</td><td>Portaria nº 43 (DOU de 23/01/2015)</td><td>22/01/2015</td></tr>
        </tbody>
      </table>
      <p>Conceito de Curso (CC): <b>4</b></p>
    </div>`
  };
  PAGES["trabalho-de-conclusao"] = { tab: null, titulo: "Trabalho de Conclusão", html: () => `
    <h2 class="page-title light">Trabalho de Conclusão de Curso (TCC)</h2>
    <div class="texto">
      <table class="tabela-simples">
        <thead><tr><th>Matriz</th><th>TCC I</th><th>TCC II</th><th>Total</th></tr></thead>
        <tbody>
          <tr><td>2018 a 2023 (atualizada 2025)</td><td>120 h</td><td>120 h</td><td>240 h</td></tr>
          <tr><td>2010</td><td>120 h</td><td>60 h</td><td>180 h</td></tr>
        </tbody>
      </table>
      <h3>Normas e modelos</h3>
      <ul class="docs">
        ${doc("Normas TCC 2018 (atualizadas em 2023 e 2025)", 1022)}${doc("Normas TCC 2010", 1022)}
        ${doc("Modelo de Monografia – LaTeX", 1022, "ZIP")}${doc("Modelo de Monografia – Word", 1022, "DOC")}
      </ul>
    </div>`
  };
  PAGES["estagio-obrigatorio"] = { tab: null, titulo: "Estágio Obrigatório", html: () => `
    <h2 class="page-title light">Estágio Obrigatório</h2>
    <div class="texto">
      <p>Carga horária mínima de <b>240 horas</b>, conforme as Normas de Estágio da Unipampa. O estágio pode ser feito em organizações públicas ou privadas, inclusive na própria Unipampa.</p>
      <h3>Documentos</h3>
      <ul class="docs">
        ${doc("Normas de Estágio da Unipampa (Res. 20/2010)", 1020)}${doc("Normas de Estágio do curso 2018 (atualizadas em 2023 e 2025)", 1020)}
        ${doc("Fluxo do processo de estágio – resumido e completo", 1020, "IMG")}
        ${doc("Modelo de relatório – LaTeX", 1020, "ZIP")}${doc("Modelo de relatório – Word", 1020, "DOC")}
      </ul>
    </div>`
  };
  PAGES["atividades-complementares"] = { tab: null, titulo: "Atividades Complementares", html: () => `
    <h2 class="page-title light">Atividades Complementares de Graduação (ACG)</h2>
    <div class="texto">
      <div class="table-scroll">
      <table class="tabela-simples">
        <thead><tr><th>Matriz</th><th>Total mínimo</th><th>Ensino</th><th>Pesquisa</th><th>Extensão</th><th>Culturais, sociais e de gestão</th></tr></thead>
        <tbody>
          <tr><td>2023 (atualizada 2025)</td><td>360 h</td><td>36 h</td><td>36 h</td><td>0 h*</td><td>36 h</td></tr>
          <tr><td>2018</td><td>360 h</td><td>36 h</td><td>36 h</td><td>36 h</td><td>36 h</td></tr>
          <tr><td>2010</td><td>300 h</td><td>30 h</td><td>30 h</td><td>30 h</td><td>30 h</td></tr>
        </tbody>
      </table>
      </div>
      <p class="nota">* Na matriz 2023 a extensão é cumprida pelas ACEEs do projeto “Unipampa Cidadã”. Na matriz 2010 há ainda o Grupo V – Avaliação de Desempenho (60 h).</p>
      <h3>Documentos</h3>
      <ul class="docs">${doc("Normas ACG 2018", 913)}${doc("Normas ACG 2010", 913)}${doc("Formulário de solicitação de ACG", 913)}</ul>
    </div>`
  };
  PAGES["representacao-discente"] = { tab: null, titulo: "Representação Discente", html: () => `
    <h2 class="page-title light">Representação Discente</h2>
    <div class="texto">
      <p>Os estudantes do curso são representados por dois canais:</p>
      <ul class="pessoas">
        <li><a href="#representante-discente">Representação Discente do Curso</a><small>Representa os alunos na Comissão de Curso</small></li>
        <li>Diretório Acadêmico do Curso<small>Entidade estudantil do curso</small></li>
      </ul>
    </div>`
  };
  PAGES["representante-discente"] = { tab: null, pai: "representacao-discente", titulo: "Representante Discente do Curso", html: () => `
    <h2 class="page-title light">Representante Discente do Curso</h2>
    <div class="texto">
      <p>O representante discente leva a voz dos estudantes à Comissão de Curso, que também tem professores e técnicos (TAEs). Por meio dele, os alunos podem pedir, por exemplo, a inclusão de novos componentes complementares (CCCGs).</p>
      <ul class="pessoas"><li>Camilla Charão Borchhardt Quincozes<small>Representante discente atual</small></li></ul>
      <p class="nota">O contato da representante está publicado na <a href="${OFICIAL}?page_id=2106" target="_blank" rel="noopener">página oficial</a>.</p>
    </div>`
  };
  const GRUPOS = [
    ["LESSE", "Laboratório de Engenharia de Software e Sistemas Embarcados", "Maicon Bernardino da Silveira e Elder de Macedo Rodrigues"],
    ["LabISE", "", "Alice Fonseca Finger"],
    ["LAPIA", "", "Alessandro Bof de Oliveira"],
    ["LEA", "", "Claudio Schepke e Diego Luis Kreutz"],
    ["LESA", "", "Cristiano Tolfo e Gilleanes Thorwald Araujo Guedes"],
    ["LOS", "", "Marcelo Caggiani Luizelli"],
  ];
  PAGES["grupos-de-pesquisa"] = { tab: null, titulo: "Grupos de Pesquisa", html: () => `
    <h2 class="page-title light">Grupos de Pesquisa</h2>
    <div class="texto">
      <p>Grupos certificados no Diretório de Grupos de Pesquisa do CNPq com participação de docentes do curso:</p>
      ${GRUPOS.map(([sigla, , lider]) => `<div class="grupo"><b>${sigla}</b> – ${lider}</div>`).join("")}
      <p style="margin-top:12px">Veja os projetos em andamento em <a href="#projetos-pesquisa">Projetos › Pesquisa</a>.</p>
    </div>`
  };
  PAGES["laboratorios"] = { tab: null, titulo: "Laboratórios", html: () => `
    <h2 class="page-title light">Laboratórios</h2>
    <div class="texto">
      <p>O curso usa cinco laboratórios de informática no bloco A1 do Campus Alegrete, com 110 computadores no total.</p>
      <div class="table-scroll">
      <table class="tabela-simples">
        <thead><tr><th>Laboratório</th><th>Sala</th><th>Máquinas</th><th>Processador</th><th>Memória</th><th>Sistema</th></tr></thead>
        <tbody>
          <tr><td>Lab 1</td><td>212</td><td>20</td><td>Intel Core i5 650</td><td>8 GB DDR3</td><td>Windows 11 Pro</td></tr>
          <tr><td>Lab 2</td><td>210</td><td>20</td><td>AMD A8-6500B</td><td>8 GB DDR3</td><td>Windows 10 Pro</td></tr>
          <tr><td>Lab 3</td><td>302</td><td>20</td><td>Intel Core i5-8400</td><td>8 GB DDR4</td><td>Windows 11 Pro</td></tr>
          <tr><td>Lab 4</td><td>202</td><td>20</td><td>AMD Ryzen 5 PRO 4650GE</td><td>16 GB DDR4</td><td>Windows 11 Pro</td></tr>
          <tr><td>Lab 5</td><td>102</td><td>30</td><td>Ryzen 5 PRO 4650GE / Core i5 650</td><td>16 GB DDR4 / 8 GB DDR3</td><td>Windows 11 Pro</td></tr>
        </tbody>
      </table>
      </div>
      <p>Capacidade e dimensões de todas as salas estão em <a href="#infraestrutura">Infraestrutura</a>.</p>
    </div>`
  };
  PAGES["comissao-do-curso"] = { tab: null, titulo: "Comissão do curso", html: () => `
    <h2 class="page-title light">Comissão do Curso</h2>
    <div class="texto">
      <p>A Comissão de Curso planeja, executa e avalia as atividades acadêmicas e o PPC.</p>
      <ul class="pessoas">
        <li>Coordenador(a) de Curso<small>Preside a comissão</small></li>
        <li>Representante discente<small><a href="#representante-discente">ver representante</a></small></li>
        <li>Representante técnico-administrativo (TAE)<small>Servidor do campus</small></li>
      </ul>
      <h3>Documentos</h3>
      <ul class="docs">${doc("Regimento do Conselho do Campus", 3202)}${doc("Atas da Comissão de Curso", 3119, "ATAS")}</ul>
    </div>`
  };
  PAGES["politica-de-cookies"] = { tab: null, titulo: "Política de cookies", html: () => `
    <h2 class="page-title light">Política de cookies</h2>
    <div class="texto">
      <p>Este protótipo guarda apenas uma informação no seu navegador: se você já respondeu ao aviso de cookies. Nenhum dado é enviado a servidores.</p>
      <p><button type="button" class="cat" id="reset-cookies">Mostrar o aviso de cookies de novo</button></p>
    </div>`, after: () => $("#reset-cookies").addEventListener("click", () => {
        try { localStorage.removeItem("cookies-ok"); } catch (e) {}
        mostrarCookies(true);
      })
  };
  PAGES["mapa-do-site"] = { tab: null, titulo: "Mapa do site", html: () => {
    const link = (id) => `<li><a href="#${id}">${PAGES[id].titulo}</a></li>`;
    const grupo = (titulo, ids) => `<section><h3>${titulo}</h3><ul>${ids.map(link).join("")}</ul></section>`;
    return `
    <h2 class="page-title light">Mapa do site</h2>
    <div class="mapa">
      ${grupo("Menu principal", ["informacoes", "ppc", "projetos", "horarios", "docentes", "infraestrutura", "contato", "bibliotecas"])}
      ${grupo("O Curso", ["o-curso", "apresentacao", "ingresso", "metodologia", "matriz-curricular", "coordenacao", "nde"])}
      ${grupo("Vida acadêmica", ["perfil-do-egresso", "agenda", "avaliacoes-mec", "trabalho-de-conclusao", "estagio-obrigatorio", "atividades-complementares", "comissao-do-curso"])}
      ${grupo("Estudantes e pesquisa", ["representacao-discente", "representante-discente", "grupos-de-pesquisa", "laboratorios"])}
      ${grupo("Projetos", PROJETOS.map((p) => "projetos-" + p.id))}
      ${grupo("Bibliotecas", [...BIBLIOTECAS.map((b) => "biblioteca-" + b.id), "biblioteca-mais-infos"])}
      ${grupo("Notícias", ["noticias", ...NOTICIAS.map((n) => "noticia-" + n.id)])}
      ${grupo("Outros", ["inicio", "ppc-anteriores", "politica-de-cookies"])}
    </div>`;
  }};

  // Páginas "filhas" já existentes ganham pai para o breadcrumb
  PAGES["ppc-anteriores"].pai = "ppc";
  PROJETOS.forEach((p) => { PAGES["projetos-" + p.id].pai = "projetos"; });
  BIBLIOTECAS.forEach((b) => { PAGES["biblioteca-" + b.id].pai = "bibliotecas"; });
  PAGES["biblioteca-mais-infos"].pai = "bibliotecas";

  // Menu lateral: destaca o item atual e abre o submenu dele
  function marcarMenuLateral(id) {
    document.querySelectorAll(".side-menu a[data-side]").forEach((a) => {
      const on = a.dataset.side === id;
      a.classList.toggle("active", on);
      if (on) {
        a.setAttribute("aria-current", "page");
      } else a.removeAttribute("aria-current");
    });
    const pai = PAGES[id] && PAGES[id].pai;
    if (pai === "o-curso") abrirSubmenu("sub-curso", true);
    if (pai === "representacao-discente") abrirSubmenu("sub-rep", true);
  }
  function abrirSubmenu(subId, aberto) {
    const sub = document.getElementById(subId);
    const btn = document.querySelector(`[aria-controls="${subId}"]`);
    sub.hidden = !aberto;
    btn.setAttribute("aria-expanded", String(aberto));
  }
  document.querySelectorAll(".sub-toggle").forEach((btn) =>
    btn.addEventListener("click", () => abrirSubmenu(btn.getAttribute("aria-controls"), btn.getAttribute("aria-expanded") !== "true")));

  // Filtro de categorias das notícias
  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-cat]");
    if (!c) return;
    catAtual = c.dataset.cat;
    const alvo = $("#lista-noticias");
    if (alvo) alvo.innerHTML = listaNoticias();
    else location.hash = "noticias";
  });

  // Aviso de cookies
  function mostrarCookies(forcar) {
    let ok = false;
    try { ok = localStorage.getItem("cookies-ok") === "1"; } catch (e) {}
    const bar = $("#cookie-bar");
    bar.hidden = ok && !forcar;
    document.body.classList.toggle("cookie-on", !bar.hidden);
  }
  function fecharCookies(lembrar) {
    if (lembrar) { try { localStorage.setItem("cookies-ok", "1"); } catch (e) {} }
    $("#cookie-bar").hidden = true;
    document.body.classList.remove("cookie-on");
  }
  $("#cookie-aceitar").addEventListener("click", () => fecharCookies(true));
  $("#cookie-fechar").addEventListener("click", () => fecharCookies(false));
  mostrarCookies(false);

  // Voltar ao topo
  const toTop = $("#to-top");
  window.addEventListener("scroll", () => { toTop.hidden = window.scrollY < 300; }, { passive: true });
  toTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); $(".site-header a").focus({ preventScroll: true }); });

  // ---------------- Roteador ----------------
  const DEFAULT = "inicio";
  const content = $("#conteudo");

  function render() {
    let id = decodeURIComponent(location.hash.slice(1));
    // atalhos de acessibilidade: não trocam a página, a menos que nada tenha sido renderizado ainda
    if (["conteudo", "menu", "busca", "rodape"].includes(id) && content.innerHTML.trim()) return;
    if (!PAGES[id]) id = DEFAULT;
    const page = PAGES[id];
    const trilha = [`<a href="#" class="noop">Cursos da Unipampa</a>`, `<a href="#inicio">Engenharia de Software</a>`];
    if (page.pai && PAGES[page.pai]) trilha.push(`<a href="#${page.pai}">${PAGES[page.pai].titulo}</a>`);
    if (id !== "inicio") trilha.push(esc(page.titulo)); else trilha.push("Notícias");
    content.innerHTML = `<p class="breadcrumb crumb-global">${trilha.join(" &gt; ")}</p>` + page.html();
    if (page.after) page.after();
    marcarMenuLateral(page.lateral || id);
    document.title = `${page.titulo} – Engenharia de Software – Unipampa`;
    document.querySelectorAll(".main-nav__list a").forEach((a) => {
      const on = a.dataset.tab === page.tab;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", render);

  // Cliques delegados (links sem destino, filtros, bens patrimoniais)
  document.addEventListener("click", (e) => {
    const noop = e.target.closest("a.noop");
    if (noop) { e.preventDefault(); return; }

    const f = e.target.closest("[data-filtro]");
    if (f) {
      if (f.dataset.filtro === "nome") filtroNome = f.dataset.letra; else filtroSobrenome = f.dataset.letra;
      f.parentElement.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("on", b === f);
        b.setAttribute("aria-pressed", String(b === f));
      });
      renderDocentes();
      return;
    }

    const bens = e.target.closest("[data-bens]");
    if (bens) {
      const lista = $("#bens-" + bens.dataset.bens);
      lista.hidden = !lista.hidden;
      bens.setAttribute("aria-expanded", String(!lista.hidden));
      bens.textContent = lista.hidden ? "(clique para mostrar)" : "(clique para ocultar)";
    }
  });

  // Atalhos de acessibilidade (Ir para o conteúdo 1, menu 2, busca 3, rodapé 4)
  function irPara(alvo) {
    if (alvo === "busca") { abrirBusca(); return; }
    const el = { conteudo: content, menu: $(".main-nav__list a"), rodape: $("#rodape") }[alvo];
    el.focus();
    el.scrollIntoView({ behavior: "smooth" });
  }
  document.querySelectorAll("[data-skip]").forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); irPara(a.dataset.skip); }));
  // Lido por e.code (tecla física): funciona com Alt+1..4 e com Alt+Shift+1..4
  // (alternativa quando o navegador usa Alt+número para trocar de aba) e independe do layout.
  document.addEventListener("keydown", (e) => {
    if (!e.altKey || e.ctrlKey || e.metaKey) return;
    const m = /^(?:Digit|Numpad)([1-4])$/.exec(e.code || "");
    if (!m) return;
    e.preventDefault();
    irPara({ "1": "conteudo", "2": "menu", "3": "busca", "4": "rodape" }[m[1]]);
  });

  $("#btn-contraste").addEventListener("click", () => document.body.classList.toggle("contraste"));
  $("#btn-cinza").addEventListener("click", () => document.body.classList.toggle("cinza"));

  // ---------------- Calendário navegável ----------------
  const MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
  const hoje = new Date();
  let calAno = hoje.getFullYear(), calMes = hoje.getMonth();
  function renderCalendario() {
    const dias = ["D", "S", "T", "Q", "Q", "S", "S"];
    const primeiro = new Date(calAno, calMes, 1).getDay();
    const total = new Date(calAno, calMes + 1, 0).getDate();
    let html = "<thead><tr>" + dias.map((d) => `<th>${d}</th>`).join("") + "</tr></thead><tbody><tr>";
    if (primeiro) html += `<td colspan="${primeiro}"></td>`;
    for (let d = 1; d <= total; d++) {
      if ((primeiro + d - 1) % 7 === 0 && d !== 1) html += "</tr><tr>";
      const ehHoje = d === hoje.getDate() && calMes === hoje.getMonth() && calAno === hoje.getFullYear();
      html += `<td${ehHoje ? ' class="today" title="Hoje"' : ""}>${d}</td>`;
    }
    html += "</tr></tbody>";
    $("#calendar").innerHTML = html;
    $("#cal-titulo").textContent = `${MESES[calMes]} ${calAno}`.toUpperCase();
    $("#cal-prev").textContent = "« " + MESES[(calMes + 11) % 12].slice(0, 3);
    $("#cal-next").textContent = MESES[(calMes + 1) % 12].slice(0, 3) + " »";
    $("#cal-prev").setAttribute("aria-label", "Mês anterior");
    $("#cal-next").setAttribute("aria-label", "Próximo mês");
  }
  $("#cal-prev").addEventListener("click", () => { calMes--; if (calMes < 0) { calMes = 11; calAno--; } renderCalendario(); });
  $("#cal-next").addEventListener("click", () => { calMes++; if (calMes > 11) { calMes = 0; calAno++; } renderCalendario(); });
  renderCalendario();

  // ---------------- Pesquisa ----------------
  const modal = $("#search-modal");
  const navSearch = $(".nav-search");
  const input = $("#search-input");
  const advanced = $("#search-advanced");
  const hint = $("#search-hint");
  const statusFiltros = $("#search-filtros");
  const results = $("#search-results");
  const body = $("#search-body");
  const nav = $(".main-nav");
  const btnBusca = $("#btn-busca");
  // Pesquisa avançada: as abas do menu superior viram filtros de categoria
  const abas = [...document.querySelectorAll(".main-nav__list a[data-tab]")];
  const filtros = new Set(); // data-tab das abas selecionadas
  const HINT_AVANCADA = "Clique nas abas da barra superior para filtrar a pesquisa por categoria";
  let ultimoFoco = null;

  function textoDaPagina(id) {
    const tmp = document.createElement("div");
    tmp.innerHTML = PAGES[id].html();
    const extra = PAGES[id].busca ? " " + PAGES[id].busca() : "";
    return (PAGES[id].titulo + " " + tmp.textContent + extra).toLowerCase();
  }
  const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  // Categoria (aba superior) de uma página: a própria aba ou a aba da página-pai
  function abaDe(id) {
    const p = PAGES[id];
    if (p.tab) return p.tab;
    return p.pai && PAGES[p.pai] ? PAGES[p.pai].tab : null;
  }
  const nomeAba = (tab) => abas.find((a) => a.dataset.tab === tab).textContent.trim();
  const avancadaAtiva = () => document.body.classList.contains("busca-avancada");

  // Liga/desliga o modo "abas como filtros" (só enquanto o modal está aberto e a caixa marcada)
  function modoAvancado(on) {
    document.body.classList.toggle("busca-avancada", on);
    if (!on) filtros.clear();
    abas.forEach((a) => {
      const sel = on && filtros.has(a.dataset.tab);
      a.classList.toggle("filtro-on", sel);
      if (on) {
        a.setAttribute("role", "button");
        a.setAttribute("aria-pressed", String(sel));
      } else {
        a.removeAttribute("role");
        a.removeAttribute("aria-pressed");
      }
    });
    statusFiltros.hidden = !on || !filtros.size;
    statusFiltros.textContent = filtros.size ? "Filtrando por: " + [...filtros].map(nomeAba).join(", ") : "";
    posicionarModal();
  }
  function alternarFiltro(tab) {
    if (filtros.has(tab)) filtros.delete(tab); else filtros.add(tab);
    modoAvancado(true);
    buscar();
  }
  // Com a barra superior fixa por cima do fundo do modal, garante que ela não cubra o modal
  // (relevante em telas estreitas, onde o menu quebra em várias linhas)
  function posicionarModal() {
    modal.style.paddingTop = "";
    if (modal.hidden) return;
    const base = parseFloat(getComputedStyle(modal).paddingTop) || 0;
    const fundoNav = nav.getBoundingClientRect().bottom + 12;
    if (fundoNav > base) modal.style.paddingTop = fundoNav + "px";
  }

  function abrirBusca() {
    ultimoFoco = document.activeElement;
    modal.hidden = false;
    navSearch.classList.add("open");
    document.body.classList.add("busca-aberta");
    // com o modal aberto, a lupa passa a executar a pesquisa (padrão ou avançada)
    btnBusca.setAttribute("aria-label", "Pesquisar");
    btnBusca.title = "Pesquisar";
    results.innerHTML = "";
    body.classList.remove("has-results");
    hint.textContent = HINT_AVANCADA;
    hint.hidden = !advanced.checked;
    modoAvancado(advanced.checked);
    input.focus();
  }
  // devolverFoco = false quando um resultado é clicado (a navegação já leva o usuário à nova página)
  function fecharBusca(devolverFoco = true) {
    modal.hidden = true;
    navSearch.classList.remove("open");
    document.body.classList.remove("busca-aberta");
    btnBusca.setAttribute("aria-label", "Abrir pesquisa");
    btnBusca.title = "Abrir pesquisa";
    modoAvancado(false);
    if (devolverFoco && ultimoFoco) ultimoFoco.focus();
  }
  function onde(id) {
    const p = PAGES[id];
    const paiId = p.pai || (p.tab && p.tab !== id ? p.tab : null);
    return paiId && PAGES[paiId] ? "Dentro de " + PAGES[paiId].titulo : "Página principal";
  }
  function buscar() {
    const termo = semAcento(input.value.trim());
    const usarFiltros = advanced.checked && filtros.size > 0;
    if (!termo && !usarFiltros) {
      hint.hidden = false;
      hint.textContent = advanced.checked ? HINT_AVANCADA : "Digite o que você procura no campo acima.";
      results.innerHTML = "";
      body.classList.remove("has-results");
      return;
    }
    const palavras = termo ? termo.split(/\s+/) : [];
    const achados = Object.keys(PAGES).filter((id) => {
      if (usarFiltros && !filtros.has(abaDe(id))) return false;
      if (!palavras.length) return true;
      const txt = semAcento(textoDaPagina(id));
      return palavras.every((p) => txt.includes(p));
    });
    const emCategorias = usarFiltros ? " em " + [...filtros].map(nomeAba).join(", ") : "";
    const para = input.value.trim() ? ` para “${esc(input.value.trim())}”` : "";
    hint.hidden = true;
    body.classList.add("has-results");
    results.innerHTML = achados.length
      ? achados.map((id) => `<li><a href="#${id}" data-close>${PAGES[id].titulo}</a><small>${onde(id)}</small></li>`).join("")
      : `<li class="none">Nenhum resultado${para}${esc(emCategorias)}. ${usarFiltros ? "Tente remover algum filtro ou usar outra palavra." : "Tente outra palavra, como “biblioteca”, “laboratório” ou o nome de um docente."}</li>`;
  }

  // Lupa: abre o modal; com ele aberto, pesquisa (mesma ação do botão "Buscar").
  // Para fechar: X, Esc ou clique fora do modal.
  btnBusca.addEventListener("click", () => (modal.hidden ? abrirBusca() : buscar()));
  $("#search-close").addEventListener("click", () => fecharBusca());
  $("#search-go").addEventListener("click", buscar);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") buscar(); });
  advanced.addEventListener("change", () => {
    modoAvancado(advanced.checked);
    if (body.classList.contains("has-results")) { buscar(); return; }
    hint.textContent = HINT_AVANCADA;
    hint.hidden = !advanced.checked;
    if (advanced.checked) abas[0].focus();
  });
  // No modo avançado, clicar numa aba alterna o filtro em vez de navegar
  abas.forEach((a) => {
    a.addEventListener("click", (e) => {
      if (modal.hidden) return;
      // pesquisa padrão: a barra fica acima do fundo do modal, então clicar numa aba
      // equivale a sair da pesquisa e navegar normalmente
      if (!avancadaAtiva()) { fecharBusca(false); return; }
      e.preventDefault();
      alternarFiltro(a.dataset.tab);
    });
    // role="button": Espaço também ativa (Enter já dispara o click do link)
    a.addEventListener("keydown", (e) => {
      if (!avancadaAtiva() || e.key !== " ") return;
      e.preventDefault();
      alternarFiltro(a.dataset.tab);
    });
  });
  window.addEventListener("resize", posicionarModal);
  window.addEventListener("scroll", () => { if (!modal.hidden) posicionarModal(); }, { passive: true });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharBusca();
    if (e.target.closest("[data-close]")) fecharBusca(false);
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") { fecharBusca(); return; }
    if (e.key !== "Tab") return;
    // focus trap: Tab/Shift+Tab circulam só dentro do modal, na lupa e (na pesquisa avançada) nas abas superiores
    const focaveis = [...(avancadaAtiva() ? abas : []), btnBusca,
      ...modal.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])')]
      .filter((el) => !el.disabled && !el.closest("[hidden]"));
    if (!focaveis.length) return;
    const primeiro = focaveis[0], ultimo = focaveis[focaveis.length - 1];
    const dentro = focaveis.includes(document.activeElement);
    if (e.shiftKey && (document.activeElement === primeiro || !dentro)) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && (document.activeElement === ultimo || !dentro)) { e.preventDefault(); primeiro.focus(); }
  });

  render();
}
