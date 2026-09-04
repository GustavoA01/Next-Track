import { SpotifyUserProfile } from '@/data/types/spotify';
import { baseSpotifyUrl } from '@/services/constantsKeys';

export const fetchProfile = async (
  token: string
): Promise<SpotifyUserProfile> => {
  const result = await fetch(`${baseSpotifyUrl}/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return await result.json();
};
