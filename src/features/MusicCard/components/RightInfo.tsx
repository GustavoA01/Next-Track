import { localStorageKeys } from "@/services/constantsKeys";
import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type RightInfoProps = {
  id: string;
  duration: string;
  onAddToPlaylist: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => Promise<void>;
};

export const RightInfo = ({
  id,
  duration,
  onAddToPlaylist,
}: RightInfoProps) => {
  const [isMusicAdded, setisMusicAdded] = useState(false);

  useEffect(() => {
    const localStorageMusics = localStorage.getItem(localStorageKeys.musicsIds);
    if (localStorageMusics) {
      const added = JSON.parse(localStorageMusics).includes(id);
      setisMusicAdded(added);
    }
  }, []);

  const handleCLick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isMusicAdded) {
      toast.info("Música já adicionada à playlist");
      return;
    }

    setisMusicAdded(true);
    try {
      await onAddToPlaylist(e);
    } catch (error) {
      setisMusicAdded(false);
      console.error("Ocorreu um erro", error);
      toast.error("Ocorreu um erro ao adicionar a música");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-muted-foreground">{duration}</p>
      <div
        data-testid="add-to-playlist-button"
        onClick={(e) => handleCLick(e)}
        className={`border border-primary transition-all duration-200 rounded-full p-2 
        ${isMusicAdded ? "bg-primary" : "group/add hover:bg-primary"}`}
      >
        {isMusicAdded ? (
          <Check className="animate-scale-appear text-black m-auto md:w-6 md:h-6 w-4 h-4" />
        ) : (
          <Plus className="md:w-6 md:h-6 w-4 h-4 text-white m-auto group-hover/add:text-black" />
        )}
      </div>
    </div>
  );
};
