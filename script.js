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

  // Tabelas de projetos transcritas das capturas img/<id>-N.png (colunas: projeto, registro, coordenador, período)
  const PROJETOS = [
    { id: "pesquisa", nome: "Pesquisa", lista: [
      ["Algoritmos, Métodos e Ferramentas para a Agricultura Digital", "2025.PE.BG.4043", "Ana Paula Ludtke Ferreira", "03/03/2025 - 03/03/2029"],
      ["Alocação de Recursos Computacionais em Infraestruturas Distribuídas usando Agentic AI", "2026.PE.AL.5788", "Paulo Silas Severo de Souza", "18/05/2026 - 31/12/2028"],
      ["Automação de Tarefas de DevOps usando Modelos de Linguagem", "2025.PE.AL.3963", "Paulo Silas Severo de Souza", "01/04/2025 - 30/04/2028"],
      ["Automação de Tarefas de Suporte Docente com Modelos de Inteligência Artificial Generativa", "2025.PE.AL.4677", "Paulo Silas Severo de Souza", "01/06/2025 - 31/12/2027"],
      ["Automação do Fluxo da Elaboração de Minutas de Atos Processuais no e-Proc do TJRS com uso de Inteligência Artificial Agêntica", "2026.PE.AL.5820", "Maicon Bernardino da Silveira", "01/06/2026 - 31/12/2028"],
      ["BioFiltros Inovadores para Degradação de Poluentes Emergente", "2025.PE.AL.5191", "Ana Paula Garcia", "16/03/2026 - 16/03/2030"],
      ["Certificações sustentáveis e inovação em engenharia: diretrizes para um modelo conceitual de casa sustentável no Brasil", "2025.PE.AL.4220", "Fladimir Fernandes dos Santos", "01/04/2025 - 31/03/2027"],
      ["Classificação de emoções em imagens de faces utilizando redes neurais profundas convolutivas siamesas", "2024.PE.AL.2834", "Alessandro Bof de Oliveira", "08/01/2024 - 07/01/2028"],
      ["Composes – Composição Inteligente de Recursos de Melhoria de Processo de Software", "2022.PE.AL.1622", "Joao Pablo Silva da Silva", "01/12/2022 - 30/11/2026"],
      ["Computação Aplicada", "2025.PE.AL.3983", "Claudio Schepke", "01/04/2025 - 30/09/2028"],
      ["Desenvolvimento de Ferramentas de Inteligência Artificial para Auxílio no Ensino da Linguagem UML", "2025.PE.AL.4640", "Gilleanes Thorwald Araujo Guedes", "26/05/2025 - 31/05/2027"],
      ["Desenvolvimento e Análise de uma Plataforma de Simulação Interativa com Visualizações Multi-Representacionais para o Ensino de Eletrônica de Potência", "2025.PE.AL.5083", "Jumar Luis Russi", "01/11/2025 - 01/11/2027"],
      ["Design Participativo integrado à Engenharia de Software: um framework para o desenvolvimento de software no domínio educacional", "2023.PE.AL.1752", "Amanda Meincke Melo", "13/03/2023 - 12/03/2027"],
      ["Egress@s", "2025.PE.AL.4614", "Aline Vieira de Mello", "01/07/2025 - 31/12/2028"],
      ["Engenharia de Qualidade de Software", "2026.PE.AL.5232", "Elder de Macedo Rodrigues", "01/03/2026 - 01/03/2030"],
      ["Engenharia de Software Aplicada em Sistemas de Informação Inteligentes", "2023.PE.AL.2402", "Maicon Bernardino da Silveira", "12/06/2023 - 01/09/2027"],
      ["Estudo e Desenvolvimento de Estratégias para Offloading de Tarefas em Ambientes Industriais", "2024.PE.AL.2919", "Paulo Silas Severo de Souza", "31/05/2024 - 31/12/2027"],
      ["Estudos Empíricos sobre a Colaboração e a Evolução de Processos de Software em Cenários de Inteligência Artificial", "2025.PE.AL.5193", "Anielle Severo Lisboa de Andrade", "04/12/2025 - 03/12/2029"],
      ["Explorando novos paradigmas de usabilidade nos processos de avaliação de Engenharia de Software", "2024.PE.AL.3658", "Ildevana Poltronieri Rodrigues", "02/01/2025 - 03/01/2028"],
      ["Ferramentas de Modelagem Semiquantitativa em Nuvem", "2024.PE.AL.3248", "Marcelo Resende Thielo", "01/04/2024 - 31/12/2027"],
      ["Formação de Portfólios com o Uso de Redes Neurais Artificiais e Distribuição de Probabilidade com Caudas Longas", "2025.PE.AL.4715", "Alexandre Silva de Oliveira", "01/06/2025 - 31/05/2027"],
      ["Fundamentação para a Engenharia de Software Aplicada ao Desenvolvimento e Transferência de Tecnologia Embarcada Inteligente para o Setor Rural: Sustentabilidade", "2025.PE.AL.4364", "Fabio Paulo Basso", "01/05/2025 - 31/05/2028"],
      ["Geração de Projetos UML Apoiada por LLMs", "2026.PE.AL.5332", "Gilleanes Thorwald Araujo Guedes", "06/04/2026 - 06/04/2030"],
      ["História da Computação Pessoal - Preservando Hardware, Software e Experiências", "2023.PE.AL.1996", "Marcelo Resende Thielo", "23/01/2023 - 23/01/2027"],
      ["Integração de Práticas de Engenharia Dirigida por Modelos e Inteligência Artificial", "2026.PE.AL.5394", "Fabio Paulo Basso", "30/03/2026 - 31/03/2028"],
      ["Investigação de Técnicas de Inteligência Artificial e Blockchain aplicadas a Cibersegurança, Redes e Sistemas", "2025.PE.AL.4576", "Rodrigo Brandao Mansilha", "01/09/2025 - 31/08/2029"],
      ["Métricas de Desempenho baseadas em Inteligência Artificial: Aplicações em Sistemas de Comunicações Móveis", "2025.PE.AL.4450", "Eliezer Soares Flores", "01/08/2025 - 31/07/2029"],
      ["Modelagem Esparsa com Dicionários Adaptativos e Transformadores Visuais na Agropecuária 4.0", "2025.PE.AL.4454", "Eliezer Soares Flores", "01/07/2025 - 30/06/2029"],
      ["Modelos de aprendizagem, métodos e ferramentas para ensino de Computação", "2025.PE.BG.4046", "Ana Paula Ludtke Ferreira", "03/03/2025 - 03/03/2029"],
      ["Modelos de Linguagem em Larga Escala (LLMs) e Modelos de Linguagem em Pequena Escala (SLMs) Aplicados à Cibersegurança", "2024.PE.AL.3943", "Diego Luis Kreutz", "09/12/2024 - 08/12/2028"],
      ["Modelos de Múltiplas Camadas e Representações Esparsas para Processamento e Análise de Imagens Médicas", "2023.PE.AL.1948", "Eliezer Soares Flores", "13/03/2023 - 31/12/2026"],
      ["Otimização de ferramentas de dispositivos de processamento de sinais através redução de operadores trigonométricos", "2026.PE.AL.5288", "Sidinei Ghissoni", "13/03/2026 - 28/02/2031"],
      ["Otimização e Análise de Sistemas de Arquitetura de Micro-Serviços Voltada para Small Language Models", "2026.PE.AL.5436", "Claudio Schepke", "01/06/2026 - 31/05/2028"],
      ["Otimização Geométrica de Hiperparâmetros em Redes Neurais para Cibersegurança", "2026.PE.AL.6170", "Dionatan Ricardo Schmidt", "04/09/2026 - 15/12/2028"],
      ["Projeto e Desenvolvimento de Algoritmos para Identificação de Objetos em Video Streamming", "2025.PE.AL.4604", "Marcelo Caggiani Luizelli", "30/05/2025 - 30/05/2027"],
      ["SchroEngine - Um Engine para o desenvolvimento de Jogos usando Mecânica Quântica", "2024.PE.AL.3112", "Marcelo Resende Thielo", "01/04/2024 - 31/12/2027"],
      ["Sistema Multimodal de Predição de Incêndios no Bioma Pampa Utilizando Modelos de Inteligência Artificial", "2026.PE.AL.5554", "Alessandro Bof de Oliveira", "01/04/2026 - 31/03/2028"],
      ["Tecnologia Computacional para a Educação Étnico-Racial (TeCEER)", "2026.PE.AL.5786", "Amanda Meincke Melo", "01/06/2026 - 31/12/2027"],
      ["TRAP-IoT: Tecnologia Resiliente para Aplicações em Protocolos IoT", "2024.PE.AL.3683", "Silvio Ereno Quincozes", "20/08/2024 - 20/08/2028"],
      ["Uma DSL Baseada em BPMN e Infraestrutura de Apoio para o Desenvolvimento de Contratos Inteligentes Independentes de Plataformas", "2024.PE.AL.2837", "Raquel Mainardi Pillat Basso", "05/12/2023 - 01/12/2026"],
      ["XAIID - Estratégias Inteligentes e Explicáveis para Detecção de Intrusões em Sistemas Ciber-Físicos", "2023.PE.AL.2578", "Silvio Ereno Quincozes", "02/08/2023 - 31/12/2027"],
    ]},
    { id: "extensao", nome: "Extensão", lista: [
      ["AgriPampa - Agricultura e Produção Agropecuária Sustentável no Meio Pampa", "2025.EX.AL.4902", "Diogo Silveira Kersten", "02/09/2025 - 02/09/2027"],
      ["Aprendizagens interculturais: produção de sentidos na educação - IX Edição", "2026.EX.AL.5615", "Maria Cristina Graeff Wernz", "30/03/2026 - 31/12/2026"],
      ["Baja Pampa - Projeto e Construção de um veículo Off Road para competição BAJA SAE BRASIL", "2025.EX.AL.4849", "Cristian Pohl Meinhardt", "15/08/2025 - 15/08/2027"],
      ["Centro de Tecnologia para o Agronegócio (CTA)", "2023.EX.AL.2744", "Elder de Macedo Rodrigues", "02/01/2024 - 02/01/2028"],
      ["Descobrindo Caminhos Profissionais", "2026.EX.AL.5869", "Luis Ernesto Roca Bruno", "15/10/2026 - 31/12/2027"],
      ["Despertar o Engenheiro nos jovens através da robótica com software e hardware livre", "2026.EX.AL.5718", "Mauro Fonseca Rodrigues", "06/07/2026 - 31/12/2028"],
      ["Educador 5.0 - Capacitação de Professores para o Uso de Inteligência Artificial na Educação Básica", "2025.EX.AL.5038", "Silvio Ereno Quincozes", "15/10/2025 - 31/12/2026"],
      ["Engenharia de Software Aplicada à Causas Sociais: Empreendedorismo Social", "2025.EX.AL.5004", "Fabio Paulo Basso", "01/10/2025 - 29/09/2027"],
      ["Formando Campeões", "2025.EX.AL.4411", "Cristian Pohl Meinhardt", "11/04/2025 - 31/12/2026"],
      ["GamificaEdu: Formação Continuada em Gamificação para Professores da Educação Básica", "2025.EX.AL.5040", "Paulo Silas Severo de Souza", "01/11/2025 - 31/10/2027"],
      ["Gurias Of Code - Desbravando a Arte da Programação", "2025.EX.AL.3962", "Ildevana Poltronieri Rodrigues", "12/03/2025 - 31/05/2028"],
      ["IA na Sociedade: conteúdo aberto e soluções tecnológicas para a comunidade", "2026.EX.AL.6263", "Diego Luis Kreutz", "15/10/2026 - 14/10/2029"],
      ["Jykre kar: conversas interculturais", "2025.EX.AL.5009", "Maria Cristina Graeff Wernz", "01/01/2026 - 31/12/2027"],
      ["Liga do Mercado Financeiro da Unipampa", "2025.EX.AL.4718", "Alexandre Silva de Oliveira", "01/07/2025 - 30/06/2027"],
      ["Motus - Movimento Literário Digital (2026-2027)", "2026.EX.AL.5235", "Aline Vieira de Mello", "01/04/2026 - 29/02/2028"],
      ["Movimentos Culturais: Acesso, Formação, e Valorização da Arte e Cultura em Alegrete", "2025.EX.AL.4901", "Aline Vieira de Mello", "01/10/2025 - 30/11/2026"],
      ["Pampa CTF: plataforma de aprendizado gamificado e competições abertas de cibersegurança", "2026.EX.AL.6212", "Diego Luis Kreutz", "01/10/2026 - 30/09/2028"],
      ["Programa C - Comunidade, Computação, Cultura, Comunicação, Ciência, Cidadania, Criatividade, Colaboração", "2025.EX.AL.4815", "Aline Vieira de Mello", "18/08/2025 - 17/08/2028"],
      ["Programa C + Educação Básica", "2024.EX.AL.3845", "Aline Vieira de Mello", "01/01/2025 - 31/12/2028"],
      ["Programa Codefólio - Construir, Documentar e Disseminar conhecimento", "2025.EX.AL.3974", "Silvio Ereno Quincozes", "14/01/2025 - 13/01/2028"],
      ["Programa JEDI", "2024.EX.AL.2889", "Maicon Bernardino da Silveira", "20/03/2024 - 20/03/2027"],
      ["Programa RAF - Rastreamento da Agricultura Familiar (2º Ciclo)", "2026.EX.AL.6251", "Rodrigo Brandao Mansilha", "20/10/2026 - 19/10/2029"],
      ["Tecnologia Centrada nas Pessoas: formação continuada de docentes da educação básica em tecnologias digitais e inteligência artificial", "2026.EX.AL.6244", "Anielle Severo Lisboa de Andrade", "01/11/2026 - 31/12/2027"],
      ["Telecomunicações-Radioamadorismo Cidadania e Defesa Civil", "2025.EX.AL.3781", "Luis Ernesto Roca Bruno", "30/09/2024 - 31/12/2026"],
      ["TRAMAS", "2024.EX.AL.2981", "Amanda Meincke Melo", "18/03/2024 - 31/12/2027"],
      ["Um periódico de comunicações interna e externa à UNIPAMPA/Alegrete - O Pampa em Pauta", "2025.EX.AL.4025", "Dionatan Ricardo Schmidt", "15/05/2025 - 23/04/2027"],
      ["VI Fecipampa - Campus Alegrete", "2026.EX.AL.5755", "Lanes Beatriz Acosta Jaques", "07/07/2026 - 31/12/2026"],
    ]},
    { id: "inovacao", nome: "Inovação", lista: [
      ["App ÁGUA PRO MATE", "2026.IN.AL.6145", "Mauro Fonseca Rodrigues", "08/09/2026 - 31/12/2027"],
      ["App para Meditação na Maternidade", "2026.IN.AL.5943", "Fabio Paulo Basso", "23/06/2026 - 22/06/2029"],
      ["Busca Chão", "2024.IN.AL.3334", "Mauro Fonseca Rodrigues", "04/04/2024 - 31/12/2026"],
      ["Desenvolvimento de Soluções com Inteligência Artificial e Smart Contracts", "2025.IN.AL.4577", "Rodrigo Brandao Mansilha", "01/09/2025 - 31/08/2029"],
      ["Ferramentas de apoio ao ensino de Computação", "2023.IN.AL.2259", "Alice Fonseca Finger", "05/06/2023 - 31/12/2027"],
      ["IA Adversarial: Ataques e Defesas em Sistemas Inteligentes", "2026.IN.AL.6262", "Diego Luis Kreutz", "15/10/2026 - 14/10/2029"],
      ["IA Aplicada a Problemas da Sociedade em Organizações Públicas e Privadas", "2026.IN.AL.6264", "Diego Luis Kreutz", "15/10/2026 - 14/10/2029"],
      ["Inovação Tecnológica em Engenharia de Software com IA Generativa e Agêntica", "2026.IN.AL.5679", "Maicon Bernardino da Silveira", "01/05/2026 - 30/04/2029"],
      ["Inovações em Tecnologia Social", "2025.IN.AL.4366", "Fabio Paulo Basso", "01/05/2025 - 01/10/2028"],
      ["IoT aplicado ao agronegócio", "2026.IN.AL.5921", "Elder de Macedo Rodrigues", "15/06/2026 - 01/06/2030"],
      ["IoTEdu e IoTPass: Governança Orientada por Identidade e Segurança de Dispositivos IoT", "2026.IN.AL.6261", "Diego Luis Kreutz", "15/10/2026 - 14/10/2028"],
      ["Metodologia Ágil no Desenvolvimento de Carros Voadores", "2025.IN.AL.4724", "Alexandre Silva de Oliveira", "03/06/2025 - 31/05/2027"],
      ["OMI-SPU: Observatório de Mercado de Imóveis da União com IA e Geoinformação", "2026.IN.AL.6258", "Diego Luis Kreutz", "15/10/2026 - 14/10/2028"],
      ["Pacote em R para implementacao de Portfolio de Investimentos", "2026.IN.AL.6086", "Alexandre Silva de Oliveira", "19/08/2026 - 19/08/2028"],
      ["Plataforma Codefólio", "2025.IN.AL.3899", "Silvio Ereno Quincozes", "14/03/2025 - 31/12/2027"],
      ["Plataforma de Gestão de Ativos de Propriedade Intelectual para ICTs Públicas", "2026.IN.AL.5732", "Ildevana Poltronieri Rodrigues", "11/05/2026 - 30/04/2028"],
      ["Programa de Rastreabilidade dos Produtos da Agricultura Familiar", "2022.IN.AL.1284", "Diogo Silveira Kersten", "01/08/2022 - 22/12/2026"],
      ["Um Software Inteligente para Formulação de Problemas Organizacionais", "2025.IN.AL.4466", "Joao Pablo Silva da Silva", "01/07/2025 - 31/12/2027"],
    ]},
    { id: "ensino", nome: "Ensino", lista: [
      ["CrIA: Laboratório de Criatividade e Programação de Jogos para Ingressantes", "2026.EN.AL.5621", "Marcelo Resende Thielo", "23/03/2026 - 24/03/2027"],
      ["Discente Ensinante, Docente Aprendente", "2026.EN.AL.5888", "Amanda Meincke Melo", "03/08/2026 - 31/12/2027"],
      ["Ensino da Linguagem UML Apoiado por Inteligência Artificial", "2026.EN.AL.5903", "Gilleanes Thorwald Araujo Guedes", "08/06/2026 - 07/06/2030"],
      ["Inovação Pedagógica Mediata por Tecnologia: Uma Plataforma Web para Gestão e Disseminação da Avaliação por Rubricas", "2026.EN.AL.5836", "Maicon Bernardino da Silveira", "01/07/2026 - 31/12/2027"],
      ["Inteligência Artificial Generativa na Pesquisa Acadêmica em Computação: Estratégias Pedagógicas para o Uso Crítico e Responsável", "2026.EN.AL.5831", "Anielle Severo Lisboa de Andrade", "03/08/2026 - 31/12/2027"],
      ["Liga do Mercado Financeiro", "2025.EN.AL.4717", "Alexandre Silva de Oliveira", "01/06/2025 - 31/05/2027"],
      ["LOA - Laboratório de Objetos de Aprendizagem: Biênio 2026-2027", "2026.EN.AL.5253", "Maicon Bernardino da Silveira", "13/02/2026 - 13/02/2028"],
      ["Monitoria Acadêmica em Resolução de Problemas 2026", "2026.EN.AL.5252", "Maicon Bernardino da Silveira", "13/02/2026 - 13/02/2027"],
      ["Monitoria em Administração e Empreendedorismo", "2026.EN.AL.5371", "Fladimir Fernandes dos Santos", "02/03/2026 - 08/03/2027"],
      ["Monitoria em Engenharia Econômica", "2025.EN.AL.4099", "Fladimir Fernandes dos Santos", "10/03/2025 - 08/03/2027"],
      ["PET - CTC CONVIDA: Rodas de conversa e palestras com professores e alunos que estão desenvolvendo pesquisas em diversas áreas", "2026.EN.AL.5194", "Ana Paula Garcia", "01/03/2026 - 31/12/2028"],
      ["PET - CTC ENSINA: Realização de oficinas e minicursos para os alunos dos cursos de graduação do Campus Alegrete", "2026.EN.AL.5189", "Ana Paula Garcia", "01/03/2026 - 31/12/2028"],
      ["PET - CTC MENTALIZA: Roda de conversa com profissionais da área saúde mental", "2026.EN.AL.5184", "Ana Paula Garcia", "01/03/2026 - 31/12/2028"],
      ["PET INGLÊS DESCOMPLICADO: Desenvolvimento e realização de curso de Inglês pelos membros do PET-CTC proficientes no idioma", "2026.EN.AL.5186", "Ana Paula Garcia", "01/03/2026 - 31/12/2028"],
      ["PET-CTC DESENVOLVENDO HABILIDADES ESSENCIAIS: Formação em Engenharias", "2026.EN.AL.5163", "Ana Paula Garcia", "01/03/2026 - 31/12/2028"],
      ["Trilhas Adaptativas com Inteligência Artificial para Aprendizagem em Disciplinas Teóricas de Computação", "2026.EN.AL.5901", "Paulo Silas Severo de Souza", "31/07/2026 - 31/12/2026"],
      ["Trilhas Formativas por Microaprendizagem e Reconhecimento Progressivo de Competências", "2026.EN.AL.5913", "Silvio Ereno Quincozes", "15/10/2025 - 31/12/2029"],
    ]},
    { id: "inclusao", nome: "Inclusão e diversidade", small: true, lista: [
      ["E-commerce para inclusão social das pessoas com deficiência", "2025.ID.AL.4942", "Fabio Paulo Basso", "01/10/2025 - 30/09/2027"],
      ["Gurias na Computação", "2026.ID.AL.6181", "Aline Vieira de Mello", "10/09/2026 - 28/02/2028"],
      ["Gurias Of Code em ação", "2026.ID.AL.6189", "Ildevana Poltronieri Rodrigues", "10/09/2026 - 11/09/2028"],
      ["Jykre Kar: ampliando escutas interculturais", "2026.ID.AL.6198", "Maria Cristina Graeff Wernz", "01/10/2026 - 31/12/2027"],
      ["Monitoria de Apoio à Inclusão e Acessibilidade - DEIA/PROCADI", "2026.ID.AL.6068", "Roberta dos Santos Messa", "01/08/2026 - 31/07/2028"],
      ["Pequenos Pampinhas", "2026.ID.AL.5645", "Natalia Braun Chagas", "01/04/2026 - 31/12/2026"],
      ["Tecendo Redes de Identidade, Ancestralidade e Interculturalidade: Diálogos Afro-Indígenas no Pampa", "2026.ID.AL.5606", "Daiana da Silva Marcelino", "01/04/2026 - 18/12/2027"],
      ["TRAMAS Acessibilidade", "2025.ID.AL.4956", "Amanda Meincke Melo", "07/10/2025 - 31/12/2026"],
    ]},
    { id: "empreendedorismo", nome: "Empreendedorismo", small: true, lista: [
      ["Campus Empreendedor - 4a. Edição", "2026.EP.AL.5720", "Mauro Fonseca Rodrigues", "01/05/2026 - 31/12/2026"],
      ["Startup Igniter - Transformando o aluno empreendedor 2", "2026.EP.AL.5942", "Fabio Paulo Basso", "27/06/2026 - 30/04/2029"],
      ["Validação de Modelo de Negócio de Impacto Social para Apoio à Autonomia do Cidadão em Requerimentos Administrativos no Âmbito do INSS", "2026.EP.AL.5938", "Maicon Bernardino da Silveira", "15/06/2026 - 31/12/2027"],
    ]},
    { id: "gestao", nome: "Gestão acadêmica", small: true, lista: [
      ["Chamada Interna Prograd 01/2025", "2025.GA.AL.4550", "Paulo Silas Severo de Souza", "16/05/2025 - 31/12/2026"],
      ["Chamada Interna Prograd 01/2025 - Coordenação Acadêmica Alegrete", "2025.GA.AL.4527", "Natalia Braun Chagas", "16/05/2025 - 31/12/2026"],
      ["Modelo de Gestão Acadêmica Integrada: Proposta Experimental para Validação e Perenidade do PET-CTC e o Fortalecimento Sistêmico da UNIPAMPA", "2026.GA.AL.5190", "Ana Paula Garcia", "01/01/2026 - 31/12/2032"],
    ]},
    { id: "assuntos", nome: "Assuntos estudantis", small: true, lista: [
      ["Correfólio – Promoção da Saúde e Bem-Estar de Estudantes da UNIPAMPA por Meio de Atividades Físicas", "2025.AS.AL.5150", "Silvio Ereno Quincozes", "18/11/2025 - 31/12/2026"],
      ["Jykre kar: diálogos interculturais com a comunidade acadêmica", "2026.AS.AL.5452", "Maria Cristina Graeff Wernz", "01/04/2026 - 31/12/2026"],
    ]},
  ];

  // Horários de 2026/2 transcritos de img/horarios.png.
  // A captura original mostra só o início da lista (o site de origem informava 47 resultados);
  // as demais aulas não aparecem na imagem e não existem em nenhuma versão do repositório.
  // Colunas: semestre ideal (null = sem período ideal), disciplina, código, professor(es), dia, horário, sala, tipo
  const HORARIOS_TOTAL_ORIGEM = 47;
  const HORARIOS = [
    { sem: 2, disc: "Banco de Dados", cod: "AL0327", prof: "Maicon B. da Silveira", dia: "Ter", hora: "18:30-20:20", sala: "205 · Sala de aula", tipo: "aula" },
    { sem: 2, disc: "Banco de Dados", cod: "AL0327", prof: "Maicon B. da Silveira", dia: "Ter", hora: "20:30-22:20", sala: "Sala não cadastrada", tipo: "aula" },
    { sem: 2, disc: "Banco de Dados", cod: "AL0327", prof: "Maicon B. da Silveira", dia: "Qua", hora: "18:30-22:20", sala: "Sala não cadastrada", tipo: "aula" },
    { sem: 2, disc: "Banco de Dados", cod: "AL0327", prof: "Maicon B. da Silveira", dia: "Qui", hora: "18:30-20:20", sala: "102 · Lab. Info. 5", tipo: "aula" },
    { sem: 2, disc: "Computação e Sociedade", cod: "", prof: "Ildevana P. Rodrigues", dia: "Qui", hora: "20:30-22:25", sala: "102 · Lab. Info. 5", tipo: "aula" },
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
  const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  // Documentos: cada arquivo abre uma página interna com a pré-visualização
  const DOCS = {};
  let docOrigem = null;
  function docPapel(rotulo, tipo) {
    return `
      <div class="doc-head"><span class="doc-tipo">${tipo}</span><span>${rotulo}</span></div>
      <div class="doc-papel" aria-hidden="true">
        <div class="doc-logo"></div>
        <span style="width:60%"></span><span style="width:40%"></span><br>
        <span></span><span></span><span style="width:85%"></span><span></span><span style="width:70%"></span><br>
        <span></span><span style="width:90%"></span><span></span><span style="width:55%"></span>
      </div>`;
  }
  function docA(rotulo, tipo) {
    const id = "documento-" + slug(rotulo).slice(0, 70);
    if (!DOCS[id]) DOCS[id] = { rotulo, tipo: tipo || "PDF", origem: docOrigem };
    return `<a href="#${id}"${tipo ? ` data-tipo="${tipo}"` : ""}>${rotulo}</a>`;
  }
  const doc = (rotulo, _pageId, tipo) => `<li>${docA(rotulo, tipo)}</li>`;


  // ---------------- Menu do SisBi (barra verde da aba Bibliotecas) ----------------
  // Itens conforme o menu do site do SisBi.
  // url     = item com página própria no protótipo (#sisbi-item-...); o endereço original fica só como referência
  // interno = página já existente no protótipo (#hash)
  const SB = "https://sites.unipampa.edu.br/sisbi/";
  const SISBI_MENU = [
    { id: "consulta", nome: "Consulta ao acervo | Renovações e Reservas", desc: "Consulte o acervo das bibliotecas, faça reservas e renove seus empréstimos no Pergamum.", itens: [
      { n: "Consulta ao acervo e Reservas", url: "https://unipampa.pergamum.com.br/" },
      { n: "Renovações", url: "https://unipampa.pergamum.com.br/login" },
    ]},
    { id: "pesquisa", nome: "Pesquisa", oficial: SB + "pesquisa/", desc: "Bases de dados, e-books e ferramentas de apoio à pesquisa acadêmica.", itens: [
      { n: "Bases de dados", sub: [
        { n: "Repositório Institucional", url: SB + "repositorio-digital/" },
        { n: "Publica-se", url: SB + "publica-se/" },
        { n: "Periódicos Capes", url: SB + "periodicos-capes/" },
        { n: "Portal Saúde Baseada em Evidências", url: SB + "portal-saude-baseada-em-evidencias/" },
        { n: "UpToDate – Informações de saúde", url: SB + "uptodate-informacoes-de-saude/" },
        { n: "E-books Springer", url: SB + "e-books-springer/" },
        { n: "E-books Minha Biblioteca", url: SB + "e-books-minha-biblioteca/" },
        { n: "Target GEDWeb", url: SB + "target-gedweb/" },
        { n: "Bases de Dados e Ebooks de Livre Acesso", url: SB + "bases-de-dados-de-livre-acesso/" },
      ]},
      { n: "Tesauros", url: SB + "tesauros/" },
      { n: "Gerenciadores de referências", url: SB + "gerenciadores-de-referencias-2/" },
      { n: "Identificadores de autores", url: SB + "identificadores-de-autores/" },
    ]},
    { id: "servicos", nome: "Serviços", desc: "Projetos culturais, guias e serviços oferecidos pelas bibliotecas da Unipampa.", itens: [
      { n: "Agenda: Ações culturais e educativas", url: SB + "agenda/" },
      { n: "Biblio E-Zine", url: SB + "biblio-e-zine/", sub: [
        { n: "Edição Histórica – inaugural", url: SB + "edicao-historica-inaugural/" },
      ]},
      { n: "Clube do Livro da Unipampa", url: SB + "clube-do-livro-da-unipampa-2/", sub: [
        { n: "Clube do Livro Unipampa 2026", url: SB + "clube-do-livro-unipampa-2026/" },
        { n: "Rodas de Leitura Contos", url: SB + "rodas-de-leitura-contos/" },
        { n: "Clube do Livro da Unipampa 2025", url: SB + "clube-do-livro-da-unipampa-2025/" },
        { n: "Conheça os Mediadores de 2025", url: SB + "conheca-mais-sobre-os-mediadores-do-clube-de-2025/" },
        { n: "Clube do Livro da Unipampa 2024", url: SB + "clube-do-livro-da-unipampa/" },
      ]},
      { n: "Biblioteca de Cria-ções", url: SB + "biblioteca-de-cria-coes/", sub: [
        { n: "Sobre o Projeto", url: SB + "biblioteca-de-cria-acoes/" },
        { n: "Agenda – Biblioteca de Cria-ações", url: SB + "agenda/" },
        { n: "Banco de talentos", url: SB + "quero-participar/" },
        { n: "Área do bibliotecário", url: SB + "area-do-bibliotecario/" },
      ]},
      { n: "Ludoteca Itinerante", url: SB + "ludoteca-itinerante/", sub: [
        { n: "Jogos da Ludoteca Itinerante", url: SB + "jogos-da-ludoteca-itinerante/" },
        { n: "Retirar Jogos", url: SB + "retirar-jogos/" },
      ]},
      { n: "Cinemateca Móvel SisBi", url: SB + "cinemateca-movel-sisbi/", sub: [
        { n: "Sessões do Cinemateca", url: SB + "sessoes-do-cinemateca/" },
      ]},
      { n: "Projeto EXPEDIÇÃO 360°", url: SB + "projeto-expedicao-360/" },
      { n: "Guia Visual de Trabalhos Acadêmicos", url: SB + "guia-visual-de-trabalhos-academicos/" },
      { n: "Guia do Usuário", url: SB + "files/2023/10/guia-do-usuario-sisbi-atualizado-em-06-10-2023.pdf" },
      { n: "Serviços oferecidos", url: SB + "servicos/" },
      { n: "Instruções para Normalização de Trabalhos Acadêmicos", url: SB + "normalizacao/" },
      { n: "Empréstimo Entre Bibliotecas", url: SB + "emprestimo-entre-bibliotecas/" },
      { n: "Manuais Configuração de Proxy", url: SB + "manuais-configuracao-de-proxy/" },
      { n: "ISBN / ISSN", url: SB + "isbn-issn/" },
      { n: "WIKIPAMPA", url: SB + "wikipampa/" },
    ]},
    { id: "editais", nome: "Editais", oficial: SB + "editais/", semMenu: true, anos: [
      { ano: "2023", itens: [
        { n: "Edital nº 279/2023 Edital de seleção de candidatos às bolsas para o atendimento das demandas do Portal Publica-se.", url: SB + "edital-no-279-2023-edital-de-selecao-de-candidatos-as-bolsas-para-atendimento-das-demandas-do-portal-publica-se/" },
        { n: "Edital nº 03, de 29 de junho de 2023 Eleição para representantes para o Conselho Coordenador de Bibliotecas da Universidade Federal do Pampa", url: SB + "edital-no-03-de-29-de-junho-de-2023-eleicao-para-representantes-para-o-conselho-coordenador-de-bibliotecas-da-universidade-federal-do-pampa/" },
      ]},
    ]},
    { id: "regimentos", nome: "Regimentos e normas", desc: "Regras de empréstimo, regimento e políticas do Sistema de Bibliotecas.", itens: [
      { n: "Normas de circulação do acervo", url: SB + "normas-de-circulacao-do-acervo/" },
      { n: "Regimento geral", url: SB + "regimento-geral/" },
      { n: "Planos de contingência", url: SB + "planos-de-contingencia/" },
      { n: "Política de Desenvolvimento de Coleções – PDC", url: SB + "politica-de-desenvolvimento-de-colecoes-pdc/", sub: [
        { n: "Doação de Livros", url: SB + "doacao-de-livros/" },
      ]},
      { n: "Programa de regularização de multas nas Bibliotecas da UNIPAMPA", url: SB + "programa_de_regularizacao_de_multas/" },
    ]},
    { id: "sisbi", nome: "SisBi", oficial: SB + "sisbi/", desc: "Sobre o Sistema de Bibliotecas da Unipampa e suas unidades.", itens: [
      { n: "Perguntas frequentes", url: SB + "perguntas-frequentes-2/" },
      { n: "SisBi", url: SB + "sisbi/" },
      { n: "Unidades", sub: [
        { n: "Sistema de bibliotecas", url: SB + "sisbi-2/" },
        { n: "Bibliotecas", interno: "bibliotecas" },
      ]},
    ]},
    { id: "acessibilidade", nome: "Acessibilidade", oficial: SB + "acessibilidade/", desc: "Acervo e serviços acessíveis das bibliotecas.", itens: [
      { n: "Coleções e Serviços Acessíveis", url: SB + "colecoes-e-servicos-acessiveis/" },
    ]},
  ];

  // Todo item abre uma página interna do protótipo
  const sbPagina = (it) => it.interno || "sisbi-item-" + slug(it.n).slice(0, 60);
  const sbHref = (it) => `href="#${sbPagina(it)}"`;
  const sbSeta = () => "";

  function sbItensMenu(itens, nivel) {
    return itens.map((it) => {
      const rotulo = it.url || it.interno
        ? `<a ${sbHref(it)}>${it.n}${sbSeta(it)}</a>`
        : `<span class="sb-grupo-rotulo">${it.n}</span>`;
      const sub = it.sub ? `<ul class="sb-sub">${sbItensMenu(it.sub, nivel + 1)}</ul>` : "";
      return `<li class="${it.sub ? "sb-tem-sub" : ""}">${rotulo}${sub}</li>`;
    }).join("");
  }

  const SISBI_BAR = `
    <nav class="sisbi-bar" aria-label="Menu do Sistema de Bibliotecas (SisBi)">
      ${SISBI_MENU.map((s) => `
        <div class="sb-item">
          <a href="#sisbi-${s.id}" class="sb-link">${s.nome}</a>${s.semMenu ? "" : `<button type="button" class="sb-toggle" aria-expanded="false" aria-controls="sb-dd-${s.id}" aria-label="Abrir submenu ${s.nome}">▾</button>
          <ul class="sb-dd" id="sb-dd-${s.id}">${sbItensMenu(s.itens, 0)}</ul>`}
        </div>`).join("")}
    </nav>`;

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
      <p>Acesse o PPC Engenharia de Software vigente aqui: ${docA("PPC Engenharia Software .pdf (3.57 MB)")}</p>
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
          <li>${docA("PPC-Engenharia de Software_Alegrete.pdf (1.51 MB)")}</li>
          <li>${docA("PPC-ES-2015.pdf (1.87 MB)")}</li>
          <li>${docA("PPC Engenharia de Software_Alegrete.pdf (1.62 MB)")}</li>
          <li>${docA("PPC_Engenharia de Software_Alegrete.pdf (2.03 MB)")}</li>
          <li>${docA("PPC Engenharia de Software_Alegrete.pdf (1.55 MB)")}</li>
          <li>${docA("PPC Engenharia de Software_Alegrete (2.5 MB)")}</li>
          <li>${docA("PPC Engenharia de Software_Alegrete (3.5 MB)")}</li>
          <li>${docA("PPC.Engenharia de Software_Alegretepdf (3.47 MB)")}</li>
        </ul>
      </div>
      <dl class="box citation">
        <dt style="margin-top:0">Citation</dt>
        <dd>UNIVERSIDADE FEDERAL DO PAMPA, PPC Alegrete - Engenharia de Software, Unipampa - Campus Alegrete,130p., 2012.</dd>
        <dt>URI</dt>
        <dd class="blue">https://repositorio.unipampa.edu.br/handle/riu/100</dd>
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

  // Estado dos filtros da página de horários (mantido entre visitas, como os filtros de docentes)
  const hf = { tipo: "aula", sem: "todos", dia: "todos", q: "" };
  const HOR_SEMESTRES = [["todos", "Todos"], ["2", "2º"], ["4", "4º"], ["6", "6º"], ["8", "8º"], ["sem", "Sem período ideal"]];
  const HOR_DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const semAcentoH = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const horPill = (grupo, valor, rotulo, atual) =>
    `<button type="button" class="hor-pill${valor === atual ? " on" : ""}" data-hor="${grupo}" data-valor="${valor}" aria-pressed="${valor === atual}">${rotulo}</button>`;

  PAGES["horarios"] = { tab: "horarios", titulo: "Horários de 2026/2", html: () => `
    <div class="horarios">
      <h2 class="page-title">Horários de 2026/2</h2>
      <p class="hor-sub">Engenharia de Software, UNIPAMPA. Oferta do 2º semestre de 2026.</p>
      <div class="hor-filtros">
        <div class="hor-grupo" role="group" aria-labelledby="hor-l-mostrar">
          <span id="hor-l-mostrar" class="hor-label">Mostrar</span>
          <div class="hor-toggle">${horPill("tipo", "aula", "Aulas", hf.tipo)}${horPill("tipo", "atendimento", "Atendimento ao aluno", hf.tipo)}</div>
        </div>
        <div class="hor-grupo" role="group" aria-labelledby="hor-l-sem">
          <span id="hor-l-sem" class="hor-label">Semestre</span>
          <div class="hor-pills">${HOR_SEMESTRES.map(([v, r]) => horPill("sem", v, r, hf.sem)).join("")}</div>
        </div>
        <div class="hor-grupo" role="group" aria-labelledby="hor-l-dia">
          <span id="hor-l-dia" class="hor-label">Dia</span>
          <div class="hor-pills">${horPill("dia", "todos", "Todos", hf.dia)}${HOR_DIAS.map((d) => horPill("dia", d, d, hf.dia)).join("")}</div>
        </div>
        <div class="hor-grupo">
          <label for="hor-busca" class="hor-label">Buscar disciplina ou professor</label>
          <input id="hor-busca" type="search" placeholder="Ex.: Banco de Dados, Schepke" value="${esc(hf.q)}">
        </div>
      </div>
      <p class="hor-aviso" role="note"><b>Dados parciais:</b> a captura de origem (<code>img/horarios.png</code>) exibia ${HORARIOS_TOTAL_ORIGEM} resultados, mas só as primeiras ${HORARIOS.length} linhas estavam visíveis. As demais aulas e os horários de atendimento ao aluno precisam ser completados a partir da oferta oficial (GURI).</p>
      <p id="hor-contagem" class="hor-contagem" aria-live="polite"></p>
      <div class="table-scroll">
        <table class="hor-tabela">
          <caption class="sr-only">Horários de 2026/2: disciplina, professor(es), dia, horário e sala</caption>
          <thead><tr><th scope="col">Disciplina</th><th scope="col">Professor(es)</th><th scope="col">Dia</th><th scope="col">Horário</th><th scope="col">Sala</th></tr></thead>
          <tbody id="hor-body"></tbody>
        </table>
      </div>
    </div>`,
    after: () => {
      const pag = $(".horarios");
      pag.addEventListener("click", (e) => {
        const b = e.target.closest("[data-hor]");
        if (!b) return;
        hf[b.dataset.hor] = b.dataset.valor;
        b.parentElement.querySelectorAll("[data-hor]").forEach((x) => {
          x.classList.toggle("on", x === b);
          x.setAttribute("aria-pressed", String(x === b));
        });
        renderHorarios();
      });
      $("#hor-busca").addEventListener("input", (e) => { hf.q = e.target.value; renderHorarios(); });
      renderHorarios();
    },
    // a tabela é preenchida depois (renderHorarios), então a busca do site recebe os dados à parte
    busca: () => HORARIOS.map((h) => [h.disc, h.cod, h.prof, h.dia, h.hora, h.sala].join(" ")).join(" "),
  };

  function renderHorarios() {
    const body = $("#hor-body");
    if (!body) return;
    const q = semAcentoH(hf.q.trim());
    const lista = HORARIOS.filter((h) =>
      h.tipo === hf.tipo &&
      (hf.sem === "todos" || (hf.sem === "sem" ? h.sem === null : String(h.sem) === hf.sem)) &&
      (hf.dia === "todos" || h.dia === hf.dia) &&
      (!q || semAcentoH(`${h.disc} ${h.cod} ${h.prof}`).includes(q)));
    $("#hor-contagem").textContent = `${lista.length} resultado${lista.length === 1 ? "" : "s"}`;
    if (!lista.length) {
      body.innerHTML = `<tr class="empty-row"><td colspan="5">Nenhum horário encontrado com esses filtros${hf.tipo === "atendimento" ? " (os horários de atendimento não constavam na captura de origem)" : ""}.</td></tr>`;
      return;
    }
    // Agrupa por semestre ideal e só repete nome/professor quando muda a disciplina (como na tela original)
    const grupos = new Map();
    lista.forEach((h) => {
      const k = h.sem === null ? "sem" : h.sem;
      if (!grupos.has(k)) grupos.set(k, []);
      grupos.get(k).push(h);
    });
    let html = "";
    [...grupos.keys()].sort((a, b) => (a === "sem") - (b === "sem") || a - b).forEach((k) => {
      const itens = grupos.get(k);
      const nome = k === "sem" ? "Sem período ideal" : `${k}º semestre`;
      html += `<tr class="hor-grupo-linha"><th colspan="5" scope="rowgroup">${nome} <span>${itens.length} horário${itens.length === 1 ? "" : "s"}</span></th></tr>`;
      let anterior = null;
      itens.forEach((h) => {
        const nova = !anterior || anterior.disc !== h.disc;
        html += `<tr>
          <td>${nova ? `<b>${esc(h.disc)}</b>` : `<span class="sr-only">${esc(h.disc)}</span>`}${h.cod ? `<small>${esc(h.cod)}</small>` : ""}</td>
          <td>${nova ? esc(h.prof) : ""}</td>
          <td>${esc(h.dia)}</td>
          <td class="nowrap mono">${esc(h.hora)}</td>
          <td>${esc(h.sala)}</td>
        </tr>`;
        anterior = h;
      });
    });
    body.innerHTML = html;
  }

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
      ? lista.map(([n, e, l]) => `<tr><td><a href="#docente-${slug(n)}">${esc(n)}</a></td><td>${esc(e)}</td><td><a href="#docente-${slug(n)}">${esc(l)}</a></td></tr>`).join("")
      : `<tr class="empty-row"><td colspan="3">Nenhum docente encontrado com esse filtro.</td></tr>`;
  }

  // Perfil de cada docente (dentro do protótipo)
  DOCENTES.forEach(([n, e, l]) => {
    PAGES["docente-" + slug(n)] = { tab: "docentes", pai: "docentes", lateral: "docentes", titulo: n, html: () => `
      ${back("docentes", "Docentes")}
      <h2 class="page-title light">${esc(n)}</h2>
      <div class="texto">
        <table class="tabela-simples">
          <tbody>
            <tr><th>E-mail institucional</th><td>${esc(e)}</td></tr>
            <tr><th>Currículo Lattes</th><td>${esc(l)}</td></tr>
            <tr><th>Campus</th><td>Alegrete</td></tr>
          </tbody>
        </table>
        <p>Para falar com a coordenação do curso, use a página de <a href="#contato">Contato</a>.</p>
      </div>`
    };
  });

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
      <p class="proj-total">${p.lista.length} projeto${p.lista.length === 1 ? "" : "s"}</p>
      <div class="table-scroll">
        <table class="projetos-tabela">
          <caption class="sr-only">Projetos de ${p.nome}: projeto, registro, coordenador e período</caption>
          <thead><tr><th scope="col">Projeto</th><th scope="col">Registro</th><th scope="col">Coordenador</th><th scope="col">Período</th></tr></thead>
          <tbody>
            ${p.lista.map(([nome, reg, coord, per]) => `<tr><td>${esc(nome)}</td><td class="nowrap">${esc(reg)}</td><td>${esc(coord)}</td><td class="nowrap">${esc(per)}</td></tr>`).join("")}
          </tbody>
        </table>
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
        <p class="posts" style="margin-top:14px"><a href="#sisbi-sisbi">Conheça o Sistema de Bibliotecas (SisBi)</a></p>
      </div>
      <img src="img/sisbi-logos-2.png" alt="Publica-se, Portal SBE, Bases de Livre Acesso e a revista do SisBi" width="336" height="803">
    </div>`
  };


  // ---------------- Páginas do menu do SisBi ----------------
  function sbBotao(it) {
    return `<a class="big-btn small-text sb-btn" ${sbHref(it)}>${it.n}${sbSeta(it)}</a>`;
  }
  SISBI_MENU.forEach((s) => {
    PAGES["sisbi-" + s.id] = { tab: "bibliotecas", pai: "bibliotecas", titulo: s.nome, html: () => {
      let corpo;
      if (s.anos) {
        corpo = s.anos.map((a) => `
          <h3 class="sb-ano">${a.ano}</h3>
          <ul class="sb-editais">${a.itens.map((it) => `<li><a ${sbHref(it)}>${it.n}${sbSeta(it)}</a></li>`).join("")}</ul>`).join("");
      } else {
        const simples = s.itens.filter((it) => !it.sub);
        const grupos = s.itens.filter((it) => it.sub);
        corpo = `
          ${simples.length ? `<div class="sb-btns">${simples.map(sbBotao).join("")}</div>` : ""}
          ${grupos.map((g) => `
            <section class="sb-secao">
              <h3>${g.url || g.interno ? `<a ${sbHref(g)}>${g.n}${sbSeta(g)}</a>` : g.n}</h3>
              <div class="sb-btns">${g.sub.map(sbBotao).join("")}</div>
            </section>`).join("")}`;
      }
      return `
        ${SISBI_BAR}
        ${back("bibliotecas", "Bibliotecas")}
        <h2 class="page-title light">${s.nome}</h2>
        ${s.desc ? `<p class="sb-intro">${s.desc}</p>` : ""}
        ${corpo}`;
    }};
  });


  // ---------------- Páginas internas de cada item do SisBi ----------------
  // Tudo fica dentro do protótipo: cada item do menu do SisBi abre uma página própria.

  const SB_DESC = {
    "Consulta ao acervo e Reservas": "Pesquise livros, periódicos e outros materiais das bibliotecas da Unipampa e reserve um exemplar que esteja emprestado.",
    "Renovações": "Renove os materiais que estão emprestados com você, sem precisar ir até a biblioteca, desde que não haja reserva nem atraso.",
    "Repositório Institucional": "Reúne a produção acadêmica da Unipampa, como TCCs, dissertações, artigos e documentos institucionais, com acesso aberto.",
    "Publica-se": "Portal de periódicos da Unipampa, onde ficam as revistas científicas editadas pela universidade.",
    "Periódicos Capes": "Acesso ao Portal de Periódicos da CAPES, com artigos científicos, bases de dados e e-books para a comunidade acadêmica.",
    "Portal Saúde Baseada em Evidências": "Bases de dados e ferramentas da área da saúde para apoiar decisões baseadas em evidências científicas.",
    "UpToDate – Informações de saúde": "Base de informações clínicas atualizadas, voltada aos cursos da área da saúde.",
    "E-books Springer": "Coleção de livros eletrônicos da editora Springer disponíveis para a comunidade da Unipampa.",
    "E-books Minha Biblioteca": "Plataforma de livros eletrônicos técnicos e acadêmicos em português, acessível com o login institucional.",
    "Target GEDWeb": "Acesso a normas técnicas (como as da ABNT) para consulta pela comunidade acadêmica.",
    "Bases de Dados e Ebooks de Livre Acesso": "Lista de bases de dados e livros eletrônicos gratuitos, que podem ser usados sem login.",
    "Tesauros": "Vocabulários controlados que ajudam a escolher os termos certos para pesquisar e indexar assuntos.",
    "Gerenciadores de referências": "Ferramentas que organizam suas referências bibliográficas e geram citações no formato ABNT.",
    "Identificadores de autores": "Identificadores como ORCID e Lattes, que ligam o pesquisador à sua produção científica.",
    "Agenda: Ações culturais e educativas": "Calendário das ações culturais e educativas promovidas pelas bibliotecas.",
    "Biblio E-Zine": "Revista digital do SisBi, com notícias, dicas de leitura e conteúdos sobre as bibliotecas.",
    "Edição Histórica – inaugural": "Primeira edição da revista Biblio E-Zine.",
    "Clube do Livro da Unipampa": "Encontros de leitura e conversa sobre livros, abertos à comunidade acadêmica.",
    "Clube do Livro Unipampa 2026": "Programação e livros escolhidos para o Clube do Livro em 2026.",
    "Rodas de Leitura Contos": "Encontros do Clube do Livro dedicados à leitura de contos.",
    "Clube do Livro da Unipampa 2025": "Programação e livros do Clube do Livro em 2025.",
    "Conheça os Mediadores de 2025": "Apresentação das pessoas que conduziram os encontros do Clube do Livro em 2025.",
    "Clube do Livro da Unipampa 2024": "Programação e livros do Clube do Livro em 2024.",
    "Biblioteca de Cria-ções": "Projeto que transforma a biblioteca em espaço de criação, com oficinas e atividades culturais.",
    "Sobre o Projeto": "Objetivos e funcionamento do projeto Biblioteca de Cria-ações.",
    "Agenda – Biblioteca de Cria-ações": "Datas das oficinas e atividades da Biblioteca de Cria-ações.",
    "Banco de talentos": "Cadastro para quem quer participar das atividades da Biblioteca de Cria-ações compartilhando um talento.",
    "Área do bibliotecário": "Materiais de apoio para os bibliotecários que organizam as atividades do projeto.",
    "Ludoteca Itinerante": "Acervo de jogos que circula entre os campi para uso em atividades de lazer e aprendizagem.",
    "Jogos da Ludoteca Itinerante": "Lista dos jogos disponíveis na Ludoteca Itinerante.",
    "Retirar Jogos": "Como pegar jogos emprestados da Ludoteca Itinerante.",
    "Cinemateca Móvel SisBi": "Projeto de sessões de cinema seguidas de conversa, realizadas nos campi.",
    "Sessões do Cinemateca": "Programação das sessões da Cinemateca Móvel.",
    "Projeto EXPEDIÇÃO 360°": "Projeto do SisBi com visitas e atividades de exploração dos espaços das bibliotecas.",
    "Guia Visual de Trabalhos Acadêmicos": "Guia ilustrado para formatar trabalhos acadêmicos conforme as normas.",
    "Guia do Usuário": "Manual com as regras e os serviços das bibliotecas para quem usa o SisBi.",
    "Serviços oferecidos": "Lista dos serviços das bibliotecas, como empréstimo, renovação, reserva, orientação e ficha catalográfica.",
    "Instruções para Normalização de Trabalhos Acadêmicos": "Orientações para aplicar as normas da ABNT em TCCs, relatórios e artigos.",
    "Empréstimo Entre Bibliotecas": "Permite pedir um material de outro campus para retirar na biblioteca do seu campus.",
    "Manuais Configuração de Proxy": "Passo a passo para acessar as bases de dados assinadas fora da rede da universidade.",
    "ISBN / ISSN": "Orientações para solicitar ISBN (livros) e ISSN (periódicos) para publicações da Unipampa.",
    "WIKIPAMPA": "Projeto de criação e melhoria de verbetes na Wikipédia com a comunidade acadêmica.",
    "Normas de circulação do acervo": "Regras de empréstimo, prazos, renovação, reserva e multas das bibliotecas.",
    "Regimento geral": "Documento que define a organização e o funcionamento do Sistema de Bibliotecas.",
    "Planos de contingência": "Procedimentos das bibliotecas para situações de emergência ou interrupção dos serviços.",
    "Política de Desenvolvimento de Coleções – PDC": "Critérios para compra, doação, avaliação e descarte de materiais do acervo.",
    "Doação de Livros": "Como doar livros para as bibliotecas e quais materiais são aceitos.",
    "Programa de regularização de multas nas Bibliotecas da UNIPAMPA": "Condições para quitar ou regularizar multas por atraso na devolução.",
    "Perguntas frequentes": "Respostas para as dúvidas mais comuns sobre o uso das bibliotecas.",
    "SisBi": "Apresentação do Sistema de Bibliotecas da Unipampa, sua missão e sua estrutura.",
    "Sistema de bibliotecas": "Como as bibliotecas dos dez campi trabalham juntas no SisBi.",
    "Coleções e Serviços Acessíveis": "Materiais e serviços acessíveis, como livros em formatos alternativos e apoio a pessoas com deficiência.",
  };

  // Percorre o menu e cria uma página por item (inclusive subitens e editais)
  const SB_ITENS = [];
  function sbRegistrar(itens, secao, grupo) {
    itens.forEach((it) => {
      if (it.url) {
        it.pagina = sbPagina(it);
        SB_ITENS.push({ it, secao, grupo });
      }
      if (it.sub) sbRegistrar(it.sub, secao, it);
    });
  }
  SISBI_MENU.forEach((s) => {
    if (s.itens) sbRegistrar(s.itens, s, null);
    if (s.anos) s.anos.forEach((a) => a.itens.forEach((it) => {
      it.pagina = sbPagina(it);
      it.ano = a.ano;
      SB_ITENS.push({ it, secao: s, grupo: null });
    }));
  });

  function sbConteudoEspecial(it) {
    if (it.n === "Consulta ao acervo e Reservas") return `
      <form class="sb-form" id="form-acervo" novalidate>
        <label for="acervo-termo">Buscar no acervo</label>
        <div class="sb-form-linha">
          <input id="acervo-termo" type="text" placeholder="Título, autor ou assunto">
          <select id="acervo-campus" aria-label="Biblioteca">
            <option>Todas as bibliotecas</option>
            ${BIBLIOTECAS.map((b) => `<option>${b.nome}</option>`).join("")}
          </select>
          <button type="submit" class="btn-buscar-acervo">Buscar</button>
        </div>
        <p class="form-status" id="acervo-status" role="status"></p>
      </form>`;
    if (it.n === "Renovações") return `
      <ol class="sb-passos">
        <li>Entre na consulta ao acervo com sua matrícula.</li>
        <li>Abra <b>Meus empréstimos</b> e marque os materiais.</li>
        <li>Clique em <b>Renovar</b>. Não é possível renovar material reservado ou em atraso.</li>
      </ol>
      <p><a href="#sisbi-item-consulta-ao-acervo-e-reservas">Ir para a consulta ao acervo</a></p>`;
    return "";
  }

  SB_ITENS.forEach(({ it, secao, grupo }) => {
    const desc = it.ano
      ? `Edital publicado pelo Sistema de Bibliotecas em ${it.ano}.`
      : SB_DESC[it.n] || "Informações sobre este serviço do Sistema de Bibliotecas.";
    PAGES[it.pagina] = { tab: "bibliotecas", pai: "sisbi-" + secao.id, lateral: null, titulo: it.n.length > 70 ? it.n.slice(0, 67) + "…" : it.n, html: () => `
      ${SISBI_BAR}
      ${back("sisbi-" + secao.id, secao.nome)}
      ${grupo ? `<p class="sb-grupo-trilha">${secao.nome} › ${grupo.pagina ? `<a href="#${grupo.pagina}">${grupo.n}</a>` : grupo.n}</p>` : ""}
      <h2 class="page-title light">${it.n}</h2>
      <p class="sb-intro">${desc}</p>
      ${sbConteudoEspecial(it)}
      ${it.sub ? `<div class="sb-btns">${it.sub.map(sbBotao).join("")}</div>` : ""}
      ${it.ano ? `<div class="doc-view">${docPapel(it.n, "EDITAL")}</div>` : ""}`,
      after: it.n === "Consulta ao acervo e Reservas" ? () => {
        $("#form-acervo").addEventListener("submit", (e) => {
          e.preventDefault();
          const termo = $("#acervo-termo").value.trim();
          const st = $("#acervo-status");
          st.className = "form-status " + (termo ? "ok" : "err");
          st.textContent = termo
            ? `Busca por “${termo}” em ${$("#acervo-campus").value} registrada (protótipo: o acervo não está carregado).`
            : "Digite um título, autor ou assunto para buscar.";
        });
      } : null,
    };
  });

  // =====================================================
  // Páginas trazidas do site oficial (v2)
  // =====================================================

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
        <span>Página 1 de 1</span>
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
        <p class="nota">Texto resumido para o protótipo.</p>
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
    <h3>Vídeo de apresentação</h3>
    <div class="video-ph" role="img" aria-label="Espaço para o vídeo de apresentação do curso"><span>▶</span>Vídeo de apresentação do curso</div>`;

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
      <p>Para falar com a representação discente, use a página de <a href="#contato">Contato</a>.</p>
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
      ${grupo("Sistema de Bibliotecas (SisBi)", SISBI_MENU.map((m) => "sisbi-" + m.id))}
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

  // Menu do SisBi: abre/fecha os submenus pelo botão ▾ (mouse e teclado também abrem por hover/foco)
  function fecharMenusSisbi(exceto) {
    document.querySelectorAll(".sb-item.open").forEach((it) => {
      if (it === exceto) return;
      it.classList.remove("open");
      const b = it.querySelector(".sb-toggle");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest(".sb-toggle");
    if (t) {
      const item = t.closest(".sb-item");
      const abrir = !item.classList.contains("open");
      fecharMenusSisbi(item);
      item.classList.toggle("open", abrir);
      t.setAttribute("aria-expanded", String(abrir));
      return;
    }
    if (!e.target.closest(".sb-dd")) fecharMenusSisbi(null);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.querySelector(".sb-item.open")) {
      const aberto = document.querySelector(".sb-item.open .sb-toggle");
      fecharMenusSisbi(null);
      if (aberto) aberto.focus();
    }
  });

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
    tmp.querySelectorAll(".sisbi-bar").forEach((el) => el.remove()); // o menu do SisBi se repete em várias páginas
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

  // Registra os documentos citados nas páginas e cria uma página para cada um
  Object.keys(PAGES).forEach((id) => {
    docOrigem = id;
    try { PAGES[id].html(); } catch (e) { /* páginas que dependem do DOM são ignoradas aqui */ }
  });
  docOrigem = null;
  Object.entries(DOCS).forEach(([id, d]) => {
    const origem = d.origem && PAGES[d.origem] ? d.origem : null;
    PAGES[id] = { tab: origem ? PAGES[origem].tab : null, pai: origem, lateral: origem, titulo: d.rotulo, html: () => `
      ${origem ? back(origem, PAGES[origem].titulo) : ""}
      <h2 class="page-title light">${d.rotulo}</h2>
      <div class="doc-view">${docPapel(d.rotulo, d.tipo)}</div>
      <p class="nota">Pré-visualização ilustrativa: o arquivo original não faz parte do protótipo.</p>`
    };
  });

  render();
}