import { SearchCards } from '@/components/SearchCards';
import { Header } from '@/components/Header';
import { getPlaylists } from '@/services/spotify/getPlaylists';

const HomePage = async () => {
  const playlistsData = await getPlaylists();

  return (
    <div className="h-dvh overflow-y-auto custom-scrollbar hide-scrollbar scroll-smooth">
      <Header />
      <div className="flex flex-col space-y-4 pb-10">
        <h2
          id="title-home"
          className="sm:text-lg text-muted-foreground container mx-auto px-4 sm:px-8"
        >
          Selecione uma de suas playlists para receber recomendações
          personalizadas
        </h2>
        <SearchCards playlistsData={playlistsData} />
      </div>
    </div>
  );
};

export default HomePage;
