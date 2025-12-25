import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types/spotify";
import { getPlaylistStatistic } from "@/services/getPlaylistStatistic";
import { PlaylistHeader } from "@/components/Header/PlaylistHeader";
import { ChatContent } from "@/features/Chat/container/ChatContent";
import { DiscoverContentSkeleton } from "@/components/Skeletons";
import { TabsMenu } from "@/features/Tabs/container/TabsMenu";
import { getCurrentToken } from "@/lib/getCurrentToken";
import { fetchProfile } from "@/lib/spotify";
import { Suspense } from "react";

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

  const { artistsStatistics, genresStatistics, tracks, totalDuration } =
    await getPlaylistStatistic(accessToken, id, playlist.tracks.total);

  return (
    <div className="pb-8 h-screen overflow-y-auto custom-scrollbar hide-scrollbar">
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
          chatContent={
            <Suspense fallback={<DiscoverContentSkeleton key={id} />}>
              <ChatContent
                artistsStatistics={artistsStatistics}
                genresStatistics={genresStatistics}
                tracks={tracks}
              />
            </Suspense>
          }
        />
      </div>
    </div>
  );
};

export default PlaylistPage;
