import { geminiRequest } from '@/actions/geminiRequest';
import { ChatPromptType } from '@/data/types';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { clientKeys } from '@/services/constantsKeys';
import { deleteChat } from '@/services/firebase/deleteChat';
import { getMessages } from '@/services/firebase/getMessages';
import { postMessages } from '@/services/firebase/postMessages';
import { getChatStorageKey } from '@/utils/getChatStorageKey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

export const useDiscoverMutation = (
  playlistId: string,
  userId: string,
  setTemporaryMessage: Dispatch<SetStateAction<string>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>,
  setRecommendationsTracks: Dispatch<SetStateAction<SpotifyPlaylistTrack[]>>
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
    onError: (error) => {
      console.error('Error ao enviar mensagem', error);
      setErrorMessage('Erro ao processar a solicitação');
    },
  });

  const { mutateAsync: geminiRequestFn, isPending: isResponseLoading } =
    useMutation({
      mutationFn: ({ systemMessage, userMessage }: ChatPromptType) =>
        geminiRequest({
          systemMessage,
          userMessage,
          playlistId,
          userId,
        }),
      onError: (error) => {
        console.error('Error ao chamar gemini', error);
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
