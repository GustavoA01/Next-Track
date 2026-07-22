import { getContextPrompt } from '@/utils/getContextPrompt';
import { ChatFormType, chatSchema } from '@/data/chatSchema';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { searchTrack } from '@/services/spotify/searchTrack';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { addToPlaylist } from '@/actions/addToPlaylist';
import { toast } from 'sonner';
import { getMessages } from '@/services/firebase/getMessages';
import { useDiscoverMutation } from './useDiscoverMutation';
import { useDiscoverVibe } from './useDiscoverVibe';
import { DiscoverContentProps } from '../types';
import { syncPlaylistTrackIds } from '@/utils/getPlaylistTrackIds';
import { getChatStorageKey } from '@/utils/getChatStorageKey';

export const useDiscoverTab = ({
  artistsStatistics,
  genresStatistics,
  tracks,
  accessToken,
  userId,
}: DiscoverContentProps) => {
  const { id: playlistId } = useParams();
  const chatStorageKey = getChatStorageKey(userId, playlistId as string);

  const methods = useForm<ChatFormType>({
    resolver: zodResolver(chatSchema),
  });
  const { reset } = methods;

  const [recommendationsTracks, setRecommendationsTracks] = useState<
    SpotifyPlaylistTrack[]
  >([]);
  const [isRecommendationsLoading, setIsRecommendationsLoading] =
    useState(false);
  const [temporaryMessage, setTemporaryMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const pendingAddedTrackIds = useRef(new Set<string>());
  const [playlistTrackIds, setPlaylistTrackIds] = useState<Set<string>>(() => {
    const { syncedIds, pendingAddedIds } = syncPlaylistTrackIds(
      tracks,
      pendingAddedTrackIds.current
    );
    pendingAddedTrackIds.current = pendingAddedIds;
    return syncedIds;
  });

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

  const {
    emotionalVibe,
    energyVibe,
    instrumentalVibe,
    onResetVibes,
    isVibesChanged,
    setEmotionalVibe,
    setEnergyVibe,
    setInstrumentalVibe,
  } = useDiscoverVibe();

  const {
    deleteChatFn,
    geminiRequestFn,
    isResponseLoading,
    messages,
    postMessageFn,
  } = useDiscoverMutation(
    playlistId as string,
    userId,
    setTemporaryMessage,
    setErrorMessage,
    setOpenConfirmDialog,
    setRecommendationsTracks
  );

  const onSelectBadge = (badge: string) => reset({ prompt: badge });

  useEffect(() => {
    const savedRecommendations = localStorage.getItem(chatStorageKey);
    if (savedRecommendations) {
      setRecommendationsTracks(JSON.parse(savedRecommendations));
      return;
    }

    const getLastRecommendations = async () => {
      const response = await getMessages(playlistId as string, userId);
      if (!response || !response[response.length - 1]) return;

      const lastRecommendations = response[response.length - 1].recommendations;
      setRecommendationsTracks(lastRecommendations);
    };
    getLastRecommendations();
  }, [chatStorageKey, playlistId, userId]);

  const handleScrollToTop = () => {
    const header = document.getElementById('playlist-header');
    if (header) header.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChatRequest = async (data: { prompt: string }) => {
    setTemporaryMessage(data.prompt);
    const vibes = {
      emotionalVibe: emotionalVibe / 100,
      energyVibe: energyVibe / 100,
      instrumentalVibe: instrumentalVibe / 100,
    };

    const systemMessage = {
      role: 'system',
      content: getContextPrompt({
        artistsStatistics,
        genresStatistics,
        tracks,
        vibes,
        isVibesChanged,
      }),
    };

    const userMessage = {
      role: 'user',
      content: data.prompt,
    };

    try {
      setErrorMessage('');
      reset({ prompt: '' });

      const prompt = { systemMessage, userMessage };
      const response = await geminiRequestFn(prompt);

      setIsRecommendationsLoading(true);
      const recommendationsResponse = await searchTrack(
        accessToken,
        response.recommendations
      );
      setRecommendationsTracks(recommendationsResponse);

      await postMessageFn({
        chatResponse: response.chatResponse,
        userMessageContent: data.prompt,
        recommendations: recommendationsResponse,
      });
      localStorage.removeItem(chatStorageKey);
    } catch (error) {
      console.error('Error ao chamar gemini', error);
    } finally {
      setIsRecommendationsLoading(false);
    }
  };

  const onAddToPlaylist = async (trackUri: string, musicId: string) => {
    const jsonUris = {
      uris: [trackUri],
    };

    const result = await addToPlaylist({ jsonUris, playlistId, accessToken });

    if (result?.success) {
      pendingAddedTrackIds.current.add(musicId);
      setPlaylistTrackIds((prev) => new Set([...prev, musicId]));
      toast.success('Música adicionada à playlist!');
      return;
    }

    throw new Error('Failed to add track to playlist');
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      methods.handleSubmit(handleChatRequest)();
    }
  };

  return {
    methods,
    handleChatRequest,
    messages,
    isResponseLoading,
    recommendationsTracks,
    isRecommendationsLoading,
    emotionalVibe,
    setEmotionalVibe,
    energyVibe,
    setEnergyVibe,
    instrumentalVibe,
    setInstrumentalVibe,
    onResetVibes,
    onSelectBadge,
    errorMessage,
    isVibesChanged,
    onAddToPlaylist,
    playlistTrackIds,
    temporaryMessage,
    deleteChatFn,
    openConfirmDialog,
    setOpenConfirmDialog,
    handleScrollToTop,
    handleOnKeyDown,
  };
};
