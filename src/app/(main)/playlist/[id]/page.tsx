import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types/spotify"
import { getCurrentToken } from "@/lib/getCurrentToken"
import { fetchProfile } from "@/lib/spotify"
import { PlaylistHeader } from "@/features/PlaylistDetails/container/PlaylistHeader"
import { TabsMenu } from "@/features/Tabs/container/TabsMenu"
import { getPlaylistStatistic } from "@/lib/getRecommendations"

const PlaylistPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const accessToken = await getCurrentToken()
  const profile: SpotifyUserProfile = await fetchProfile(accessToken)

  const playlist: SpotifyPlaylist = await fetch(
    `https://api.spotify.com/v1/playlists/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600 },
    }
  )
    .then((res) => res.json())
    .then((data) => data)

  const {artistsStatistics, genresStatistics} = await getPlaylistStatistic(accessToken, id, playlist.tracks.total)

  return (
    <div className="py-4 h-screen overflow-y-auto custom-scrollbar hide-scrollbar">
      <PlaylistHeader playlist={playlist} profile={profile} />

      <div className="mt-15 flex flex-col items-center w-full 2xl:px-64">
        <TabsMenu artistsStatistics={artistsStatistics} genresStatistics={genresStatistics} />
      </div>
    </div>
  )
}

export default PlaylistPage
