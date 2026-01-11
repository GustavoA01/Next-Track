import { Plus } from "lucide-react";

type RightInfoProps = {
  duration: string;
  onAddToPlaylist: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const RightInfo = ({ duration, onAddToPlaylist }: RightInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-muted-foreground">{duration}</p>
      <div
        onClick={onAddToPlaylist}
        className="group/add hover:bg-primary border border-primary transition-all duration-200 rounded-full p-2"
      >
        <Plus className="md:w-6 md:h-6 w-4 h-4 text-white m-auto group-hover/add:text-black" />
      </div>
    </div>
  );
};
