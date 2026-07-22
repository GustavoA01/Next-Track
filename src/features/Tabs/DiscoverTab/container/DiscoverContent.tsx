import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronUp, Sparkles } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Recommendations } from '@/features/Tabs/DiscoverTab/container/Recommendations';
import { AccordionVibe } from '../components/AccordionVibe';
import { BadgesGroup } from '../components/BadgesGroup';
import { ChatContent } from './ChatContent';
import { useDiscoverTab } from '../hooks/useDiscoverTab';
import { MusicCardsSkeleton } from '@/components/Skeletons';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmClearChat } from '../components/ConfirmClearChat';
import { Dialog } from '@/components/ui/dialog';
import { DiscoverContentProps } from '../types';

export const DiscoverContent = ({
  tracks,
  accessToken,
  userId,
  genresStatistics,
  artistsStatistics,
}: DiscoverContentProps) => {
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
    playlistTrackIds,
    temporaryMessage,
    deleteChatFn,
    openConfirmDialog,
    setOpenConfirmDialog,
    handleScrollToTop,
    handleOnKeyDown,
  } = useDiscoverTab({
    accessToken,
    userId,
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
        <div className="flex w-full items-end gap-2 rounded-3xl bg-input/30 p-2 pl-4">
          <Textarea
            onKeyDown={handleOnKeyDown}
            disabled={isResponseLoading}
            placeholder="Peça músicas..."
            {...methods.register('prompt')}
            className="min-h-9 max-h-20 w-full resize-none border-none bg-transparent px-0 py-2 shadow-none hide-scrollbar max-sm:text-sm focus-visible:ring-0 dark:bg-transparent"
          />

          <Button
            size="icon"
            type="submit"
            disabled={isResponseLoading}
            className="group shrink-0 rounded-full"
          >
            {isResponseLoading ? (
              <Spinner />
            ) : (
              <Sparkles className="transition-all duration-200 group-hover:text-white" />
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
          playlistTrackIds={playlistTrackIds}
        />
      )}

      {recommendationsTracks.length > 0 && (
        <Button
          variant="ghost"
          onClick={handleScrollToTop}
          className="my-5 flex justify-center items-center rounded-full border-2 border-muted p-2 cursor-pointer w-10 h-10 self-center"
        >
          <ChevronUp className="text-primary" />
        </Button>
      )}

      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <ConfirmClearChat onConfirm={deleteChatFn} />
      </Dialog>

      <div id="spotify-player-anchor" />
    </TabsContent>
  );
};
