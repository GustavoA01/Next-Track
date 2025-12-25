import { geminiRquest } from "@/actions/geminiRequest";
import { PlaylistStatisticsType } from "@/data/types/recommendations";
import { MusicCard } from "../../MusicCard/container/MusicCard";
import { Music2 } from "lucide-react";
import { msFormatter } from "@/utils/msFormatter";

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

  const reccomendationsTracks = [];

  return (
    <div>
      <div className="flex items-center gap-2">
        <Music2 className="w-6 h-6 text-primary" />
        <h1 className="sm:text-xl font-semibold">Músicas sugeridas</h1>
      </div>

      <div className="space-y-2 mt-4 w-full">
        {reccomendationsTracks.map((track, index) => {
          const { minutes, seconds } = msFormatter(track.duration_ms);
          const duration = `${minutes}:${seconds}`;

          return (
            <MusicCard
              key={track.id}
              index={index}
              musicName={track.name}
              artistName={track.artists[0].name}
              imageUrl={track.album.images[0].url}
              duration={duration}
            />
          );
        })}
      </div>
    </div>
  );
};
