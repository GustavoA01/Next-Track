# 🎵 Next Track - Recomendações de músicas com IA

![Project Status](https://img.shields.io/badge/status-concluído-green)
![License](https://img.shields.io/badge/license-MIT-blue)

> **Next Track** é uma aplicação web que utiliza Inteligência Artificial Generativa para criar recomendações musicais personalizadas baseadas em playlists salvas pelo usuário no Spotify, fugindo da repetição dos algoritmos convencionais.

---

## 📱 Demonstração

[COLOQUE AQUI UM GIF OU LINK PARA O VÍDEO DO YOUTUBE MOSTRANDO O APP EM AÇÃO]
*Veja o projeto rodando em tempo real.*

---

## 💡 Sobre o Projeto

Ao observar a repetição e falha do algoritmo do spotify de recomendar músicas variadas que agradam o usuário, o **Next Track** resolve isso integrando a API do Spotify com a IA do Google (Gemini).

O usuário conversa com a IA pedindo recomendações baseadas em sentimentos, situações ou gêneros abstratos (ex: *"Músicas para programar em um dia chuvoso"*), e a aplicação não apenas sugere as faixas, mas permite **salvar a playlist diretamente na conta do usuário** e visualizar estatísticas de áudio. O usuário consegue uma experiência e precisão muito melhor ao especificar para a IA artistas que não gosta ou estilos que prefere ouvir.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação Segura:** Login via OAuth com Spotify.
- 🤖 **Curadoria via IA:** Integração com Google Gemini para sugestões contextuais.
- 🎧 **Player Integrado:** Escute as músicas direto na interface.
- 💾 **Adição de músicas:** Salva músicas que o usuário escolhe diretamente nas playlists dele.
- 📊 **Análise de Dados:** Visualização de estatísticas musicais.
- 🎨 **UI Moderna:** Interface responsiva com modo escuro.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido com as melhores práticas de Engenharia de Software atuais usando:

* **Frontend & Fullstack Framwork:** [React](https://reactjs.org/) e [Next.js 14](https://nextjs.org/)
* **Backend e Banco de dados**: [Firebase](https://firebase.google.com/?hl=pt-br) (Firestore)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) e [Shadcn/UI](https://ui.shadcn.com/)
* **Integrações/APIs:**
    * Spotify Web API
    * Google Gemini AI (Generative AI)
* **Controle de Qualidade / Testes:** Jest
* **Deploy:** Vercel

---

## ⚠️ Nota sobre o Acesso (Spotify Mode)

Devido às políticas recentes da API do Spotify (Criadas em 2025), apenas grandes organizações podem permitir acesso de qualquer usuário ao site, aplicações em modo de desenvolvimento possuem limite de usuários cadastrados manualmente.

**Para testar a aplicação:**
1.  Entre em contato comigo para eu adicionar seu e-mail à lista de emails autorizados.
2.  Ou clone o repositório e rode localmente com suas próprias credenciais (instruções abaixo).

Link do site: https://next-track-gustavo.vercel.app/
---

## 🚀 Como Rodar Localmente

Pré-requisitos: Node.js instalado e chaves de API do Spotify, Google Gemini e Firebase.

1. **Clone o repositório**
   ```bash
   git clone https://github.com/GustavoA01/Next-Track.git
   cd Next-Track

2. **Instale as dependências**
   ```bash
   npm install

3. **Configure as Variáveis de Ambiente:** Crie um arquivo chamado .env.local na raiz do projeto e cole o conteúdo abaixo, preenchendo com suas chaves

```
# Spotify API
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=sua_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback

# Google Gemini AI
GEMINI_API_KEY=sua_chave_gemini_aqui

# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
   
