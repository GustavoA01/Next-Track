import { GoBack } from "@/components/GoBack";
import { SpotifyPlaylist, SpotifyUserProfile } from "@/data/types/spotify";
import { MenuOptions } from "@/features/Menu/container/MenuOptions";
import { HeaderPlaylistInfo } from "./HeaderPlaylistInfo";
import { getAverageColor } from "fast-average-color-node";
import playlistFallbackImage from "@/assets/playlistFallback.svg";
import Image from "next/image";

type PlaylistHeaderProps = {
  playlist: SpotifyPlaylist;
  profile: SpotifyUserProfile;
};

export const PlaylistHeader = async ({
  playlist,
  profile,
}: PlaylistHeaderProps) => {
  const totalDuration = playlist.tracks.items.reduce((acc, item) => {
    return acc + item.track.duration_ms;
  }, 0);

  const hours = Math.floor(totalDuration / 3600000);
  const minutes = Math.floor((totalDuration % 3600000) / 60000);
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
        background: `linear-gradient(to bottom, ${colorHex} 80%, transparent 100%)`,
      }}
      className="py-4"
    >
      <div className="flex justify-between mb-10 items-center px-4">
        <GoBack />
        <MenuOptions profile={profile} />
      </div>

      <div className="flex flex-col sm:flex-row max-sm:items-center items-end justify-center gap-4">
        <Image
          className="max-sm:m-auto rounded-lg aspect-square lg:w-[23%] sm:h-auto shadow-lg object-cover"
          loading="eager"
          src={imageUrl}
          alt={playlist.name}
          width={250}
          height={250}
        />

        <div className="flex flex-col max-sm:items-center">
          <p className="text-muted-foreground md:text-lg font-semibold">
            PLAYLIST
          </p>
          <HeaderPlaylistInfo playlist={playlist} timeText={timeText} />
          <h1 className="text-3xl font-bold font-montserrat mt-4 line-clamp-2 sm:text-4xl lg:text-5xl pb-2">
            {playlist.name}
          </h1>
        </div>
      </div>
    </div>
  );
};
