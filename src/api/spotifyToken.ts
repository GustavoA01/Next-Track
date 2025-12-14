import { spotifyApi } from "@/lib/axios"

export const getSpotifyToken = async () => {
  const response = await spotifyApi.post("/token", {
    grant_type: "",
  })
}