'use client';
import { Check, Plus } from 'lucide-react';
import { RightInfoProps } from '../types';
import { useRightInfo } from '../hooks/useRightInfo';

export const RightInfo = ({
  id,
  duration,
  onAddToPlaylist,
}: RightInfoProps) => {
  const { handleCLick, isMusicAdded } = useRightInfo({ id, onAddToPlaylist });

  return (
    <section className="flex items-center gap-2">
      <p className="text-sm text-muted-foreground">{duration}</p>
      <div
        data-testid="add-to-playlist-button"
        onClick={(e) => handleCLick(e)}
        className={`border border-primary transition-all duration-200 rounded-full p-2 
        ${isMusicAdded ? 'bg-primary' : 'group/add hover:bg-primary'}`}
      >
        {isMusicAdded ? (
          <Check className="animate-scale-appear text-black m-auto md:w-6 md:h-6 w-4 h-4" />
        ) : (
          <Plus className="md:w-6 md:h-6 w-4 h-4 text-white m-auto group-hover/add:text-black" />
        )}
      </div>
    </section>
  );
};
