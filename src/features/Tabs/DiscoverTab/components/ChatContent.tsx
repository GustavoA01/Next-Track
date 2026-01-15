import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChatContentResponse } from "@/data/types"
import { Trash } from "lucide-react"
import { MessageCard } from "./MessageCard"

type ChatContentProps = {
  messages: ChatContentResponse[]
  isLoading: boolean
  errorMessage: string
  temporaryMessage: string
  deleteChat: () => void
}

const defaultCardClassName = "p-2 px-0 w-fit max-md:text-sm"

export const ChatContent = ({
  messages,
  isLoading,
  errorMessage,
  temporaryMessage,
  deleteChat,
}: ChatContentProps) => (
  <Card className="max-h-150 animate-fade-in-up-down">
    <CardHeader className="flex max-h-5 justify-between items-center py-0">
      <h2>Chat</h2>
      <Button variant="destructive" onClick={deleteChat}>
        <Trash />
      </Button>
    </CardHeader>
    
    <CardContent className="h-auto overflow-y-auto overflow-x-hidden flex flex-col gap-4">
      {messages.map((message, index) => (
        <div key={`message-${index}`}>
          <MessageCard
            key={`ia-${index}`}
            cardClassName={`bg-primary ml-auto rounded-tr-xs max-w-[75%] ${defaultCardClassName}`}
            textClassName="text-background"
            content={message.userMessage}
          />

          <MessageCard
            key={`user-${index}`}
            cardClassName={`mt-6 bg-[#2A2A2A] mr-auto rounded-tl-xs max-w-[80%] ${defaultCardClassName}`}
            content={message.chatResponse}
          />
        </div>
      ))}

      {temporaryMessage !== "" && (
        <MessageCard
          cardClassName={`bg-primary ml-auto rounded-tr-xs max-w-[75%] ${defaultCardClassName}`}
          textClassName="text-background"
          content={temporaryMessage}
        />
      )}

      {isLoading && (
        <Skeleton className={`md:mr-auto rounded-xl rounded-tl-xs w-fit`}>
          <MessageCard
            cardClassName={`${defaultCardClassName} bg-transparent rounded-tl-xs`}
            content="Buscando músicas..."
          />
        </Skeleton>
      )}

      {errorMessage && (
        <MessageCard
          cardClassName={`bg-red-600/30 mr-auto rounded-tl-xs max-w-[80%] ${defaultCardClassName}`}
          content={errorMessage}
        />
      )}
    </CardContent>
  </Card>
)
