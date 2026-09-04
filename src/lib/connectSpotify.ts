import { getAccessToken } from './getAccessToken';

export const connectSpotifyAccount = async (code: string) => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const { accessToken, refreshToken } = await getAccessToken(clientId!, code);
  return { accessToken, refreshToken };
};

