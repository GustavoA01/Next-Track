import { GoBack } from "@/components/GoBack"
import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types"
import { MenuOptions } from "@/features/Menu/container/MenuOptions"
import { getCurrentToken } from "@/lib/getCurrentToken"
import { fetchProfile } from "@/lib/spotify"
import { Circle } from "lucide-react"
import Image from "next/image"

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
      <div>
        <div className="flex justify-between mb-10 items-center">
          <GoBack />
          <MenuOptions profile={profile} />
        </div>

        <div className="flex flex-col items-center gap-4">
          <Image
            className="m-auto rounded-lg"
            src={playlist.images[0]?.url || ""}
            alt={playlist.name}
            width={250}
            height={250}
          />
          <h1 className="text-3xl font-bold font-montserrat mt-4">
            {playlist.name}
          </h1>

          <div className="flex space-x-2 items-center">
            <span className="text-muted-foreground text-sm">Criada por </span>
            <span className="font-semibold">{playlist.owner.display_name}</span>
            <Circle size={4} className="fill-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              {playlist.tracks.total} músicas
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistPage
