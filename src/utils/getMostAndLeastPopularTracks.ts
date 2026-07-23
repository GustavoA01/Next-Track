import {
  SpotifyPlaylistTrack,
  SpotifyPlaylistTracks,
} from '@/data/types/spotify';

type MostAndLeastPopularTracksReturnType = {
  mostPopular: SpotifyPlaylistTrack | null;
  leastPopular: SpotifyPlaylistTrack | null;
};

export const getMostAndLeastPopularTracks = (
  tracks?: SpotifyPlaylistTracks['items']
): MostAndLeastPopularTracksReturnType => {
  const nullResult = { mostPopular: null, leastPopular: null };
  if (!tracks?.length) return nullResult;

  const tracksWithPopularity = tracks
    .map((item) => item.track)
    .filter((track) => track.popularity > 0);

  if (!tracksWithPopularity.length) return nullResult;

  const sorted = [...tracksWithPopularity].sort((a, b) => {
    if (b.popularity !== a.popularity) return b.popularity - a.popularity;
    return a.name.localeCompare(b.name);
  });

  return {
    mostPopular: sorted[0],
    leastPopular: sorted[sorted.length - 1],
  };
};
