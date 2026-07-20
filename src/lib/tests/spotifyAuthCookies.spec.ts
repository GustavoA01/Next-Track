import {
  clearSpotifyAuthCookies,
  setSpotifyAuthCookies,
  SPOTIFY_ACCESS_TOKEN_COOKIE,
  SPOTIFY_ACCESS_TOKEN_MAX_AGE,
  SPOTIFY_REFRESH_TOKEN_COOKIE,
  SPOTIFY_REFRESH_TOKEN_MAX_AGE,
} from '../spotifyAuthCookies';

describe('spotifyAuthCookies', () => {
  it('should use six month max age for refresh token cookie', () => {
    expect(SPOTIFY_REFRESH_TOKEN_MAX_AGE).toBe(60 * 60 * 24 * 180);
  });

  it('should clear spotify auth cookies', () => {
    const cookieStore = {
      set: jest.fn(),
      delete: jest.fn(),
    };

    clearSpotifyAuthCookies(cookieStore);

    expect(cookieStore.delete).toHaveBeenCalledWith(
      SPOTIFY_ACCESS_TOKEN_COOKIE
    );
    expect(cookieStore.delete).toHaveBeenCalledWith(
      SPOTIFY_REFRESH_TOKEN_COOKIE
    );
  });

  it('should set access and refresh token cookies', () => {
    const cookieStore = {
      set: jest.fn(),
      delete: jest.fn(),
    };

    setSpotifyAuthCookies(cookieStore, {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    expect(cookieStore.set).toHaveBeenCalledWith(
      SPOTIFY_ACCESS_TOKEN_COOKIE,
      'access-token',
      expect.objectContaining({ maxAge: SPOTIFY_ACCESS_TOKEN_MAX_AGE })
    );
    expect(cookieStore.set).toHaveBeenCalledWith(
      SPOTIFY_REFRESH_TOKEN_COOKIE,
      'refresh-token',
      expect.objectContaining({ maxAge: SPOTIFY_REFRESH_TOKEN_MAX_AGE })
    );
  });
});
