import { Header } from "@/components/Header"
import { SpotifyUserProfile } from "@/data/types"
import { getAccessToken } from "@/lib/getAccessToken"
import { fetchProfile } from "@/lib/spotify"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const accessToken = await getAccessToken()
  const profile: SpotifyUserProfile = await fetchProfile(accessToken!)

  return (
    <div>
      <Header profile={profile} />
      {children}
    </div>
  )
}

export default MainLayout
