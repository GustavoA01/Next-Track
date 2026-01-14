import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatContentResponse } from "@/data/types";

type ChatContentProps = {
  messages: ChatContentResponse[];
  isLoading: boolean;
  errorMessage: string;
};

const defaultCardClassName = "p-2 px-0 w-fit max-md:text-sm";

export const ChatContent = ({
  messages,
  isLoading,
  errorMessage,
}: ChatContentProps) => (
  <Card className="max-h-150 animate-fade-in-up-down">
    <CardContent className="h-auto overflow-y-auto overflow-x-hidden flex flex-col gap-4">
      {messages.map((message, index) => (
        <div key={`message-${index}`}>
          <Card
            key={`ia-${index}`}
            className={`bg-primary ml-auto rounded-tr-xs max-w-[60%] ${defaultCardClassName}`}
          >
            <CardContent>
              <p className="text-background">{message.userMessage}</p>
            </CardContent>
          </Card>

          <Card
            key={`user-${index}`}
            className={`sm:mt-6 bg-[#2A2A2A] mr-auto rounded-tl-xs max-w-[80%] ${defaultCardClassName}`}
          >
            <CardContent>
              <p>{message.chatResponse}</p>
            </CardContent>
          </Card>
        </div>
      ))}

      {isLoading && (
        <Skeleton className={`md:mr-auto rounded-xl rounded-tl-xs w-fit`}>
          <Card
            className={`${defaultCardClassName} bg-transparent rounded-tl-xs`}
          >
            <CardContent>Buscando músicas...</CardContent>
          </Card>
        </Skeleton>
      )}

      {errorMessage && (
        <Card
          className={`bg-red-600/30 mr-auto rounded-tl-xs max-w-[80%] ${defaultCardClassName}`}
        >
          <CardContent>
            <p className="text-red-300">{errorMessage}</p>
          </CardContent>
        </Card>
      )}
    </CardContent>
  </Card>
);
