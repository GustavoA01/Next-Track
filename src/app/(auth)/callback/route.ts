import { connectSpotifyAccount } from "@/lib/spotify"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")
  console.log(request.url)
  const redirectTo = new URL('/home', request.url)
  const redirectLogin = new URL('/', request.url)

  if (error || !code) {
    console.error("Spotify Authorization Error:", error)
    return NextResponse.redirect(redirectLogin)
  }

  const { accessToken, refreshToken } = await connectSpotifyAccount(code)

  try {
    if (!accessToken) {
      throw new Error("Access token não encontrado")
    }

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

    return NextResponse.redirect(redirectTo)
  } catch (error) {
    console.error("Erro ao conectar à conta do Spotify:", error)
    return NextResponse.redirect(redirectLogin)
  }
}
