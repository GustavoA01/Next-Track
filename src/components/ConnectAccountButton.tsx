'use client';
import { redirectToAuthCodeFlow } from '@/actions/redirectFlow';
import { Button } from './ui/button';

export const ConnectAccountButton = () => {
  const handleLogin = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      if (!clientId) throw new Error('Client ID não está definido');

      await redirectToAuthCodeFlow(clientId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className="rounded-full sm:text-md font-semibold"
    >
      Conectar
    </Button>
  );
};
