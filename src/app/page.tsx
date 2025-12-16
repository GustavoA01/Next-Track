import { ConectAccountButton } from "@/components/ConectAccountButton"

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold">Next Track</h1>

        <p className="text-sm text-muted-foreground">
          Conecte-se ao Spotify para selecionar uma playlist e obter
          recomendações de músicas
        </p>

        <ConectAccountButton/>
      </div>
    </div>
  )
}
