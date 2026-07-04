import { geminiRequest } from '@/actions/geminiRequest';
import { ChatPromptType } from '@/data/types';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { clientKeys } from '@/services/constantsKeys';
import { deleteChat } from '@/services/firebase/deleteChat';
import { getMessages } from '@/services/firebase/getMessages';
import { postMessages } from '@/services/firebase/postMessages';
import { getChatStorageKey } from '@/utils/getChatStorageKey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDiscoverMutation = (
  playlistId: string,
  userId: string,
  setTemporaryMessage: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setOpenConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setRecommendationsTracks: React.Dispatch<
    React.SetStateAction<SpotifyPlaylistTrack[]>
  >
) => {
  const queryClient = useQueryClient();
  const chatStorageKey = getChatStorageKey(userId, playlistId);

  const { data: messages } = useQuery({
    queryKey: [clientKeys.chatMessages, playlistId, userId],
    queryFn: () => getMessages(playlistId, userId),
  });

  const { mutateAsync: postMessageFn } = useMutation({
    mutationFn: async (params: {
      userMessageContent: string;
      chatResponse: string;
      recommendations: SpotifyPlaylistTrack[];
    }) =>
      postMessages({
        playlistId,
        userId,
        userMessageContent: params.userMessageContent,
        chatResponse: params.chatResponse,
        recommendations: params.recommendations,
      }),
    onSuccess: () => {
      setTemporaryMessage('');
      queryClient.invalidateQueries({
        queryKey: [clientKeys.chatMessages, playlistId, userId],
      });
    },
  });

  const { mutateAsync: geminiRequestFn, isPending: isResponseLoading } =
    useMutation({
      mutationFn: (prompt: ChatPromptType) =>
        geminiRequest({
          systemMessage: prompt.systemMessage,
          userMessage: prompt.userMessage,
          playlistId,
          userId,
        }),
      onError: (error) => {
        console.log('Error ao chamar gemini', error);
        setErrorMessage(
          'Erro ao processar a solicitação. Tente novamente mais tarde.'
        );
      },
    });

  const { mutateAsync: deleteChatFn } = useMutation({
    mutationFn: () => deleteChat(playlistId, userId),
    onSuccess: () => {
      setOpenConfirmDialog(false);
      localStorage.removeItem(chatStorageKey);
      setRecommendationsTracks([]);
      queryClient.invalidateQueries({
        queryKey: [clientKeys.chatMessages, playlistId, userId],
      });
      toast.success('Chat deletado com sucesso');
    },
  });

  return {
    deleteChatFn,
    geminiRequestFn,
    isResponseLoading,
    postMessageFn,
    messages,
  };
};
