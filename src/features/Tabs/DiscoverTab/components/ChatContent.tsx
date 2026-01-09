import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageType } from "@/data/types";

type ChatContentProps = {
  messages: MessageType[];
  isLoading: boolean;
  errorMessage: string;
};

const defaultCardClassName = "p-2 px-0 w-fit max-md:text-sm";

const cardsProps = {
  user: {
    index: "user",
    cardClassName: "bg-primary ml-auto rounded-tr-xs",
    textClassName: "text-background",
  },
  assistant: {
    index: "assistant",
    textClassName: "",
    cardClassName: "sm:mt-6 bg-[#2A2A2A] mr-auto rounded-tl-xs",
  },
};

export const ChatContent = ({
  messages,
  isLoading,
  errorMessage,
}: ChatContentProps) => (
  <Card className="max-h-150 animate-fade-in-up-down">
    <CardContent className="h-auto overflow-y-auto overflow-x-hidden flex flex-col gap-4">
      {messages.map((message, index) => (
        <Card
          key={` ${cardsProps[message.role].index}-${index}`}
          className={`max-w-[60%] ${cardsProps[message.role].cardClassName} ${defaultCardClassName}`}
        >
          <CardContent>
            <p className={cardsProps[message.role].textClassName}>
              {message.content}
            </p>
          </CardContent>
        </Card>
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
          className={`${cardsProps["assistant"].cardClassName} ${defaultCardClassName} bg-red-600/30`}
        >
          <CardContent>
            <p className="text-red-300">{errorMessage}</p>
          </CardContent>
        </Card>
      )}
    </CardContent>
  </Card>
);
