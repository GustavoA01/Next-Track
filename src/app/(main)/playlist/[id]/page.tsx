import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types"
import { getCurrentToken } from "@/lib/getCurrentToken"
import { fetchProfile } from "@/lib/spotify"
import { PlaylistHeader } from "@/features/PlaylistDetails/container/PlaylistHeader"
import { TabsMenu } from "@/features/Tabs/container/TabsMenu"

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
    }
  )
    .then((res) => res.json())
    .then((data) => data)

  console.log(playlist)

  return (
    <div className="py-4 h-screen overflow-y-auto custom-scrollbar hide-scrollbar">
      <PlaylistHeader playlist={playlist} profile={profile} />
      
      <div className="mt-15 flex flex-col items-center w-full">
        <TabsMenu />
      </div>
    </div>
  )
}

export default PlaylistPage
