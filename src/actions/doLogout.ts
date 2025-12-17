"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const doLogout = async () => {
  const cookiesStore = await cookies()

  cookiesStore.delete("spotifyRefreshToken")
  cookiesStore.delete("spotifyAccessToken")

  redirect("/")
}