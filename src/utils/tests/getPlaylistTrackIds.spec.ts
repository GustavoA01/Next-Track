import {
  getPlaylistTrackIds,
  syncPlaylistTrackIds,
} from '../getPlaylistTrackIds';

const mockTracks = [
  {
    added_at: new Date(),
    track: { id: 'track-1' },
  },
  {
    added_at: new Date(),
    track: { id: 'track-2' },
  },
] as any;

describe('getPlaylistTrackIds', () => {
  it('should extract track ids from playlist items', () => {
    const ids = getPlaylistTrackIds(mockTracks);

    expect(ids.has('track-1')).toBe(true);
    expect(ids.has('track-2')).toBe(true);
    expect(ids.size).toBe(2);
  });

  it('should ignore items without track id', () => {
    const ids = getPlaylistTrackIds([
      { added_at: new Date(), track: { id: 'track-1' } },
      { added_at: new Date(), track: {} },
    ] as any);

    expect(ids).toEqual(new Set(['track-1']));
  });

  it('should return empty set when tracks is undefined', () => {
    expect(getPlaylistTrackIds(undefined)).toEqual(new Set());
  });
});

describe('syncPlaylistTrackIds', () => {
  it('should sync ids from server tracks', () => {
    const { syncedIds, pendingAddedIds } = syncPlaylistTrackIds(
      mockTracks,
      new Set()
    );

    expect(syncedIds).toEqual(new Set(['track-1', 'track-2']));
    expect(pendingAddedIds.size).toBe(0);
  });

  it('should keep pending ids not yet present on server', () => {
    const { syncedIds, pendingAddedIds } = syncPlaylistTrackIds(
      mockTracks,
      new Set(['track-3'])
    );

    expect(syncedIds).toEqual(new Set(['track-1', 'track-2', 'track-3']));
    expect(pendingAddedIds).toEqual(new Set(['track-3']));
  });

  it('should remove pending ids once server confirms them', () => {
    const { syncedIds, pendingAddedIds } = syncPlaylistTrackIds(
      mockTracks,
      new Set(['track-1', 'track-3'])
    );

    expect(syncedIds).toEqual(new Set(['track-1', 'track-2', 'track-3']));
    expect(pendingAddedIds).toEqual(new Set(['track-3']));
  });

  it('should drop removed server tracks from synced ids', () => {
    const { syncedIds } = syncPlaylistTrackIds(
      [mockTracks[0]],
      new Set(['track-2'])
    );

    expect(syncedIds).toEqual(new Set(['track-1', 'track-2']));
  });
});
