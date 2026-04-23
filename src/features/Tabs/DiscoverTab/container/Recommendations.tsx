import { Player } from '@/features/Tabs/DiscoverTab/components/Player';
import { useState } from 'react';
import { MusicCard } from '../../../MusicCard/container/MusicCard';
import { msFormatter } from '@/utils/msFormatter';
import { RecommendationsProps } from '../types';

export const Recommendations = ({
  recommendationsTracks,
  accessToken,
  onAddToPlaylist,
}: RecommendationsProps) => {
  const [uris, setUris] = useState<string[]>([]);

  const handleMusicCardClick = (uri: string) => {
    setUris([uri]);
    const playerComponent = document.getElementById('spotify-player-anchor');
    if (playerComponent) playerComponent.scrollIntoView({ behavior: 'smooth' });
  };

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
              onClick={() => handleMusicCardClick(track.uri)}
              index={index}
              musicName={track.name}
              artistName={track.artists[0].name}
              imageUrl={track.album.images[0].url}
              duration={duration}
              onAddToPlaylist={async (
                e: React.MouseEvent<HTMLDivElement, MouseEvent>
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
