import { Player } from "@/components/Player";
import { useState } from "react";
import { MusicCard } from "../../../MusicCard/container/MusicCard";
import { SpotifyPlaylistTrack } from "@/data/types/spotify";
import { msFormatter } from "@/utils/msFormatter";

type RecommendationsProps = {
  recommendationsTracks: SpotifyPlaylistTrack[];
  accessToken: string;
  onAddToPlaylist: (trackUri: string, musicId: string) => Promise<void>;
};

export const Recommendations = ({
  recommendationsTracks,
  accessToken,
  onAddToPlaylist,
}: RecommendationsProps) => {
  const [uris, setUris] = useState<string[]>([]);

  return (
    <>
      <div className="space-y-2 mt-4 w-full">
        {recommendationsTracks.map((track, index) => {
          const { minutes, seconds } = msFormatter(track.duration_ms);
          const duration = `${minutes}:${seconds}`;

          return (
            <MusicCard
              key={`music-card-${track.id}`}
              id={track.id}
              onClick={() => setUris([track.uri])}
              index={index}
              musicName={track.name}
              artistName={track.artists[0].name}
              imageUrl={track.album.images[0].url}
              duration={duration}
              onAddToPlaylist={async (
                e: React.MouseEvent<HTMLDivElement, MouseEvent>,
              ) => {
                e.stopPropagation();
                onAddToPlaylist(track.uri, track.id);
              }}
            />
          );
        })}
      </div>

      {uris.length > 0 && <Player token={accessToken} uris={uris} />}
    </>
  );
};
