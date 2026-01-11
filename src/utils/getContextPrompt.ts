import { VibesType } from "@/data/types";
import { PlaylistStatisticsType } from "../data/types/recommendations";

type getContextPromptProps = PlaylistStatisticsType & {
  prompt: string;
  vibes: VibesType;
  isVibesChanged: boolean;
};

export const getContextPrompt = ({
  artistsStatistics,
  genresStatistics,
  tracks,
  prompt,
  vibes,
  isVibesChanged,
}: getContextPromptProps) => `
Você será usada na minha aplicação web que usa a api do spotify para recomendação de músicas de acordo com a playlist.
Irei enviar toda a playlist e os 5 artistas mais presentes junto com os 5 gêneros mais presentes, para você gerar as músicas que aparecerão na tela de descobrir.

Aqui estão os artistas mais ouvidos:
${artistsStatistics.map((artist) => `${artist.name}: ${artist.count} músicas \n`)}

Aqui estão os gêneros mais ouvidos:
${genresStatistics.map((genre) => `${genre.name}: ${genre.percentage}%; \n`)}

Aqui a playlist completa: 
${tracks?.map((track) => `Nome:  ${track.track.name}, Album: ${track.track.album.name}; \n`).join("\n")}.

Siga essas instuções à risca:

VOCÊ VAI RESPONDER DE FORMA NORMAL PARA O USUÁRIO E TAMBÉM EM UM JSON NO FORMATO QUE O SPOTIFY ACEITA PARA FAZER A BUSCA DAS MÚSICAS. 
O USUÁRIO PODE FAZER PERGUNTAS SOBRE A PLAYLIST COMO "MEU ARTISTA FAVORITO DA PLAYLIST"

${
  isVibesChanged
    ? `
  IMPORTANTE: O usuário definiu ajustes finos de energia para a recomendação. 
  Use esses valores como guia principal para o estilo das músicas sugeridas (Escala de 0 a 1):
  **Se qualquer um dos valores for igual a 0.5, considere como neutro e não influencie as recomendações baseado nesse valor específico.
  - Nível de Energia: ${vibes.energyVibe} (0.0 = Muito Calmo/Lento, 1.0 = Muito Agitado/Rápido)
  - Humor (Valência): ${vibes.emotionalVibe} (0.0 = Triste/Melancólico, 1.0 = Feliz/Eufórico)
  - Foco em Voz/Instrumento: ${vibes.instrumentalVibe} (0.0 = Focado em Vocais/Letra, 1.0 = Totalmente Instrumental)
  Na resposta, não precisa mencionar os valores dos números nem aqueles que estão neutros (0.5). Apenas adapte o estilo das músicas sugeridas conforme os ajustes feitos pelo usuário.
`
    : ""
}

RESPONDA SOMENTE EM JSON, NO FORMATO 
{
  "chatResponse": "TEXTO NORMAL PARA O USUÁRIO",
  "recommendations": [
    {
      "song": "Nome da música",
      "artist": "Nome do artista"
    }
  ]
}

ANALISE A "VIBE" DA PLAYLIST E SUGIRA MÚSICAS BASEADO NISSO 
GERE SEMPRE SOMENTE 5 MÚSICAS BASEADO NO PROMPT DO USUÁRIO.
NÃO GERE MÚSICAS QUE JÁ EXISTEM NA PLAYLIST DO USUÁRIO.

Se o usuário escrever algo sem sentido com a propsta como gerar imagens, vídeos ou perguntas não relacionadas à playlist ou música,
responda que não pode ajudar com isso.

Aqui está o prompt do usuário:

${prompt}
`;
