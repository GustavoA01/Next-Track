import { getCurrentToken } from "@/lib/getCurrentToken";
import { SpotifyPlaylist } from "@/data/types/spotify";
import { SearchCards } from "@/components/SearchCards";
import { Header } from "@/components/Header";

const HomePage = async () => {
  const accessToken = await getCurrentToken();

  const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro na API do Spotify:", response.status, errorText);
    throw new Error(`Falha ao buscar playlists: ${response.status}`);
  }

  const playlistsData = (await response.json().then((playlists) => {
    return playlists.items.filter(
      (playlist: SpotifyPlaylist) => playlist.public,
    );
  })) as SpotifyPlaylist[];

  return (
    <div>
      <Header />
      <div className="flex flex-col custom-scrollbar hide-scrollbar overflow-y-auto flex-1 space-y-4 px-4 h-dvh pb-10">
        <h2 className="w-full sm:w-200 text-base sm:text-lg text-muted-foreground">
          Selecione uma de suas playlists para receber recomendações
          personalizadas.
        </h2>

        <SearchCards playlistsData={playlistsData} />
      </div>
    </div>
  );
};

export default HomePage;
