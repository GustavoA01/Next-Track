import { GET } from '@/app/api/auth/refresh/route';
import { refreshAccessToken } from '@/lib/spotify';
import {
  clearSpotifyAuthCookies,
  setSpotifyAuthCookies,
  SPOTIFY_REFRESH_TOKEN_COOKIE,
} from '@/lib/spotifyAuthCookies';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
}));

jest.mock('@/lib/spotify', () => ({
  refreshAccessToken: jest.fn(),
}));

jest.mock('@/lib/spotifyAuthCookies', () => ({
  ...jest.requireActual('@/lib/spotifyAuthCookies'),
  clearSpotifyAuthCookies: jest.fn(),
  setSpotifyAuthCookies: jest.fn(),
}));

describe('GET /api/auth/refresh', () => {
  const mockCookieStore = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const { cookies } = require('next/headers');
    cookies.mockResolvedValue(mockCookieStore);
  });

  it('should redirect to login when refresh token is missing', async () => {
    mockCookieStore.get.mockReturnValue(undefined);

    await expect(GET()).rejects.toThrow('redirect:/');
  });

  it('should refresh tokens and redirect to home on success', async () => {
    mockCookieStore.get.mockReturnValue({ value: 'refresh-token' });
    (refreshAccessToken as jest.Mock).mockResolvedValue({
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    });

    await expect(GET()).rejects.toThrow('redirect:/home');

    expect(refreshAccessToken).toHaveBeenCalledWith('refresh-token');
    expect(setSpotifyAuthCookies).toHaveBeenCalledWith(mockCookieStore, {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    });
    expect(clearSpotifyAuthCookies).not.toHaveBeenCalled();
  });

  it('should clear cookies and redirect to login when refresh fails', async () => {
    mockCookieStore.get.mockReturnValue({ value: 'expired-refresh-token' });
    (refreshAccessToken as jest.Mock).mockRejectedValue(
      new Error('invalid_grant')
    );

    await expect(GET()).rejects.toThrow('redirect:/');

    expect(clearSpotifyAuthCookies).toHaveBeenCalledWith(mockCookieStore);
    expect(setSpotifyAuthCookies).not.toHaveBeenCalled();
  });

  it('should read refresh token from cookie store', async () => {
    mockCookieStore.get.mockReturnValue({ value: 'refresh-token' });
    (refreshAccessToken as jest.Mock).mockResolvedValue({
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    });

    await expect(GET()).rejects.toThrow('redirect:/home');

    expect(mockCookieStore.get).toHaveBeenCalledWith(
      SPOTIFY_REFRESH_TOKEN_COOKIE
    );
  });
});
