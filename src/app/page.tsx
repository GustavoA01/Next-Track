"use client"
import { Button } from "@/components/ui/button"
import axios from "axios"

export default function Home() {
  const getSpotifyToken = async () => {
    try {
      const response = await axios.post("/api/spotify-token")
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return ( 
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold">Next Track</h1>

        <p className="text-sm text-muted-foreground">
          Conecte-se ao Spotify para selecionar uma playlist e obter
          recomendações de músicas
        </p>

        <Button className="rounded-full" onClick={getSpotifyToken}>
          Conectar com Spotify
        </Button>
      </div>
    </div>
  )
}
