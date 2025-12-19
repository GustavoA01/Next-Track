import { PlaylistCard } from "@/components/PlaylistCard"
import { SpotifyPlaylist } from "@/data/types/spotify"
import { Header } from "@/components/Header"
import { getCurrentToken } from "@/lib/getCurrentToken"

const Home = async () => {
  const accessToken = await getCurrentToken()

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

  const playlistsData = await response.json().then((playlists) => {
    return playlists.items.filter(
      (playlist: SpotifyPlaylist) => playlist.public
    )
  })

  return (
    <>
    <Header />
    <div className="flex flex-col custom-scrollbar hide-scrollbar overflow-y-auto flex-1 space-y-4 px-4 h-dvh pb-10">
      <h2 className="w-full sm:w-200 text-base sm:text-lg text-muted-foreground">
        Selecione uma de suas playlists para receber recomendações
        personalizadas.
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 pb-16">
        {playlistsData.map((playlist: SpotifyPlaylist) => (
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
        </>
  )
}

export default Home
