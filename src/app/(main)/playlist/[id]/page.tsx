import { getPlaylistStatistic } from '@/services/spotify/getPlaylistStatistic';
import { PlaylistHeader } from '@/components/Header/PlaylistHeader';
import { TabsMenu } from '@/features/Tabs/TabsMenu';
import { getPlaylistInfo } from '@/services/spotify/getPlaylistInfo';
import { fetchProfile } from '@/lib/spotify';

const PlaylistPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { accessToken, playlist } = await getPlaylistInfo(id);
  const profile = await fetchProfile(accessToken);

  const { artistsStatistics, genresStatistics, tracks, totalDuration } =
    await getPlaylistStatistic(accessToken, id, playlist.tracks.total);

  return (
    <div className="pb-8 h-screen overflow-y-auto custom-scrollbar hide-scrollbar scroll-smooth">
      <PlaylistHeader
        playlist={playlist}
        profile={profile}
        totalDuration={totalDuration}
      />

      <div className="mt-10 px-4 container mx-auto sm:px-8 flex flex-col items-center">
        <TabsMenu
          playlist={playlist}
          artistsStatistics={artistsStatistics}
          genresStatistics={genresStatistics}
          tracks={tracks}
          accessToken={accessToken}
          userId={profile.id}
        />
      </div>
    </div>
  );
};

export default PlaylistPage;
