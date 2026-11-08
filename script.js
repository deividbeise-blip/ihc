/* Protótipo navegável – roteamento por hash (#pagina) */

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

// Cada biblioteca: [rótulo, valor]; "email" vira texto verde
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
    ["E-mail", "biblioteca.itaqui@unipampa.edu.br"],
    ["Endereço", "Rua Luiz Joaquim de Sá Britto, s/n."],
    ["CEP", "97650-000 – Itaqui – RS."],
    ["Assistentes em Administração", "Itamara Martins de Souza, José Miguel Astegiano."],
    ["Administradora", "Fátima Teresinha Rodrigues Pinheiro."],
    ["Bibliotecária", "Alexandra Santana Porto"],
  ]},
  { id: "jaguarao", nome: "Jaguarão", dados: [
    ["Atendimento", "De segunda a sexta-feira: 9h às 21h."],
    ["Fone", "(53) 3266 9400 Ramal Biblioteca: 5537 Ramal Bibliotecária: 5502."],
    ["E-mail", "biblioteca.jaguarao@unipampa.edu.br"],
    ["Endereço", "Rua Conselheiro Diana s/nº."],
    ["CEP", "96300-000 – Jaguarão – RS."],
    ["Assistente em Administração", "Edilson Calvete Blanco"],
    ["Bibliotecárias", "Kauana Rodrigues Amaral."],
  ]},
  { id: "livramento", nome: "Santana do Livramento", dados: [
    ["Atendimento", "De segunda a sexta-feira: das 8h às 21h."],
    ["Fone", "(55) 3967-1702"],
    ["E-mail", "biblioteca.livramento@unipampa.edu.br"],
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
    ["E-mail", "biblioteca.saogabriel@unipampa.edu.br"],
    ["Endereço", "Rua Aluísio Barros Macedo, s/n. BR 290."],
    ["CEP", "97307-020 – São Gabriel – RS Caixa Postal 02 – CEP 97300-970"],
    ["Assistentes em Administração", "Alex Marquez, Fabrício Lopez Costa"],
    ["Economista", "Edson Valderi Prestes de Oliveira."],
    ["Bibliotecárias", "Ana Paula Damasceno e Francine da Silva."],
  ]},
  { id: "uruguaiana", nome: "Uruguaina", dados: [
    ["Atendimento", "De segunda a sexta-feira: das 8h às 21h."],
    ["Fone", "(55) 3911-0203 ou 3911 0200 (ramal 8010)."],
    ["E-mail", "biblioteca.uruguaiana@unipampa.edu.br"],
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
    `<button type="button" data-filtro="${tipo}" data-letra="${l}" class="${l === atual ? "on" : ""}">${l}</button>`).join("");
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
}, after: renderDocentes };

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
    ? lista.map(([n, e, l]) => `<tr><td>${n}</td><td>${e}</td><td><a href="${l}" target="_blank" rel="noopener">${l}</a></td></tr>`).join("")
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
      ${p.imgs.map((img) => `<img class="shot" src="img/${img}.png" alt="Tabela de projetos de ${p.nome}: projeto, registro, coordenador e período" loading="lazy">`).join("")}
    </div>`
  };
});

PAGES["infraestrutura"] = { tab: "infraestrutura", titulo: "Infraestrutura", html: () => `
  <p class="breadcrumb"><a href="#" class="noop">Cursos da Unipampa</a> &gt; <a href="#informacoes">Engenharia de Software</a> &gt; <a href="#" class="noop">Páginas Fixas</a> &gt; Infraestrutura</p>
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
  <p class="breadcrumb"><a href="#" class="noop">Cursos da Unipampa</a> &gt; <a href="#informacoes">Engenharia de Software</a> &gt; <a href="#" class="noop">Páginas Fixas</a> &gt; Contato</p>
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
    </div>
    <img src="img/sisbi-logos-2.png" alt="Publica-se, Portal SBE, Bases de Livre Acesso e a revista do SisBi" width="336" height="803">
  </div>`
};

// ---------------- Roteador ----------------
const DEFAULT = "informacoes";
const content = $("#conteudo");

function render() {
  let id = decodeURIComponent(location.hash.slice(1));
  if (["conteudo", "menu", "busca", "rodape"].includes(id)) return; // atalhos de acessibilidade
  if (!PAGES[id]) id = DEFAULT;
  const page = PAGES[id];
  content.innerHTML = page.html();
  if (page.after) page.after();
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
    f.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === f));
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
document.addEventListener("keydown", (e) => {
  if (!e.altKey) return;
  const mapa = { "1": "conteudo", "2": "menu", "3": "busca", "4": "rodape" };
  if (mapa[e.key]) { e.preventDefault(); irPara(mapa[e.key]); }
});

$("#btn-contraste").addEventListener("click", () => document.body.classList.toggle("contraste"));
$("#btn-cinza").addEventListener("click", () => document.body.classList.toggle("cinza"));

// ---------------- Calendário (Outubro 2026) ----------------
(function calendario() {
  const dias = ["D", "S", "T", "Q", "Q", "S", "S"];
  const primeiro = new Date(2026, 9, 1).getDay(); // 0 = domingo
  const total = 31;
  let html = "<thead><tr>" + dias.map((d) => `<th>${d}</th>`).join("") + "</tr></thead><tbody><tr>";
  if (primeiro) html += `<td colspan="${primeiro}"></td>`;
  for (let d = 1; d <= total; d++) {
    if ((primeiro + d - 1) % 7 === 0 && d !== 1) html += "</tr><tr>";
    html += `<td>${d}</td>`;
  }
  html += "</tr></tbody>";
  $("#calendar").innerHTML = html;
})();

// ---------------- Pesquisa ----------------
const modal = $("#search-modal");
const navSearch = $(".nav-search");
const navInput = $("#nav-search-input");
const input = $("#search-input");
const advanced = $("#search-advanced");
const hint = $("#search-hint");
const results = $("#search-results");
const body = $("#search-body");
let ultimoFoco = null;

function textoDaPagina(id) {
  const tmp = document.createElement("div");
  tmp.innerHTML = PAGES[id].html();
  return (PAGES[id].titulo + " " + tmp.textContent).toLowerCase();
}
const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function abrirBusca() {
  ultimoFoco = document.activeElement;
  modal.hidden = false;
  navSearch.classList.add("open");
  navInput.tabIndex = 0;
  results.innerHTML = "";
  body.classList.remove("has-results");
  hint.hidden = !advanced.checked;
  input.focus();
}
function fecharBusca() {
  modal.hidden = true;
  navSearch.classList.remove("open");
  navInput.tabIndex = -1;
  if (ultimoFoco) ultimoFoco.focus();
}
function buscar() {
  const termo = semAcento((input.value + " " + (advanced.checked ? navInput.value : "")).trim());
  if (!termo) {
    hint.hidden = false;
    hint.textContent = advanced.checked ? "Utilize a barra superior para filtrar a pesquisa" : "Digite o que você procura no campo acima.";
    results.innerHTML = "";
    body.classList.remove("has-results");
    return;
  }
  const palavras = termo.split(/\s+/);
  const achados = Object.keys(PAGES).filter((id) => {
    const txt = semAcento(textoDaPagina(id));
    return palavras.every((p) => txt.includes(p));
  });
  hint.hidden = true;
  body.classList.add("has-results");
  results.innerHTML = achados.length
    ? achados.map((id) => `<li><a href="#${id}" data-close>${PAGES[id].titulo}</a><small>${PAGES[id].tab === id ? "Página principal" : "Dentro de " + PAGES[PAGES[id].tab].titulo}</small></li>`).join("")
    : `<li class="none">Nenhum resultado para “${esc(input.value)}”. Tente outra palavra, como “biblioteca”, “laboratório” ou o nome de um docente.</li>`;
}

$("#btn-busca").addEventListener("click", () => (modal.hidden ? abrirBusca() : fecharBusca()));
$("#search-close").addEventListener("click", fecharBusca);
$("#search-go").addEventListener("click", buscar);
input.addEventListener("keydown", (e) => { if (e.key === "Enter") buscar(); });
navInput.addEventListener("keydown", (e) => { if (e.key === "Enter") buscar(); });
advanced.addEventListener("change", () => {
  hint.textContent = "Utilize a barra superior para filtrar a pesquisa";
  hint.hidden = !advanced.checked || body.classList.contains("has-results");
  if (advanced.checked) navInput.focus();
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharBusca();
  if (e.target.closest("[data-close]")) { modal.hidden = true; navSearch.classList.remove("open"); }
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) fecharBusca(); });

render();
