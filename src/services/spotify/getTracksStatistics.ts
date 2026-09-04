import {
  SpotifyPlaylistTrack,
  SpotifyPlaylistTracks,
} from '@/data/types/spotify';
import { baseSpotifyUrl } from '../constantsKeys';

export const getTracksStatistics = async (
  playlistId: string,
  accessToken: string,
  totalTracks: number
) => {
  const tracks: SpotifyPlaylistTracks['items'] = [];
  let totalCopy = totalTracks;
  let offSetCount = 0;
  let totalDuration = 0;

  while (totalCopy > 50) {
    const tracksResponse = await fetch(
      `${baseSpotifyUrl}/playlists/${playlistId}/tracks?offset=${offSetCount}&limit=50`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 3600 },
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    tracks.push(...tracksResponse.items);

    totalCopy -= 50;
    offSetCount += 50;
    totalDuration += tracksResponse.items.reduce(
      (sum: number, item: { track: SpotifyPlaylistTrack }) =>
        sum + item.track.duration_ms,
      0
    );
  }

  if (totalCopy > 0) {
    const url = `${baseSpotifyUrl}/playlists/${playlistId}/tracks?offset=${offSetCount}&limit=${totalCopy}`;
    const tracksResponse = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 3600 },
    })
      .then((res) => res.json())
      .then((data) => data);

    tracks.push(...tracksResponse.items);
    totalDuration += tracksResponse.items.reduce(
      (sum: number, item: { track: SpotifyPlaylistTrack }) =>
        sum + item.track.duration_ms,
      0
    );
  }

  return { tracks, totalDuration };
};
