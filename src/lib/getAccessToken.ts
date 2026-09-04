import { cookies } from 'next/headers';

export const getAccessToken = async (
  clientId: string,
  code: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const cookiesStore = cookies();
  const verifier = (await cookiesStore).get('verifier')?.value;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri!);
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const data = await result.json();

  if (data.error) throw new Error(`Falha ao obter token: ${data.error}`);

  return { accessToken: data.access_token, refreshToken: data.refresh_token };
};
