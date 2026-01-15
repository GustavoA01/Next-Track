import { Card, CardContent } from "@/components/ui/card"

type MessageCardProps = {
  cardClassName: string
  cardContentClassName?: string
  textClassName?: string
  content: string
}

export const MessageCard = ({
  cardClassName,
  cardContentClassName,
  textClassName,
  content,
}: MessageCardProps) => (
  <Card className={cardClassName}>
    <CardContent className={cardContentClassName}>
      <p className={textClassName}>{content}</p>
    </CardContent>
  </Card>
)
