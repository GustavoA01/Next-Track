# 🎵 Next Track

![Project Status](https://img.shields.io/badge/status-concluído-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12-orange?style=flat-square&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwindcss)

> **Next Track** é uma aplicação web que utiliza Inteligência Artificial Generativa para criar recomendações musicais personalizadas baseadas em playlists salvas pelo usuário no Spotify, fugindo da repetição dos algoritmos convencionais.

---

## 📱 Demonstração

_Veja o projeto rodando em tempo real._

https://github.com/user-attachments/assets/2afa0066-0e8b-4b83-81ee-8015c6a5d084

**Demonstração completa no YouTube:** https://youtu.be/2Qgd_q-ggZY

**🔗 Link do site:** https://next-track-gustavo.vercel.app/

---

## ⚠️ Nota sobre o Acesso

Devido às políticas da API do Spotify criadas em 2025, apenas grandes organizações podem permitir acesso de qualquer usuário ao site. Aplicações em modo de desenvolvimento possuem limite de usuários cadastrados manualmente.

**Para testar a aplicação:**

1. Entre em contato para eu adicionar seu e-mail à lista de emails autorizados.
2. Ou clone o repositório e rode localmente com suas próprias credenciais (instruções abaixo).

---

## 💡 Sobre o Projeto

Ao observar a repetição e falha do algoritmo do Spotify em recomendar músicas variadas que agradam o usuário, o **Next Track** resolve isso integrando a API do Spotify com a IA do Google (Gemini).

O usuário conversa com a IA pedindo recomendações baseadas em sentimentos, situações ou gêneros abstratos, por exemplo: _"Músicas para programar em um dia chuvoso"_, e a aplicação não apenas sugere as faixas, mas permite **salvar a playlist diretamente na conta do usuário** e visualizar estatísticas de áudio. O usuário consegue uma experiência e precisão muito melhor ao especificar para a IA artistas que não gosta ou estilos que prefere ouvir.

---

## ✨ Funcionalidades

- 🔐 **Autenticação segura** — Login via OAuth com Spotify
- 🤖 **Curadoria via IA** — Integração com Google Gemini 2.5 Flash para sugestões contextuais baseadas na playlist completa do usuário
- 🎛️ **Ajuste de "vibes"** — Controles deslizantes de energia, humor e instrumentalidade que influenciam as recomendações da IA
- 🎧 **Player integrado** — Escute as músicas direto na interface via Spotify Web Playback SDK
- 💾 **Salvar músicas** — Adiciona músicas sugeridas diretamente nas playlists do usuário
- 📊 **Estatísticas da playlist** — Visualização dos artistas mais presentes, gêneros mais ouvidos e gráfico de popularidade
- 🕘 **Histórico de conversa** — O histórico do chat com a IA é persistido no Firebase por playlist
- 📱 **Responsivo** — Layout adaptado para mobile e desktop

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| UI | React 19, Tailwind CSS 4, shadcn/ui, Radix UI, Recharts |
| Autenticação / DB | Firebase (Firestore) + Spotify OAuth |
| IA | Google Gemini 2.5 Flash (`@google/genai`) |
| Integração musical | Spotify Web API + Spotify Web Playback SDK |
| Estado / Cache | TanStack React Query v5 |
| Formulários | React Hook Form + Zod |
| Testes | Jest + Testing Library |
| Linting / Formatação | ESLint + Prettier + Husky |
| Deploy | Vercel |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Conta de desenvolvedor no [Spotify for Developers](https://developer.spotify.com/)
- Chave da API do [Google Gemini](https://ai.google.dev/)
- Projeto criado no [Firebase](https://firebase.google.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/GustavoA01/Next-Track.git
cd Next-Track
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com base no `.env.example`:

```bash
cp .env.example .env.local
```

Preencha os valores conforme a seção [Variáveis de Ambiente](#-variáveis-de-ambiente).

### 4. Configure o Redirect URI no Spotify

No painel do [Spotify for Developers](https://developer.spotify.com/dashboard), adicione o seguinte Redirect URI ao seu app:

```
http://127.0.0.1:3000/callback
```

### 5. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://127.0.0.1:3000](http://127.0.0.1:3000) no navegador.

> ⚠️ Use `127.0.0.1` em vez de `localhost` — o servidor está configurado para rodar nesse host para compatibilidade com o fluxo OAuth do Spotify.

---

## 🔑 Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` | Client ID do seu app no Spotify for Developers |
| `SPOTIFY_CLIENT_SECRET` | Client Secret do seu app no Spotify for Developers |
| `SPOTIFY_REDIRECT_URI` | URI de redirecionamento após login (`http://127.0.0.1:3000/callback`) |
| `GEMINI_API_KEY` | Chave da API do Google Gemini |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | API Key do Firebase |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth Domain do Firebase |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID do Firebase |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage Bucket do Firebase |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID do Firebase |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID do Firebase |

---

## 📁 Estrutura do Projeto

```
src/
├── actions/              # Server Actions (Gemini, Spotify player, auth)
├── app/                  # App Router do Next.js
│   ├── (auth)/
│   │   └── callback/     # Rota de callback OAuth do Spotify
│   ├── (main)/
│   │   ├── home/         # Listagem de playlists do usuário
│   │   └── playlist/[id] # Página da playlist (chat IA + estatísticas)
│   ├── api/
│   │   └── auth/refresh/ # Endpoint de refresh do token Spotify
│   └── page.tsx          # Landing page / login
├── components/           # Componentes globais reutilizáveis
│   ├── Header/
│   ├── Skeletons/
│   └── ui/               # Componentes shadcn/ui
├── data/
│   └── types/            # Tipos TypeScript globais
├── features/
│   ├── MusicCard/        # Card de música recomendada
│   └── Tabs/
│       ├── DiscoverTab/  # Aba de chat com IA e recomendações
│       └── StatisticTab/ # Aba de estatísticas da playlist
├── lib/                  # Utilitários (Spotify client, token, queryClient)
├── services/
│   ├── firebase/         # Serviços do Firestore (chat history)
│   ├── getPlaylistStatistic.ts
│   └── searchTrack.ts    # Busca de faixas na API do Spotify
└── utils/                # Helpers (formatação, prompt context, popularidade)
```

---

## 🧪 Testes

O projeto utiliza **Jest** com **Testing Library** para testes de componentes, hooks e utilitários.

```bash
# Rodar todos os testes
npm run test

# Modo watch
npm run test:watch
```

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint |
| `npm run test` | Executa os testes |
| `npm run test:watch` | Executa os testes em modo watch |

---

## 👨‍💻 Autor

Feito por **Gustavo Aguiar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aguiar-gustavo/)
