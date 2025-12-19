import { SpotifyUserProfile } from "@/data/types/spotify"
import { MenuOptions } from "@/features/Menu/container/MenuOptions"
import { getCurrentToken } from "@/lib/getCurrentToken"
import { fetchProfile } from "@/lib/spotify"

export const Header = async () => {
  const accessToken = await getCurrentToken()
  const profile: SpotifyUserProfile = await fetchProfile(accessToken)

  return (
    <header className="flex justify-between px-4 pt-4  mb-4">
      <h1 className="text-lg sm:text-2xl">Next Track</h1>
      <MenuOptions profile={profile} />
    </header>
  )
}
