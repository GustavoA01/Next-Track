import { getArtistsStatistics } from '../spotify/getArtistsStatistics';
import { baseSpotifyUrl } from '../constantsKeys';

const artistResponse = (id: string) => ({
  id,
  name: `Artist ${id}`,
  genres: ['pop'],
});

describe('getArtistsStatistics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    (console.warn as jest.Mock).mockRestore();
  });

  it('returns artists from successful requests', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(artistResponse('a1')),
    });

    const result = await getArtistsStatistics(['a1'], 'token');

    expect(fetch).toHaveBeenCalledWith(
      `${baseSpotifyUrl}/artists/a1`,
      expect.objectContaining({
        method: 'GET',
        headers: { Authorization: 'Bearer token' },
      })
    );
    expect(result).toEqual([artistResponse('a1')]);
  });

  it('filters out rate limited and failed requests', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: { get: () => '0' },
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        headers: { get: () => null },
      })
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(artistResponse('ok')),
      });

    const result = await getArtistsStatistics(
      ['limited', 'error', 'crash', 'ok'],
      'token'
    );

    expect(result).toEqual([artistResponse('ok')]);
    expect(console.warn).toHaveBeenCalled();
  });

  it('does not fetch when there are no artist ids', async () => {
    const result = await getArtistsStatistics([], 'token');

    expect(fetch).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
