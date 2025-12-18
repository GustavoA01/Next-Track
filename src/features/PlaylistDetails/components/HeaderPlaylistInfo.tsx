import { SpotifyPlaylist } from "@/data/types"
import { Circle } from "lucide-react"

type HeaderPlaylistInfoProps = {
  playlist: SpotifyPlaylist
  timeText: string
}

export const HeaderPlaylistInfo = ({
  playlist,
  timeText,
}: HeaderPlaylistInfoProps) => {
  return (
    <div className="flex space-x-1.5 items-center">
      <span className="text-muted-foreground text-sm">Criada por </span>
      <span className="font-semibold">{playlist.owner.display_name}</span>

      <Circle size={4} className="fill-muted-foreground" />
      <span className="text-muted-foreground text-sm">
        {playlist.tracks.total} músicas
      </span>

      <Circle size={4} className="fill-muted-foreground" />
      <span className="text-muted-foreground text-sm">{timeText}</span>
    </div>
  )
}
