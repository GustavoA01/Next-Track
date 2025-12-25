import { SpotifyPlaylist } from "@/data/types/spotify";
import { Circle } from "lucide-react";

type HeaderPlaylistInfoProps = {
  playlist: SpotifyPlaylist;
  timeText: string;
};

export const HeaderPlaylistInfo = ({
  playlist,
  timeText,
}: HeaderPlaylistInfoProps) => {
  return (
    <div className="flex space-x-1.5 items-center text-sm md:text-base drop-shadow-lg">
      <span className="text-muted-foreground ">Criada por </span>
      <span className="font-semibold md:text-lg">
        {playlist.owner.display_name}
      </span>

      <Circle
        size={4}
        color="muted-foreground"
        className="fill-muted-foreground drop-shadow-lg"
      />
      <span className="text-muted-foreground">
        {playlist.tracks.total} músicas
      </span>

      <Circle
        size={4}
        color="muted-foreground"
        className="fill-muted-foreground drop-shadow-lg"
      />
      <span className="text-muted-foreground">{timeText}</span>
    </div>
  );
};
