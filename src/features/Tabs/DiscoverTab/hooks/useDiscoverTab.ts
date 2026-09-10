import { ChatFormType, chatSchema } from '@/data/chatSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useChatProvider } from '../../providers/useChatProvider';

export const useDiscoverTab = () => {
  const methods = useForm<ChatFormType>({
    resolver: zodResolver(chatSchema),
  });
  const { reset, handleSubmit } = methods;

  const {
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
    emotionalVibe,
    setEmotionalVibe,
    energyVibe,
    setEnergyVibe,
    instrumentalVibe,
    setInstrumentalVibe,
    onResetVibes,
    isVibesChanged,
  } = useChatProvider();

  const onSelectBadge = (badge: string) => reset({ prompt: badge });

  const handleChatRequest = async (data: { prompt: string }) => {
    reset({ prompt: '' });
    await sendChatRequest({ prompt: data.prompt });
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
