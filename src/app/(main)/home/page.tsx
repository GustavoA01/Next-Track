import { SearchCards } from '@/components/SearchCards';
import { Header } from '@/components/Header';
import { getPlaylists } from '@/services/spotify/getPlaylists';

const HomePage = async () => {
  const playlistsData = await getPlaylists();

  return (
    <div>
      <Header />
      <div className="flex flex-col custom-scrollbar hide-scrollbar overflow-y-auto flex-1 space-y-4 h-dvh pb-10">
        <h2 className=" sm:text-lg text-muted-foreground container mx-auto px-4 sm:px-8">
          Selecione uma de suas playlists para receber recomendações
          personalizadas.
        </h2>

        <SearchCards playlistsData={playlistsData} />
      </div>
    </div>
  );
};

export default HomePage;
