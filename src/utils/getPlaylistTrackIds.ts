import { SpotifyPlaylistTracks } from '@/data/types/spotify';

export const getPlaylistTrackIds = (
  tracks?: SpotifyPlaylistTracks['items']
): Set<string> => {
  if (!tracks) return new Set();

  return new Set(
    tracks
      .map((item) => item.track?.id)
      .filter((id): id is string => Boolean(id))
  );
};

export const syncPlaylistTrackIds = (
  tracks: SpotifyPlaylistTracks['items'] | undefined,
  pendingAddedIds: Set<string>
) => {
  const fromServer = getPlaylistTrackIds(tracks);
  const remainingPending = new Set(
    [...pendingAddedIds].filter((id) => !fromServer.has(id))
  );

  return {
    syncedIds: new Set([...fromServer, ...remainingPending]),
    pendingAddedIds: remainingPending,
  };
};
