"use server";
import { revalidateTag } from "next/cache";
import { ParamValue } from "next/dist/server/request/params";

type AddToPlaylistProps = {
  jsonUris: { uris: string[] };
  playlistId: ParamValue;
  accessToken: string;
};

export const addToPlaylist = async ({
  jsonUris,
  playlistId,
  accessToken,
}: AddToPlaylistProps) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(jsonUris),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro Spotify:", errorData);
      return { success: false, error: "Falha ao adicionar música" };
    }
    revalidateTag(`playlist-${playlistId}`);

    return { success: true };
  } catch (error) {
    console.log("Ocorreu um erro ao adicionar à playlist: ", error);
  }
};
