import { getCurrentToken } from '@/lib/getCurrentToken';
import { baseSpotifyUrl } from '../../constantsKeys';
import { getPlaylists } from '../getPlaylists';

jest.mock('@/lib/getCurrentToken', () => ({
  getCurrentToken: jest.fn(),
}));

const playlist = (id: string, isPublic: boolean) => ({
  id,
  name: `Playlist ${id}`,
  public: isPublic,
});

describe('getPlaylists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    (getCurrentToken as jest.Mock).mockResolvedValue('token');
  });

  it('returns only public playlists', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          items: [playlist('public-1', true), playlist('private-1', false)],
        }),
    });

    const result = await getPlaylists();

    expect(fetch).toHaveBeenCalledWith(
      `${baseSpotifyUrl}/me/playlists`,
      expect.objectContaining({
        method: 'GET',
        headers: { Authorization: 'Bearer token' },
      })
    );
    expect(result).toEqual([playlist('public-1', true)]);
  });

  it('throws when the Spotify API fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: () => Promise.resolve('unauthorized'),
    });

    await expect(getPlaylists()).rejects.toThrow(
      'Falha ao buscar playlists: 401'
    );
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
