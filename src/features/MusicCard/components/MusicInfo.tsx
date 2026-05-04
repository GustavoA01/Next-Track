import { MusicInfoProps } from '../types';

export const MusicInfo = ({ musicName, artistName }: MusicInfoProps) => (
  <section className="flex flex-col">
    <p className="text-lg font-semibold line-clamp-2">{musicName}</p>
    <p className="text-sm text-muted-foreground line-clamp-1">{artistName}</p>
  </section>
);
