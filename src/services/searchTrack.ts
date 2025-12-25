import { getCurrentToken } from "@/lib/getCurrentToken";

export const searchTrack = async (
  reccomendations: { song: string; artist: string }[],
) => {
  const accessToken = await getCurrentToken();

  const promises = reccomendations.map(async (recommendation) => {
    const query = `track:${recommendation.song} artist:${recommendation.artist}`;
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!response.ok) {
      return;
    }

    return response.json().then((data) => data.tracks.items);
  });

  const data = await Promise.all(promises);
  return data.flat().filter((item) => item !== null);
};
