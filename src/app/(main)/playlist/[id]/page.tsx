import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types"
import { getCurrentToken } from "@/lib/getCurrentToken"
import { fetchProfile } from "@/lib/spotify"
import { PlaylistHeader } from "@/features/PlaylistDetails/container/PlaylistHeader"

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
    <div className="p-4">
      <PlaylistHeader playlist={playlist} profile={profile} />
    </div>
  )
}

export default PlaylistPage
