import { SpotifyPlaylistTrack } from "@/data/types/spotify";

export const searchTrack = async (
  accessToken: string,
  recommendations: { song: string; artist: string }[],
): Promise<SpotifyPlaylistTrack[]> => {
  if (recommendations.length === 0) return [];

  const promises = recommendations.map(async (recommendation) => {
    const query = `track:${recommendation.song} artist:${recommendation.artist}`;
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) return;

    return response.json().then((data) => data.tracks.items);
  });

  const data = await Promise.all(promises);
  return data.flat().filter((item) => item !== null);
};
