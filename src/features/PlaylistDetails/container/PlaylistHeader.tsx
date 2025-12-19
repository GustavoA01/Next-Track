import { GoBack } from "@/components/GoBack"
import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types/spotify"
import { MenuOptions } from "@/features/Menu/container/MenuOptions"
import Image from "next/image"
import { HeaderPlaylistInfo } from "../components/HeaderPlaylistInfo"

type PlaylistHeaderProps = {
  playlist: SpotifyPlaylist
  profile: SpotifyUserProfile
}

export const PlaylistHeader = ({ playlist, profile }: PlaylistHeaderProps) => {
  const totalDuration = playlist.tracks.items.reduce((acc, item) => {
    return acc + item.track.duration_ms
  }, 0)

  const hours = Math.floor(totalDuration / 3600000)
  const minutes = Math.floor((totalDuration % 3600000) / 60000)
  const timeText = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`
  
  return (
    <div>
      <div className="flex justify-between mb-10 items-center px-4">
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

        <HeaderPlaylistInfo playlist={playlist} timeText={timeText} />
      </div>
    </div>
  )
}
