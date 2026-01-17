import { SpotifyUserProfile } from "@/data/types/spotify"
import { MenuOptions } from "@/features/Menu/container/MenuOptions"
import { getCurrentToken } from "@/lib/getCurrentToken"
import { fetchProfile } from "@/lib/spotify"
import Image from "next/image"

export const Header = async () => {
  const accessToken = await getCurrentToken()
  const profile: SpotifyUserProfile = await fetchProfile(accessToken)

  return (
    <header className="flex justify-between px-4 container mx-auto sm:px-8 pt-4 mb-4 select-none">
      <div className="flex items-center gap-4">
        <Image
          src="/icon.jpg"
          className="rounded-md"
          alt="Next Track Icon"
          width={40}
          height={40}
        />
        <h1 className="text-lg sm:text-2xl">Next Track</h1>
      </div>

      <MenuOptions profile={profile} />
    </header>
  )
}
