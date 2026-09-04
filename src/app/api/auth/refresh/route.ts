import { refreshAccessToken } from '@/lib/refreshAccessToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  clearSpotifyAuthCookies,
  setSpotifyAuthCookies,
  SPOTIFY_REFRESH_TOKEN_COOKIE,
} from '@/lib/spotifyAuthCookies';

export const GET = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(SPOTIFY_REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) redirect('/');

  try {
    const { accessToken, refreshToken: newRefreshToken } =
      await refreshAccessToken(refreshToken);

    setSpotifyAuthCookies(cookieStore, {
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Falha ao renovar via rota:', error);
    clearSpotifyAuthCookies(cookieStore);
    redirect('/');
  }

  redirect('/home');
};
