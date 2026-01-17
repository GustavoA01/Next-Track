import { geminiRequest } from "@/actions/geminiRequest"
import { getContextPrompt } from "@/utils/getContextPrompt"
import { ChatFormType, chatSchema } from "@/data/schemas/chatSchema"
import { ChatPromptType, LastRecommendationsType } from "@/data/types"
import { PlaylistStatisticsType } from "@/data/types/recommendations"
import { SpotifyPlaylistTrack } from "@/data/types/spotify"
import { searchTrack } from "@/services/searchTrack"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { addToPlaylist } from "@/actions/addToPlaylist"
import { toast } from "sonner"
import { getMessages } from "@/services/firebase/getMessages"
import { postMessages } from "@/services/firebase/postMessages"
import { deleteChat } from "@/services/firebase/deleteChat"

export const useDiscoverTab = ({
  artistsStatistics,
  genresStatistics,
  tracks,
  accessToken,
}: PlaylistStatisticsType & { accessToken: string }) => {
  const { id: playlistId } = useParams()
  const queryClient = useQueryClient()
  const methods = useForm<ChatFormType>({
    resolver: zodResolver(chatSchema),
  })
  const { reset } = methods

  const [recommendationsTracks, setRecommendationsTracks] = useState<
    SpotifyPlaylistTrack[]
  >([])
  const [isRecommendationsLoading, setIsRecommendationsLoading] =
    useState(false)
  const [temporaryMessage, setTemporaryMessage] = useState<string>("")

  const [emotionalVibe, setEmotionalVibe] = useState<number>(50)
  const [energyVibe, setEnergyVibe] = useState<number>(50)
  const [instrumentalVibe, setInstrumentalVibe] = useState<number>(50)

  const [errorMessage, setErrorMessage] = useState<string>("")

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)

  const isVibesChanged =
    emotionalVibe !== 50 || energyVibe !== 50 || instrumentalVibe !== 50

  useEffect(() => {
    const savedRecommendations = localStorage.getItem(playlistId as string)
    if (savedRecommendations) {
      setRecommendationsTracks(JSON.parse(savedRecommendations))
    }
  }, [])

  const onResetVibes = () => {
    setEmotionalVibe(50)
    setEnergyVibe(50)
    setInstrumentalVibe(50)
  }

  const onSelectBadge = (badge: string) => reset({ prompt: badge })

  const { data: messages } = useQuery({
    queryKey: ["messages", playlistId],
    queryFn: () => getMessages(playlistId as string),
  })

  const { mutateAsync: postMessageFn } = useMutation({
    mutationFn: async (params: {
      userMessageContent: string
      chatResponse: string
      recommendations: LastRecommendationsType[]
    }) =>
      postMessages({
        playlistId: playlistId as string,
        userMessageContent: params.userMessageContent,
        chatResponse: params.chatResponse,
        recommendations: params.recommendations,
      }),
    onSuccess: () => {
      setTemporaryMessage("")
      queryClient.invalidateQueries({ queryKey: ["messages", playlistId] })
    },
  })

  const { mutateAsync: geminiRequestFn, isPending: isResponseLoading } =
    useMutation({
      mutationFn: (prompt: ChatPromptType) =>
        geminiRequest({
          systemMessage: prompt.systemMessage,
          userMessage: prompt.userMessage,
          playlistId: playlistId as string,
        }),
      onError: (error) => {
        console.log("Error ao chamar gemini", error)
        setErrorMessage(
          "Erro ao processar a solicitação. Tente novamente mais tarde."
        )
      },
    })

  const { mutateAsync: deleteChatFn } = useMutation({
    mutationFn: () => deleteChat(playlistId as string),
    onSuccess: () => {
      setOpenConfirmDialog(false)
      localStorage.removeItem("lastRecommendations")
      setRecommendationsTracks([])
      queryClient.invalidateQueries({ queryKey: ["messages", playlistId] })
      toast.success("Chat deletado com sucesso")
    },
  })

  const handleChatRequest = async (data: { prompt: string }) => {
    setTemporaryMessage(data.prompt)
    const vibes = {
      emotionalVibe: emotionalVibe / 100,
      energyVibe: energyVibe / 100,
      instrumentalVibe: instrumentalVibe / 100,
    }

    const systemMessage = {
      role: "system",
      content: getContextPrompt({
        artistsStatistics,
        genresStatistics,
        tracks,
        vibes,
        isVibesChanged,
      }),
    }

    const userMessage = {
      role: "user",
      content: data.prompt,
    }

    try {
      setErrorMessage("")
      reset({ prompt: "" })

      const prompt = { systemMessage, userMessage }
      const response = await geminiRequestFn(prompt)

      setIsRecommendationsLoading(true)
      const recommendationsResponse = await searchTrack(
        accessToken,
        response.recommendations
      )
      setRecommendationsTracks(recommendationsResponse)

      if (localStorage.getItem(playlistId as string))
        localStorage.removeItem(playlistId as string)
      localStorage.setItem(
        playlistId as string,
        JSON.stringify(recommendationsResponse)
      )

      const lastRecommendations = recommendationsResponse.map((track) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        duration: track.duration_ms,
      }))

      await postMessageFn({
        chatResponse: response.chatResponse,
        userMessageContent: data.prompt,
        recommendations: lastRecommendations as LastRecommendationsType[],
      })
    } catch (error) {
      console.log("Error ao chamar gemini", error)
    } finally {
      setIsRecommendationsLoading(false)
    }
  }

  const onAddToPlaylist = async (trackUri: string) => {
    const jsonUris = {
      uris: [trackUri],
    }

    const success = await addToPlaylist({ jsonUris, playlistId, accessToken })

    if (success) toast.success("Música adicionada à playlist!")
    else toast.error("Erro ao adicionar música à playlist.")
  }

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
  }
}
