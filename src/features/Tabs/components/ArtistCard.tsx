import playlistFallbackImage from "@/assets/playlistFallback.svg";
import Image from "next/image";
import Link from "next/link";

type ArtistCardProps = {
  index: number;
  palleteColor: string;
  artist: {
    id: string;
    name: string;
    count: number;
    image: string;
    spotifyUrl: string;
  };
};

export const ArtistCard = ({
  artist,
  index,
  palleteColor,
}: ArtistCardProps) => (
  <Link className="group" href={artist.spotifyUrl} target="_blank">
    <div className="relative overflow-hidden rounded-lg min-w-37.5 min-h-37.5 sm:w-full md:h-auto border-b-rounded-lg">
      <p
        style={{
          color: palleteColor,
          textShadow: `0 0 10px ${palleteColor}`,
        }}
        className="absolute z-10 left-5 top-2 text-lg sm:text-xl font-semibold "
      >
        {index + 1}
      </p>

      <Image
        src={artist.image ?? playlistFallbackImage}
        width={150}
        height={150}
        alt={artist.name}
        className="group-hover:scale-110 aspect-square transition-all duration-300 rounded-lg md:w-full md:h-auto object-cover"
      />
      <div
        style={{
          background: `linear-gradient(to top, ${palleteColor} 50%, transparent 100%)`,
        }}
        className="w-full h-15 absolute bottom-1.5 rounded-b-lg flex items-center justify-center"
      ></div>

      <div className="flex items-center justify-center w-full h-12 backdrop-blur-md absolute bottom-0 rounded-b-lg">
        <div className="text-center">
          <p className="text-white max-sm:text-sm font-semibold font-jakarta line-clamp-1 ">
            {artist.name}
          </p>
          <p className="text-white text-xs">{artist.count} músicas</p>
        </div>
      </div>
    </div>
  </Link>
);
