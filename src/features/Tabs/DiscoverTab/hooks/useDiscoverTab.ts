import { getContextPrompt } from '@/utils/getContextPrompt';
import { ChatFormType, chatSchema } from '@/data/schemas/chatSchema';
import { PlaylistStatisticsType } from '@/data/types/recommendations';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { searchTrack } from '@/services/searchTrack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { addToPlaylist } from '@/actions/addToPlaylist';
import { toast } from 'sonner';
import { getMessages } from '@/services/firebase/getMessages';
import { localStorageKeys } from '@/services/constantsKeys';
import { useDiscoverMutation } from './useDiscoverMutation';
import { useDiscoverVibe } from './useDiscoverVibe';

export const useDiscoverTab = ({
  artistsStatistics,
  genresStatistics,
  tracks,
  accessToken,
}: PlaylistStatisticsType & { accessToken: string }) => {
  const { id: playlistId } = useParams();

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
    setTemporaryMessage,
    setErrorMessage,
    setOpenConfirmDialog,
    setRecommendationsTracks
  );

  const onSelectBadge = (badge: string) => reset({ prompt: badge });

  useEffect(() => {
    const savedRecommendations = localStorage.getItem(playlistId as string);
    if (savedRecommendations) {
      setRecommendationsTracks(JSON.parse(savedRecommendations));
      return;
    }

    const getLastRecommendations = async () => {
      const response = await getMessages(playlistId as string);
      if (!response || !response[response.length - 1]) return;

      const lastRecommendations = response[response.length - 1].recommendations;
      lastRecommendations.length > 0 ? lastRecommendations : [];
      setRecommendationsTracks(lastRecommendations);
    };
    getLastRecommendations();
  }, []);

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
      localStorage.removeItem(playlistId as string);
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

    const success = await addToPlaylist({ jsonUris, playlistId, accessToken });

    if (success) {
      const localStorageData = localStorage.getItem(localStorageKeys.musicsIds);
      const previousIds = localStorageData ? JSON.parse(localStorageData) : [];
      const updatedIds = [...previousIds, musicId];

      localStorage.setItem(
        localStorageKeys.musicsIds,
        JSON.stringify(updatedIds)
      );
      toast.success('Música adicionada à playlist!');
    } else {
      toast.error('Erro ao adicionar música à playlist.');
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
    temporaryMessage,
    deleteChatFn,
    openConfirmDialog,
    setOpenConfirmDialog,
    handleScrollToTop,
  };
};
