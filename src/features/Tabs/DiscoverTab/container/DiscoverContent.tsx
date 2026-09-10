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
