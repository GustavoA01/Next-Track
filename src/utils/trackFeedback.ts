export const trackFeedbackKey = 'feedback';

export type TrackVote = {
  id: string;
  name: string;
  artist: string;
};

export type TrackFeedback = {
  likes: TrackVote[];
  dislikes: TrackVote[];
};

const emptyFeedback: TrackFeedback = { likes: [], dislikes: [] };

const listeners = new Set<() => void>();
let snapshot = emptyFeedback;
let snapshotRaw: string | null = null;

const withoutId = (votes: TrackVote[], id: string) =>
  votes.filter((vote) => vote.id !== id);

const parseTrackFeedback = (raw: string | null): TrackFeedback => {
  if (!raw) return emptyFeedback;

  try {
    const parsed = JSON.parse(raw) as Partial<TrackFeedback>;
    return {
      likes: parsed.likes ?? [],
      dislikes: parsed.dislikes ?? [],
    };
  } catch {
    return emptyFeedback;
  }
};

export const readTrackFeedback = (): TrackFeedback => {
  if (typeof window === 'undefined') return emptyFeedback;
  return parseTrackFeedback(localStorage.getItem(trackFeedbackKey));
};

export const getTrackFeedbackSnapshot = (): TrackFeedback => {
  const raw = localStorage.getItem(trackFeedbackKey);
  if (raw === snapshotRaw) return snapshot;

  snapshotRaw = raw;
  snapshot = parseTrackFeedback(raw);
  return snapshot;
};

export const getServerTrackFeedback = () => emptyFeedback;

export const subscribeTrackFeedback = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
};

export const saveTrackFeedback = (feedback: TrackFeedback) => {
  const raw = JSON.stringify(feedback);
  localStorage.setItem(trackFeedbackKey, raw);
  snapshotRaw = raw;
  snapshot = feedback;
  listeners.forEach((listener) => listener());
};

export const toggleTrackVote = (
  feedback: TrackFeedback,
  vote: 'like' | 'dislike',
  track: TrackVote
): TrackFeedback => {
  const likes = withoutId(feedback.likes, track.id);
  const dislikes = withoutId(feedback.dislikes, track.id);
  const current = vote === 'like' ? feedback.likes : feedback.dislikes;
  const alreadyVoted = current.some((item) => item.id === track.id);

  if (alreadyVoted) return { likes, dislikes };

  return vote === 'like'
    ? { likes: [...likes, track], dislikes }
    : { likes, dislikes: [...dislikes, track] };
};
