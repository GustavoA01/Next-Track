import { geminiRquest } from "@/actions/geminiRequest";
import { PlaylistStatistics } from "@/data/types/recommendations";
import { MusicCard } from "../components/MusicCard";
import { Music2 } from "lucide-react";

export const ChatContent = async ({
  artistsStatistics,
  genresStatistics,
  tracks,
}: PlaylistStatistics) => {
  // await geminiRquest({
  //   artistsStatistics: artistsStatistics.slice(0, 5),
  //   genresStatistics: genresStatistics.slice(0, 5),
  //   tracks,
  //   prompt: "",
  // })

  return (
    <div>
      <div className="flex items-center gap-2">
        <Music2 className="w-6 h-6 text-primary" />
        <h1 className="sm:text-xl font-semibold">Músicas sugeridas</h1>
      </div>

      <div className="space-y-2 mt-4 w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <MusicCard key={index} index={index} />
        ))}
      </div>
    </div>
  );
};
