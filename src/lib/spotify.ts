import { cookies } from "next/headers"

export const connectSpotifyAccount = async (code: string) => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const { accessToken, refreshToken } = await getAccessToken(clientId!, code)

  return { accessToken, refreshToken }
}

export async function getAccessToken(
  clientId: string,
  code: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const cookiesStore = cookies()
  const verifier = (await cookiesStore).get("verifier")?.value
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI

  const params = new URLSearchParams()
  params.append("client_id", clientId)
  params.append("grant_type", "authorization_code")
  params.append("code", code)
  params.append("redirect_uri", redirectUri!)
  params.append("code_verifier", verifier!)

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })

  const data = await result.json()

  if (data.error) {
    throw new Error(`Falha ao obter token: ${data.error}`)
  }

  return { accessToken: data.access_token, refreshToken: data.refresh_token }
}

export const refreshAccessToken = async (
  refreshToken: string
): Promise<{
  accessToken: string
  refreshToken: string
  expiresIn: number
}> => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID

  const params = new URLSearchParams()
  params.append("grant_type", "refresh_token")
  params.append("refresh_token", refreshToken)
  params.append("client_id", clientId!)

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })

  if (!response.ok) {
    throw new Error(`Falha ao atualizar token: ${response.status}`)
  }

  const data = await response.json()

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  }
}

export async function fetchProfile(token: string) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })

  return await result.json()
}
