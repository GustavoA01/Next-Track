import { geminiRquest } from "@/actions/geminiRequest";
import { PlaylistStatisticsType } from "@/data/types/recommendations";
import { Music2 } from "lucide-react";
import { getCurrentToken } from "@/lib/getCurrentToken";
import { ChatCards } from "../../components/ChatCards";

export const ChatContent = async ({
  artistsStatistics,
  genresStatistics,
  tracks,
}: PlaylistStatisticsType) => {
  // const reccomendationsTracks = await geminiRquest({
  //   artistsStatistics: artistsStatistics.slice(0, 5),
  //   genresStatistics: genresStatistics.slice(0, 5),
  //   tracks,
  //   prompt: "",
  // })

  const accessToken = await getCurrentToken();

  const reccomendationsTracks = [];

  return (
    <div>
      <div className="flex items-center gap-2">
        <Music2 className="w-6 h-6 text-primary" />
        <h1 className="sm:text-xl font-semibold">Músicas sugeridas</h1>
      </div>

      <ChatCards
        reccomendationsTracks={reccomendationsTracks}
        accessToken={accessToken}
      />
    </div>
  );
};
