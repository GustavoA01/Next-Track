import { geminiRequest } from "@/actions/geminiRequest";
import { getContextPrompt } from "@/utils/getContextPrompt";
import { ChatFormType, chatSchema } from "@/data/schemas/chatSchema";
import { MessageType } from "@/data/types";
import { PlaylistStatisticsType } from "@/data/types/recommendations";
import { SpotifyPlaylistTrack } from "@/data/types/spotify";
import { searchTrack } from "@/services/searchTrack";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useDiscoverTab = ({
  artistsStatistics,
  genresStatistics,
  tracks,
  accessToken,
}: PlaylistStatisticsType & { accessToken: string }) => {
  const methods = useForm<ChatFormType>({
    resolver: zodResolver(chatSchema),
  });
  const { reset } = methods;

  const [recommendationsTracks, setRecommendationsTracks] = useState<
    SpotifyPlaylistTrack[]
  >([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isRecommendationsLoading, setIsRecommendationsLoading] =
    useState(false);

  const [emotionalVibe, setEmotionalVibe] = useState<number>(50);
  const [energyVibe, setEnergyVibe] = useState<number>(50);
  const [instrumentalVibe, setInstrumentalVibe] = useState<number>(50);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const isVibesChanged =
    emotionalVibe !== 50 || energyVibe !== 50 || instrumentalVibe !== 50;

  const { mutateAsync: geminiRequestFn, isPending: isResponseLoading } =
    useMutation({
      mutationFn: (initialPrompt: string) =>
        geminiRequest({ prompt: initialPrompt }),
      onError: (error) => {
        console.log("Error ao chamar gemini", error);
        setErrorMessage(
          "Erro ao processar a solicitação. Tente novamente mais tarde.",
        );
      },
    });

  const handleChatRequest = async (data: { prompt: string }) => {
    const vibes = {
      emotionalVibe,
      energyVibe,
      instrumentalVibe,
    };

    try {
      setErrorMessage("");
      reset({ prompt: "" });
      setMessages((state) => [
        ...state,
        { role: "user", content: data.prompt },
      ]);

      const initialPrompt = getContextPrompt({
        artistsStatistics,
        genresStatistics,
        tracks,
        prompt: data.prompt,
      });
      const response = await geminiRequestFn(initialPrompt);

      setIsRecommendationsLoading(true);
      const recommendationsResponse = await searchTrack(
        accessToken,
        response.recommendations,
      );
      setRecommendationsTracks(recommendationsResponse);

      setMessages((state) => [
        ...state,
        { role: "assistant", content: response.chatResponse },
      ]);
    } catch (error) {
      console.log("Error ao chamar gemini", error);
    } finally {
      setIsRecommendationsLoading(false);
    }
  };

  const onResetVibes = () => {
    setEmotionalVibe(50);
    setEnergyVibe(50);
    setInstrumentalVibe(50);
  };

  useEffect(() => {
    if (selectedBadge) reset({ prompt: selectedBadge });
  }, [selectedBadge]);

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
    setSelectedBadge,
    errorMessage,
    isVibesChanged,
  };
};
