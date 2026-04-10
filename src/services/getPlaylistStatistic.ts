import { PlaylistStatisticsType } from '@/data/types/recommendations';
import {
  SpotifyArtist,
  SpotifyPlaylistTrack,
  SpotifyPlaylistTracks,
} from '@/data/types/spotify';

export const getPlaylistStatistic = async (
  accessToken: string,
  playlistId: string,
  totalTracks: number
): Promise<PlaylistStatisticsType> => {
  const tracks: SpotifyPlaylistTracks['items'] = [];
  let totalCopy = totalTracks;
  let offSetCount = 0;

  let totalDuration = 0;

  while (totalCopy > 50) {
    const tracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offSetCount}&limit=50`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    tracks.push(...tracksResponse.items);

    totalDuration += tracksResponse.items.reduce(
      (sum: number, item: { track: SpotifyPlaylistTrack }) =>
        sum + item.track.duration_ms,
      0
    );
    offSetCount += 50;
    totalCopy -= 50;
  }

  if (totalCopy > 0) {
    const tracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offSetCount}&limit=${totalCopy}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 3600 },
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    tracks.push(...tracksResponse.items);
    totalDuration += tracksResponse.items.reduce(
      (sum: number, item: { track: SpotifyPlaylistTrack }) =>
        sum + item.track.duration_ms,
      0
    );
  }

  const artistCount: Record<string, number> = {};
  const artistIds = new Set<string>();

  tracks.forEach((item: { track: SpotifyPlaylistTrack }) => {
    const mainArtist = item.track.artists[0];
    if (mainArtist) {
      artistCount[mainArtist.id] = (artistCount[mainArtist.id] || 0) + 1;
      artistIds.add(mainArtist.id);
    }
  });

  const unifiquedIdsArray = Array.from(artistIds);
  const rawArtistsData = [];
  const chunkSize = 15;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  for (let i = 0; i < unifiquedIdsArray.length; i += chunkSize) {
    const chunk = unifiquedIdsArray.slice(i, i + chunkSize);

    const chunkPromises = chunk.map(async (uniqueId) => {
      try {
        const cleanId = uniqueId.trim();
        const url = `https://api.spotify.com/v1/artists/${cleanId}`;

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
          next: { revalidate: 3600 },
        });

        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After') || '1';
          console.warn(`Rate limit atingido. Pausa de ${retryAfter}s.`);
          await delay(parseInt(retryAfter) * 1000);
          return null;
        }

        if (!response.ok) return null;
        return await response.json();
      } catch (error) {
        return null;
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    rawArtistsData.push(...chunkResults);

    if (i + chunkSize < unifiquedIdsArray.length) await delay(300);
  }
  const artists = rawArtistsData.filter((artist) => artist !== null);

  const genresCount: Record<string, number> = {};
  let totalGenres = 0;

  const artistsStatistics = artists
    .filter((artist: SpotifyArtist) => artist && artist.genres)
    .map((artist: SpotifyArtist) => {
      artist.genres.forEach((genre: string) => {
        genresCount[genre] = (genresCount[genre] || 0) + 1;
        totalGenres++;
      });

      return {
        id: artist.id,
        name: artist.name,
        count: artistCount[artist.id],
        image: artist.images[0]?.url || '',
        spotifyUrl: artist.external_urls.spotify,
      };
    }) as {
    id: string;
    name: string;
    count: number;
    image: string;
    spotifyUrl: string;
  }[];

  const genresStatistics = Object.entries(genresCount)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({
      name,
      value: Number(count),
      percentage: Number(((count / totalGenres) * 100).toFixed(2)),
    }));

  artistsStatistics.sort((a, b) => b.count - a.count);

  return {
    artistsStatistics,
    genresStatistics,
    totalDuration,
    tracks,
  };
};
