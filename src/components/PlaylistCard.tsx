'use client'
import Image from "next/image"
import { Card } from "./ui/card"
import { Circle, Sparkles } from "lucide-react"
import Link from "next/link"

type PlaylistCardProps = {
  id: string
  playlistName: string
  playlistImage: string
  totalTracks: number
}

export const PlaylistCard = ({
  id,
  playlistName,
  playlistImage,
  totalTracks,
}: PlaylistCardProps) => {
  return (
    <Link href={`playlist/${id}?name=${encodeURIComponent(playlistName)}`}>
      <Card className="group px-4 cursor-pointer w-full hover:bg-surface-hover transition-all duration-400 hover:-translate-y-1.5">
        <div className="overflow-hidden rounded-md relative w-auto h-auto">
          <div className="absolute inset-0 flex items-center justify-center text-black bg-primary opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10 p-2 rounded-full w-10 h-10 m-auto">
            <Sparkles size={20} />
          </div>
          <Image
            className="rounded-md w-full h-auto sm:w-full group-hover:scale-110 group-hover:blur-xs transition-all duration-300 object-cover"
            src={playlistImage}
            width={150}
            height={150}
            alt={playlistName}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-sm sm:text-lg font-bold font-inter group-hover:text-primary transition-colors duration-300 line-clamp-1 truncate">
            {playlistName}
          </h2>

          <div className="flex items-center gap-2 line-clamp-1 mt-auto">
            <Circle className="fill-primary text-primary" size={8} />
            <span className="text-muted-foreground text-xs sm:text-sm">
              {totalTracks} músicas
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
