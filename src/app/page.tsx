import { ConectAccountButton } from "@/components/ConectAccountButton";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";

async function LoginPage() {
  const cookiesStore = await cookies();
  const hasrefreshToken = cookiesStore.has("spotifyRefreshToken");

  if (hasrefreshToken) redirect("/home");

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/80">
      <Image
        fill
        preload
        className="-z-30 object-cover"
        src={"/bgLogin.jpg"}
        alt="imagem de fundo"
      />
      <div className="flex flex-col gap-4 items-center px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold animate-fade-in-up-down ">
          Next Track
        </h1>

        <p className="text-sm md:text-lg text-muted-foreground animate-fade-in-up-down">
          Conecte-se ao Spotify para selecionar uma playlist e obter
          recomendações de músicas
        </p>

        <ConectAccountButton />
      </div>
    </div>
  );
}

export default LoginPage;
