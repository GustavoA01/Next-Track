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
    <section
      onClick={(e) => e.stopPropagation()}
      className="flex shrink-0 items-center gap-0.5 sm:gap-2"
    >
      <p className="text-sm text-muted-foreground">{duration}</p>
      <div className="flex items-center">
        {voteButtons.map(({ icon: Icon, className, onClick, ariaLabel }) => (
          <button
            key={ariaLabel}
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className="flex size-11 items-center justify-center rounded-full sm:size-9"
          >
            <Icon
              className={cn(
                'size-5 transition-colors duration-200 sm:size-4',
                className
              )}
            />
          </button>
        ))}
      </div>
      <div
        data-testid="add-to-playlist-button"
        onClick={(e) => handleAdd(e)}
        className={cn(
          'flex size-11 items-center justify-center rounded-full border border-primary transition-all duration-200 sm:size-auto sm:p-2',
          isMusicAdded ? 'bg-primary' : 'group/add hover:bg-primary'
        )}
      >
        {isMusicAdded ? (
          <Check className="animate-scale-appear m-auto size-5 text-black sm:size-6" />
        ) : (
          <Plus className="m-auto size-5 text-white group-hover/add:text-black sm:size-6" />
        )}
      </div>
    </section>
  );
};
