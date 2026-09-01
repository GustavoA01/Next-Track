import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { Recommendations } from '@/features/Tabs/DiscoverTab/container/Recommendations';
import { AccordionVibe } from '../components/AccordionVibe';
import { BadgesGroup } from '../components/BadgesGroup';
import { ChatContent } from './ChatContent';
import { useDiscoverTab } from '../hooks/useDiscoverTab';
import { MusicCardsSkeleton } from '@/components/Skeletons';
import { ConfirmClearChat } from '../components/ConfirmClearChat';
import { Dialog } from '@/components/ui/dialog';
import { DiscoverContentProps } from '../types';
import { ChatInput } from '../components/ChatInput';

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

      <ChatInput
        onSubmit={methods.handleSubmit(handleChatRequest)}
        handleOnKeyDown={handleOnKeyDown}
        isResponseLoading={isResponseLoading}
        register={methods.register}
        errorMessage={methods.formState.errors.prompt?.message}
      />

      <h2 className="text-sm text-muted-foreground">
        * Só é possível reproduzir músicas com uma conta Spotify premium
      </h2>

      {isRecommendationsLoading ? (
        <MusicCardsSkeleton />
      ) : (
        <Recommendations
          onAddToPlaylist={onAddToPlaylist}
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
    </TabsContent>
  );
};
