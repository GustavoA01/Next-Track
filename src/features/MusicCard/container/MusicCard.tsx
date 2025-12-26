"use client";
import { RightInfo } from "../components/RightInfo";
import { MusicInfo } from "../components/MusicInfo";
import { AlbumImg } from "../components/AlbumImg";
import { Card } from "@/components/ui/card";

type MusicCardProps = {
  index: number;
  id: string;
  imageUrl: string;
  musicName: string;
  artistName: string;
  duration: string;
  onClick: () => void;
};

export const MusicCard = ({
  id,
  index,
  imageUrl,
  musicName,
  artistName,
  duration,
  onClick,
}: MusicCardProps) => {
  return (
    <Card
      className="group/card w-full px-4 sm:px-8 bg-transparent border-none cursor-pointer hover:bg-surface-hover/40 transition-all duration-200 shadow-none"
      onClick={onClick}
    >
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-4 md:gap-8">
          <p className="text-sm sm:text-base font-montserrat text-muted-foreground">
            {index + 1}
          </p>

          <AlbumImg src={imageUrl} />
          <MusicInfo musicName={musicName} artistName={artistName} />
        </div>

        <RightInfo duration={duration} />
      </div>
    </Card>
  );
};
