import { useState } from 'react';
import { RightInfoProps } from '../types';
import { toast } from 'sonner';

export const useRightInfo = ({
  id,
  onAddToPlaylist,
  isInPlaylist = false,
}: Omit<RightInfoProps, 'duration'>) => {
  const [addedLocally, setAddedLocally] = useState(false);
  const [prevId, setPrevId] = useState(id);
  const [prevIsInPlaylist, setPrevIsInPlaylist] = useState(isInPlaylist);

  if (id !== prevId) {
    setPrevId(id);
    setAddedLocally(false);
  }

  if (isInPlaylist !== prevIsInPlaylist) {
    setPrevIsInPlaylist(isInPlaylist);
    if (!isInPlaylist) {
      setAddedLocally(false);
    }
  }

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
