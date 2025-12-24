import { AverageMessageType } from "@/data/types/recommendations";
import { SpotifyPlaylistTracks } from "@/data/types/spotify";

export const getPopularityAvgMessage = (
  tracks: SpotifyPlaylistTracks,
  playlistLength: number,
): AverageMessageType => {
  const sum = tracks.items.reduce(
    (sum, item) => sum + item.track.popularity,
    0,
  );
  const average = Math.floor(sum / playlistLength);

  let message: AverageMessageType;

  if (average <= 30) {
    message = {
      title: "Underground",
      text: "Essa playlist é para quem foge do óbvio. A maioria das faixas aqui são tesouros escondidos que pouca gente conhece. Pura cultura de nicho!",
      textColor: "text-[#C084FC]",
    };
  } else if (average <= 65) {
    message = {
      title: "Equilibrado",
      textColor: "text-[#38BDF8]",
      text: "Um equilíbrio perfeito! Você misturou grandes sucessos com faixas mais profundas e específicas.",
    };
  } else {
    message = {
      title: "Mainstream",
      text: "Essa seleção é composta por músicas que furaram a bolha e conquistaram o mundo. É hit atrás de hit!",
      textColor: "text-[#FACC15]",
    };
  }

  return message;
};
