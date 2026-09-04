import { SpotifyPlaylistTracks } from '@/data/types/spotify';

export const syncPlaylistTrackIds = (
  tracks: SpotifyPlaylistTracks['items'] | undefined,
  pendingAddedIds: Set<string>
) => {
  const fromServer = !tracks
    ? new Set()
    : new Set(
        tracks
          .map((item) => item.track?.id)
          .filter((id) => Boolean(id))
      );

  const remainingPending = new Set(
    [...pendingAddedIds].filter((id) => !fromServer.has(id))
  );

  return {
    syncedIds: new Set([...fromServer, ...remainingPending]),
    pendingAddedIds: remainingPending,
  };
};
