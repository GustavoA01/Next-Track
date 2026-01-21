import { SpotifyPlaylist } from "@/data/types/spotify";
import { getPlaylistStatistic } from "@/services/getPlaylistStatistic";
import { PlaylistHeader } from "@/components/Header/PlaylistHeader";
import { getCurrentToken } from "@/lib/getCurrentToken";
import { TabsMenu } from "@/features/Tabs/TabsMenu";

const PlaylistPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const accessToken = await getCurrentToken();

  const playlist: SpotifyPlaylist = await fetch(
    `https://api.spotify.com/v1/playlists/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600, tags: [`playlist-${id}`] },
    },
  )
    .then((res) => res.json())
    .then((data) => data);

  const { artistsStatistics, genresStatistics, tracks, totalDuration } =
    await getPlaylistStatistic(accessToken, id, playlist.tracks.total);

  return (
    <div className="pb-8 h-screen overflow-y-auto custom-scrollbar hide-scrollbar">
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
