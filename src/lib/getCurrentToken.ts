import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentToken = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("spotifyAccessToken")?.value;
  const refreshToken = cookiesStore.get("spotifyRefreshToken")?.value;

  if (!refreshToken) redirect("/");
  if (!accessToken) redirect("/api/auth/refresh");

  return accessToken;
};
