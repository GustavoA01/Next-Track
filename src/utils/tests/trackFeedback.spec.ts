import {
  readTrackFeedback,
  saveTrackFeedback,
  toggleTrackVote,
  trackFeedbackKey,
  TrackFeedback,
} from '../trackFeedback';

const track = { id: '1', name: 'Faixa', artist: 'Artista' };
const empty: TrackFeedback = { likes: [], dislikes: [] };

describe('trackFeedback', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reads an empty list when nothing is stored', () => {
    expect(readTrackFeedback()).toEqual(empty);
  });

  it('reads the stored likes and dislikes', () => {
    const feedback: TrackFeedback = {
      likes: [track],
      dislikes: [{ id: '2', name: 'Outra', artist: 'Banda' }],
    };

    saveTrackFeedback(feedback);

    expect(localStorage.getItem(trackFeedbackKey)).toBe(
      JSON.stringify(feedback)
    );
    expect(readTrackFeedback()).toEqual(feedback);
  });

  it('toggles a like off and keeps dislike exclusive', () => {
    const liked = toggleTrackVote(empty, 'like', track);
    const disliked = toggleTrackVote(liked, 'dislike', track);
    const cleared = toggleTrackVote(disliked, 'dislike', track);

    expect(liked.likes).toEqual([track]);
    expect(disliked).toEqual({ likes: [], dislikes: [track] });
    expect(cleared).toEqual(empty);
  });
});
