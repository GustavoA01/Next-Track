"use client";
import { SpotifyPlaylist } from "@/data/types/spotify";
import { Input } from "./ui/input";
import { PlaylistCard } from "./PlaylistCard";
import playlistFallbackImage from "@/assets/playlistFallback.svg";
import { useState } from "react";

export const SearchCards = ({
  playlistsData,
}: {
  playlistsData: SpotifyPlaylist[];
}) => {
  const [queryText, setQueryText] = useState("");

  const playlistsFiltered = playlistsData.filter((playlist) => {
    const playlistName = playlist.name.toLowerCase();
    return playlistName.includes(queryText.toLocaleLowerCase());
  });

  return (
    <div className="space-y-4 container mx-auto px-4 sm:px-8 ">
      <Input
        className="w-full sm:w-[40%]"
        placeholder="Buscar por nome"
        onChange={(e) => setQueryText(e.target.value)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 pb-16">
        {playlistsFiltered.length > 0 ? (
          playlistsFiltered.map((playlist: SpotifyPlaylist) => {
            const imageUrl = playlist.images?.[0]?.url || playlistFallbackImage;

            return (
              <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                playlistName={playlist.name}
                playlistImage={imageUrl}
                totalTracks={playlist.tracks.total}
              />
            );
          })
        ) : (
          <div className="col-span-full">
            <p className="text-muted-foreground">Nenhuma playlist encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};
