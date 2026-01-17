import { MostListenGenreBar } from "../components/MostListenGenreBar"
import { PlaylistStatisticsType } from "@/data/types/recommendations"
import { PopularityChart } from "../components/PopularityChart"
import { StatisticSubTitle } from "../components/StatSubTitle"
import { SpotifyPlaylist } from "@/data/types/spotify"
import { ArtistCard } from "../components/ArtistCard"
import { TabsContent } from "@/components/ui/tabs"
import { useStatisticTab } from "../hook/useStatisticTab"

export const StatisticContent = ({
  playlist,
  artistsStatistics,
  genresStatistics,
}: PlaylistStatisticsType & { playlist: SpotifyPlaylist }) => {
  const { avgMessage, chartData, formatName, getHexaColor } = useStatisticTab(
    playlist.tracks
  )

  return (
    <TabsContent className="flex flex-col gap-10" value="statistics">
      {playlist.tracks.total === 0 ? (
        <div className="animate-fade-in-up-down w-full flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground">
            A playlist não contém músicas
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4">
            <StatisticSubTitle text="Os 5 artistias mais presentes" />

            <div className="flex gap-2 overflow-x-auto md:grid sm:grid-cols-5 sm:overflow-hidden hide-scrollbar">
              {artistsStatistics.slice(0, 5).map(async (artist, index) => {
                const palleteColor = await getHexaColor(artist.image)

                return (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    index={index}
                    palleteColor={palleteColor || "#121212"}
                  />
                )
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
            <PopularityChart avgMessage={avgMessage} chartData={chartData} />
          </div>
        </>
      )}
    </TabsContent>
  )
}
