import { SpotifyPlaylistTracks } from '@/data/types/spotify';

type SyncPlaylistTrackIdsResult = {
  syncedIds: Set<string>;
  pendingAddedIds: Set<string>;
};

export const syncPlaylistTrackIds = (
  tracks: SpotifyPlaylistTracks['items'] | undefined,
  pendingAddedIds: Set<string>
): SyncPlaylistTrackIdsResult => {
  const fromServer: Set<string> = !tracks
    ? new Set<string>()
    : new Set(
        tracks
          .map((item) => item.track?.id)
          .filter((id): id is string => Boolean(id))
      );

  const remainingPending = new Set(
    [...pendingAddedIds].filter((id) => !fromServer.has(id))
  );

  return {
    syncedIds: new Set([...fromServer, ...remainingPending]),
    pendingAddedIds: remainingPending,
  };
};
