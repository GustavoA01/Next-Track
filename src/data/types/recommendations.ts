export type PlaylistStatistics = {
  artistsStatistics: {
    id: string
    name: string
    count: number
    image: string
    spotifyUrl: string
  }[]
  genresStatistics: { name: string; value: number; percentage: number }[]
}
