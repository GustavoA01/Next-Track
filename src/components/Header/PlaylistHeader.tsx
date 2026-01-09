import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types/spotify";
import { MenuOptions } from "@/features/Menu/container/MenuOptions";
import playlistFallbackImage from "@/assets/playlistFallback.svg";
import { HeaderPlaylistInfo } from "./HeaderPlaylistInfo";
import { getAverageColor } from "fast-average-color-node";
import { GoBack } from "@/components/GoBack";
import Image from "next/image";
import { msFormatter } from "@/utils/msFormatter";
import { fetchProfile } from "@/lib/spotify";

type PlaylistHeaderProps = {
  playlist: SpotifyPlaylist;
  accessToken: string;
  totalDuration?: number;
};

export const PlaylistHeader = async ({
  playlist,
  accessToken,
  totalDuration,
}: PlaylistHeaderProps) => {
  const profile: SpotifyUserProfile = await fetchProfile(accessToken);
  const { hours, minutes } = msFormatter(totalDuration || 0);
  const timeText = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

  let colorHex = "#121212";
  let imageUrl = playlistFallbackImage;

  if (playlist.images !== null) {
    if (playlist.images[0].url) {
      const response = await fetch(playlist.images[0].url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const color = await getAverageColor(buffer);
      colorHex = color.hex;
      imageUrl = playlist.images[0].url;
    }
  }

  return (
    <div
      style={{
        background: `linear-gradient(to bottom, ${colorHex} 50%, transparent 100%)`,
      }}
      className="py-4 select-none"
    >
      <div className="flex justify-between mb-10 items-center px-4 container mx-auto sm:px-8">
        <GoBack />
        <MenuOptions profile={profile} />
      </div>

      <div className="flex flex-col px-4 sm:px-8 sm:flex-row max-sm:items-center items-end justify-center gap-4">
        <Image
          width={250}
          height={250}
          quality={100}
          src={imageUrl}
          loading="eager"
          alt={playlist.name}
          className="max-sm:m-auto rounded-lg aspect-square lg:w-[23%] sm:h-auto shadow-lg object-cover"
        />

        <div className="flex flex-col max-sm:items-center max-w-2xl">
          <p className="text-muted-foreground md:text-lg font-semibold drop-shadow-lg">
            PLAYLIST
          </p>
          <HeaderPlaylistInfo playlist={playlist} timeText={timeText} />
          <h1 className="text-3xl font-bold max-w-lg font-montserrat mt-4 line-clamp-2 sm:text-4xl lg:text-5xl">
            {playlist.name}
          </h1>
        </div>
      </div>
    </div>
  );
};
