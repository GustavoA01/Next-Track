import { Card } from "@/components/ui/card"
import { fetchProfile } from "@/lib/spotify"
import { cookies } from "next/headers"
import Image from "next/image"
import { redirect } from "next/navigation"

const Home = async () => {
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get("spotifyAccessToken")?.value
  const refreshToken = cookiesStore.get("spotifyRefreshToken")?.value

  if (!refreshToken) redirect("/")
  if (!accessToken) redirect("/api/auth/refresh")

  const profile = await fetchProfile(accessToken!)

  const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Erro na API do Spotify:", response.status, errorText)
    throw new Error(`Falha ao buscar playlists: ${response.status}`)
  }

  console.log("User Profile:", profile)
  const playlistsData = await response.json()
  console.log("User Playlists:", playlistsData)

  return <div>
    <header className="p-4">
      <h1 className="text-2xl">Bem vindo, {profile.display_name}</h1>
    </header>

    <div className="mx-4">
      <h2 className="text-xl p-4">Suas Playlists:</h2>
      
      <div>

      <Card className="w-100">
        {/* <Image src={playlistsData.items[0].images[0].url} width={200} height={200} alt={playlistsData.items[0].name} /> */}
      </Card>
      </div>
    </div>
  </div>
}

export default Home
