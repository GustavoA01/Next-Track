import { useEffect, useState } from 'react';
import { RightInfoProps } from '../types';
import { localStorageKeys } from '@/services/constantsKeys';
import { toast } from 'sonner';

export const useRightInfo = ({
  id,
  onAddToPlaylist,
}: Omit<RightInfoProps, 'duration'>) => {
  const [isMusicAdded, setisMusicAdded] = useState(false);

  useEffect(() => {
    const localStorageMusics = localStorage.getItem(localStorageKeys.musicsIds);
    if (localStorageMusics) {
      const added = JSON.parse(localStorageMusics).includes(id);
      setisMusicAdded(added);
    }
  }, []);

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
      setisMusicAdded(true);
    } catch (error) {
      setisMusicAdded(false);
      console.error('Ocorreu um erro', error);
      toast.error('Ocorreu um erro ao adicionar a música');
    }
  };

  return {
    handleCLick,
    isMusicAdded,
  };
};
