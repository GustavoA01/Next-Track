import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SPOTIFY_ACCESS_TOKEN_COOKIE,
  SPOTIFY_REFRESH_TOKEN_COOKIE,
} from '@/lib/spotifyAuthCookies';

export const getCurrentToken = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get(SPOTIFY_ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookiesStore.get(SPOTIFY_REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) redirect('/');
  if (!accessToken) redirect('/api/auth/refresh');

  return accessToken;
};
