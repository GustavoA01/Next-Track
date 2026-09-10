import { VibesType } from '@/data/types';
import { getContextPrompt } from '@/utils/getContextPrompt';
import { useParams } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useDiscoverMutation } from '../DiscoverTab/hooks/useDiscoverMutation';
import { useDiscoverVibe } from '../DiscoverTab/hooks/useDiscoverVibe';
import { useRecommendations } from '../DiscoverTab/hooks/useRecommendations';
import { DiscoverContentProps } from '../DiscoverTab/types';
import { ChatProviderType } from '@/data/types/providers';

const ChatContext = createContext<ChatProviderType | null>(null);

export const ChatProvider = ({
  children,
  artistsStatistics,
  genresStatistics,
  tracks,
  accessToken,
  userId,
}: DiscoverContentProps & { children: ReactNode }) => {
  const { id: playlistId } = useParams();
  const [temporaryMessage, setTemporaryMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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

  const hasChat = Boolean(messages?.length);

  const sendChatRequest = useCallback(
    async ({ prompt }: { prompt: string }) => {
      setTemporaryMessage(prompt);

      const vibes: VibesType = {
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
        content: prompt,
      };

      try {
        setErrorMessage('');

        const response = await geminiRequestFn({ systemMessage, userMessage });
        const recommendationsResponse = await searchAndSetRecommendations(
          response.recommendations
        );

        await postMessageFn({
          chatResponse: response.chatResponse,
          userMessageContent: prompt,
          recommendations: recommendationsResponse,
        });
        localStorage.removeItem(chatStorageKey);
      } catch (error) {
        console.error('Error ao chamar gemini', error);
      }
    },
    [
      artistsStatistics,
      genresStatistics,
      tracks,
      geminiRequestFn,
      searchAndSetRecommendations,
      postMessageFn,
      chatStorageKey,
      emotionalVibe,
      energyVibe,
      instrumentalVibe,
      isVibesChanged,
    ]
  );

  const value = useMemo(
    () => ({
      messages,
      isResponseLoading,
      recommendationsTracks,
      isRecommendationsLoading,
      playlistTrackIds,
      isAddingTracks,
      temporaryMessage,
      errorMessage,
      openConfirmDialog,
      setOpenConfirmDialog,
      deleteChatFn,
      sendChatRequest,
      onAddToPlaylist,
      onAddAllRecommendations,
      hasChat,
      emotionalVibe,
      setEmotionalVibe,
      energyVibe,
      setEnergyVibe,
      instrumentalVibe,
      setInstrumentalVibe,
      onResetVibes,
      isVibesChanged,
    }),
    [
      messages,
      isResponseLoading,
      recommendationsTracks,
      isRecommendationsLoading,
      playlistTrackIds,
      isAddingTracks,
      temporaryMessage,
      errorMessage,
      openConfirmDialog,
      deleteChatFn,
      sendChatRequest,
      onAddToPlaylist,
      onAddAllRecommendations,
      hasChat,
      emotionalVibe,
      setEmotionalVibe,
      energyVibe,
      setEnergyVibe,
      instrumentalVibe,
      setInstrumentalVibe,
      onResetVibes,
      isVibesChanged,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatProvider = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatProvider deve ser usado dentro de ChatProvider');
  }

  return context;
};
