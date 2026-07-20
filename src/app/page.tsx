import { ConnectAccountButton } from '@/components/ConnectAccountButton';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { SPOTIFY_REFRESH_TOKEN_COOKIE } from '@/lib/spotifyAuthCookies';

const LoginPage = async () => {
  const cookiesStore = await cookies();
  const hasrefreshToken = cookiesStore.has(SPOTIFY_REFRESH_TOKEN_COOKIE);

  if (hasrefreshToken) redirect('/home');

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/80">
      <Image
        fill
        preload
        src="/bgLogin.jpg"
        alt="Imagem de fundo"
        className="-z-30 object-cover"
      />
      <div className="flex flex-col gap-4 items-center px-4 text-center">
        <Image
          preload
          width={80}
          height={80}
          src="/icon.jpg"
          alt="Ícone do Next Track"
          className="rounded-lg max-sm:h-16 max-sm:w-16 animate-fade-in-up-down"
        />

        <h1 className="text-3xl md:text-5xl font-bold animate-fade-in-up-down ">
          Next Track
        </h1>

        <p className="text-sm md:text-lg text-muted-foreground animate-fade-in-up-down">
          Conecte-se ao Spotify para selecionar uma playlist e obter
          recomendações de músicas
        </p>

        <ConnectAccountButton />
      </div>
    </div>
  );
};

export default LoginPage;
