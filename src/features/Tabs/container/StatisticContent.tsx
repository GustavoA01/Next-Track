import { TabsContent } from "@/components/ui/tabs"
import { PlaylistStatistics } from "@/data/types/recommendations"
import { MostListenGenreBar } from "../components/MostListenGenreBar"
import { extractColors } from "extract-colors"
import { ArtistCard } from "../components/ArtistCard"

export const StatisticContent = ({
  artistsStatistics,
  genresStatistics,
}: PlaylistStatistics) => {
  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1)

  const getHexaColor = async (imageUrl: string) => {
    try {
      const colors = await extractColors(imageUrl, { crossOrigin: "anonymous" })
      return colors[0].hex
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TabsContent value="statistics">
      <div className="select-none">
        <h1 className="font-bold my-6">Os 5 Artistias mais presentes</h1>

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

        <h1 className="font-bold my-6">Top 5 Gêneros mais presentes</h1>

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
    </TabsContent>
  )
}
