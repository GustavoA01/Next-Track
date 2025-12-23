import { Card } from "@/components/ui/card";
import { Play, Plus } from "lucide-react";
import Image from "next/image";

type MusicCardProps = {
  index: number;
};

export const MusicCard = ({ index }: MusicCardProps) => {
  return (
    <Card className="group/card w-full px-4 sm:px-8 bg-transparent border-none cursor-pointer hover:bg-surface-hover/40 transition-all duration-200 shadow-none">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-4 md:gap-8">
          <p className="text-sm sm:text-base font-montserrat text-muted-foreground">
            {index + 1}
          </p>

          <div className="relative max-md:max-w-14 max-w-18 h-auto overflow-hidden rounded-lg">
            <div className="group-hover/card:flex transition-all duration-300 absolute inset-0 z-50 items-center justify-center group-hover/card:bg-black/70 rounded-lg">
              <Play className="w-6 h-6 text-primary hidden group-hover/card:block opacity-0 group-hover/card:opacity-100 transition-all duration-300" />
            </div>

            <Image
              src="https://github.com/shadcn.png"
              alt="Music Image"
              width={70}
              height={70}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col ">
            <p className="text-lg font-semibold line-clamp-2">Música</p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              Artista
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">4:14</p>
          <div className="group/add hover:bg-primary border border-primary transition-all duration-200 rounded-full p-2">
            <Plus className="md:w-6 md:h-6 w-4 h-4 text-white m-auto group-hover/add:text-black" />
          </div>
        </div>
      </div>
    </Card>
  );
};
