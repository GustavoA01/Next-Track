import { getMessages } from '@/services/firebase/getMessages';
import { postMessages } from '@/services/firebase/postMessages';
import { deleteChat } from '@/services/firebase/deleteChat';
import { collection, orderBy, where } from 'firebase/firestore';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';

jest.mock('@/services/firebase/firebaseConfig', () => ({
  db: {},
  chatMessageCollection: 'chatMessages',
}));

const mockGetDocs = jest.fn();
const mockAddDoc = jest.fn();
const mockWriteBatch = jest.fn();
const mockCommit = jest.fn();

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  getDocs: (...args: unknown[]) => mockGetDocs(...args),
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
  writeBatch: (...args: unknown[]) => mockWriteBatch(...args),
  Timestamp: {
    fromDate: (date: Date) => ({ toMillis: () => date.getTime() }),
  },
}));

describe('getMessages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should filter messages by userId and order by createdAt ascending', async () => {
    mockGetDocs.mockResolvedValue({
      docs: [
        {
          data: () => ({
            userId: 'user-1',
            userMessage: 'first',
            createdAt: { toMillis: () => 1 },
          }),
        },
        {
          data: () => ({
            userId: 'user-1',
            userMessage: 'second',
            createdAt: { toMillis: () => 2 },
          }),
        },
      ],
    });

    const messages = await getMessages('playlist-1', 'user-1');

    expect(where).toHaveBeenCalledWith('userId', '==', 'user-1');
    expect(orderBy).toHaveBeenCalledWith('createdAt', 'asc');
    expect(collection).toHaveBeenCalledWith(
      {},
      'playlists',
      'playlist-1',
      'chatMessages'
    );
    expect(messages).toHaveLength(2);
    expect(messages[0].userMessage).toBe('first');
    expect(messages[1].userMessage).toBe('second');
  });

  it('should return empty array when no messages exist', async () => {
    mockGetDocs.mockResolvedValue({ docs: [] });

    const messages = await getMessages('playlist-1', 'user-1');

    expect(messages).toEqual([]);
  });

  it('should return empty array when firebase throws', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockGetDocs.mockRejectedValue(new Error('Firebase error'));

    const messages = await getMessages('playlist-1', 'user-1');

    expect(messages).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should preserve firestore order for messages without createdAt', async () => {
    mockGetDocs.mockResolvedValue({
      docs: [
        { data: () => ({ userMessage: 'no-date' }) },
        {
          data: () => ({
            userMessage: 'with-date',
            createdAt: { toMillis: () => 1 },
          }),
        },
      ],
    });

    const messages = await getMessages('playlist-1', 'user-1');

    expect(orderBy).toHaveBeenCalledWith('createdAt', 'asc');
    expect(messages[0].userMessage).toBe('no-date');
    expect(messages[1].userMessage).toBe('with-date');
  });
});

describe('postMessages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddDoc.mockResolvedValue(undefined);
  });

  it('should save message with userId and all fields', async () => {
    const recommendations = [{ id: 'track-1' }] as SpotifyPlaylistTrack[];

    await postMessages({
      playlistId: 'playlist-1',
      userId: 'user-1',
      userMessageContent: 'hello',
      chatResponse: 'hi',
      recommendations,
    });

    expect(collection).toHaveBeenCalledWith(
      {},
      'playlists',
      'playlist-1',
      'chatMessages'
    );
    expect(mockAddDoc.mock.calls[0][1]).toEqual(
      expect.objectContaining({
        userId: 'user-1',
        userMessage: 'hello',
        chatResponse: 'hi',
        recommendations,
        createdAt: expect.objectContaining({ toMillis: expect.any(Function) }),
      })
    );
  });

  it('should not throw when firebase fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockAddDoc.mockRejectedValue(new Error('Firebase error'));

    await expect(
      postMessages({
        playlistId: 'playlist-1',
        userId: 'user-1',
        userMessageContent: 'hello',
        chatResponse: 'hi',
        recommendations: [],
      })
    ).resolves.toBeUndefined();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('deleteChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCommit.mockResolvedValue(undefined);
    mockWriteBatch.mockReturnValue({
      delete: jest.fn(),
      commit: mockCommit,
    });
  });

  it('should delete all messages from the given user', async () => {
    const deleteMock = jest.fn();
    mockWriteBatch.mockReturnValue({
      delete: deleteMock,
      commit: mockCommit,
    });
    mockGetDocs.mockResolvedValue({
      docs: [{ ref: 'doc-1' }, { ref: 'doc-2' }],
      forEach: (cb: (doc: { ref: string }) => void) => {
        [{ ref: 'doc-1' }, { ref: 'doc-2' }].forEach(cb);
      },
    });

    await deleteChat('playlist-1', 'user-1');

    expect(where).toHaveBeenCalledWith('userId', '==', 'user-1');
    expect(deleteMock).toHaveBeenCalledTimes(2);
    expect(mockCommit).toHaveBeenCalled();
  });

  it('should commit batch even when user has no messages', async () => {
    mockGetDocs.mockResolvedValue({
      docs: [],
      forEach: (cb: (doc: { ref: string }) => void) => {
        [].forEach(cb);
      },
    });

    await deleteChat('playlist-1', 'user-1');

    expect(mockCommit).toHaveBeenCalled();
  });

  it('should not throw when firebase fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockGetDocs.mockRejectedValue(new Error('Firebase error'));

    await expect(deleteChat('playlist-1', 'user-1')).resolves.toBeUndefined();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
