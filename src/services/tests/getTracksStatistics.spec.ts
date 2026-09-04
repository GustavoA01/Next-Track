import { getTracksStatistics } from '../spotify/getTracksStatistics';
import { baseSpotifyUrl } from '../constantsKeys';

const trackItem = (id: string, durationMs: number) => ({
  track: { id, duration_ms: durationMs },
});

const jsonResponse = (items: ReturnType<typeof trackItem>[]) => ({
  json: () => Promise.resolve({ items }),
});

describe('getTracksStatistics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('fetches a single page when total is 50 or less', async () => {
    const items = [trackItem('t1', 1000), trackItem('t2', 2000)];
    (fetch as jest.Mock).mockResolvedValueOnce(jsonResponse(items));

    const result = await getTracksStatistics('playlist-1', 'token', 2);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${baseSpotifyUrl}/playlists/playlist-1/tracks?offset=0&limit=2`,
      expect.objectContaining({
        method: 'GET',
        headers: { Authorization: 'Bearer token' },
      })
    );
    expect(result.tracks).toHaveLength(2);
    expect(result.totalDuration).toBe(3000);
  });

  it('paginates when total is greater than 50', async () => {
    const firstPage = [trackItem('t1', 1000), trackItem('t2', 2000)];
    const secondPage = [trackItem('t3', 4000)];

    (fetch as jest.Mock)
      .mockResolvedValueOnce(jsonResponse(firstPage))
      .mockResolvedValueOnce(jsonResponse(secondPage));

    const result = await getTracksStatistics('playlist-1', 'token', 51);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      `${baseSpotifyUrl}/playlists/playlist-1/tracks?offset=0&limit=50`,
      expect.any(Object)
    );
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      `${baseSpotifyUrl}/playlists/playlist-1/tracks?offset=50&limit=1`,
      expect.any(Object)
    );
    expect(result.tracks.map((item) => item.track.id)).toEqual([
      't1',
      't2',
      't3',
    ]);
    expect(result.totalDuration).toBe(7000);
  });

  it('returns empty data when total is 0', async () => {
    const result = await getTracksStatistics('playlist-1', 'token', 0);

    expect(fetch).not.toHaveBeenCalled();
    expect(result).toEqual({ tracks: [], totalDuration: 0 });
  });
});
