export type MusicCardProps = {
  index: number;
  id: string;
  imageUrl: string;
  musicName: string;
  artistName: string;
  duration: string;
  isInPlaylist?: boolean;
  onClick: () => void;
  onAddToPlaylist: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
};

export type RightInfoProps = {
  id: string;
  duration: string;
  isInPlaylist?: boolean;
  onAddToPlaylist: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
};

export type MusicInfoProps = {
  musicName: string;
  artistName: string;
};
