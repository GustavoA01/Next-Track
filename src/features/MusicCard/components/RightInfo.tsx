import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type RightInfoProps = {
  duration: string;
  onAddToPlaylist: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const RightInfo = ({ duration, onAddToPlaylist }: RightInfoProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCLick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isClicked) {
      toast.info("Música já adicionada à playlist");
      return;
    }
    setIsClicked(true);
    onAddToPlaylist(e);
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-muted-foreground">{duration}</p>
      <div
        onClick={(e) => handleCLick(e)}
        className={`border border-primary transition-all duration-200 rounded-full p-2 
        ${isClicked ? "bg-primary" : "group/add hover:bg-primary"}`}
      >
        {isClicked ? (
          <Check className="animate-scale-appear text-black m-auto md:w-6 md:h-6 w-4 h-4" />
        ) : (
          <Plus className="md:w-6 md:h-6 w-4 h-4 text-white m-auto group-hover/add:text-black" />
        )}
      </div>
    </div>
  );
};
