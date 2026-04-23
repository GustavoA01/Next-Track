import { Card, CardContent } from '@/components/ui/card';
import { MessageCardProps } from '../types';

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
);
