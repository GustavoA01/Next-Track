import { getContextPrompt } from '@/utils/getContextPrompt';
import { ChatFormType, chatSchema } from '@/data/chatSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useDiscoverMutation } from './useDiscoverMutation';
import { useDiscoverVibe } from './useDiscoverVibe';
import { useRecommendations } from './useRecommendations';
import { DiscoverContentProps } from '../types';

export const useDiscoverTab = ({
  artistsStatistics,
  genresStatistics,
  tracks,
  accessToken,
  userId,
}: DiscoverContentProps) => {
  const { id: playlistId } = useParams();
  const methods = useForm<ChatFormType>({
    resolver: zodResolver(chatSchema),
  });
  const { reset, handleSubmit } = methods;
  const [temporaryMessage, setTemporaryMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const {
    recommendationsTracks,
    setRecommendationsTracks,
    isRecommendationsLoading,
    playlistTrackIds,
    isAddingTracks,
    searchAndSetRecommendations,
    onAddToPlaylist,
    onAddAllRecommendations,
    chatStorageKey,
  } = useRecommendations({
    tracks,
    accessToken,
    userId,
    playlistId: playlistId as string,
  });

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
      const recommendationsResponse = await searchAndSetRecommendations(
        response.recommendations
      );

      await postMessageFn({
        chatResponse: response.chatResponse,
        userMessageContent: data.prompt,
        recommendations: recommendationsResponse,
      });
      localStorage.removeItem(chatStorageKey);
    } catch (error) {
      console.error('Error ao chamar gemini', error);
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(handleChatRequest)();
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
    onAddAllRecommendations,
    playlistTrackIds,
    temporaryMessage,
    deleteChatFn,
    openConfirmDialog,
    setOpenConfirmDialog,
    handleOnKeyDown,
    isAddingTracks,
  };
};
