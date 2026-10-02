import { Check, Plus, ThumbsDown, ThumbsUp } from 'lucide-react';
import { RightInfoProps } from '../types';
import { useRightInfo } from '../hooks/useRightInfo';
import { cn } from '@/utils/cn';

export const RightInfo = ({
  id,
  duration,
  onAddToPlaylist,
  isInPlaylist,
  musicName,
  artistName,
}: RightInfoProps) => {
  const {
    handleAdd,
    isMusicAdded,
    handleLike,
    handleDislike,
    isLiked,
    isDisliked,
  } = useRightInfo({
    id,
    onAddToPlaylist,
    isInPlaylist,
    musicName,
    artistName,
  });

  const voteButtons = [
    {
      icon: ThumbsUp,
      onClick: handleLike,
      ariaLabel: 'Gostei',
      className: isLiked
        ? 'text-primary'
        : 'text-muted-foreground hover:text-primary/50',
    },
    {
      icon: ThumbsDown,
      onClick: handleDislike,
      ariaLabel: 'Não gostei',
      className: isDisliked
        ? 'text-destructive'
        : 'text-muted-foreground hover:text-destructive/50',
    },
  ];

  return (
    <section className="flex items-center gap-2">
      <p className="text-sm text-muted-foreground">{duration}</p>
      <div className="flex items-center gap-2">
        {voteButtons.map(({ icon: Icon, className, onClick, ariaLabel }) => (
          <button
            key={ariaLabel}
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
          >
            <Icon
              className={cn('size-4 transition-colors duration-200', className)}
            />
          </button>
        ))}
      </div>
      <div
        data-testid="add-to-playlist-button"
        onClick={(e) => handleAdd(e)}
        className={cn(
          'border border-primary transition-all duration-200 rounded-full p-2',
          isMusicAdded ? 'bg-primary' : 'group/add hover:bg-primary'
        )}
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
