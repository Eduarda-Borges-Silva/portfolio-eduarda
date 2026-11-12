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

1. Crie ou escolha um repositório no GitHub e clone-o.
2. Copie o conteúdo desta pasta para a raiz do repositório.
3. Revise os dados pessoais e os links, depois execute `npm install`, `npm run build` e `npm run lint`.
4. Faça commit e envie para a branch principal.

Nenhum endereço remoto de Git foi incluído: o repositório de destino ainda precisa ser escolhido.

## Vercel

Importe o repositório escolhido na Vercel. A configuração esperada é:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

`vercel.json` inclui o fallback da SPA e cabeçalhos básicos de segurança e cache. O domínio e as URLs de SEO devem ser preenchidos depois que o projeto e o domínio forem definidos. Nada foi publicado.


