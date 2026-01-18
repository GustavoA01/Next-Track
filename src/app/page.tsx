import { ConectAccountButton } from "@/components/ConectAccountButton";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

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
        src="/bgLogin.jpg"
        alt="imagem de fundo"
      />
      <div className="flex flex-col gap-4 items-center px-4 text-center">
        <Image
          preload
          src="/icon.jpg"
          className="rounded-lg max-sm:h-16 max-sm:w-16 animate-fade-in-up-down"
          alt="Next Track Icon"
          width={80}
          height={80}
        />

        <h1 className="text-3xl md:text-5xl font-bold animate-fade-in-up-down ">
          Next Track
        </h1>

        <p className="text-sm md:text-lg text-muted-foreground animate-fade-in-up-down">
          Conecte-se ao Spotify para selecionar uma playlist e obter
          recomendações de músicas
        </p>

        <ConectAccountButton />

        <Link
          href="/privacy-policy"
          className="text-muted-foreground hover:text-white transition underline duration-150 text-sm mt-8"
        >
          Ver termos de privacidade
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
