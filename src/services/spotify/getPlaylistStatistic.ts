import { PlaylistStatisticsType } from '@/data/types/recommendations';
import {
  SpotifyArtist,
  SpotifyPlaylistTrack,
} from '@/data/types/spotify';
import { getArtistsStatistics } from './getArtistsStatistics';
import { getTracksStatistics } from './getTracksStatistics';

export const getPlaylistStatistic = async (
  accessToken: string,
  playlistId: string,
  totalTracks: number
): Promise<PlaylistStatisticsType> => {
  const { tracks, totalDuration } = await getTracksStatistics(playlistId, accessToken, totalTracks);

  const artistCount: Record<string, number> = {};
  const artistIds = new Set<string>();

  tracks.forEach((item: { track: SpotifyPlaylistTrack }) => {
    const mainArtist = item.track.artists[0];
    if (mainArtist) {
      artistCount[mainArtist.id] = (artistCount[mainArtist.id] || 0) + 1;
      artistIds.add(mainArtist.id);
    }
  });

  const artists = await getArtistsStatistics(Array.from(artistIds), accessToken);

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
    })
    .sort(
      (a, b) => b.count - a.count
    ) as PlaylistStatisticsType['artistsStatistics'];

  const genresStatistics = Object.entries(genresCount)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({
      name,
      value: Number(count),
      percentage: Number(((count / totalGenres) * 100).toFixed(2)),
    }));

  return {
    artistsStatistics,
    genresStatistics,
    totalDuration,
    tracks,
  };
};
