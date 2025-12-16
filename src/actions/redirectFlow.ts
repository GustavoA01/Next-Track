"use server"
import crypto from "node:crypto"
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"

export async function redirectToAuthCodeFlow(clientId: string) {
  const cookiesStore = await cookies()
  const settedCookies =
    cookiesStore.get("spotifyAccessToken")?.value ||
    cookiesStore.get("spotifyRefreshToken")?.value

  if (settedCookies) redirect("/home")

  const verifier = generateCodeVerifier(128)
  const challenge = generateCodeChallenge(verifier)

  cookiesStore.set("verifier", verifier)

  const params = new URLSearchParams()
  params.append("client_id", clientId)
  params.append("response_type", "code")
  params.append("redirect_uri", "http://127.0.0.1:3000/callback")
  params.append("scope", "user-read-private user-read-email")
  params.append("code_challenge_method", "S256")
  params.append("code_challenge", challenge)

  redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`,
    RedirectType.push
  )
}

function generateCodeVerifier(length: number) {
  let text = ""
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < length; i++) {
    text += possible.charAt(crypto.randomInt(0, possible.length))
  }
  return text
}

function generateCodeChallenge(codeVerifier: string) {
  const hash = crypto.createHash("sha256").update(codeVerifier).digest("base64")

  return hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}
