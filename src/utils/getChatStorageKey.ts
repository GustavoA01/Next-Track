export const getChatStorageKey = (userId: string, playlistId: string) =>
  `${userId}:${playlistId}`;

export const trackFeedbackKey = 'feedback';
