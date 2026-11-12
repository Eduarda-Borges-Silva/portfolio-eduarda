# Portfólio — Eduarda Borges

Site profissional de página única para Eduarda Borges, Desenvolvedora Full Stack. Feito com React, TypeScript, Vite, Tailwind CSS e Framer Motion, com tema escuro azul e roxo, alternativa clara e layout responsivo.

## Requisitos

- Node.js 20.19 ou superior, ou 22.12 ou superior
- npm

## Executar localmente

```bash
npm install
npm run dev
```

## Comandos

- `npm run dev`: inicia o site localmente
- `npm run check`: verifica os tipos do TypeScript
- `npm run build`: verifica os tipos e gera os arquivos de produção em `dist`
- `npm run preview`: abre a versão de produção localmente

## Conteúdo

Atualize os dados em `src/data/`:

- `personal.ts`: apresentação e links de contato
- `projects.ts`: projetos apresentados
- `skills.ts`: tecnologias por categoria
- `experiences.ts`: experiência profissional
- `education.ts` e `courses.ts`: formação, cursos e idiomas

Os projetos refletem as informações documentadas nos repositórios. O AniData apresenta as versões web e mobile descritas no [README do projeto](https://github.com/Eduarda-Borges-Silva/AniData).

## Arquivos opcionais

O ZIP original não incluía foto nem currículo. O portfólio não depende desses arquivos e não mostra um botão de download sem um currículo disponível. Se quiser incluir esses recursos futuramente, adicione os arquivos em `public/` e atualize a página com os caminhos corretos.

## Formulário de contato

O formulário já está conectado ao Formspree no projeto. O formulário criado chama-se **Contato do Portfólio**.

1. O formulário já foi criado no Formspree; não crie outro.
2. O endpoint configurado é `https://formspree.io/f/mdegolkv`.
3. Para desenvolvimento local, copie `.env.example` para `.env.local`; o endpoint já está preenchido.
4. Na Vercel, adicione `VITE_FORMSPREE_ENDPOINT` com o mesmo endpoint nas variáveis do projeto e publique novamente.

O honeypot `_gotcha` ajuda a filtrar envios automatizados. Até a variável de ambiente ser configurada na Vercel, o site publicado informa que o envio direto ainda não está ativo.

## GitHub

O código está publicado em [Eduarda-Borges-Silva/portfolio-eduarda](https://github.com/Eduarda-Borges-Silva/portfolio-eduarda), na branch `main`. O arquivo `.env.local` é ignorado pelo Git; use `.env.example` como base para a configuração local.

## Vercel

Importe o repositório `Eduarda-Borges-Silva/portfolio-eduarda` na Vercel. A configuração esperada é:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Na Vercel, configure a variável `VITE_FORMSPREE_ENDPOINT` com o endpoint do formulário antes do deploy de produção. `vercel.json` inclui o fallback da SPA e cabeçalhos básicos de segurança e cache. Configure um domínio próprio quando desejar; a URL padrão da Vercel funciona sem isso.


