type MusicInfoProps = {
  musicName: string;
  artistName: string;
};

export const MusicInfo = ({ musicName, artistName }: MusicInfoProps) => {
  return (
    <div className="flex flex-col ">
      <p className="text-lg font-semibold line-clamp-2">{musicName}</p>
      <p className="text-sm text-muted-foreground line-clamp-1">{artistName}</p>
    </div>
  );
};
