import { getChatStorageKey } from '../getChatStorageKey';

describe('getChatStorageKey', () => {
  it('should combine userId and playlistId with colon separator', () => {
    expect(getChatStorageKey('user-abc', 'playlist-xyz')).toBe(
      'user-abc:playlist-xyz'
    );
  });

  it('should generate different keys for different users on same playlist', () => {
    const playlistId = 'playlist-1';

    expect(getChatStorageKey('user-a', playlistId)).not.toBe(
      getChatStorageKey('user-b', playlistId)
    );
  });

  it('should generate different keys for same user on different playlists', () => {
    const userId = 'user-1';

    expect(getChatStorageKey(userId, 'playlist-a')).not.toBe(
      getChatStorageKey(userId, 'playlist-b')
    );
  });

  it('should generate unique keys for each user and playlist pair', () => {
    const keys = new Set([
      getChatStorageKey('user-1', 'playlist-1'),
      getChatStorageKey('user-1', 'playlist-2'),
      getChatStorageKey('user-2', 'playlist-1'),
      getChatStorageKey('user-2', 'playlist-2'),
    ]);

    expect(keys.size).toBe(4);
  });
});
