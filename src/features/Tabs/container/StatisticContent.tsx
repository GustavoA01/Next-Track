import { TabsContent } from "@/components/ui/tabs"
import { PlaylistStatistics } from "@/data/types/recommendations"
import { MostListenGenreBar } from "../components/MostListenGenreBar"
import Image from "next/image"

export const StatisticContent = ({
  artistsStatistics,
  genresStatistics,
}: PlaylistStatistics) => {
  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <TabsContent value="statistics">
      <div>
        <h1 className="font-bold my-6">Os 5 Artistias mais presentes</h1>

        <div className="flex gap-2 overflow-x-auto md:grid sm:grid-cols-5 sm:overflow-x-hidden hide-scrollbar selct-none">
          {artistsStatistics.slice(0, 5).map((artist) => (
            <div
              className="relative rounded-lg min-w-37.5 min-h-37.5 sm:w-full md:h-auto border-b-rounded-lg"
              key={artist.id}
            >
              <Image
                src={artist.image}
                width={150}
                height={150}
                alt={artist.name}
                className="rounded-lg md:w-full md:h-auto bg-cover"
              />
              <div className="backdrop-blur-md hover:opacity-15 w-full h-10 absolute bottom-0 rounded-b-lg"></div>
            </div>
          ))}
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
