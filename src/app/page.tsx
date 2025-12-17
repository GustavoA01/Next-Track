import { ConectAccountButton } from "@/components/ConectAccountButton"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookiesStore = await cookies()
  
  const hasrefreshToken = cookiesStore.has("spotifyRefreshToken")
  if (hasrefreshToken) redirect("/home")

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold animate-fade-in-up-down">Next Track</h1>

        <p className="text-sm text-muted-foreground animate-fade-in-up-down">
          Conecte-se ao Spotify para selecionar uma playlist e obter
          recomendações de músicas
        </p>

        <ConectAccountButton />
      </div>
    </div>
  )
}
