import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    title: "AniData",
    summary: "Plataforma web e mobile para descobrir animes e manter favoritos sincronizados.",
    description: "Aplicação em React e Flutter para buscar animes, explorar tendências e temporadas, consultar detalhes e salvar favoritos. Os dados de catálogo vêm da API GraphQL do AniList e os favoritos são sincronizados pelo Firebase Firestore.",
    objective: "Reunir descoberta, consulta e curadoria de animes em experiências web e mobile.",
    problem: "Organizar a busca e o acompanhamento de animes com acesso consistente em diferentes dispositivos.",
    technicalHighlight: "Integração da API GraphQL do AniList com autenticação Firebase e favoritos persistidos no Firestore, em versões React e Flutter.",
    technologies: ["React 18", "Vite", "React Router", "Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "AniList GraphQL"],
    image: "/anidata-cover.png",
    githubUrl: "https://github.com/Eduarda-Borges-Silva/AniData",
    status: "Concluído",
    featured: true,
    category: "Web + mobile",
    highlights: ["Busca, tendências e temporadas", "Detalhes e favoritos de animes", "Favoritos sincronizados na nuvem", "Versões React e Flutter"],
    documentationStatus: "README com arquitetura e instruções de execução"
  },
  {
    id: 2,
    title: "Neuroverse Hackathon 2025",
    summary: "Aplicação para reunir chat, autorização de exames e agendamento em uma única experiência.",
    description: "Projeto em Streamlit com chat unificado, autorização de exames via OCR e SQLite, rol de procedimentos carregado por planilha, agendamento com bloqueio automático de horários e integração opcional com Google Calendar.",
    objective: "Centralizar fluxos de atendimento, análise de documentos e organização de consultas.",
    problem: "Reduzir a fragmentação entre chat, autorização de exames, consulta a procedimentos e agendamento.",
    technicalHighlight: "Integração de OCR, banco SQLite e múltiplos provedores de linguagem em uma aplicação Streamlit.",
    technologies: ["Python 3.12", "Streamlit", "SQLite", "Tesseract OCR", "Google Calendar"],
    image: "/neuroverse-cover.png",
    githubUrl: "https://github.com/Eduarda-Borges-Silva/Neuroverse-Hackathon-2025",
    status: "Concluído",
    featured: true,
    category: "Dados + automação",
    highlights: ["Chat unificado", "Autorização de exames via OCR", "Agendamento com bloqueio de horários", "Integração opcional com Google Calendar"]
  },
  {
    id: 3,
    title: "MentorIA",
    summary: "Plataforma de estudos com geração inteligente de flashcards e chat contextual com documentos.",
    description: "Aplicação Full Stack com frontend React e backend Node/Express. Permite gerar flashcards a partir de texto, PDF, CSV, TXT, URLs e YouTube, conversar com documentos, organizar coleções e configurar o contexto do assistente.",
    objective: "Acelerar a organização de estudos e transformar conteúdos em materiais de revisão reutilizáveis.",
    problem: "Diminuir o esforço manual de criação de flashcards e facilitar a consulta contextual a documentos.",
    technicalHighlight: "Arquitetura React + API REST + MongoDB, autenticação JWT, upload de arquivos, validação Joi e controles de segurança com Helmet e rate limiting.",
    technologies: ["React 18", "Vite", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Joi"],
    image: "/mentoria-cover.png",
    githubUrl: "https://github.com/Eduarda-Borges-Silva/MentorIA",
    status: "Concluído",
    featured: true,
    category: "Web + inteligência artificial",
    highlights: ["Flashcards a partir de texto e documentos", "Chat contextual com documentos", "Coleções de estudo", "Autenticação e perfil", "Configuração de contexto do agente"]
  },
  {
    id: 4,
    title: "ConectaPCD",
    summary: "Plataforma que conecta empresas e candidatos PCD por vagas inclusivas e critérios de acessibilidade.",
    description: "Aplicação Full Stack com perfis para candidatos, empresas e administração. Inclui busca de vagas, upload de currículo e laudo, dashboards, chat, recursos assistivos e um sistema de compatibilidade entre candidatos e oportunidades.",
    objective: "Facilitar a inclusão de Pessoas com Deficiência no mercado de trabalho e tornar vagas acessíveis mais visíveis.",
    problem: "Aproximar empresas com dificuldade de encontrar candidatos PCD e profissionais que buscam oportunidades compatíveis com suas necessidades de acessibilidade.",
    technicalHighlight: "Smart Match que considera tipo de deficiência, acessibilidades oferecidas e recursos assistivos, apoiado por API documentada com Swagger.",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express 5", "Prisma", "PostgreSQL", "JWT", "Swagger"],
    image: "/conectapcd-cover.png",
    githubUrl: "https://github.com/Eduarda-Borges-Silva/ConectaPCD",
    status: "Concluído",
    featured: true,
    category: "Web + acessibilidade",
    highlights: ["Perfis de candidatos e empresas", "Busca de vagas inclusivas", "Smart Match por acessibilidade", "Upload de currículo e laudo", "Dashboards por nível de acesso"]
  }
];
