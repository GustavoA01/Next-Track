"use server";
import { PlaylistStatisticsType } from "@/data/types/recommendations";
import { ai } from "@/services/googelGemini";
import { searchTrack } from "@/services/searchTrack";

export async function geminiRquest({
  artistsStatistics,
  genresStatistics,
  prompt,
  tracks,
}: PlaylistStatisticsType & { prompt: string }) {
  const initialPrompt = `
  Você será usada na minha aplicação web que usa a api do spotify para recomendação de músicas de acordo com a playlist.
  Irei enviar toda a playlist e os 5 artistas mais presentes junto com os 5 gêneros mais presentes, para você gerar as músicas que aparecerão inicialmente na tela de descobrir.
  
  Aqui estão os artistas mais ouvidos:
  ${artistsStatistics.map((artist) => `${artist}: ${artist.count} músicas \n`)}.
  
  Aqui estão os gêneros mais ouvidos:
  ${genresStatistics.map((genre) => `${genre.name}: ${genre.percentage}%; \n`)}.
  
  Aqui a playlist completa: 
  ${tracks?.map((track) => `Nome:  ${track.track.name}, Album: ${track.track.album.name}; \n`).join("\n")}.

  Siga essas instuções à risca:
  RESPONDA SOMENTE EM JSON, NO FORMATO 
  {
    "reccomendations": [
      {
        "song": "Nome da música",
        "artist": "Nome do artista"
      }
    ]
  }
  ANALISE A "VIBE" DA PLAYLIST E SUGIRA MÚSICAS BASEADO NISSO 
  GERE 5 MÚSICAS INICIALMENTE, PARA CASO O USUÁRIO ACABOU DE ENTRAR NA PÁGINA E AINDA NÃO DIGITOU NADA NO PROMPT.
  NÃO GERE MÚSICAS QUE JÁ EXISTEM NA PLAYLIST DO USUÁRIO.

  Prompt do usuário:
  ${prompt}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${initialPrompt}`,
  });

  const formatedText = response.text
    ?.replace(/```json/g, "")
    .replace(/```/g, "");
  const reccomendationsTracks = await searchTrack(
    JSON.parse(formatedText || "{}").reccomendations,
  );

  return reccomendationsTracks;
}
