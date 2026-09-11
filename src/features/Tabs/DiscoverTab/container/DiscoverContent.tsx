import { TabsContent } from '@/components/ui/tabs';
import { Recommendations } from '@/features/Tabs/DiscoverTab/container/Recommendations';
import { AccordionVibe } from '../components/AccordionVibe';
import { BadgesGroup } from '../components/BadgesGroup';
import { ChatContent } from './ChatContent';
import { useDiscoverTab } from '../hooks/useDiscoverTab';
import { ConfirmClearChat } from '../components/ConfirmClearChat';
import { Dialog } from '@/components/ui/dialog';
import { ChatInput } from '../components/ChatInput';

export const DiscoverContent = () => {
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
    handleOnKeyDown,
    onAddAllRecommendations,
    isAddingTracks,
  } = useDiscoverTab();

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

      <section className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/20">
        {messages && messages.length > 0 && (
          <ChatContent
            errorMessage={errorMessage}
            messages={messages}
            isLoading={isResponseLoading}
            temporaryMessage={temporaryMessage}
            setOpenConfirmDialog={setOpenConfirmDialog}
          />
        )}

        <div
          className={
            messages && messages.length > 0
              ? 'border-t border-border/40 p-3 sm:px-4'
              : 'p-3 sm:px-4'
          }
        >
          <ChatInput
            onSubmit={methods.handleSubmit(handleChatRequest)}
            handleOnKeyDown={handleOnKeyDown}
            isResponseLoading={isResponseLoading}
            register={methods.register}
            errorMessage={methods.formState.errors.prompt?.message}
          />
        </div>
      </section>

      <Recommendations
        onAddToPlaylist={onAddToPlaylist}
        onAddAllRecommendations={onAddAllRecommendations}
        recommendationsTracks={recommendationsTracks}
        playlistTrackIds={playlistTrackIds}
        isRecommendationsLoading={isRecommendationsLoading}
        isAddingTracks={isAddingTracks}
      />

      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <ConfirmClearChat onConfirm={deleteChatFn} />
      </Dialog>
    </TabsContent>
  );
};
