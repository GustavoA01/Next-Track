import { getCurrentToken } from '@/lib/getCurrentToken';
import { baseSpotifyUrl } from '../../constantsKeys';
import { getPlaylistInfo } from '../getPlaylistInfo';

jest.mock('@/lib/getCurrentToken', () => ({
  getCurrentToken: jest.fn(),
}));

const playlist = {
  id: 'playlist-1',
  name: 'My playlist',
};

describe('getPlaylistInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    (getCurrentToken as jest.Mock).mockResolvedValue('token');
  });

  it('returns the playlist with the current access token', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(playlist),
    });

    const result = await getPlaylistInfo('playlist-1');

    expect(fetch).toHaveBeenCalledWith(
      `${baseSpotifyUrl}/playlists/playlist-1`,
      expect.objectContaining({
        method: 'GET',
        headers: { Authorization: 'Bearer token' },
      })
    );
    expect(result).toEqual({ accessToken: 'token', playlist });
  });

  it('throws when the playlist request fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getPlaylistInfo('missing')).rejects.toThrow(
      'Failed to fetch playlist'
    );
  });
});
