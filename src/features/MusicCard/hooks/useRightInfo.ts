import { useState, useSyncExternalStore } from 'react';
import { RightInfoProps } from '../types';
import { toast } from 'sonner';
import {
  getServerTrackFeedback,
  getTrackFeedbackSnapshot,
  saveTrackFeedback,
  subscribeTrackFeedback,
  toggleTrackVote,
} from '@/utils/trackFeedback';

export const useRightInfo = ({
  id,
  onAddToPlaylist,
  isInPlaylist = false,
  musicName,
  artistName,
}: Omit<RightInfoProps, 'duration'>) => {
  const [addedLocally, setAddedLocally] = useState(false);
  const [prevId, setPrevId] = useState(id);
  const [prevIsInPlaylist, setPrevIsInPlaylist] = useState(isInPlaylist);

  const feedback = useSyncExternalStore(
    subscribeTrackFeedback,
    getTrackFeedbackSnapshot,
    getServerTrackFeedback
  );

  const isMusicAdded = isInPlaylist || addedLocally;
  const isLiked = feedback.likes.some((vote) => vote.id === id);
  const isDisliked = feedback.dislikes.some((vote) => vote.id === id);

  if (id !== prevId) {
    setPrevId(id);
    setAddedLocally(false);
  }

  if (isInPlaylist !== prevIsInPlaylist) {
    setPrevIsInPlaylist(isInPlaylist);
    if (!isInPlaylist) setAddedLocally(false);
  }

  const handleAdd = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  const vote = (e: React.MouseEvent, kind: 'like' | 'dislike') => {
    e.stopPropagation();
    const next = toggleTrackVote(feedback, kind, {
      id,
      name: musicName,
      artist: artistName,
    });
    saveTrackFeedback(next);

    const kept =
      kind === 'like'
        ? next.likes.some((item) => item.id === id)
        : next.dislikes.some((item) => item.id === id);

    if (kept)
      toast.success(kind === 'like' ? 'Música curtida' : 'Música não curtida');
  };

  const handleLike = (e: React.MouseEvent) => vote(e, 'like');
  const handleDislike = (e: React.MouseEvent) => vote(e, 'dislike');

  return {
    handleAdd,
    isMusicAdded,
    handleLike,
    handleDislike,
    isLiked,
    isDisliked,
  };
};
