import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { PlaylistStatisticsType } from "@/data/types/recommendations";
import { Spinner } from "@/components/ui/spinner";
import { Recommendations } from "@/features/Tabs/DiscoverTab/components/Recommendations";
import { AccordionVibe } from "../components/AccordionVibe";
import { BadgesGroup } from "../components/BadgesGroup";
import { ChatContent } from "../components/ChatContent";
import { useDiscoverTab } from "../hook/useDiscoverTab";
import { MusicCardsSkeleton } from "@/components/Skeletons";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmClearChat } from "../components/ConfirmClearChat";
import { Dialog } from "@/components/ui/dialog";

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
    temporaryMessage,
    deleteChatFn,
    openConfirmDialog,
    setOpenConfirmDialog,
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
          temporaryMessage={temporaryMessage}
          setOpenConfirmDialog={setOpenConfirmDialog}
        />
      )}

      <form
        className="space-y-2"
        onSubmit={methods.handleSubmit(handleChatRequest)}
      >
        <div className="flex items-end gap-2">
          <Textarea
            {...methods.register("prompt")}
            className="w-full rounded-xl hide-scrollbar max-sm:text-sm resize-none min-h-10 max-h-20"
            placeholder="Peça músicas..."
            disabled={isResponseLoading}
          />

          <Button className="group" type="submit" disabled={isResponseLoading}>
            {isResponseLoading ? (
              <Spinner />
            ) : (
              <Sparkles className="group-hover:text-white transition-all duration-200" />
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
        * Só é possível reproduzir músicas com uma conta Spotify premium
      </h2>

      {isRecommendationsLoading ? (
        <MusicCardsSkeleton />
      ) : (
        <Recommendations
          onAddToPlaylist={onAddToPlaylist}
          accessToken={accessToken}
          recommendationsTracks={recommendationsTracks}
        />
      )}

      <Dialog
        open={openConfirmDialog}
        onOpenChange={() => setOpenConfirmDialog(false)}
      >
        <ConfirmClearChat onConfirm={deleteChatFn} />
      </Dialog>
    </TabsContent>
  );
};
