import { ChatFormType, chatSchema } from '@/data/chatSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useChatProvider } from '../../../../components/Providers/useChatProvider';

export const useDiscoverTab = () => {
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

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChatFormType>({
    resolver: zodResolver(chatSchema),
  });

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
    handleSubmit,
    register,
    errors,
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
