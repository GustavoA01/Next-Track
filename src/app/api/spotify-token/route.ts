import { spotifyApi } from "@/lib/axios"
import { NextResponse } from "next/server";

export const POST = async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return NextResponse.json(
      { error: "Credenciais não configuradas no servidor" },
      { status: 500 }
    );
  }

  try {
    const params = new URLSearchParams()
    params.append("grant_type", "client_credentials")
    
    const response = await spotifyApi.post("/token", params, {
      headers: {
        "Authorization": `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error(error)
  }
}