import { RightInfo } from './RightInfo';
import { MusicInfo } from '../components/MusicInfo';
import { AlbumImg } from '../components/AlbumImg';
import { Card } from '@/components/ui/card';
import { MusicCardProps } from '../types';

export const MusicCard = ({
  index,
  id,
  imageUrl,
  musicName,
  artistName,
  duration,
  isInPlaylist,
  onClick,
  onAddToPlaylist,
}: MusicCardProps) => (
  <Card
    onClick={onClick}
    data-testid="music-card"
    className="group/card w-full cursor-pointer border-none bg-transparent px-4 shadow-none transition-all duration-200 hover:bg-surface-hover/40 sm:px-8"
  >
    <div className="flex items-center justify-between gap-1 sm:gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-8">
        <p className="shrink-0 font-montserrat text-sm text-muted-foreground sm:text-base">
          {index + 1}
        </p>
        <AlbumImg src={imageUrl} />
        <MusicInfo musicName={musicName} artistName={artistName} />
      </div>
      <RightInfo
        id={id}
        duration={duration}
        isInPlaylist={isInPlaylist}
        onAddToPlaylist={onAddToPlaylist}
        musicName={musicName}
        artistName={artistName}
      />
    </div>
  </Card>
);
