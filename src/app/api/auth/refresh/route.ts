import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refreshAccessToken } from "@/lib/spotify";

export async function GET() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("spotifyRefreshToken")?.value;

  if (!refreshToken) redirect("/");

  let success = false;

  try {
    const { accessToken, refreshToken: newRefreshToken } =
      await refreshAccessToken(refreshToken);

    cookieStore.set("spotifyAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    if (newRefreshToken) {
      cookieStore.set("spotifyRefreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }

    success = true;
  } catch (error) {
    console.error("Falha ao renovar via rota:", error);
    success = false;
  }

  if (success) {
    redirect("/home");
  } else {
    redirect("/");
  }
}
