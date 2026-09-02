import { msFormatter } from '@/utils/msFormatter';
import { RecommendationsProps } from '../types';
import { usePlayerProvider } from '../../usePlayerProvider';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { MusicCardsSkeleton } from '@/components/Skeletons';
import { Spinner } from '@/components/ui/spinner';
import { MusicCard } from '@/features/MusicCard/container/MusicCard';

export const Recommendations = ({
  recommendationsTracks,
  playlistTrackIds,
  onAddToPlaylist,
  onAddAllRecommendations,
  isRecommendationsLoading,
  isAddingTracks,
}: RecommendationsProps) => {
  const { setUris } = usePlayerProvider();
  const tracksToAdd = recommendationsTracks.filter(
    ({ id }) => !playlistTrackIds.has(id)
  );
  const alreadyAddedTracks = tracksToAdd.length === 0;

  const handleMusicCardClick = (uri: string) => {
    setUris([uri]);
    const playerComponent = document.getElementById('spotify-player-anchor');
    if (playerComponent) playerComponent.scrollIntoView({ behavior: 'smooth' });
  };

  const disableAddAll =
    isRecommendationsLoading ||
    isAddingTracks ||
    alreadyAddedTracks ||
    recommendationsTracks.length === 0;

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recomendações</h2>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          disabled={disableAddAll}
          onClick={() =>
            onAddAllRecommendations(
              tracksToAdd.map(({ uri }) => uri),
              tracksToAdd.map(({ id }) => id)
            )
          }
        >
          {isAddingTracks ? <Spinner /> : <PlusIcon />}
          {isAddingTracks ? 'Adicionando...' : 'Adicionar todas'}
        </Button>
      </header>

      {isRecommendationsLoading ? (
        <MusicCardsSkeleton />
      ) : (
        <div className="space-y-2 mt-2 w-full">
          {recommendationsTracks.map((track, index) => {
            const { minutes, seconds } = msFormatter(track.duration_ms);
            const duration = `${minutes}:${seconds}`;
            return (
              <MusicCard
                key={`music-card-${track.id}`}
                id={track.id}
                index={index}
                duration={duration}
                musicName={track.name}
                artistName={track.artists[0].name}
                imageUrl={track.album.images[0].url}
                isInPlaylist={playlistTrackIds.has(track.id)}
                onClick={() => handleMusicCardClick(track.uri)}
                onAddToPlaylist={async (
                  e: React.MouseEvent<HTMLDivElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                  await onAddToPlaylist(track.uri, track.id);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
