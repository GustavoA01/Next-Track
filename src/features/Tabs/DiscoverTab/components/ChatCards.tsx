import { Player } from "@/components/Player";
import { useState } from "react";
import { MusicCard } from "../../../MusicCard/container/MusicCard";
import { SpotifyPlaylistTrack } from "@/data/types/spotify";
import { msFormatter } from "@/utils/msFormatter";

type ChatCardsProps = {
  recommendationsTracks: SpotifyPlaylistTrack[];
  accessToken: string;
};

export const ChatCards = ({
  recommendationsTracks,
  accessToken,
}: ChatCardsProps) => {
  const [uris, setUris] = useState<string[]>([]);

  return (
    <>
      <div className="space-y-2 mt-4 w-full">
        {recommendationsTracks.map((track, index) => {
          const { minutes, seconds } = msFormatter(track.duration_ms);
          const duration = `${minutes}:${seconds}`;

          return (
            <MusicCard
              id={track.id}
              key={`music-card-${track.id}`}
              onClick={() => setUris([track.uri])}
              index={index}
              musicName={track.name}
              artistName={track.artists[0].name}
              imageUrl={track.album.images[0].url}
              duration={duration}
            />
          );
        })}
      </div>

      {uris.length > 0 && <Player token={accessToken} uris={uris} />}
    </>
  );
};
