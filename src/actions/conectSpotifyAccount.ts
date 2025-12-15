"use client"
import { spotifyApi } from "@/lib/axios"

// export const conectSpotifyAccount = async () => {
//   const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env

//   if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
//     return { error: "Credenciais não configuradas no servidor", success: false }
//   }

//   try {
//     const params = new URLSearchParams()
//     params.append("grant_type", "client_credentials")

//     const response = await spotifyApi.post("/token", params, {
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
//         ).toString("base64")}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     })

//     return { success: true, data: response.data }
//   } catch (error) {
//     console.error("Erro ao obter token do Spotify:", error)
//     return { success: false, error: "Falha ao obter token" }
//   }
// }

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://127.0.0.1:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}