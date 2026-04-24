'use server';
import { baseSpotifyUrl } from '@/services/constantsKeys';
import { AddToPlaylistProps } from '@/data/types/actions';
import { updateTag } from 'next/cache';

export const addToPlaylist = async ({
  jsonUris,
  playlistId,
  accessToken,
}: AddToPlaylistProps) => {
  try {
    const response = await fetch(
      `${baseSpotifyUrl}/playlists/${playlistId}/tracks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(jsonUris),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro Spotify:', errorData);
      return { success: false, error: 'Falha ao adicionar música' };
    }

    updateTag(`playlist-${playlistId}`);
    return { success: true };
  } catch (error) {
    console.error('Ocorreu um erro ao adicionar à playlist: ', error);
  }
};
