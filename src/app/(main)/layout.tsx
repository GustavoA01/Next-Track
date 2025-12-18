import { SpotifyUserProfile } from "@/data/types"
import { Header } from "@/components/Header"
import { getCurrentToken } from "@/lib/getCurrentToken"
import { fetchProfile } from "@/lib/spotify"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
 

  return (
    <div>
      
      {children}
    </div>
  )
}

export default MainLayout
