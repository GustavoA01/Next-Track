import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash } from 'lucide-react';
import { MessageCard } from '../components/MessageCard';
import { ChatContentProps } from '../types';
import { useChatContent } from '../hooks/useChatContent';
import { cn } from '@/utils/cn';

export const ChatContent = ({
  messages,
  isLoading,
  errorMessage,
  temporaryMessage,
  setOpenConfirmDialog,
}: ChatContentProps) => {
  const scrollRef = useChatContent({
    messages,
    isLoading,
    temporaryMessage,
  });

  const defaultCardClassName = 'p-2 px-0 w-fit max-md:text-sm';

  return (
    <div className="max-h-150 animate-fade-in-up-down flex flex-col min-h-0">
      <div className="flex justify-between items-center border-b border-border/40 px-4 py-3 sm:px-6">
        <h3 className="font-montserrat text-sm text-muted-foreground tracking-widest select-none">
          CHAT
        </h3>
        <Button
          size="icon"
          variant="destructive"
          className="rounded-full"
          onClick={() => setOpenConfirmDialog(true)}
        >
          <Trash className="size-4" />
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-col h-auto max-h-110 overflow-y-auto overflow-x-hidden gap-4 px-4 py-4 sm:px-6"
      >
        {messages.map((message, index) => (
          <div key={`message-${index}`}>
            <MessageCard
              key={`ia-${index}`}
              content={message.userMessage}
              textClassName="text-background"
              cardClassName={cn(
                'bg-primary ml-auto rounded-tr-xs sm:max-w-[75%]',
                defaultCardClassName
              )}
            />
            <MessageCard
              key={`user-${index}`}
              content={message.chatResponse}
              cardClassName={cn(
                'mt-6 bg-[#2A2A2A] mr-auto rounded-tl-xs sm:max-w-[80%]',
                defaultCardClassName
              )}
            />
          </div>
        ))}

        {temporaryMessage !== '' && (
          <MessageCard
            content={temporaryMessage}
            textClassName="text-background"
            cardClassName={cn(
              'bg-primary ml-auto rounded-tr-xs max-w-[75%]',
              defaultCardClassName
            )}
          />
        )}

        {isLoading && (
          <Skeleton className={`md:mr-auto rounded-xl rounded-tl-xs w-fit`}>
            <MessageCard
              content="Buscando músicas..."
              cardClassName={cn(
                defaultCardClassName,
                'bg-transparent rounded-tl-xs'
              )}
            />
          </Skeleton>
        )}

        {errorMessage && (
          <MessageCard
            content={errorMessage}
            cardClassName={cn(
              'bg-red-600/30 mr-auto rounded-tl-xs max-w-[80%]',
              defaultCardClassName
            )}
          />
        )}
      </div>
    </div>
  );
};
