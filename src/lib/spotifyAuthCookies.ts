import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const SPOTIFY_ACCESS_TOKEN_COOKIE = 'spotifyAccessToken';
export const SPOTIFY_REFRESH_TOKEN_COOKIE = 'spotifyRefreshToken';

export const SPOTIFY_ACCESS_TOKEN_MAX_AGE = 60 * 60;
export const SPOTIFY_REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 180;

const cookieBaseOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
} satisfies Partial<ResponseCookie>;

type CookieStore = {
  set: (name: string, value: string, options?: Partial<ResponseCookie>) => void;
  delete: (name: string) => void;
};

export const clearSpotifyAuthCookies = (cookieStore: CookieStore) => {
  cookieStore.delete(SPOTIFY_ACCESS_TOKEN_COOKIE);
  cookieStore.delete(SPOTIFY_REFRESH_TOKEN_COOKIE);
};

export const setSpotifyAuthCookies = (
  cookieStore: CookieStore,
  {
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken?: string;
  }
) => {
  cookieStore.set(SPOTIFY_ACCESS_TOKEN_COOKIE, accessToken, {
    ...cookieBaseOptions,
    maxAge: SPOTIFY_ACCESS_TOKEN_MAX_AGE,
  });

  if (refreshToken) {
    cookieStore.set(SPOTIFY_REFRESH_TOKEN_COOKIE, refreshToken, {
      ...cookieBaseOptions,
      maxAge: SPOTIFY_REFRESH_TOKEN_MAX_AGE,
    });
  }
};
