import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types/spotify";
import { PlaylistHeader } from "@/components/Header/PlaylistHeader";
import { getPlaylistStatistic } from "@/services/getPlaylistStatistic";
import { TabsMenu } from "@/features/Tabs/container/TabsMenu";
import { getCurrentToken } from "@/lib/getCurrentToken";
import { fetchProfile } from "@/lib/spotify";
import { geminiRquest } from "@/actions/geminiRequest";

const PlaylistPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const accessToken = await getCurrentToken();
  const profile: SpotifyUserProfile = await fetchProfile(accessToken);

  const playlist: SpotifyPlaylist = await fetch(
    `https://api.spotify.com/v1/playlists/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600 },
    },
  )
    .then((res) => res.json())
    .then((data) => data);

  const { artistsStatistics, genresStatistics, tracks } =
    await getPlaylistStatistic(accessToken, id, playlist.tracks.total);

  // await geminiRquest({
  //   artistsStatistics: artistsStatistics.slice(0, 5),
  //   genresStatistics: genresStatistics.slice(0, 5),
  //   tracks,
  //   prompt: "",
  // })

  return (
    <div className="pb-8 h-screen overflow-y-auto custom-scrollbar hide-scrollbar">
      <PlaylistHeader playlist={playlist} profile={profile} />

      <div className="mt-10 px-4 sm:px-8 flex flex-col items-center w-full 2xl:px-64">
        <TabsMenu
          playlist={playlist}
          artistsStatistics={artistsStatistics}
          genresStatistics={genresStatistics}
        />
      </div>
    </div>
  );
};

export default PlaylistPage;
