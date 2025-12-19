export type PlaylistStatistics = {
  artistsStatistics: {
    id: string
    name: string
    count: number
    image: string
  }[]
  genresStatistics: { name: string; value: number; percentage: number }[]
}
