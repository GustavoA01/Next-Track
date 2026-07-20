import { connectSpotifyAccount } from '@/lib/spotify';
import { setSpotifyAuthCookies } from '@/lib/spotifyAuthCookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const redirectToHome = new URL('/home', request.url);
  const redirectLogin = new URL('/', request.url);

  if (error || !code) {
    console.error('Spotify Authorization Error:', error);
    return NextResponse.redirect(redirectLogin);
  }

  const { accessToken, refreshToken } = await connectSpotifyAccount(code);

  try {
    if (!accessToken) throw new Error('Access token não encontrado');

    const cookiesStore = await cookies();

    setSpotifyAuthCookies(cookiesStore, { accessToken, refreshToken });

    return NextResponse.redirect(redirectToHome);
  } catch (error) {
    console.error('Erro ao conectar à conta do Spotify:', error);
    return NextResponse.redirect(redirectLogin);
  }
};
