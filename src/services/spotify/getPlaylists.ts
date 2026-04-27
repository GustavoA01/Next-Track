import { getCurrentToken } from '@/lib/getCurrentToken';
import { baseSpotifyUrl } from '../constantsKeys';
import { SpotifyPlaylist } from '@/data/types/spotify';

export const getPlaylists = async () => {
  const accessToken = await getCurrentToken();

  const response = await fetch(`${baseSpotifyUrl}/me/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erro na API do Spotify:', response.status, errorText);
    throw new Error(`Falha ao buscar playlists: ${response.status}`);
  }

  const playlistsData = (await response.json().then((playlists) => {
    return playlists.items.filter(
      (playlist: SpotifyPlaylist) => playlist.public
    );
  })) as SpotifyPlaylist[];

  return playlistsData;
};
