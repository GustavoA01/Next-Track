import { cookies } from 'next/headers';
import {
  connectSpotifyAccount,
  fetchProfile,
  getAccessToken,
  refreshAccessToken,
} from '../spotify';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('spotify lib', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID = 'client-id';
    process.env.SPOTIFY_REDIRECT_URI = 'http://127.0.0.1:3000/callback';
    global.fetch = jest.fn();
    (cookies as jest.Mock).mockResolvedValue({
      get: (key: string) =>
        key === 'verifier' ? { value: 'code-verifier' } : undefined,
    });
  });

  describe('getAccessToken', () => {
    it('should exchange authorization code for tokens', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: () =>
          Promise.resolve({
            access_token: 'access-token',
            refresh_token: 'refresh-token',
          }),
      });

      const result = await getAccessToken('client-id', 'auth-code');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        expect.objectContaining({ method: 'POST' })
      );
      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
    });

    it('should throw when Spotify returns an error', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve({ error: 'invalid_grant' }),
      });

      await expect(getAccessToken('client-id', 'bad-code')).rejects.toThrow(
        'Falha ao obter token: invalid_grant'
      );
    });
  });

  describe('connectSpotifyAccount', () => {
    it('should return tokens from authorization code', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        json: () =>
          Promise.resolve({
            access_token: 'access-token',
            refresh_token: 'refresh-token',
          }),
      });

      const result = await connectSpotifyAccount('auth-code');

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
    });
  });

  describe('refreshAccessToken', () => {
    it('should refresh access token', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            access_token: 'new-access-token',
            refresh_token: 'new-refresh-token',
            expires_in: 3600,
          }),
      });

      const result = await refreshAccessToken('refresh-token');

      expect(result).toEqual({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 3600,
      });
    });

    it('should throw when refresh fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
      });

      await expect(refreshAccessToken('invalid-refresh')).rejects.toThrow(
        'Falha ao atualizar token: 401'
      );
    });
  });

  describe('fetchProfile', () => {
    it('should fetch user profile from Spotify', async () => {
      const profile = { id: 'user-1', display_name: 'Gustavo' };
      (global.fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(profile),
      });

      const result = await fetchProfile('access-token');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/me'),
        expect.objectContaining({
          headers: { Authorization: 'Bearer access-token' },
        })
      );
      expect(result).toEqual(profile);
    });
  });
});
