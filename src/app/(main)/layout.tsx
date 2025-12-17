import { Header } from "@/components/Header"
import { SpotifyUserProfile } from "@/data/types"
import { getCurrentToken } from "@/lib/getCurrentToken"
import { fetchProfile } from "@/lib/spotify"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const accessToken = await getCurrentToken()
  const profile: SpotifyUserProfile = await fetchProfile(accessToken!)

  return (
    <div>
      <Header profile={profile} />
      {children}
    </div>
  )
}

export default MainLayout
