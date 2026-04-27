import { getCurrentToken } from '@/lib/getCurrentToken';
import { baseSpotifyUrl } from '../constantsKeys';
import { SpotifyPlaylist } from '@/data/types/spotify';

export const getPlaylistInfo = async (playlistId: string) => {
  const accessToken = await getCurrentToken();

  const response = await fetch(`${baseSpotifyUrl}/playlists/${playlistId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: [`playlist-${playlistId}`], revalidate: 3600 },
  });

  if (!response.ok) throw new Error('Failed to fetch playlist');

  const playlist: SpotifyPlaylist = await response.json();

  return { accessToken, playlist };
};
