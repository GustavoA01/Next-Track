import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash } from 'lucide-react';
import { MessageCard } from '../components/MessageCard';
import { ChatContentProps } from '../types';
import { useChatContent } from '../hooks/useChatContent';

const defaultCardClassName = 'p-2 px-0 w-fit max-md:text-sm';

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

  return (
    <Card className="max-h-150 animate-fade-in-up-down">
      <CardHeader className="flex max-h-5 justify-between items-center py-0">
        <CardTitle className="font-montserrat text-muted-foreground tracking-widest select-none">
          CHAT
        </CardTitle>
        <Button
          variant="destructive"
          onClick={() => setOpenConfirmDialog(true)}
        >
          <Trash />
        </Button>
      </CardHeader>

      <CardContent
        ref={scrollRef}
        className="flex flex-col h-auto overflow-y-auto overflow-x-hidden gap-4"
      >
        {messages.map((message, index) => (
          <div key={`message-${index}`}>
            <MessageCard
              key={`ia-${index}`}
              content={message.userMessage}
              textClassName="text-background"
              cardClassName={`bg-primary ml-auto rounded-tr-xs sm:max-w-[75%] ${defaultCardClassName}`}
            />
            <MessageCard
              key={`user-${index}`}
              content={message.chatResponse}
              cardClassName={`mt-6 bg-[#2A2A2A] mr-auto rounded-tl-xs sm:max-w-[80%] ${defaultCardClassName}`}
            />
          </div>
        ))}

        {temporaryMessage !== '' && (
          <MessageCard
            content={temporaryMessage}
            textClassName="text-background"
            cardClassName={`bg-primary ml-auto rounded-tr-xs max-w-[75%] ${defaultCardClassName}`}
          />
        )}

        {isLoading && (
          <Skeleton className={`md:mr-auto rounded-xl rounded-tl-xs w-fit`}>
            <MessageCard
              content="Buscando músicas..."
              cardClassName={`${defaultCardClassName} bg-transparent rounded-tl-xs`}
            />
          </Skeleton>
        )}

        {errorMessage && (
          <MessageCard
            content={errorMessage}
            cardClassName={`bg-red-600/30 mr-auto rounded-tl-xs max-w-[80%] ${defaultCardClassName}`}
          />
        )}
      </CardContent>
    </Card>
  );
};
