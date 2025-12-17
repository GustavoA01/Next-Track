import { connectSpotifyAccount } from "@/lib/spotify"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    console.error("Spotify Authorization Error:", error)
    redirect("/")
  } else if (!code) {
    console.error("No authorization code provided")
    redirect("/")
  }

  const { accessToken, refreshToken } = await connectSpotifyAccount(code)

  if (accessToken) {
    const cookiesStore = await cookies()

    cookiesStore.set("spotifyAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    })

    if (refreshToken) {
      cookiesStore.set("spotifyRefreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    }

    redirect("/home")
  }
}
