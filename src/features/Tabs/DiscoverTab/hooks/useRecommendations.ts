import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { addToPlaylist } from '@/actions/addToPlaylist';
import { getMessages } from '@/services/firebase/getMessages';
import { searchTrack } from '@/services/spotify/searchTrack';
import { syncPlaylistTrackIds } from '@/utils/getPlaylistTrackIds';
import { getChatStorageKey } from '@/utils/getChatStorageKey';
import { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { DiscoverContentProps } from '../types';

type UseRecommendationsProps = Pick<
  DiscoverContentProps,
  'tracks' | 'accessToken' | 'userId'
> & {
  playlistId: string;
};

export const useRecommendations = ({
  tracks,
  accessToken,
  userId,
  playlistId,
}: UseRecommendationsProps) => {
  const chatStorageKey = getChatStorageKey(userId, playlistId);
  const [recommendationsTracks, setRecommendationsTracks] = useState<
    SpotifyPlaylistTrack[]
  >([]);
  const [isRecommendationsLoading, setIsRecommendationsLoading] =
    useState(false);
  const [isAddingTracks, startTransition] = useTransition();
  const pendingAddedTrackIds = useRef(new Set<string>());

  const setSyncIds = () => {
    const { syncedIds, pendingAddedIds } = syncPlaylistTrackIds(
      tracks,
      pendingAddedTrackIds.current
    );
    pendingAddedTrackIds.current = pendingAddedIds;
    return syncedIds;
  };

  const [playlistTrackIds, setPlaylistTrackIds] =
    useState<Set<string>>(setSyncIds);

  useEffect(() => {
    pendingAddedTrackIds.current = new Set();
  }, [playlistId]);

  useEffect(() => {
    const { syncedIds, pendingAddedIds } = syncPlaylistTrackIds(
      tracks,
      pendingAddedTrackIds.current
    );
    pendingAddedTrackIds.current = pendingAddedIds;
    setPlaylistTrackIds(syncedIds);
  }, [tracks]);

  useEffect(() => {
    const savedRecommendations = localStorage.getItem(chatStorageKey);
    if (savedRecommendations) {
      setRecommendationsTracks(JSON.parse(savedRecommendations));
      return;
    }

    const getLastRecommendations = async () => {
      const response = await getMessages(playlistId, userId);
      if (!response || !response[response.length - 1]) return;

      const lastRecommendations = response[response.length - 1].recommendations;
      setRecommendationsTracks(lastRecommendations);
    };
    getLastRecommendations();
  }, [chatStorageKey, playlistId, userId]);

  const searchAndSetRecommendations = async (
    geminiRecommendations: { song: string; artist: string }[]
  ) => {
    setIsRecommendationsLoading(true);
    try {
      const recommendationsResponse = await searchTrack(
        accessToken,
        geminiRecommendations
      );
      setRecommendationsTracks(recommendationsResponse);
      return recommendationsResponse;
    } finally {
      setIsRecommendationsLoading(false);
    }
  };

  const onAddToPlaylist = async (trackUri: string, musicId: string) => {
    const result = await addToPlaylist({
      jsonUris: { uris: [trackUri] },
      playlistId,
      accessToken,
    });

    if (!result?.success) throw new Error('Failed to add track to playlist');

    pendingAddedTrackIds.current.add(musicId);
    setPlaylistTrackIds((prev) => new Set([...prev, musicId]));
    toast.success('Música adicionada à playlist');
  };

  const onAddAllRecommendations = (
    trackUris: string[],
    musicsIds: string[]
  ) => {
    if (trackUris.length === 0) return;

    startTransition(async () => {
      const result = await addToPlaylist({
        jsonUris: { uris: trackUris },
        playlistId,
        accessToken,
      });

      if (!result?.success) {
        toast.error('Erro ao adicionar recomendações');
        return;
      }

      musicsIds.forEach((id) => pendingAddedTrackIds.current.add(id));
      setPlaylistTrackIds((prev) => new Set([...prev, ...musicsIds]));
      toast.success('Recomendações adicionadas com sucesso');
    });
  };

  return {
    recommendationsTracks,
    setRecommendationsTracks,
    isRecommendationsLoading,
    playlistTrackIds,
    isAddingTracks,
    searchAndSetRecommendations,
    onAddToPlaylist,
    onAddAllRecommendations,
    chatStorageKey,
  };
};
