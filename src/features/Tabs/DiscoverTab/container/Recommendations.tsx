import { msFormatter } from '@/utils/msFormatter';
import { RecommendationsProps } from '../types';
import { usePlayerProvider } from '../../usePlayerProvider';
import { Button } from '@/components/ui/button';
import { MusicCardsSkeleton } from '@/components/Skeletons';
import { MusicCard } from '@/features/MusicCard/container/MusicCard';
import { cn } from '@/utils/cn';
import { MouseEvent } from 'react';
import { recommendationStatusMap } from '@/data/constants';

export const Recommendations = ({
  recommendationsTracks,
  playlistTrackIds,
  onAddToPlaylist,
  onAddAllRecommendations,
  isRecommendationsLoading,
  isAddingTracks,
}: RecommendationsProps) => {
  const { setUris } = usePlayerProvider();
  const isInPlaylist = (id: string) => playlistTrackIds.has(id);
  const tracksToAdd = recommendationsTracks.filter(
    ({ id }) => !isInPlaylist(id)
  );
  const alreadyAddedTracks = tracksToAdd.length === 0;
  const emptyRecomendations = recommendationsTracks.length === 0;

  const status = isAddingTracks
    ? 'adding'
    : alreadyAddedTracks
      ? 'added'
      : 'idle';

  const handleMusicCardClick = (uri: string) => {
    setUris([uri]);
    const playerComponent = document.getElementById('spotify-player-anchor');
    if (playerComponent) playerComponent.scrollIntoView({ behavior: 'smooth' });
  };

  const { icon: StatusIcon, label, variant } = recommendationStatusMap[status];

  const disableAddAll =
    isRecommendationsLoading ||
    isAddingTracks ||
    alreadyAddedTracks ||
    emptyRecomendations;

  return (
    <div>
      {!emptyRecomendations && (
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recomendações</h2>
          <Button
            size="sm"
            variant={variant}
            disabled={disableAddAll}
            className={cn('rounded-full', alreadyAddedTracks && 'text-black')}
            onClick={() =>
              onAddAllRecommendations(
                tracksToAdd.map(({ uri }) => uri),
                tracksToAdd.map(({ id }) => id)
              )
            }
          >
            <StatusIcon />
            {label}
          </Button>
        </header>
      )}

      {isRecommendationsLoading ? (
        <MusicCardsSkeleton />
      ) : (
        <div className="space-y-2 mt-2 w-full">
          {recommendationsTracks.map((track, index) => {
            const { minutes, seconds } = msFormatter(track.duration_ms);
            const duration = `${minutes}:${seconds}`;
            const onAddFn = async (e: MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              await onAddToPlaylist(track.uri, track.id);
            };

            return (
              <MusicCard
                key={`card-${track.id}`}
                id={track.id}
                index={index}
                duration={duration}
                musicName={track.name}
                onAddToPlaylist={onAddFn}
                artistName={track.artists[0].name}
                imageUrl={track.album.images[0].url}
                isInPlaylist={isInPlaylist(track.id)}
                onClick={() => handleMusicCardClick(track.uri)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
