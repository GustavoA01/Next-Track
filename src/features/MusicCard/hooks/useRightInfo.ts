import { useEffect, useState } from 'react';
import { RightInfoProps } from '../types';
import { toast } from 'sonner';

export const useRightInfo = ({
  id,
  onAddToPlaylist,
  isInPlaylist = false,
}: Omit<RightInfoProps, 'duration'>) => {
  const [addedLocally, setAddedLocally] = useState(false);

  useEffect(() => {
    setAddedLocally(false);
  }, [id]);

  useEffect(() => {
    if (!isInPlaylist) {
      setAddedLocally(false);
    }
  }, [isInPlaylist]);

  const isMusicAdded = isInPlaylist || addedLocally;

  const handleCLick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isMusicAdded) {
      e.stopPropagation();
      toast.info('Música já adicionada à playlist');
      return;
    }

    try {
      await onAddToPlaylist(e);
      setAddedLocally(true);
    } catch (error) {
      setAddedLocally(false);
      console.error('Ocorreu um erro', error);
      toast.error('Ocorreu um erro ao adicionar a música');
    }
  };

  return {
    handleCLick,
    isMusicAdded,
  };
};
