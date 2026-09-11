import { SpotifyPlaylistTracks } from '@/data/types/spotify';
import { MostAndLeastPopularTracksReturnType } from '@/data/types/utils';

export const getMostAndLeastPopularTracks = (
  tracks?: SpotifyPlaylistTracks['items']
): MostAndLeastPopularTracksReturnType => {
  const nullResult = { mostPopular: null, leastPopular: null };
  if (!tracks?.length) return nullResult;

  const playlistTracks = tracks
    .map((item) => item.track)
    .filter(
      (track) => Boolean(track?.id) && Boolean(track?.external_urls?.spotify)
    );

  if (!playlistTracks.length) return nullResult;

  const sorted = [...playlistTracks].sort((a, b) => {
    if (b.popularity !== a.popularity) return b.popularity - a.popularity;
    return a.name.localeCompare(b.name);
  });

  return {
    mostPopular: sorted[0],
    leastPopular: sorted[sorted.length - 1],
  };
};
