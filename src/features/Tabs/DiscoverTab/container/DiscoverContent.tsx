import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { PlaylistStatisticsType } from "@/data/types/recommendations";
import { Spinner } from "@/components/ui/spinner";
import { ChatCards } from "@/features/Tabs/DiscoverTab/components/ChatCards";
import { AccordionVibe } from "../components/AccordionVibe";
import { BadgesGroup } from "../components/BadgesGroup";
import { ChatContent } from "../components/ChatContent";
import { useDiscoverTab } from "../hook/useDiscoverTab";
import { MusicCardsSkeleton } from "@/components/Skeletons";

export const DiscoverContent = ({
  genresStatistics,
  artistsStatistics,
  tracks,
  accessToken,
}: PlaylistStatisticsType & { accessToken: string }) => {
  const {
    methods,
    emotionalVibe,
    energyVibe,
    instrumentalVibe,
    setEmotionalVibe,
    setEnergyVibe,
    setInstrumentalVibe,
    onResetVibes,
    onSelectBadge,
    messages,
    isResponseLoading,
    handleChatRequest,
    recommendationsTracks,
    isRecommendationsLoading,
    errorMessage,
    isVibesChanged,
    onAddToPlaylist,
  } = useDiscoverTab({
    accessToken,
    artistsStatistics,
    genresStatistics,
    tracks,
  });

  return (
    <TabsContent className="sm:px-8 pt-4 flex flex-col gap-6" value="discover">
      <AccordionVibe
        emotionalVibe={emotionalVibe}
        energyVibe={energyVibe}
        instrumentalVibe={instrumentalVibe}
        setEmotionalVibe={setEmotionalVibe}
        setEnergyVibe={setEnergyVibe}
        setInstrumentalVibe={setInstrumentalVibe}
        onReset={onResetVibes}
        isVibesChanged={isVibesChanged}
      />

      <BadgesGroup onSelectBadge={onSelectBadge} />

      {messages && messages.length > 0 && (
        <ChatContent
          errorMessage={errorMessage}
          messages={messages}
          isLoading={isResponseLoading}
        />
      )}

      <form
        className="space-y-2"
        onSubmit={methods.handleSubmit(handleChatRequest)}
      >
        <div className="flex items-center gap-2">
          <Input
            {...methods.register("prompt")}
            className="w-full rounded-full max-sm:text-sm"
            placeholder="Peça músicas..."
            disabled={isResponseLoading}
          />

          <Button className="group" type="submit" disabled={isResponseLoading}>
            {isResponseLoading ? (
              <Spinner />
            ) : (
              <Sparkles className="text-black group-hover:text-white transition-all duration-200" />
            )}
          </Button>
        </div>

        {methods.formState.errors.prompt && (
          <p className="text-sm text-red-500">
            {methods.formState.errors.prompt.message}
          </p>
        )}
      </form>

      <h2 className="text-sm text-muted-foreground">
        Observação: Só é possível reproduzir músicas com uma conta Spotify
        premium
      </h2>

      {isRecommendationsLoading ? (
        <MusicCardsSkeleton />
      ) : (
        <ChatCards
          onAddToPlaylist={onAddToPlaylist}
          accessToken={accessToken}
          recommendationsTracks={recommendationsTracks}
        />
      )}
    </TabsContent>
  );
};
