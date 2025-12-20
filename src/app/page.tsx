import { ConectAccountButton } from "@/components/ConectAccountButton";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import bgImage from "@/assets/bgLogin.webp";

async function LoginPage() {
  const cookiesStore = await cookies();

  const hasrefreshToken = cookiesStore.has("spotifyRefreshToken");
  if (hasrefreshToken) redirect("/home");

  return (
    <>
      {/* <Image
        src={bgImage}
        fill
        alt="imagem de fundo"
        className=" w-full -z-30 h-full fixed object-cover"
      /> */}
      <div className="flex justify-center items-center min-h-screen bg-black/80 ">
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
    </>
  );
}

export default LoginPage;
