import { SpotifyPlaylistTracks } from "@/data/types/spotify";

export const getTrackPopularity = (tracks: SpotifyPlaylistTracks) => {
  const popularityDictionary: Record<number, number> = {};

  tracks.items.forEach((item) => {
    const popularity = item.track.popularity;
    popularityDictionary[popularity] =
      (popularityDictionary[popularity] || 0) + 1;
  });

  const chartData = Object.entries(popularityDictionary).map(
    ([popularity, count]) => ({
      popularity: Number(popularity),
      count,
    }),
  );

  return chartData;
};
