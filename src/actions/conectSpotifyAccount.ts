"use server"
import { spotifyApi } from "@/lib/axios"

export const conectSpotifyAccount = async (data: {email:string}) => {
  console.log(data.email)
  // const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env

  // if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  //   return { error: "Credenciais não configuradas no servidor", success: false }
  // }

  // try {
  //   const params = new URLSearchParams()
  //   params.append("grant_type", "client_credentials")

  //   const response = await spotifyApi.post("/token", params, {
  //     headers: {
  //       Authorization: `Basic ${Buffer.from(
  //         `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  //       ).toString("base64")}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   })

  //   return { success: true, data: response.data }
  // } catch (error) {
  //   console.error("Erro ao obter token do Spotify:", error)
  //   return { success: false, error: "Falha ao obter token" }
  // }
}
