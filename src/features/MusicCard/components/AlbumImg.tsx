import { Play } from "lucide-react";
import Image from "next/image";

export const AlbumImg = ({ src }: { src: string }) => (
  <div className="relative max-md:max-w-14 max-w-18 h-auto overflow-hidden rounded-lg">
    <div className="group-hover/card:flex items-center justify-center absolute inset-0 z-50 transition-all duration-300 group-hover/card:bg-black/70 rounded-lg">
      <Play
        data-testid="svg-play"
        className="w-6 h-6 text-primary hidden group-hover/card:block opacity-0 group-hover/card:opacity-100 transition-all duration-300"
      />
    </div>

    <Image
      src={src}
      alt="Foto do álbum"
      width={70}
      height={70}
      className="object-cover"
    />
  </div>
);
