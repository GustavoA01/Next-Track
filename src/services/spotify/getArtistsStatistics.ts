import { baseSpotifyUrl } from "../constantsKeys";

export const getArtistsStatistics = async (artistIds: string[], accessToken: string) => {
  const rawArtistsData = [];
  const chunkSize = 15;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  for (let i = 0; i < artistIds.length; i += chunkSize) {
    const chunk = artistIds.slice(i, i + chunkSize);

    const chunkPromises = chunk.map(async (uniqueId) => {
      try {
        const cleanId = uniqueId.trim();
        const url = `${baseSpotifyUrl}/artists/${cleanId}`;

        const response = await fetch(url, {
          method: 'GET',
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
      } catch {
        return null;
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    rawArtistsData.push(...chunkResults);

    if (i + chunkSize < artistIds.length) await delay(300);
  }

  return rawArtistsData.filter((artist) => artist !== null);
};
