"use server";
import { getCurrentToken } from "@/lib/getCurrentToken";

export const playMusic = async (trackId: string) => {
  const accessToken = await getCurrentToken();

  try {
    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok)
      throw new Error(`Failed to play music: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error("Failed to play music", error);
  }
};
