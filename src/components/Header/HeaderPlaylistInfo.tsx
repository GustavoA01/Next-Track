import { HeaderPlaylistInfoProps } from '@/data/types/components';
import { CircleIcon } from './CircleIcon';

export const HeaderPlaylistInfo = ({
  totalTracks,
  ownerName,
  timeText,
}: HeaderPlaylistInfoProps) => (
  <div className="flex space-x-1.5 items-center text-sm md:text-base drop-shadow-lg">
    <span className="text-muted-foreground">Criada por </span>
    <span className="font-semibold md:text-lg max-md:max-w-20 line-clamp-1 truncate">
      {ownerName}
    </span>
    <CircleIcon />
    <span className="text-muted-foreground">{totalTracks} músicas</span>
    <CircleIcon />
    <span className="text-muted-foreground">{timeText}</span>
  </div>
);
