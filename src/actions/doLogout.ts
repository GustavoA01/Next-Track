'use server';
import { clearSpotifyAuthCookies } from '@/lib/spotifyAuthCookies';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

export const doLogout = async () => {
  const cookiesStore = await cookies();

  clearSpotifyAuthCookies(cookiesStore);

  redirect('/', RedirectType.replace);
};
