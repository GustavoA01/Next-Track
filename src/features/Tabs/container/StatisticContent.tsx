import { MostListenGenreBar } from "../components/MostListenGenreBar";
import { PlaylistStatistics } from "@/data/types/recommendations";
import { PopularityChart } from "../components/PoupularityChart";
import { StatisticSubTitle } from "../components/StatSubTitle";
import { SpotifyPlaylist } from "@/data/types/spotify";
import { ArtistCard } from "../components/ArtistCard";
import { TabsContent } from "@/components/ui/tabs";
import { extractColors } from "extract-colors";

export const StatisticContent = ({
  playlist,
  artistsStatistics,
  genresStatistics,
}: PlaylistStatistics & { playlist: SpotifyPlaylist }) => {
  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  const getHexaColor = async (imageUrl: string) => {
    try {
      const colors = await extractColors(imageUrl, {
        crossOrigin: "anonymous",
      });
      return colors[0].hex;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TabsContent className="flex flex-col gap-10" value="statistics">
      <div className="mt-4">
        <StatisticSubTitle text="Os 5 artistias mais presentes" />

        <div className="flex gap-2 overflow-x-auto md:grid sm:grid-cols-5 sm:overflow-hidden hide-scrollbar">
          {artistsStatistics.slice(0, 5).map(async (artist, index) => {
            const palleteColor = await getHexaColor(artist.image);

            return (
              <ArtistCard
                key={artist.id}
                artist={artist}
                index={index}
                palleteColor={palleteColor || "#121212"}
              />
            );
          })}
        </div>
      </div>

      <div>
        <StatisticSubTitle text="Top 5 gêneros mais presentes" />

        <div className="space-y-4">
          {genresStatistics.slice(0, 5).map((genre) => (
            <MostListenGenreBar
              key={genre.name}
              name={formatName(genre.name)}
              value={genre.percentage}
            />
          ))}
        </div>
      </div>

      <div>
        <StatisticSubTitle text="Nível de popularidade das músicas" />

        <PopularityChart tracks={playlist.tracks} />
      </div>
    </TabsContent>
  );
};
