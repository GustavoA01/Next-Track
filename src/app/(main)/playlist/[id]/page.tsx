import { SpotifyPlaylist } from '@/data/types/spotify';
import { getPlaylistStatistic } from '@/services/getPlaylistStatistic';
import { PlaylistHeader } from '@/components/Header/PlaylistHeader';
import { getCurrentToken } from '@/lib/getCurrentToken';
import { TabsMenu } from '@/features/Tabs/TabsMenu';
import { baseSpotifyUrl } from '@/services/constantsKeys';

const PlaylistPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const accessToken = await getCurrentToken();

  const response = await fetch(`${baseSpotifyUrl}/playlists/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: [`playlist-${id}`], revalidate: 3600 },
  });

  if (!response.ok) throw new Error('Failed to fetch playlist');

  const playlist: SpotifyPlaylist = await response.json();

  const { artistsStatistics, genresStatistics, tracks, totalDuration } =
    await getPlaylistStatistic(accessToken, id, playlist.tracks.total);

  return (
    <div className="pb-8 h-screen overflow-y-auto custom-scrollbar hide-scrollbar scroll-smooth">
      <PlaylistHeader
        playlist={playlist}
        accessToken={accessToken}
        totalDuration={totalDuration}
      />

      <div className="mt-10 px-4 container mx-auto sm:px-8 flex flex-col items-center">
        <TabsMenu
          playlist={playlist}
          artistsStatistics={artistsStatistics}
          genresStatistics={genresStatistics}
          tracks={tracks}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
};

export default PlaylistPage;
