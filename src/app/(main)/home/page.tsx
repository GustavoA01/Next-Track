import { PlaylistCard } from "@/components/PlaylistCard"
import { SpotifyPlaylist } from "@/data/types"
import { getAccessToken } from "@/lib/getAccessToken"

const Home = async () => {
  const accessToken = await getAccessToken()

  const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Erro na API do Spotify:", response.status, errorText)
    throw new Error(`Falha ao buscar playlists: ${response.status}`)
  }

  const playlistsData = await response.json()

  return (
    <div className="space-y-4 mx-4 mt-4">
      <h2 className="text-lg text-muted-foreground w-200">
        Selecione uma de suas playlists para receber recomendações
        personalizadas.
      </h2>

      <div className="flex flex-wrap gap-4">
        {playlistsData.items.map((playlist: SpotifyPlaylist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            playlistName={playlist.name}
            playlistImage={playlist.images[0]?.url || ""}
            totalTracks={playlist.tracks.total}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
