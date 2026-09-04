export const refreshAccessToken = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}> => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', clientId!);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await response.json();

  if (data.error === 'invalid_grant') throw new Error('invalid_grant');

  if (!response.ok || data.error) {
    throw new Error(
      `Falha ao atualizar token: ${data.error ?? response.status}`
    );
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
};
