import { SpotifyArtist, SpotifyPlaylistTrack } from "@/data/types";

type StatisticsResult = {
  topArtists: { name: string; count: number; image: string }[];
  topGenres: { name: string; percentage: number }[];
}

export const getRecommendationsByGenre = async (accessToken: string, playlistId: string): Promise<StatisticsResult> => {
  const tracks = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then((res) => res.json())
    .then((data) => data)

  console.log("TRACKS:", tracks)

  const artistCount: Record<string, number> = {};
  const artistIds = new Set<string>();

  tracks.items.forEach((item: { track: SpotifyPlaylistTrack }) => {
    const mainArtist = item.track.artists[0];
    if (mainArtist) {
      artistCount[mainArtist.id] = (artistCount[mainArtist.id] || 0) + 1;
      artistIds.add(mainArtist.id);
    }
  })

  const unifiquedIdsArray = Array.from(artistIds)
  const uniqueIds = unifiquedIdsArray.length > 50 ? unifiquedIdsArray.slice(0, 50).join(',') : unifiquedIdsArray.join(',')

  const artists = await fetch(`https://api.spotify.com/v1/artists?ids=${uniqueIds}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)

  const genresCount: Record<string, number> = {};
  let totalGenres = 0

  const topArtists = artists.artists.map((artist: SpotifyArtist) => {
    if (!artists) return

    artist.genres.forEach((genre: string) => {
      genresCount[genre] = (genresCount[genre] || 0) + 1;
      totalGenres++;
    })

    return {
      name: artist.name,
      count: artistCount[artist.id],
      image: artist.images[0]?.url || '',
    }
  })

  topArtists.sort((a: { count: number }, b: { count: number }) => b.count - a.count)

  const topGenres = Object.entries(genresCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalGenres) * 100)
    }));

  console.log(topGenres)
  console.log(topArtists.slice(0, 5))

  return {
    topArtists: topArtists.slice(0, 5),
    topGenres: topGenres,
  }
}