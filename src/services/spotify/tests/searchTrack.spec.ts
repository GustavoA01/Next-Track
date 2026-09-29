import { searchTrack } from '../searchTrack';

describe('searchTrack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (globalThis as typeof globalThis & { fetch: jest.Mock }).fetch = jest.fn();
  });

  it('fetches tracks and returns a flattened items list', async () => {
    const recommendations = [
      { song: 'Track 1', artist: 'Artist One' },
      { song: 'Track 2', artist: 'Artist Two' },
    ];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ tracks: { items: [{ id: '1' }] } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ tracks: { items: [{ id: '2' }] } }),
      });

    const result = await searchTrack('token', recommendations);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain(
      'q=track%3ATrack%201%20artist%3AArtist%20One'
    );
    expect(
      (global.fetch as jest.Mock).mock.calls[0][1].headers.Authorization
    ).toBe('Bearer token');
    expect(result).toEqual([{ id: '1' }, { id: '2' }]);
  });

  it('returns an empty list when there are no recommendations', async () => {
    const result = await searchTrack('token', []);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('skips failed search requests', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ tracks: { items: [{ id: '2' }] } }),
      });

    const result = await searchTrack('token', [
      { song: 'Missing', artist: 'Nobody' },
      { song: 'Track 2', artist: 'Artist Two' },
    ]);

    expect(result).toEqual([undefined, { id: '2' }]);
  });

  it('returns an empty list when fetch throws', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    (global.fetch as jest.Mock).mockRejectedValue(new Error('network'));

    const result = await searchTrack('token', [
      { song: 'Track 1', artist: 'Artist One' },
    ]);

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
